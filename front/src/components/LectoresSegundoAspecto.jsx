import React, { useState } from 'react'
import LectorEntradaSA from './LectorEntradaSA';
import LectorSalidaSA from './LectorSalidaSA';

function LectoresSegundoAspecto() {

  const [ingresos, setIngresos] = useState(null);
  const [salidas, setSalidas] = useState(null);
  const token_biblioteca = localStorage.getItem("token_biblioteca");
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Custom-Header": "Custom-Value",
    "Authorization": `Bearer ${token_biblioteca}`
  };

  return (
    <>
      <div className="lg:flex lg:justify-between mx-4 mb-24 mt-10"> 
          <LectorEntradaSA ingresos={ingresos} setIngresos={setIngresos} headers={headers}/>
          <div className='md:mx-5'></div>
          <LectorSalidaSA salidas={salidas} setSalidas={setSalidas} headers={headers}/>
      </div>
    </>
  );
}

export default LectoresSegundoAspecto;
