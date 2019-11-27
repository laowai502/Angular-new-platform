const express = require('express');
const fs = require("fs");
const app = express();

//方法1：通过express.static访问静态文件，这里访问的是ajax.html
app.use(express.static("../dist/laowai-ng-test"));

//方法2：使用fs.readFile打开html文件
app.get("/index.html", function (request, response) {
    fs.readFile("../dist/laowai-ng-test/" + request.path.substr(1), function (err, data) {
        // body
        if (err) {
            console.log(err);
            //404：NOT FOUND
            response.writeHead(404, { "Content-Type": "text/html" });
        }
        else {
            //200：OK
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(data.toString());
        }
        response.end();
    });
});

app.listen(3001, function () {
    console.log("server start angular8 es6");
});