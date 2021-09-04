# Producer Consumer Classic Problem

This project simulates the classic producer consumer problem.

### Brief

The Producer-Consumer problem is a classic problem this is used for multi-process synchronization i.e. synchronization between more than one processes.

### Installation

1. Clone the repo. Use SSH, it's better.
2. If needed, install `node` version `14.x`. I'd recommend using [nvm](https://github.com/nvm-sh/nvm)
3. Install dependencies:
```
npm install
```
4. First of all start the Consumer:
```
npm run consumer
```
5. Then start the Producer:
```
npm run producer
```
6. Finally start the Generator:
```
npm run generator
```
7. To see the output on a browser, run the `client.html` file on any javascript supported browser

### Demo

https://user-images.githubusercontent.com/37780794/132106116-805b694e-301e-4c48-8ac8-cc07af228f5e.mp4

### Usage

1. The consumer is running a net.Socket and is running on 5000 port by default 
2. The producer is using net.Socket as a client to connect to consumer
3. Producer is running http server on port 3000 default
4. Generator is a recursive utility that hits "/generate" endpoint on producer
5. "/generate" api generates a random expression and sends to consumer for processing via net.Socket
6. Consumer listening on "data" event solves the expression and notifies its producer
7. Client app is running socket.io client to receive updates from from both producer and consumer
8. Both producer and consumer also running socket.io as server using a separate express server to server the client at 7000 and 8000 ports respectively
9. Express and Socket.io is just used to server the `client.html`

### Testing

Run `npm run test` to test the endpoints locally. For testing `producer.test.js` make sure consumer and producer are running

### File and Folder naming conventions

1. All files should be single word, multiple words should be separated by a dot. E.g. `src/utils/expression.utility.js`.
2. Objects and variables in files and/or APIs should use camel case for everything.
3. All tests are located in `src/tests`
