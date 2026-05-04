# Veterinaria San Francisco

Sistema web de reserva de horas para una veterinaria. El proyecto comenzo como una interfaz estatica en HTML y CSS, y evoluciono a una aplicacion funcional con backend en TypeScript, API REST y conexion a base de datos en Supabase.

## Estado del proyecto

![Frontend](https://img.shields.io/badge/frontend-HTML%20%2B%20CSS-blue)
![Backend](https://img.shields.io/badge/backend-TypeScript%20%2B%20Express-3178c6)
![Database](https://img.shields.io/badge/database-Supabase-3ecf8e)
![Validation](https://img.shields.io/badge/validation-Zod-f59e0b)

## Resumen

Esta version ya incluye:

- interfaz de reserva responsive
- backend en `Node.js + Express + TypeScript`
- arquitectura por capas
- validacion de datos en servidor
- persistencia de reservas en `Supabase`
- reservas en bloques de 40 minutos
- validacion de horas ocupadas y fechas pasadas
- disponibilidad separada por motivo de consulta
- endurecimiento basico de seguridad para la API
- panel administrativo con login para revisar reservas
- comentarios funcionales orientados a mantenimiento en equipo
- configuracion segura mediante variables de entorno

El formulario ya envia una solicitud real al backend y el backend puede registrar la reserva en la base de datos.

## Nuevas capacidades agregadas

Para pasar de una maqueta visual a una aplicacion funcional se incorporaron dos bloques principales:

1. Backend en TypeScript para manejar reglas de negocio y exponer endpoints.
2. Conexion a Supabase para almacenar las reservas en PostgreSQL.

Con esto, el sistema dejo de ser solo visual y paso a tener flujo completo de reserva.

## Panel administrativo

El sistema ahora incluye una vista administrativa protegida por login para consultar las reservas agendadas.

Ruta disponible:

- `/admin`

Desde este panel es posible:

- iniciar sesion como administrador
- consultar reservas pendientes y confirmadas
- actualizar el listado sin salir de la vista
- eliminar reservas desde la tabla del panel
- cerrar sesion de forma segura

La sesion se maneja mediante una cookie `HttpOnly` emitida por el backend.

## Reglas de reserva actuales

El modulo de reservas ya contempla reglas funcionales para evitar conflictos en la agenda:

- las horas se ofrecen en bloques fijos de `40 minutos`
- no se pueden reservar fechas u horas anteriores al momento actual
- no se puede reservar una hora que ya fue tomada dentro del mismo servicio
- los bloques disponibles cambian segun la fecha seleccionada y el motivo de consulta
- los domingos no se generan horarios de atencion

Horarios actualmente configurados por servicio:

- `Consulta general`
  lunes a viernes: `09:00` a `13:00`
  sabado: `10:00` a `13:20`
- `Vacunación`
  lunes a viernes: `15:00` a `19:00`
  sabado: `10:00` a `12:40`
- `Control preventivo`
  lunes a viernes: `11:00` a `18:20`
  sabado: `11:20` a `14:00`
- domingo: sin atencion para todos los servicios

El frontend muestra solo bloques disponibles para el servicio elegido y el backend vuelve a validar esas reglas antes de guardar la reserva.

## Stack tecnologico

- HTML5
- CSS3
- JavaScript
- Node.js
- Express
- TypeScript
- Supabase
- PostgreSQL
- Zod

## Arquitectura

El backend se organizo siguiendo una estructura por capas, pensada para ser clara, mantenible y facil de escalar.

- `src/routes`
  Registro de rutas HTTP.
- `src/modules/bookings/bookings.controller.ts`
  Traduce requests y responses.
- `src/modules/bookings/bookings.service.ts`
  Contiene la logica de negocio del modulo de reservas.
- `src/modules/bookings/bookings.repository.ts`
  Encapsula el acceso a Supabase.
- `src/modules/bookings/bookings.validation.ts`
  Valida el payload antes de persistirlo.
- `src/config`
  Centraliza configuraciones del entorno.
- `src/lib`
  Aloja servicios compartidos, incluyendo el cliente de Supabase.

## Mantenibilidad del codigo

El codigo fuente incluye comentarios funcionales en los puntos de mantenimiento mas importantes para facilitar trabajo colaborativo, onboarding y futuras modificaciones.

Las anotaciones estan concentradas especialmente en:

- configuracion y arranque de la aplicacion
- validaciones de entrada
- reglas de negocio de reservas
- acceso a base de datos
- autenticacion y proteccion del panel admin
- logica de frontend para reservas y administracion

## Estructura del proyecto

```text
tallerAplicacionesdeInternet/
|- assets/
|- src/
|  |- config/
|  |- lib/
|  |- modules/
|  |  |- bookings/
|  |  |- admin/
|  |- routes/
|  |- app.ts
|  |- server.ts
|- supabase/
|  |- bookings-schema.sql
|- index.html
|- admin.html
|- styles.css
|- main.js
|- admin.js
|- package.json
|- tsconfig.json
|- .env.example
|- .gitignore
```

## Variables de entorno

Debes crear un archivo `.env` local a partir de `.env.example`.

Ejemplo:

```env
PORT=3000
ALLOWED_ORIGINS=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=20
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-this-password
ADMIN_SESSION_SECRET=change-this-session-secret
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-clave-anon
SUPABASE_SERVICE_ROLE_KEY=tu-clave-service-role
```

Variables nuevas de seguridad:

- `ALLOWED_ORIGINS`
  Lista de origenes permitidos para CORS, separados por coma.
- `RATE_LIMIT_WINDOW_MS`
  Ventana de tiempo del limitador de peticiones en milisegundos.
- `RATE_LIMIT_MAX_REQUESTS`
  Numero maximo de solicitudes permitidas por ventana para la API.
- `ADMIN_USERNAME`
  Usuario para acceder al panel administrativo.
- `ADMIN_PASSWORD`
  Contrasena del administrador.
- `ADMIN_SESSION_SECRET`
  Clave secreta usada por el backend para firmar y validar la sesion del administrador.

### Sobre `ADMIN_SESSION_SECRET`

`ADMIN_SESSION_SECRET` no es una contrasena que escriba el usuario. Es una clave interna del servidor.

Su funcion es:

- firmar la cookie de sesion del panel admin
- impedir que alguien pueda falsificar manualmente una sesion valida
- validar que la cookie fue emitida realmente por tu backend

Buenas practicas para usarlo:

- debe ser largo y dificil de adivinar
- no debe repetirse entre proyectos o entornos
- no debe subirse nunca al repositorio
- si cambias este valor, todas las sesiones admin actuales dejan de ser validas

Ejemplo recomendado:

```env
ADMIN_SESSION_SECRET=8vK3xP2mQ9sL7nA4rT1yW6cH5uJ0zBqE
```

## Configuracion de Supabase

1. Crea un proyecto en Supabase.
2. Ve a `Project Settings > API`.
3. Copia `SUPABASE_URL`, `anon key` y `service_role key`.
4. Pegalos en tu archivo `.env`.
5. Abre el `SQL Editor`.
6. Ejecuta el script ubicado en `supabase/bookings-schema.sql`.

Tabla usada actualmente:

- `public.bookings`

Esta tabla almacena:

- nombre del tutor
- nombre de la mascota
- tipo de mascota
- servicio solicitado
- fecha y hora de la cita
- telefono de contacto
- observaciones
- estado de la reserva

## Ejecucion local

1. Instala dependencias:

```powershell
npm install
```

2. Verifica que TypeScript compile correctamente:

```powershell
npm run check
```

3. Inicia el servidor de desarrollo:

```powershell
npm run dev
```

4. Abre la aplicacion en:

```text
http://localhost:3000
```

## Endpoints disponibles

- `GET /api/health`
  Comprueba que el servidor este operativo.
- `GET /api/bookings/availability?date=YYYY-MM-DD&service=SERVICIO`
  Devuelve bloques ocupados y bloques disponibles para una fecha y servicio.
- `POST /api/bookings`
  Registra una nueva solicitud de reserva.
- `POST /api/admin/login`
  Inicia sesion como administrador.
- `POST /api/admin/logout`
  Cierra la sesion del administrador.
- `GET /api/admin/session`
  Verifica si existe una sesion admin activa.
- `GET /api/admin/bookings`
  Devuelve las reservas agendadas. Requiere sesion admin.
- `DELETE /api/admin/bookings/:id`
  Elimina una reserva desde el panel administrativo. Requiere sesion admin.

## Ejemplo de payload

```json
{
  "ownerName": "Camila Soto",
  "petName": "Luna",
  "petType": "Perro",
  "service": "Consulta general",
  "appointmentDate": "2026-04-30",
  "appointmentTime": "10:20",
  "phone": "+56 9 1234 5678",
  "notes": "Primera visita"
}
```

## Seguridad

Se aplicaron buenas practicas basicas para evitar exponer informacion sensible:

- `.env` no debe subirse a GitHub.
- `.env.example` documenta variables sin incluir secretos reales.
- `SUPABASE_SERVICE_ROLE_KEY` se usa solo en el backend.
- `node_modules` y `dist` estan ignorados por Git.
- La validacion con Zod filtra datos invalidos antes de llegar a la base de datos.
- La logica de acceso a datos esta encapsulada y no expone credenciales al navegador.
- La unicidad de reservas debe considerarse por `fecha + hora + servicio`.
- `CORS` se restringe a origenes configurados en `ALLOWED_ORIGINS`.
- La API usa `rate limiting` para reducir abuso automatizado.
- El cuerpo JSON esta limitado para evitar cargas excesivas.
- `service` y `petType` se validan contra listas permitidas.
- `phone` y `notes` ahora tienen validaciones mas estrictas.
- El panel admin requiere login y protege la consulta de reservas con sesion firmada.
- La cookie del administrador se emite como `HttpOnly` y `SameSite=Strict`.
- La eliminacion de reservas solo se permite desde rutas admin autenticadas.

## Recomendaciones antes de publicar

- Revisa que `.env` este efectivamente ignorado por Git.
- Si una llave fue expuesta por error, rotala desde Supabase.
- Nunca uses `SUPABASE_SERVICE_ROLE_KEY` en el frontend.
- Ajusta `ALLOWED_ORIGINS` segun tu dominio real antes de desplegar.
- Cambia `ADMIN_USERNAME`, `ADMIN_PASSWORD` y `ADMIN_SESSION_SECRET` antes de publicar.
- Si el proyecto crece, agrega autenticacion, autorizacion y manejo de auditoria para acciones administrativas.

## Roadmap

Siguientes mejoras sugeridas:

- listado de reservas
- autenticacion de usuarios
- confirmacion de horas
- cancelacion y reprogramacion de reservas
- disponibilidad dinamica por bloques horarios
- gestion de estados desde el panel admin
- reemplazar borrado fisico por cancelacion logica con auditoria

## Autor

Proyecto academico y de practica orientado a evolucionar una landing page en una aplicacion web con backend y persistencia real.
