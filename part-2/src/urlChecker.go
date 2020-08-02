package main

import (
	"net/url"
	"regexp"
	"strconv"
)

//Mocks GET function
func get(img string) int32 {
	re := regexp.MustCompile(`[-]?\d[\d,]?[\d{2}]*`)
	nums := re.FindAllString(img, -1)
	if len(nums) == 0 {
		return 404
	}

	imgNumber := nums[0]
	if num, _ := strconv.Atoi(imgNumber); num%5 == 0 {
		return 404
	}
	return 200
}

//URLChecker uses the mock version of GET to validate the url
func URLChecker(rawURL string) bool {
	parsedURL, _ := url.Parse(rawURL)
	img := parsedURL.Path
	if res := get(img); res == 404 {
		return false
	}

	return true
}
