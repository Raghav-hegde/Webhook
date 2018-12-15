"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  var speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.echoText
      ? req.body.queryResult.parameters.echoText
      : "Seems like some problem. Speak again.";
  return res.json({
    fulfillmentText: speech,
    source: "webhook-echo-sample"
  });
});

restService.post("/add", function(req, res) {
  var num1 = req.body.queryResult.parameters.number1;
  var num2 = req.body.queryResult.parameters.number2;
  var result = num1 + num2;
  return res.json({
    fulfillmentText: result,
    source: "webhook-addition-sample"
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
