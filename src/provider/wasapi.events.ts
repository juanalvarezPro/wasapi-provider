import { EventEmitterClass, utils } from "@builderbot/bot";
import { ProviderEventTypes } from "@builderbot/bot/dist/types";
import { WasapiClient } from "@laiyon/wasapi-sdk";


export type WasapiMessage = {
    event: string;
    data: {
      user_id: number;
      from_id: number;
      message: string;
      type: "in" | "out";
      message_type: "text" | "image" | "video" | "audio" | "document" | "location";
      wa_id: string;
      wam_id: string;
      context_wam_id?: string;
      status: string;
      caption?: string;
      filename?: string ;
      origin: string;
      data: string;
      created_at: string; // ISO 8601
      updated_at: string; // ISO 8601
      id: number;
      chat_status: {
        conversation_status: "open" | "closed" | string;
        conversation_expiration: number;
      };
    };
  };

  

export class WasapiEvents extends EventEmitterClass<ProviderEventTypes> {

    private wasapiClient: WasapiClient;
    private token: string;

    /**
     * Constructor de la clase WasapiEvents
     * @param token - Token de autenticación para Wasapi
     */
    constructor(token: string)  {
        super();
        this.token = token;
        this.wasapiClient = new WasapiClient(token);
    }

    /**
     * Función que maneja el evento de mensaje entrante de Wasapi.
     * @param payload - El mensaje entrante de Wasapi
     */
    public eventInMsg = async (payload: WasapiMessage) => {

        if (payload.data.type !== "in" || payload.data.wa_id.includes("g.us")) return;

        const sendObj = {
            body: payload.data.message || "",
            from: payload.data.wa_id, // Número que envía
            name: await this.getName(payload),
            host: {
                phone: payload.data.from_id.toString()
            },
            raw: payload
        }
        if (['image', 'video'].includes(payload.data.message_type)) sendObj.body = utils.generateRefProvider('_event_media_')
        if (payload.data.message_type === 'document') sendObj.body = utils.generateRefProvider('_event_document_')
        if (payload.data.message_type === 'audio') sendObj.body = utils.generateRefProvider('_event_voice_note_')
        if (payload.data.message_type === 'location') sendObj.body = utils.generateRefProvider('_event_location_')

        this.emit('message', sendObj)
    }



    /**
     * Obtiene el cliente Wasapi para uso externo.
     * @returns Instancia del cliente Wasapi
     */
    public getClient(): WasapiClient {
        return this.wasapiClient;
    }

    /**
     * Función para obtener el nombre de la cuenta de WhatsApp.
     * @param payload - El mensaje de Wasapi
     * @returns El nombre de la cuenta
     */
    private async getName(payload: WasapiMessage): Promise<string> {
        try {
            const contact = await this.wasapiClient.contacts.getById(payload.data.wa_id);
            if (contact) {
                return contact.data.first_name;
            }
            return "Usuario";
        } catch (error) {
            console.error('Error getting contact name:', error);
            return "Usuario";
        }
    }

}