# Neumática ITIP

Actividad práctica guiada para grado 9° del Colegio ITIP.

## Retos y puntaje
- Cinco retos de observación: **4 puntos cada uno** (20 puntos).
- Lectura de gráfica de señales: **10 puntos**.
- Control con realimentación visual: **10 puntos**.
- Comparación entre lazo abierto y realimentación con operador: **10 puntos**.
- Réplica del circuito de referencia: **20 puntos**.
- Implementación manual del circuito secuencial A+ → B+ → B− → A−: **30 puntos**.

**Puntaje máximo total: 100 puntos.** Los montajes otorgan puntaje parcial según los criterios marcados. La suma de los valores asignados es 100.

## Circuito secuencial final
El estudiante debe montar la alimentación, dos cilindros de doble efecto (A y B) y válvulas distribuidoras disponibles en Picuino. Debe operar las válvulas manualmente para lograr la secuencia A+ → B+ → B− → A−. Esta consigna no exige automatización: el simulador usado en la actividad no dispone de finales de carrera para generar automáticamente los cambios de etapa. El puntaje del montaje usa una lista de autoevaluación y debe ser revisado por el docente.

## Uso
1. Abre la actividad publicada en GitHub Pages.
2. Ingresa nombre y código de clase (`ITIP9A`, `ITIP9B` o `ITIP9C`).
3. Lee la gráfica y realiza los retos en Picuino; para montajes, marca únicamente los criterios verificados.
4. Para resultados, entra en **Modo docente** con la clave `DOCENTE9`.

## Límites
La página no puede detectar automáticamente lo que ocurre dentro del simulador externo. Los montajes se califican mediante autoevaluación y no sustituyen la revisión docente. Los resultados se guardan en `localStorage` del dispositivo y navegador actuales; no se sincronizan entre equipos.
