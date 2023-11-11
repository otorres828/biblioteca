# SISTEMA DE CONTROL DE ACCESO A BIBLIOTECA 📚
  _aplicacion web, basada en un sistema de control de acceso a Biblioteca de la UCAB-Gy_
## Construido con 🛠️
  **Backend - lectores**
* [Node Js v16](https://nodejs.org/es/blog/release/v16.16.0)


## Comenzando 🚀

  
_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

### Pre-requisitos 📋

_Que cosas necesitas para instalar el software y como instalarlas (backend)_ 

* [Node Js v16](https://nodejs.org/es/blog/release/v16.16.0)



### Comenzando
1. Si no lo tienes, clona el repositorio en la raiz.
2. Accede a la carpeta lectores
3. Configura tus variables de entorno
Ve al archivo .env.copy ubicado dentro de la carpeta **lectores/src** haz una copia del archivo **env.copy** y cambiale el nombre a **.env** Luego podras modificar las variables de entorno
```
PORT="6060"                      #PUERTO DONDE SE EJECUTA EL SERVIDOR
LECTOR_ENTRADA="COM3"            #PUERTO DE ENTRADA
LECTOR_SALIDA="COM4"             #PUERTO DE SALIDA
LECTOR_PRUEBA=""                 #PUERTO DE PRUEBA
URL_API="http://127.0.0.1:5050"  #URL DEL BACKEND

```
Asegurate de colocar en el **LECTOR_ENTRADA** y **LECTOR_SALIDA** los puertos que se esten usando, si colocas un puerto errado, el sistema podrai dar error. Te recomendamos solo usar la variable que configura el puerto del lector que vas a usar.

4. Ve al archivo **lectores/src/index.js** y descomenta el archivo que controla los lectores, estos archivos son
```
// require('./controllers/pruebas.js')(io);
// require('./controllers/serial_entrada.js')(io);
// require('./controllers/serial_salida.js')(io);
```
Descomenta solo el que usaras. En caso de que quieras hacer pruebas para visualizar que es lo que te esta devolviendo el lector, puedes descomentar el archivo de pruebas.js y confifurar su variable de entorno con el puerto que coincida con tu lector.

5. Ejecuta los siguientes comandos

```
npm install
npm start
```
6. Listo, con esto tus lectores estara funcionando.