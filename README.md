# Neumática ITIP

Actividad práctica guiada para grado 9° del Colegio ITIP.

## Retos
- Preguntas de observación sobre Picuino.
- Reto de lectura de gráfica de dos señales en un ciclo secuencial; el estudiante identifica el orden A+ → B+ → B− → A−.
- Montaje de control con realimentación visual y comparación entre lazo abierto y realimentación con operador.
- Réplica de circuito a partir de una imagen de referencia.
- Modo docente (`DOCENTE9`), resultados y exportación CSV.

## Gráfica de señales
El reto utiliza `images/secuencia-senales.svg`. Las señales representan la posición de dos cilindros a lo largo del tiempo: nivel 1 indica extendido y nivel 0 retraído. Se leen de izquierda a derecha para deducir la secuencia.

## Aclaración sobre la realimentación
El simulador utilizado no ofrece finales de carrera en esta actividad. El reto de control se plantea como realimentación visual con operador: el estudiante observa la posición real, la compara con el objetivo y corrige la orden. No es un control automático con sensor electrónico.

## Uso
1. Abre la actividad publicada en GitHub Pages.
2. Ingresa nombre y código de clase (`ITIP9A`, `ITIP9B` o `ITIP9C`).
3. Lee la gráfica de señales, realiza las pruebas y responde los retos.
4. Para resultados, entra en **Modo docente** con la clave `DOCENTE9`.

## Límites
La página no puede detectar automáticamente lo que ocurre dentro del simulador externo. La autoevaluación de montaje no sustituye la revisión docente. Los resultados se guardan en `localStorage` del dispositivo y navegador actuales; no se sincronizan entre equipos.
