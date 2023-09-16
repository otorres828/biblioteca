import React, { useState } from 'react'
import LectorSalida from './LectorSalida';
import LectorEntrada from './LectorEntrada';
import PersonasEdificio from './PersonasEdificio';

function LectoresPrimerAspecto() {

  const [ingresos, setIngresos] = useState(null);
  const [salidas, setSalidas] = useState(null);
  const [forzar, setForzar] = useState(0);  //para forzar salida
  const token_biblioteca = localStorage.getItem("token_biblioteca");

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Custom-Header": "Custom-Value",
    "Authorization": `Bearer ${token_biblioteca}`
  };

  return (
    <>
      <div className="lg:flex lg:justify-between mx-0 md:mx-6"> 
          <LectorEntrada ingresos={ingresos} setIngresos={setIngresos} />
          <PersonasEdificio ingresos={ingresos} salidas={salidas} setForzar={setForzar} headers={headers} />
          <LectorSalida salidas={salidas} setSalidas={setSalidas} forzar={forzar}/>
      </div>
    </>
  );
}

export default LectoresPrimerAspecto;
