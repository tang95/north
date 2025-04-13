FROM golang:1.23 AS builder
USER root
WORKDIR /src
COPY . /src
RUN go build -o north-otel-collector .

FROM ubuntu:latest as collector
COPY --from=builder /src/north-otel-collector /north-otel-collector
ENTRYPOINT ["/north-otel-collector"]