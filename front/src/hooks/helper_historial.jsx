import React from 'react';

function formatoFecha(fecha) {
  const fechaObj = new Date(fecha);
  const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const fechaFormateada = fechaObj.toLocaleDateString('es-ES', opciones).replace('/', '-').replace('/', '-');
  const horaFormateada = fechaObj.toLocaleTimeString('es-ES', { hour12: true });
  return `${fechaFormateada} - ${horaFormateada}`;
}

export default formatoFecha;
