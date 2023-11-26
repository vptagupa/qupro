require("dotenv").config();

const express = require("express");
var cors = require("cors");
const app = express();
const port = 3000;

var corsOptions = {
    origin: process.env?.HOST_URL ?? "http://qupro.local",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json()); // for parsing application/json

app.post("/print", (req, res) => {
    const filename = "tickets.pdf";
    const fs = require("fs");
    const printer = require("pdf-to-printer");
    const PDFDocument = require("pdfkit");
    let doc = new PDFDocument({
        size: "A7",
        margin: 10,
    });

    const data = Array.isArray(req.body.ticket)
        ? req.body.ticket
        : [req.body.ticket];

    doc.fontSize(30);
    doc.text(data[0]);
    data.slice(1).forEach((ticket) => {
        doc.addPage().text(ticket);
    });

    doc.pipe(fs.createWriteStream(filename));
    doc.end();

    const print = async () => {
        await printer.print(filename);
    };

    print();

    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Listening to port ${port}.`);
});
