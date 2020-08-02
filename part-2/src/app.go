package main

import (
	"log"
	"time"
)

func main() {

	start := time.Now()

	URLAggregator("../input-dump")
	ProcessDumpUnchecked()

	duration := time.Since(start)
	log.Printf("Total time of execution: %v seconds", duration.Seconds())

}
