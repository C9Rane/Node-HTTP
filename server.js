const http = require("http");

http.createServer((request, response) => {
    const { method, url } = request;
    const packetArr = [];
    
    
    
    request.on("error", (err) => {
        response.writeHead(400, {"content-type": "text/html" });
        response.write("Client Error");
        response.end();
    });
    response.on("error", (err) => {
        response.writeHead(500, {"content-type": "text/html" });
        response.write("Server Error");
        response.end();
    });

    if (url == "/"){
        response.writeHead(200, { "content-type": "text/html" });
        response.write("<h1>Welcome</h1>");
    } else if (url == "/about"){
        response.writeHead(200, { "content-type": "text/html" });
        response.write("<h1>About:</h1><p>New Developer whose name is sweeping the streets</p>");
    } else if (url == "/echo" && method == "POST"){
        // response.writeHead(200, { "content-type": "text/html" });
        // response.write(responseBody);
        request.on("data", (packet) => {
            packetArr.push(packet);
        });
        
        request.on("end", () => {
            console.log(packetArr);
            if (packetArr.length > 0){
                const body = JSON.parse(Buffer.concat(packetArr).toString());
                const responseBody = { method, url, body };
            response.write(JSON.stringify(responseBody)); 
            response.end(); 
        }
        return; 
        });
    

    } else {
        response.writeHead(500, { "content-type": "text/html" });
        response.write("Error: Server Error");
    }
    
}).listen(3000, () => {
  console.log("Server listening at http://localhost:5000...");
});