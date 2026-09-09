# Inventario de Medicinas - Angular

Frontend inicial completo para un sistema de inventario y control de recetas.

## Incluye
- Dashboard
- Inventario de medicamentos
- Alta y eliminación de medicamentos
- Alertas de caducidad
- Pacientes
- Alta de recetas
- Recordatorios
- Centro de notificaciones
- Diseño responsive
- Servicios preparados para sustituir datos demo por APIs de Spring Boot

## Ejecutar

```bash
npm install
npm start
```

Abrir http://localhost:4200

## Conectar con Spring Boot

El archivo `src/app/core/services/inventario.service.ts` actualmente usa datos de demostración con RxJS `of()`.

Cuando tu backend esté listo, reemplaza esos métodos por `HttpClient`, por ejemplo:

```ts
return this.http.get<Medicamento[]>('http://localhost:8080/api/medicamentos');
```

Recomendación de endpoints:
- GET/POST/PUT/DELETE `/api/medicamentos`
- GET/POST/PUT/DELETE `/api/pacientes`
- GET/POST/PUT/DELETE `/api/recetas`
- GET `/api/notificaciones`
- GET `/api/recordatorios`
