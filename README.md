## @laiyon/wasapi-sdk

SDK no oficial de Wasapi para integrarte rápido con WhatsApp, campañas, contactos, flujos y más. Incluye tipos TypeScript y soporta ESM y CJS.

- **Ecosistema**: WhatsApp Messages, Templates, Contacts, Labels, Campaigns, Flows, Metrics, Workflow...
- **Runtime**: Node >= 18
- **Tipos**: incluidos (.d.ts)
- **Módulos**: ESM y CJS
- **Subpaths**: `@laiyon/wasapi-sdk`, `@laiyon/wasapi-sdk/models`

### Instalación

```bash
npm i @laiyon/wasapi-sdk
# o
yarn add @laiyon/wasapi-sdk
```

### Importación

- ESM:
```ts
import { WasapiClient } from '@laiyon/wasapi-sdk'
```

- CJS:
```js
const { WasapiClient } = require('@laiyon/wasapi-sdk')
```


## Uso rápido

### Crear cliente
```ts
import { WasapiClient } from '@laiyon/wasapi-sdk'

const API_KEY = process.env.API_KEY_WASAPI as string
// baseURL opcional (usa el default del servicio si lo omites)
const client = new WasapiClient(API_KEY /*, 'https://api-ws.wasapi.io/api/v1' */)
```

### Enviar mensaje simple (WhatsApp)
```ts
const result = await client.whatsapp.sendMessage({
  wa_id: '57300XXXXXXX',
  message: 'Hola! 👋',
  from_id: 123456 // el id de tu numero en la base de datos de wasapi
})
console.log(result)
```

### Enviar adjunto (imagen/video/documento/audio)
```ts
const result = await client.whatsapp.sendAttachment({
  from_id: 123456,
  wa_id: '57300XXXXXXX',
  filePath: 'https://example.com/image.jpg',
  caption: 'Imagen de prueba',
  filename: 'image.jpg'
})
```

### Enviar template (plantilla de WhatsApp)
Usa una “base” y agrega solo lo necesario con spread:
```ts
import { SendTemplate } from '@laiyon/wasapi-sdk/models'

const templateBase: SendTemplate = {
  recipients: '57300XXXXXXX',
  template_id: 'TEMPLATE_UUID',
  contact_type: 'phone',
  from_id: 123456,
  chatbot_status: 'enable',
  conversation_status: 'unchanged'
}

const sent = await client.whatsapp.sendTemplate({
  ...templateBase,
  // agrega variables solo si tu plantilla las requiere
  // archivo opcional
  // file: 'image',
  // url_file: 'https://example.com/image.jpg',
  // file_name: 'image.jpg'
})
```



## API principal
- **Cliente**
  - `new WasapiClient(apiKey: string, baseURL?: string)`
- **Módulos** (accesibles vía `client.X`):
  - `whatsapp`: `sendMessage`, `sendAttachment`, `sendTemplate`, `getConversation`, `getWhatsappNumbers`, `getWhatsappTemplates`, `getWhatsappTemplate`, `syncMetaTemplates`, `changeStatus`, `sendContacts`, `getFlows`, `sendFlow`, `getFlowResponses`, `getFlowAssets`
  - `contacts`, `labels`, `campaigns`, `customFields`, `funnels`, `metrics`, `workflow`, `user`, `bot`
- **Modelos y tipos**: disponibles en `@laiyon/wasapi-sdk/models`

## Tipos y DX
- El paquete incluye `.d.ts` para todo el SDK
- Importa tipos directamente:
```ts
import { SendTemplate } from '@laiyon/wasapi-sdk/models'
```

## Requisitos
- Node.js >= 18
- API Key de Wasapi (`API_KEY_WASAPI`)


## Enlaces
- Repositorio: https://github.com/juanalvarezPro/@laiyon/wasapi-sdk
- Issues: usa el repositorio para reportar errores o solicitar features



