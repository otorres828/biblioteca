import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import React from 'react'

function CargaMasiva() {
  return (
    <div className="mt-12 mx-3 md:mx-8 mb-8 flex flex-col gap-12">
    <Card>
      <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
        <Typography variant="h6" color="white">
          Carga Masiva
        </Typography>
      </CardHeader>
      <CardBody className="px-0 pt-0 pb-2">

        <button className="mx-8 appearance-none block p-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-800 px-4 mb-3 leading-tight focus:outline-none">Cargar Archivo</button>
      
     
      </CardBody>
    </Card>

  </div>
    )
}

export default CargaMasiva