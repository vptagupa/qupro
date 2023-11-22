const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    const printer = require("@thiagoelg/node-printer");
    console.log(printer.getDefaultPrinterName());
    printer.printDirect({
        data: "print from Node.JS buffer", // or simple String: "some text"
        //, printer:'Foxit Reader PDF Printer' // printer name, if missing then will print to default printer
        type: "RAW", // type: RAW, TEXT, PDF, JPEG, .. depends on platform
        success: function (jobID) {
            console.log("sent to printer with ID: " + jobID);
        },
        error: function (err) {
            console.log(err);
        },
    });
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Listening to port ${port}.`);
});
