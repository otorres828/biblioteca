(()=>{var e={278:(e,r,t)=>{e.exports=function(e){var r=t(605),o=t(167);const a={Accept:"application/json","Content-Type":"application/json","Custom-Header":"Custom-Value"},s=new r("COM4",{baudRate:9600}),n=new r.parsers.Readline;s.pipe(n),n.on("data",(r=>{if(r.includes('"Card"')&&r.includes('"UID"')&&r.includes('"iCardCode"')&&r.includes('"iSiteCode"')&&r.includes('"iCode"')){const t=JSON.parse(r).Card;console.log("TARJETA DATOS: "+t),o.get(process.env.URL_API+"/control-acceso/validar-entrada/"+t.iCardCode,{headers:a}).then((function(r){let{estatus:t,cedula:o,nombre:a,carrera:n,tipo:i,avatar:c,error:d}=r.data;"ok"===t?s.write("ok\n"):s.write("rj\n");const l={estatus:t,cedula:o,nombre:a,carrera:n,tipo:i,avatar:c,error:d};e.emit("mensaje_entrada",l)})).catch((e=>{console.error("Error al obtener al intentar valiar la tarjeta")}))}}))}},429:(e,r,t)=>{e.exports=function(e){var r=t(605),o=t(167);const a={Accept:"application/json","Content-Type":"application/json","Custom-Header":"Custom-Value"},s=new r("COM3",{baudRate:9600}),n=new r.parsers.Readline;s.pipe(n),n.on("data",(r=>{if(r.includes('"Card"')&&r.includes('"UID"')&&r.includes('"iCardCode"')&&r.includes('"iSiteCode"')&&r.includes('"iCode"')){const t=JSON.parse(r).Card;console.log("TARJETA DATOS: "+t),o.get(process.env.URL_API+"/control-acceso/validar-salida/"+t.iCardCode,{headers:a}).then((function(r){let{estatus:t,cedula:o,nombre:a,carrera:n,tipo:i,avatar:c,error:d}=r.data;"ok"===t?s.write("ok\n"):s.write("rj\n");const l={estatus:t,cedula:o,nombre:a,carrera:n,tipo:i,avatar:c,error:d};e.emit("mensaje_salida",l)})).catch((e=>{console.error("Error al obtener al intentar valiar la tarjeta")}))}}))}},138:(e,r,t)=>{const o=t(860),a=t(582),s=t(685),n=t(77);let i=o(),c=s.createServer(i);const d=t(952)(c,{cors:{origin:"*",methods:["GET","POST"]}});i.io=d,d.on("connection",(()=>{console.log("Conexion al socket exitosa")})),i.use(a()),i.use(o.urlencoded({extended:!1})),i.use(o.json()),t(429)(d),t(278)(d);const l=process.env.PORT||3e3;c.listen(l,"0.0.0.0",(()=>{console.log(`Servidor corriendo en el puerto ${l}`)})),i.get("/",((e,r)=>{const t=n.address();r.send(t)})),e.exports=i},167:e=>{"use strict";e.exports=require("axios")},582:e=>{"use strict";e.exports=require("cors")},860:e=>{"use strict";e.exports=require("express")},77:e=>{"use strict";e.exports=require("ip")},605:e=>{"use strict";e.exports=require("serialport")},952:e=>{"use strict";e.exports=require("socket.io")},685:e=>{"use strict";e.exports=require("http")}},r={};!function t(o){var a=r[o];if(void 0!==a)return a.exports;var s=r[o]={exports:{}};return e[o](s,s.exports,t),s.exports}(138)})();