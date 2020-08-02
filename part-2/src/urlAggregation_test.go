package main

import "testing"

func TestCheckURLByProduct(t *testing.T) {

	urls := []string{
		"http://localhost:4567/images/9491.png",
		"http://localhost:4567/images/9009.png",
		"http://localhost:4567/images/120589.png",
		"http://localhost:4567/images/120589.png",
	}

	validUrls := CheckURLByProduct(urls)

	if len(validUrls) != 3 {
		t.Errorf("Expected valid url length of 3, but got %v", len(validUrls))
	}

	emptyUrls := []string{}

	emptyValidUrls := CheckURLByProduct(emptyUrls)

	if len(emptyValidUrls) != 0 {
		t.Errorf("Expected valid url length of 0, but got %v", len(emptyValidUrls))
	}

	justTwoUrls := []string{
		"http://localhost:4567/images/9491.png",
		"http://localhost:4567/images/9009.png",
	}

	justTwoValidUrls := CheckURLByProduct(justTwoUrls)

	if len(justTwoValidUrls) != 2 {
		t.Errorf("Expected valid url length of 2, but got %v", len(justTwoValidUrls))
	}

}

func TestURLChecker(t *testing.T) {

	errorURL := "http://localhost:4567/images/9000.png"
	successURL := "http://localhost:4567/images/9002.png"
	weirdURL := "http://localhost:4567/images/.png"

	notValid := URLChecker(errorURL)

	if notValid != false {
		t.Errorf("Expected a not valid result, but got %v", notValid)
	}

	valid := URLChecker(successURL)

	if valid == false {
		t.Errorf("Expected a valid result, but got %v", valid)
	}

	weird := URLChecker(weirdURL)

	if weird != false {
		t.Errorf("Expected a not valid result, but got %v", weird)
	}

}
