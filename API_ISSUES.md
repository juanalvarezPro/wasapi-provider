# 🐛 Issues de API - Wasapi

## 📞 Solicitudes al Equipo de Wasapi

### 🔴 Issues Críticos

#### 2. **Inconsistencia de Tipos en from_id** 🔴 NUEVO
**Problema**: El campo `from_id` tiene tipos inconsistentes entre endpoints
- **Endpoints afectados**: 
  - `POST /whatsapp-messages` → `from_id` es `string` (opcional)
  - `POST /whatsapp-messages/send-template` → `from_id` es `number` (opcional)
  - `POST /whatsapp-messages/attachment` → `from_id` es `number`
  - `POST /whatsapp-messages/change-status` → `from_id` es `number`
  - `POST /whatsapp-messages/change-status` → `from_id` es `number`


- **Estado**: ❌ Inconsistente
- **Impacto**: Medio - Causa errores de TypeScript y confusión
- **Solicitud**: Estandarizar el tipo de `from_id` en todos los endpoints
- **Solución sugerida**: Usar `number` en todos los endpoints para consistencia

### ✅ Issues Resueltos


---

**Nota**: Este documento debe ser actualizado regularmente conforme se resuelvan los issues y se implementen nuevas funcionalidades. 