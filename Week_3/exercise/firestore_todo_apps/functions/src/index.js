const functions = require("firebase-functions");
const apiHandler = require('./handlers/api.js')

exports.api = functions.https.onRequest(apiHandler.callback());
