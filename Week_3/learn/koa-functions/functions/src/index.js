const functions = require("firebase-functions");
const apiHandler = require("./handlers/api");

exports.api = functions.https.onRequest(apiHandler.callback());
