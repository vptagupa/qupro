const express = require("express");
var cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.get("/print/:qu", (req, res) => {
    const filename = "qu.pdf";
    const fs = require("fs");
    const printer = require("pdf-to-printer");
    const PDFDocument = require("pdfkit");
    const doc = new PDFDocument();

    doc.fontSize(30);
    doc.text(req.params.qu);
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
