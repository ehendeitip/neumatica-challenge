# Neumática ITIP

Actividad práctica guiada para grado 9° del Colegio ITIP.

## Retos y puntaje
- Cinco retos de observación: **4 puntos cada uno** (20 puntos).
- Lectura de gráfica de señales: **10 puntos**.
- Control con realimentación visual: **10 puntos**.
- Comparación entre lazo abierto y realimentación con operador: **10 puntos**.
- Réplica del circuito de referencia: **20 puntos**.
- Implementación manual del circuito secuencial A+ → B+ → B− → A−: **30 puntos**.

**Puntaje máximo total: 100 puntos.**

## Panel docente
En la pantalla de inicio, pulsa **Modo docente** y luego **Ver resultados**. No hace falta escribir una clave.

Los resultados se guardan en el almacenamiento local del navegador/dispositivo donde se realizaron las actividades; no se comparten automáticamente entre equipos. La clave que estaba en la versión anterior era del lado del cliente y no proporcionaba protección real, por lo que se simplificó el acceso al panel.

## Circuito secuencial final
El estudiante debe montar la alimentación, dos cilindros de doble efecto (A y B) y válvulas distribuidoras disponibles en Picuino. Debe operar las válvulas manualmente para lograr la secuencia A+ → B+ → B− → A−. No se requiere automatización: el simulador utilizado no dispone de finales de carrera para generar automáticamente los cambios de etapa. El puntaje usa una lista de autoevaluación que debe revisar el docente.

## Uso
1. Abre la actividad publicada en GitHub Pages.
2. Ingresa nombre y código de clase (`ITIP9A`, `ITIP9B` o `ITIP9C`).
3. Lee la gráfica y realiza los retos en Picuino; para montajes, marca únicamente los criterios verificados.
4. Para consultar resultados, usa **Modo docente → Ver resultados**.

## Límites
La página no puede detectar automáticamente lo que ocurre dentro del simulador externo. Los montajes se califican mediante autoevaluación y no sustituyen la revisión docente. Los resultados se guardan en `localStorage` del dispositivo y navegador actuales; no se sincronizan entre equipos.
