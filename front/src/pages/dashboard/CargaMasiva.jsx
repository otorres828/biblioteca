import {
  Card,
  CardBody,
 } from "@material-tailwind/react";
 import React, { useState } from "react";
 import { ExcelRenderer } from 'react-excel-renderer';
 import excel from "./../../storage/usuarios.xlsx"
import { useSnackbar } from "notistack";
import axios from './../../api/axios'

function CargaMasiva() {
  const { enqueueSnackbar } = useSnackbar();
  const [enviar,setEnviar] = useState(0);
  const [rows,setRows] = useState([]);
  const inputRef = React.useRef();

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Custom-Header": "Custom-Value"
  };

  const fileHandler = (event) => {
    let fileObj = event.target.files[0];
 
    ExcelRenderer(fileObj, (err, resp) => {
      if(err){
        console.log(err);           
      }
      else{
        if(resp.rows.length>=3){
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

             //validamos campos vacios
             rows = rows.filter(row => {
              return row[3] !== "" && row[4] !== "" && row[5] !== "" && row[6] !== "" && row[7] !== "";
             });

             console.log(rows)
             setRows(rows);
             enqueueSnackbar("Se precargo el archivo correctamente. Oprima enviar.", { variant: "success" });
             setEnviar(1)
          } else {
            inputRef.current.value = '';
            setEnviar(0)
            enqueueSnackbar("Cabeceras del archivo no coinciden, no modifique las cabeceras.", { variant: "warning" });
          }
        }else{
          inputRef.current.value = '';
          setEnviar(0)
          enqueueSnackbar("Debe de llenar el archivo correctamente.", { variant: "warning" });    
        }               
      }
    });              
  }
 
  const enviar_archivo=()=>{
    axios.post('carga-masiva', { registros:rows }, {headers})
    .then((response) => {
        if (response.data.mensaje) {
          enqueueSnackbar(response.data.mensaje, { variant: "success" });
        } else {
          enqueueSnackbar(response.data.error, { variant: "warning" });
        }
      }).catch((response)=>{
        enqueueSnackbar('Error al cargar el archivo', { variant: "warning" });        
      })
      inputRef.current.value = '';
      setEnviar(0)
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
        <br />
        {enviar!==0 ?
              <button onClick={()=>{enviar_archivo()}} className="appearance-none block p-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-800 px-4 my-9 leading-tight focus:outline-none">Enviar Archivo</button> :''
        }
        </CardBody>
      </Card>
    </div>
  );
}
 
 export default CargaMasiva;
 