package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
	"sync"
	"time"
)

type productChannel struct {
	Key  string
	Data []string
}

//CheckURLByProduct is going to validate if an array of urls are valid
// It is going tp return three valid URLs at max
func CheckURLByProduct(urls []string) []string {
	var validURLs = []string{}
	for _, url := range urls {
		if len(validURLs) == 3 {
			break
		} else if URLChecker(url) {
			validURLs = append(validURLs, url)
		}
	}
	return validURLs
}

// ProcessDumpUnchecked reads the dump-unchecked file and returns the correct JSON
func ProcessDumpUnchecked() {
	dumpMap := map[string][]string{}

	file, _ := ioutil.ReadFile("dump-unchecked.json")
	json.Unmarshal(file, &dumpMap)

	c := make(chan productChannel)
	productMap := map[string][]string{}
	wg := sync.WaitGroup{}

	start := time.Now()

	// Here is where I take advantage of Go routines to validate all requests
	for key, data := range dumpMap {
		wg.Add(1)
		go func(key string, data []string) {
			validURLs := CheckURLByProduct(data)
			c <- productChannel{
				Key:  key,
				Data: validURLs,
			}
			wg.Done()
		}(key, data)
		productData := <-c
		productMap[productData.Key] = productData.Data
	}

	wg.Wait()

	duration := time.Since(start)
	log.Printf("Dump analyzed in: %v seconds", duration.Seconds())

	mapData, _ := json.MarshalIndent(productMap, "", "		")
	_ = ioutil.WriteFile("../dump-checked.json", mapData, 0644)
	_ = os.Remove("dump-unchecked.json")

}
