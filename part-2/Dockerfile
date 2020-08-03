FROM golang:alpine

RUN apk add --no-cache git

WORKDIR /go/src/app
COPY . .

RUN go get github.com/pilu/fresh

WORKDIR /go/src/app/src

CMD ["fresh" ]