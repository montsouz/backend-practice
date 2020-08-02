package main

import (
	"bufio"
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
	"time"
)

type requestData struct {
	ProductID string
	Image     string
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}

// URLAggregator takes a dump file and generates JSON
func URLAggregator(fileName string) {

	file, err := os.Open(fileName)
	check(err)

	scanner := bufio.NewScanner(file)
	reqMap := map[string][]string{}

	start := time.Now()

	for scanner.Scan() {
		var request requestData
		json.Unmarshal([]byte(scanner.Text()), &request)

		// My first idea was to check the URL while reading the file

		// if req := reqMap[request.ProductID]; len(req) <= 3 && URLChecker(request.Image) {
		// 	res := append(reqMap[request.ProductID], request.Image)
		// 	reqMap[request.ProductID] = res
		// }

		res := append(reqMap[request.ProductID], request.Image)
		reqMap[request.ProductID] = res

	}

	duration := time.Since(start)
	log.Printf("URLs Aggregated in: %v seconds", duration.Seconds())

	// But then I realized that maybe a better approach would be writing all down in file
	// And after that, make all the request in parallel, taking advantage of Golang.

	mapData, _ := json.MarshalIndent(reqMap, "", "		")
	_ = ioutil.WriteFile("dump-unchecked.json", mapData, 0644)

}
