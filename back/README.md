# SISTEMA DE CONTROL DE ACCESO A BIBLIOTECA 📚
  _aplicacion web, basada en un sistema de control de acceso a Biblioteca de la UCAB-Gy_
## Construido con 🛠️
  **Backend**
* [Node Js v16](https://nodejs.org/es/blog/release/v16.16.0)


## Comenzando 🚀

  
_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

### Pre-requisitos 📋

_Que cosas necesitas para instalar el software y como instalarlas (backend)_ 

* [Node Js v16](https://nodejs.org/es/blog/release/v16.16.0)

* Mysql - Base de Datos


### Preparacion del a Base de Datos (mysql)  🔧
1. Si no lo tienes, clona el repositorio en la raiz.
2. Accede a la carpeta back/config
3. Toma el archivo **biblioteca.sql** e importalo en tu gestor de base de datos
### Instalación de la API (back) 🔧


Una vez clonado el repositorio en tu ambiente local y habiendo hecho el restore de la base de datos. Sigue los siguientes pasos:

1. Configura tus variables de entorno
Ve al archivo .env.copy ubicado dentro de la carpeta **back/src** haz una copia del archivo  **env.copy**  y cambiale el nombre a **.env** Luego podras modificar las variables de entorno
```
PORT="5050"
URL_API="http://127.0.0.1:5050"

DB_USERNAME="root"
DB_PASSWORD=""
DB_DATABASE="biblioteca"
DB_HOST="localhost"
DB_DIALECT="mysql"
DB_TIMEZONE='America/Caracas'
```
Te recomendamos no cambiar la variable DB_TIMEZONE

2. Ejecuta los siguientes comandos

```
npm install
npm start
```
3. Ingresa a tu navegador de preferencia y accede a la ruta donde se esta ejecutando tu backend. ejemplos
```
http://127.0.0.1:5050
```
Esta ruta ejecutara una peticion GET que te mostrara en pantalla el IP de tu computador donde se ejecuta el backend. Con ese ip podras configurar los lectores y los sockets en el front end

Un ejemplo de como se veria la ip de tu backend seria:
_192.168.1.47_  