## URL Aggregator

For this one I decided to use `Golang`, because it is ultra fast and it handles concurrency beautifully.

#### How to run

You can use Docker to run.

`docker-compose up`

If you don't want to use docker, the simplest way is.

Go to the `./src` folder.

```
go get fresh
fresh
```

#### How to run tests

You can also docker for this one

`docker-compose -f docker-compose.test.yml up`

#### Solution

Everything is handled by Golang's implementation of HashMap. I've decided to use this data structure because according to this [HackerNoon article](https://hackernoon.com/some-insights-on-maps-in-golang-rm5v3ywh):

        Main idea of hash map is to have near-constant O(1) lookup time. Formally lookup time is O(n), in case if hash function gives n collisions, which is almost impossible in real situations.

My First solution was to check the URLs while processing the file, by than I realized that was going to be a slow solution, because I would have to wait for all `GET` requests.

```golang
loop {
    if req := reqMap[request.ProductID]; len(req) <= 3 && URLChecker(request.Image) {
        res := append(reqMap[request.ProductID], request.Image)
        reqMap[request.ProductID] = res
    }
}
```

Then, I've decided to implement a more parallel approach by using `Go Routines`

```golang

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

```

After all the URLs are aggregated in a `dump-unchecked.json` file, they are processed using this approach, generating a `dump-checked.json` that is located inside the `root folder`

#### One Benchmark

This is the best time that I've achieved

```
| 2020/08/02 16:29:27 URLs Aggregated in: 0.1381148 seconds
| 2020/08/02 16:29:27 Dump analyzed in: 0.3100027 seconds
| 2020/08/02 16:29:27 Total time of execution: 0.6391222 seconds

```
