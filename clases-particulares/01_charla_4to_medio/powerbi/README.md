# Power BI - Ink Pulse Studio

Archivo principal:

```text
ink_pulse_studio.pbip
```

Este proyecto usa el CSV de reservas de la charla:

```text
..\datos\reservas_ink_pulse_studio.csv
```

## Páginas del dashboard

### Command Center

- Reservas totales.
- Reservas confirmadas.
- Porcentaje de conversión.
- Ventas posibles.
- Valor promedio por reserva.
- Abonos pagados.
- Demanda diaria.
- Ventas posibles por artista.
- Filtros por artista, estado y fuente.
- Oportunidades de alto valor.

### Flujo de dinero

- Ventas posibles.
- Ventas confirmadas.
- Abonos pagados.
- Dinero que falta cobrar.
- Porcentaje pagado por adelantado.
- De dónde llegan las ventas.
- Abonos por artista.
- Lectura rápida del negocio.

### Resumen de ventas

- Cuánto generó el negocio en junio 2026.
- Ganancia mensual estimada.
- Estimación anual de ventas.
- Estimación anual de ganancia.
- Ganancia usada como supuesto.
- Ranking de artistas por ventas del mes.
- Ventas del mes por artista.
- Ventas confirmadas por estado.

La ganancia es un supuesto simple: de cada `$100` vendidos, quedan `$40` de ganancia antes de impuestos. El CSV no trae costos reales de tinta, agujas, arriendo, publicidad, comisiones ni impuestos.

### Canales y conversión

- Solicitudes recibidas.
- Reservas confirmadas.
- Conversión.
- Tiempo promedio de respuesta.
- Ventas posibles.
- Solicitudes por fuente.
- Reservas confirmadas por campaña.

### Rentabilidad

- Ventas confirmadas.
- Costos estimados.
- Ganancia estimada.
- Margen real estimado.
- Pagos recibidos.
- Ganancia por artista.
- Costos principales.

### Operación y agenda

- Sesiones agendadas.
- Sesiones realizadas.
- Horas agendadas.
- Asistencia.
- Horas por artista.
- Estado de sesiones.

### Clientes y satisfacción

- Solicitudes/clientes.
- Feedbacks recibidos.
- Nota promedio.
- Porcentaje de clientes que recomendarían.
- Clientes por comuna.
- Recomendación.

## Notas

- Si Power BI muestra aviso de origen de datos, confirmar el archivo CSV local.
- Si el CSV cambia, abrir el `.pbip` y usar `Actualizar`.
- Si se necesita rearmar los visuales base, ejecutar:

```powershell
node clases-particulares\01_charla_4to_medio\powerbi\aplicar_dashboard_base.js
```

Para aplicar el modelo de negocio completo y las hojas nuevas:

```powershell
node clases-particulares\01_charla_4to_medio\powerbi\actualizar_modelo_negocio_powerbi.js
```

## Supuestos del dataset

El CSV simula `1000` solicitudes de reserva, no `1000` tatuajes hechos. Solo las reservas confirmadas ocupan agenda.

Reglas usadas:

- Cada artista trabaja con una capacidad diaria aproximada de `6` a `7` horas de tatuaje.
- La agenda se programa de martes a sábado.
- Los precios cambian según tamaño, duración, zona del cuerpo, estilo, color y artista.
- Rangos usados: tatuajes pequeños desde `$40.000`, medianos desde `$85.000`, grandes desde `$180.000` y sesiones largas hasta aprox. `$450.000`.
- El abono es un pago adelantado para asegurar la reserva.
