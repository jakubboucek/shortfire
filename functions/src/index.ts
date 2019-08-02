'use strict';

import * as functions from 'firebase-functions'
import * as express from 'express'
import * as admin from 'firebase-admin'
import RedirectHandler from "./RedirectHandler";
import Api from "./api/Api";
import * as cookieParser from "cookie-parser";

// Initialize Firebase App
const serviceAccount = require('../serviceAccount.json');
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
adminConfig.credential = admin.credential.cert(serviceAccount);
admin.initializeApp(adminConfig);

// Routing
const app = express();

// Cookies
app.use(cookieParser());

// API
app.use("/api", Api.setup());

// Handle redirect
app.get("*", (request, response) => {
  RedirectHandler.handleRedirect(request, response)
});

// Handle the rest
app.all("*", ((req, res) => {
  res.status(500).end();
}));

export const redirect = functions.https.onRequest(app);
