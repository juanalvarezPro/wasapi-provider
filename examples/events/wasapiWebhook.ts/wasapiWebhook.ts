import { Application, Request, Response } from "express";
import { WasapiEvents, WasapiMessage } from "../../../src/provider/wasapi.events";


export function registerWasapiWebhook(app: Application, apiKey: string) {
  const wasapiEvents = new WasapiEvents(apiKey);

  // Webhook que recibe los mensajes de Wasapi
  app.post("/webhook/wasapi", (req: Request, res: Response) => {
    const payload = req.body as WasapiMessage;

    try {
      wasapiEvents.eventInMsg(payload);
      res.status(200).json({ success: true });
    } catch (err) {
      console.error("Error procesando webhook Wasapi:", err);
      res.status(500).json({ success: false, error: String(err) });
    }
  });

  // Listener de mensajes adaptados
  wasapiEvents.on("message", (msg) => {
    console.log("📩 Mensaje adaptado recibido:");
    console.log("Nombre Cliente:", msg.name);
    console.log("De:", msg.from);
    console.log("Cuerpo:", msg.body);
    console.log("Número host:", msg.host?.phone);
  });

  return wasapiEvents;
}