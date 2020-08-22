# metrics-service

A simple metrics logging and reporting service that sums metrics by time window for the most recent hour

## Supported APIs
- POST `/metric/:key`
```js
{
    "value": 30
}
```
- GET `/metric/:key/sum`

## How to run
- Run `npm install` to install dependencies
- Copy `sample.env` to `.env` and change the values as needed
- Run `npm start` to start server

