# Neumática ITIP

Actividad práctica guiada para grado 9° del Colegio ITIP.

## Contenido
- Acceso de estudiante con código de clase: `ITIP9A`, `ITIP9B` o `ITIP9C`.
- Cinco preguntas de observación sobre el simulador Picuino.
- Dos retos de montaje de sistemas de control en lazo cerrado, con lista de criterios de autoevaluación.
- Un reto para replicar un circuito a partir de un diagrama de referencia incluido en `images/circuito-referencia.svg`.
- Puntaje automático de hasta 95 puntos; cada reto práctico concede puntaje parcial por los criterios marcados.
- Panel docente (`DOCENTE9`), vista de resultados y exportación CSV.

## Uso
1. Abre la actividad publicada en GitHub Pages.
2. Ingresa nombre y código de clase.
3. En los retos de montaje, construye y prueba el sistema en Picuino; después marca únicamente los criterios que verificaste.
4. En el reto de réplica, sigue el diagrama de referencia, construye el circuito equivalente y pruébalo.
5. En modo docente, los resultados se consultan en el mismo navegador desde el que se guardaron y se pueden exportar como CSV.

## Cambiar por una imagen de referencia del docente
El reto de réplica usa ahora un diagrama de ejemplo. Para utilizar una imagen particular, añade el archivo al repositorio (por ejemplo, `images/referencia-clase.png`) y cambia la propiedad `image` del reto de tipo `replica` en `app.js` por esa ruta. También se puede reemplazar el SVG incluido.

## Límites
La actividad no puede inspeccionar directamente las acciones de Picuino porque el simulador se carga desde otro dominio. Los retos de montaje se evalúan mediante una lista de verificación que marca el estudiante; no es una verificación automática del circuito. Los resultados se almacenan en `localStorage` del dispositivo y navegador actuales, no se sincronizan entre equipos.
