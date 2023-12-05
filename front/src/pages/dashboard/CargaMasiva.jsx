import {
  Card,
  CardBody,
 } from "@material-tailwind/react";
 import React, { useState } from "react";
 import { ExcelRenderer } from 'react-excel-renderer';
 import excel from "./../../storage/usuarios.xlsx"
import { useSnackbar } from "notistack";

 function CargaMasiva() {
  const { enqueueSnackbar } = useSnackbar();
  const [enviar,setEnviar] = useState(0);
  const inputRef = React.useRef();

  const fileHandler = (event) => {
    let fileObj = event.target.files[0];
 
    ExcelRenderer(fileObj, (err, resp) => {
      if(err){
        console.log(err);           
      }
      else{
        let cabecera = resp.rows[0];
        let campos = resp.rows[1];
        
        if (cabecera[0] === "Plantilla carga masiva de usuarios" && 
           campos.includes("iCardCode") && 
           campos.includes("iSiteCode") && 
           campos.includes("codeCarnet") && 
           campos.includes("cedula") && 
           campos.includes("nombres") && 
           campos.includes("apellidos") && 
           campos.includes("correo") && 
           campos.includes("rol") && 
           campos.includes("escuela") && 
           campos.includes("foto")) {

           // Las validaciones pasaron, sacamos del array las cabeceras
           resp.rows.splice(0, 2);
           let rows = resp.rows.filter(row => row.length > 0);
           enqueueSnackbar("Archivo precargado. Oprima enviar.", { variant: "success" });
           setEnviar(1)
        } else {
          inputRef.current.value = '';
          setEnviar(0)
          enqueueSnackbar("Cabeceras del archivo no coinciden, no modifique las cabeceras.", { variant: "warning" });
        }
                
      }
    });              
  }
 
  function noEsVacio(item) {
    return item !== "";
  }
  
  return (
    <div className="mx-3 mb-8 mt-12 flex flex-col gap-12 md:mx-8">
      <Card>
        <div className="div-alert alert-info-masive p-6">
          Para registrar usuarios de biblioteca de manera masiva, debe descargar
          la siguiente{" "}
          <a
            href={excel}
            download
            class="text-warning"
          >
            {" "}
            plantilla requerida <i class="fa fa-download"></i>{" "}
          </a>{" "}
          , <b>sólo se admite la anterior plantilla</b>
          para la carga masiva, si sube algún otro Excel, el sistema omitirá el
          proceso.
          Por favor <b>no altere las cabeceras</b> del archivo plantilla.
          <br />
        </div>
        <CardBody className="p-6">
        <input type="file" accept=".xls,.xlsx" onChange={fileHandler} ref={inputRef} />
        {enviar && 
        <button>
          Enviar Archivo
        </button>
        }
        </CardBody>
      </Card>
    </div>
  );
 }
 
 export default CargaMasiva;
 