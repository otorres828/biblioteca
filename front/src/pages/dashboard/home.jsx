import React, { useEffect, useState } from "react";
import LectoresPrimerAspecto from "./../../components/LectoresPrimerAspecto";
import { Switch } from "@material-tailwind/react";
import LectoresSegundoAspecto from "./../../components/LectoresSegundoAspecto";

export function Home() {
  const token_biblioteca = localStorage.getItem("token_biblioteca");

  const [cambiar, setCambiar] = useState(localStorage.getItem('cambiar') !== null);

  function cambiarAspecto() {
    // Invertimos el valor de 'cambiar'.
    setCambiar(prevCambiar => !prevCambiar);
    // Si 'cambiar' es true, entonces borramos el token del localStorage.
    // Si 'cambiar' es false, entonces agregamos el token al localStorage.
    if (cambiar) {
      localStorage.removeItem('cambiar');
    } else {
      localStorage.setItem('cambiar', true);
    }
  
  }
  
  return (
    <>
    <div className="mb-10">
        <div className='flex justify-center'>
              <h5 className='mr-5'>
              Cambiar Aspecto
              </h5>
              { <Switch
                    id="control-acceso"
                    value={cambiar} // El valor del switch es controlado por el estado 'cambiar'
                    onChange={()=>{cambiarAspecto()}} // Al hacer click, se invierte el valor de 'cambiar'
                    defaultChecked={cambiar}
                  />}
        </div>
        { cambiar ? 
          <LectoresSegundoAspecto token_biblioteca={token_biblioteca}/>
          :        
          <LectoresPrimerAspecto token_biblioteca={token_biblioteca}/> 
        }
    </div>
    </>
  );
}
export default Home;