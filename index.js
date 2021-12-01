const http = require("http");
const path = require("path");
const fs = require("fs");
const { create } = require("domain");

const server = http.createServer((req, res) => {
    if(req.method == 'GET' && req.url == '/')
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream('./index.html').pipe(res);
    }
    else if(req.method == 'GET' && req.url == '/style_sheet.css')
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        fs.createReadStream('./style_sheet.css').pipe(res);
    }
    else if(req.method == "GET" && req.url == '/home')
    {
        res.statusCode == 200;
        res.setHeader('Content-Type', 'application/json');
    }
    else if(req.method == "POST" && req.url == "/insert")
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');

        var content = '';
        req.on('data', function(data){
            content += data;

            var obj = JSON.parse(content);

            console.log("The UserName is: "+ obj.name);
            console.log("The comment is: "+ obj.message);
            var conn = con.getConnection();

            conn.query('INSERT INTO comments.comments (comments.userName, comments.comment) VALUES (?,?)',[obj.name,obj.message], function(error, results, fields){
            if(error) throw error;
            console.log("Success!");
        });

        conn.end();
        res.end("Success!");
        });
    }
    else if(req.method == "GET" && req.url == '/comment_box.js')
    {
        res.writeHead(200, {"Content-Type":"text/javascript"});
        fs.createReadStream("./comment_box.js").pipe(res);
    }
});
  
  switch (extName) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        
        res.writeHead(500);
        res.end(`Server Error ${err.code}`);
      }
    } else {

      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));