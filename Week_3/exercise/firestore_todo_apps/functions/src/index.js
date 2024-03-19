const functions = require("firebase-functions");
const apiHandler = require('./routes/api.js')

exports.api = functions.https.onRequest(apiHandler.callback());
