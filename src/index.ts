import http from "http";
import fs from "fs";

let server = http.createServer(
    (request: any, response: any)=>{
        fs.readFile('./index.html',(error: any,data: any)=>{
            response.writeHead(200, {'Content-Type':'text/html'});
            response.write(data);
            response.end();
        })

    }
);
server.listen(3000);
