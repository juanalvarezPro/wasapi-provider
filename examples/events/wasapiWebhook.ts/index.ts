import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { registerWasapiWebhook } from "./wasapiWebhook";

dotenv.config();
const PORT = process.env.PORT || '3000'
const app = express();
app.use(bodyParser.json());

// Registrar webhook de Wasapi
registerWasapiWebhook(app, process.env.API_KEY_WASAPI || "");

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`); 
});