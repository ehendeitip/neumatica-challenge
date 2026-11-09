# Neumática ITIP

Actividad práctica guiada para grado 9° del Colegio ITIP.

## Retos
- Cinco preguntas de observación sobre Picuino.
- Un montaje de control en lazo cerrado con realimentación visual del estudiante.
- Comparación entre lazo abierto y lazo cerrado con operador.
- Réplica de circuito a partir de una imagen de referencia.
- Puntaje de hasta 95 puntos, con criterios de autoevaluación para los montajes.
- Modo docente (`DOCENTE9`), resultados y exportación CSV.

## Aclaración sobre el lazo cerrado
El simulador utilizado no ofrece finales de carrera en esta actividad. Para que el reto se pueda realizar con los recursos disponibles, se plantea un lazo cerrado **con operador humano**: el estudiante observa la posición real del cilindro, la compara con la posición deseada y acciona la válvula para corregirla. En este modelo, la vista del estudiante funciona como sensor y el estudiante como controlador. No es un control automático con sensor electrónico.

## Uso
1. Abre la actividad publicada en GitHub Pages.
2. Ingresa nombre y código de clase (`ITIP9A`, `ITIP9B` o `ITIP9C`).
3. En los retos de montaje, arma y prueba el circuito en Picuino; marca solo los criterios que verificaste.
4. Para resultados, entra en **Modo docente** con la clave `DOCENTE9`.

## Diagrama de réplica
El reto usa `images/circuito-referencia.svg`. Para asignar un circuito específico del docente, añade la imagen al repositorio y cambia la propiedad `image` del reto de tipo `replica` en `app.js` por la ruta del nuevo archivo.

## Límites
La página no puede detectar automáticamente lo que ocurre dentro del simulador externo. La autoevaluación de montaje no sustituye la revisión docente. Los resultados se guardan en `localStorage` del dispositivo y navegador actuales; no se sincronizan entre equipos.
