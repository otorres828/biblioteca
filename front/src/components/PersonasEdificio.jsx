import axios from './../api/axios'
import React, { useEffect, useState } from 'react'
import { Typography } from '@material-tailwind/react';
import { chartsConfig } from "./../configs";

import { Tooltip } from '@mui/material';
import BarChart from './../widgets/charts/BarChart';
import ListadoPersonasEdificio from './ListadoPersonasEdificio';

function PersonasEdificio({ingresos,salidas,headers}) {

    const [usuarios, setUsuarios] = useState(null); //estudiantes + profesores + administraivo
    const [empleados, setEmpleados] = useState(null);
    const [visitantes, setVisitantes] = useState(null);
    const [personas, setPersonas] = useState(null);
    const [horas, setHoras] = useState(null);
    const [ingresosCounts, setIngresosCounts] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      if(visitantes!==null && empleados!==null && usuarios!==null && (visitantes>0  || empleados>0  || usuarios>0) )
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [websiteViewsChart, setWebsiteViewsChart] = useState({
        type: "bar",
        height: 220,
        series: [
          {
            name: "Ingresos",
            data: [],
          },
        ],
        options: {
          ...chartsConfig,
          colors: "#fff",
          plotOptions: {
            bar: {
              columnWidth: "16%",
              borderRadius: 5,
            },
          },
          xaxis: {
            ...chartsConfig.xaxis,
            categories: [],
          },
        },
    });
      
    const estadisticas_ingreso_hora = () => {
        axios.get("/control-acceso/estadisticas_ingreso_hora", { headers: headers })
          .then((response) => {
            const hora = response.data.hora;
            const ingresosCounts = response.data.ingresosCounts;
            const updatedChart = { ...websiteViewsChart };
      
            updatedChart.series[0].data = ingresosCounts;
            updatedChart.options.xaxis.categories = hora;
      
            setWebsiteViewsChart(updatedChart); // actualiza el estado con un nuevo objeto
            setHoras(response.data.hora);
            setIngresosCounts(response.data.ingresosCounts);
          })
          .catch((error) => {
            console.log("Error: ", 'error');
          });
    };


    const obtener_datos = () => {
        axios.get("/personas_edificio", { headers: headers })
          .then((response) => {
            setUsuarios(response.data.Usuarios);
            setEmpleados(response.data.Empleados);
            setVisitantes(response.data.Visitantes);
            setPersonas(response.data.Personas);
          })
          .catch((error) => {
            console.log('error');
          });
    };

    useEffect(()=>{
        obtener_datos()
        estadisticas_ingreso_hora()
    },[ingresos,salidas])

  return (
    <>
      <div className="w-full md:p-1 lg:w-1/3 mb-24">
        <Tooltip
          title="Haz clic para ver las personas que estan dentro del edificio"
          placement="top"
        >
          <div
            className="flex h-80 cursor-pointer flex-col p-8"
            onClick={handleOpen}
          >
            <h1 className="mb-2 text-center text-3xl">
              Personas en el Edificio
            </h1>
            <div className="my-1 flex justify-between">
              <Typography className="text-2xl">Usuarios:</Typography>
              <Typography className="ml-1 text-2xl">
                {usuarios !== null ? usuarios : "cargando.."}
              </Typography>
            </div>
            <div className="my-1 flex justify-between">
              <Typography className="text-2xl">Empleados:</Typography>
              <Typography className="ml-1 text-2xl">
                {empleados !== null ? empleados : "cargando.."}
              </Typography>
            </div>
            <div className="my-1 flex justify-between">
              <Typography className="text-2xl">Visitantes:</Typography>
              <Typography className="ml-1 text-2xl">
                {visitantes !== null ? visitantes : "cargando.."}
              </Typography>
            </div>
            <div className="mt-1 flex justify-between">
              <Typography className="text-2xl">Total:</Typography>
              <Typography className="ml-1 text-2xl">
                {visitantes !== null && empleados !== null && usuarios !== null
                  ? visitantes + empleados + usuarios
                  : "cargando.."}
              </Typography>
            </div>
          </div>
        </Tooltip>

        {/* GRAFICO */}
        <div className={`flex h-60 w-full flex-col`}>
          {horas && ingresosCounts && (
            <BarChart
              id_chart="ingresos-en-rango-hora"
              nombre_char="Ingresos"
              title="Ingresos por hora"
              color="gray"
              chart={websiteViewsChart}
              clases={true}
            />
          )}
        </div>
      </div>
      {open && (
        <ListadoPersonasEdificio
          open={open}
          personas={personas}
          handleClose={handleClose}
        />
      )}
    </>
  );
}

export default PersonasEdificio