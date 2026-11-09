# Neumática ITIP

Actividad práctica guiada para grado 9° del Colegio ITIP.

## Retos
- Preguntas de observación sobre Picuino.
- Lectura de gráfica de dos señales en un ciclo secuencial: A+ → B+ → B− → A−.
- Control con realimentación visual y comparación con lazo abierto.
- Réplica de un circuito desde una imagen.
- Reto final: montaje de un circuito secuencial con dos cilindros de doble efecto, ejecutado manualmente en el orden A+ → B+ → B− → A−.
- Modo docente (`DOCENTE9`), resultados y exportación CSV.
- Puntaje total máximo: 130 puntos.

## Circuito secuencial final
El estudiante debe montar la alimentación, dos cilindros de doble efecto (A y B) y válvulas distribuidoras disponibles en Picuino. Debe operar las válvulas manualmente para lograr la secuencia A+ → B+ → B− → A− y contrastarla con `images/secuencia-senales.svg`. Esta consigna no exige automatización: el simulador usado en la actividad no dispone de finales de carrera para generar automáticamente los cambios de etapa. El puntaje del montaje usa una lista de autoevaluación y debe ser revisado por el docente.

## Uso
1. Abre la actividad publicada en GitHub Pages.
2. Ingresa nombre y código de clase (`ITIP9A`, `ITIP9B` o `ITIP9C`).
3. Lee la gráfica y realiza los retos en Picuino; para montajes, marca únicamente los criterios verificados.
4. Para resultados, entra en **Modo docente** con la clave `DOCENTE9`.

## Límites
La página no puede detectar automáticamente lo que ocurre dentro del simulador externo. Los montajes se califican mediante autoevaluación y no sustituyen la revisión docente. Los resultados se guardan en `localStorage` del dispositivo y navegador actuales; no se sincronizan entre equipos.
