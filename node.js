const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");

// const textIn = fs.readFileSync("./1.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is the content: ${textIn} \nCreated on ${Date.now()}`;
// fs.writeFileSync("./output.txt", textOut);
// console.log("File has been written. ");

// asyns
// fs.readFile("./2.txt", "utf-8", (err, data) => {
//   console.log(data);
// });
// console.log("Hello");

// SERVER

const tempList = fs.readFileSync(`${__dirname}/templates/list.html`, "utf-8");
const tempMaxCard = fs.readFileSync(
  `${__dirname}/templates/max-card.html`,
  "utf-8"
);
const tempMinCard = fs.readFileSync(
  `${__dirname}/templates/min-card.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  const pathName = req.url;

  // LIST PAGE

  if (pathname === "/" || pathname === "/list") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHtml = dataObject
      .map((el) => replaceTemplate(tempMinCard, el))
      .join("");
    const output = tempList.replace(/{%WORD_ITEMS%}/g, cardsHtml);
    res.end(output);
  }

  // WORD ITEM
  else if (pathname === "/word") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const word = dataObject[query.id];
    const output = replaceTemplate(tempMaxCard, word);
    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("Page not found");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening has been started");
});
