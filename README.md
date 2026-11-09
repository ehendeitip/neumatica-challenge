# Neumática ITIP

Actividad interactiva guiada para estudiantes de grado 9° del Colegio ITIP.

## Qué incluye
- Ingreso con nombre y código de clase (`ITIP9A`, `ITIP9B`, `ITIP9C`).
- Simulador de neumática de Picuino integrado y enlace para abrirlo en otra pestaña.
- Cinco retos prácticos: el estudiante realiza una prueba en el simulador, confirma que la hizo y responde una pregunta sobre la observación o el circuito.
- Puntaje de hasta 50 puntos y explicaciones para las respuestas.
- Progreso básico guardado en el navegador mediante `localStorage`.
- Modo docente con clave `DOCENTE9`, que permite ver resultados y exportarlos en CSV.

## Cómo usarlo
1. Abre la app en GitHub Pages.
2. Ingresa nombre y código de clase.
3. Realiza la acción indicada en el simulador de Picuino.
4. Pulsa **Ya realicé la prueba** y contesta según lo que observaste.
5. Continúa hasta ver el puntaje final.
6. Para ver resultados del docente: En la pantalla de ingreso, usa **Modo docente** y escribe la clave `DOCENTE9`.

## Límite de integración
Picuino se carga desde otro dominio y esta página no puede detectar directamente las acciones realizadas dentro de su simulador. Por eso, el estudiante confirma cada prueba y responde preguntas vinculadas con la acción y la observación; las respuestas y el puntaje sí se procesan aquí. Los puntajes guardados en `localStorage` solo quedan en ese navegador/dispositivo; no se envían automáticamente al docente.

## Archivos
- `index.html`
- `styles.css`
- `app.js`
