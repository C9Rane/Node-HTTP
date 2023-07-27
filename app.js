// import http from "http"
// here written as CommonJS
const http = require("http");

http.createServer((request, response) => {
  response.writeHead(200, { "content-type": "text/html" });
  response.write("Hello World!");
  response.end();
}).listen(5000, () => {
  console.log("Server listening at http://localhost:5000...");
});