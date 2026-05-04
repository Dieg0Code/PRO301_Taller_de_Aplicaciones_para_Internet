# Modelo de negocio - Ink Pulse Studio

Este modelo complementa el CSV simple de reservas. Está pensado para mostrar una versión más realista de inteligencia de negocio en Power BI.

## Tablas

- `solicitudes.csv`: todos los leads que entran por el formulario o canales digitales.
- `clientes.csv`: datos básicos de clientes y si son recurrentes.
- `artistas.csv`: artistas, especialidad, tarifa estimada, horas disponibles y comisión.
- `campanas.csv`: canales o campañas que originan solicitudes.
- `reservas.csv`: solicitudes confirmadas, monto final, abono y saldo por cobrar.
- `sesiones.csv`: agenda real, duración y estado de la sesión.
- `pagos.csv`: pagos recibidos, separados entre abono y saldo final.
- `costos.csv`: costos estimados por reserva y ganancia estimada.
- `feedback.csv`: satisfacción posterior a sesiones realizadas.

## Relaciones sugeridas en Power BI

- `clientes[cliente_id]` -> `solicitudes[cliente_id]`
- `clientes[cliente_id]` -> `reservas[cliente_id]`
- `artistas[artista_id]` -> `solicitudes[artista_id]`
- `artistas[artista_id]` -> `reservas[artista_id]`
- `artistas[artista_id]` -> `sesiones[artista_id]`
- `campanas[campana_id]` -> `solicitudes[campana_id]`
- `solicitudes[solicitud_id]` -> `reservas[solicitud_id]`
- `reservas[reserva_id]` -> `sesiones[reserva_id]`
- `reservas[reserva_id]` -> `pagos[reserva_id]`
- `reservas[reserva_id]` -> `costos[reserva_id]`
- `reservas[reserva_id]` -> `feedback[reserva_id]`

## Preguntas que permite responder

- Qué canal trae más solicitudes y cuál trae más reservas reales.
- Cuánto demora el estudio en responder y si eso afecta la conversión.
- Qué artista vende más y qué artista deja más ganancia.
- Cuánto dinero entra como abono y cuánto queda por cobrar.
- Cuánto cuestan realmente las reservas después de comisión, insumos y costos fijos.
- Qué estilos o tamaños dejan más ganancia.
- Qué porcentaje de clientes recomienda el estudio.
- Dónde se pierden reservas: falta de contacto, cancelación, reagenda o no asistencia.

## Lectura para estudiantes

La idea principal: una landing con formulario no termina cuando guarda datos. Si el negocio registra bien sus datos, puede saber qué vender, dónde invertir, qué artista está más ocupado, cuánto dinero entra y qué clientes podrían volver.
