# Reporte de Evaluación Parcial 2 - Vicente

## Evaluación General
La revisión técnica de esta entrega evidencia un avance significativo en comparación con la Evaluación 1. El proyecto "IndieCorner" logra consolidarse como una aplicación Full Stack funcional, superando la etapa de maquetación estática. Se demuestra capacidad para gestionar el ciclo completo de los datos: desde la interfaz (Vanilla JS), pasando por el servidor (Node.js/Express), hasta la persistencia relacional en base de datos.


## Fortalezas
- **Modelado Relacional (DDL):** El archivo `schema.sql` evidencia un dominio adecuado de SQL para este nivel. La implementación de llaves foráneas (`references productos(id) on delete set null`) y restricciones `CHECK` (ej. `stock >= 0`) protege la integridad física de los datos.
- **Integración Funcional:** El frontend utiliza Vanilla JS con un manejo correcto de asincronía (`fetch`) para conectarse a la API, logrando un ciclo CRUD completo y demostrable.
- **Validación de Datos (Defensa en Profundidad):** Se valora la inclusión de funciones de validación explícitas en `server.js` (`validateOrder`, `validateProduct`) antes de ejecutar operaciones en la base de datos, aplicando el principio de seguridad de no confiar en la entrada del cliente.

## Aspectos a Mejorar / Recomendaciones de Escalabilidad
- **Arquitectura del Backend (Modularidad):** El archivo `server.js` concentra actualmente toda la lógica de rutas, validaciones y conexión a la base de datos. Aunque funcional para esta escala, se recomienda investigar patrones como **MVC** (Modelo-Vista-Controlador) o separar las rutas en distintos archivos modulares (ej. `routes/productos.js`, `routes/pedidos.js`) para favorecer la mantenibilidad del código.
- **Manejo de Respuestas de Error en UI:** Aunque el backend valida, es necesario asegurar que el frontend capture e informe de manera amigable todos los códigos HTTP de error (ej. `400 Bad Request` o `500 Internal Server Error`), evitando que la interfaz quede en un estado de espera sin notificar al usuario.

## Desglose por Rúbrica
- Modelado y Persistencia: `25/25`
- Arquitectura de API: `22/25` (Funcional, con oportunidad de modularización futura).
- Frontend y UX: `18/20`
- Integración Full-Stack: `15/15`
- Robustez y Validación: `8/10`
- Orden y Git: `4/5`

*Puntos Extra (+)*: Uso correcto de llaves foráneas en el esquema SQL.

## Resultado Final
- Puntaje: `92/100`
- Nota: `6,4`

## Síntesis Técnica
Existe un progreso técnico innegable en esta entrega. El paso de una maqueta frágil a un sistema web funcional y estructurado demuestra asimilación de los conceptos de la Unidad 2. El código por sí solo ya alcanza una nota muy destacada, lo que evidencia una excelente recuperación técnica en el módulo. El siguiente objetivo técnico sugerido es dominar la arquitectura del código (separación de responsabilidades) para hacer el backend tan ordenado internamente como se visualiza en la interfaz. 
