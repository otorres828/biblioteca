import React, { useEffect,useState } from 'react'
import axios from './../../api/axios'
import { chartsConfig } from "./../../configs";
import BarChart from './../../widgets/charts/BarChart';

function IngresosCarreraGrafico({fechaInicio,fechaFin,headers}) {
    const [carreras, setCarreras] = useState(null);
    const [ingresosCounts, setIngresosCounts] = useState(null);
      
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

    const ingresos_por_tipo_general = () => {
        axios.post("/panel/ingresos_por_carrera_general",
        {
          fechaInicio: fechaInicio,
          fechaFin: fechaFin,
          },
        { headers: headers })
          .then((response) => {
            const carreras = response.data.carreras;
            const ingresosCounts = response.data.ingresosCounts;
            const updatedChart = { ...websiteViewsChart };
      
            updatedChart.series[0].data = ingresosCounts;
            updatedChart.options.xaxis.categories = carreras;
      
            setWebsiteViewsChart(updatedChart); // actualiza el estado con un nuevo objeto
            setCarreras(response.data.carreras);
            setIngresosCounts(response.data.ingresosCounts);
          })
          .catch(() => {
            console.log("Error: ", 'no se pudo realizar la consulta');
          });
    };
  
    useEffect(()=>{
      ingresos_por_tipo_general()
    },[fechaInicio, fechaFin])

    return (
        <div>
            {carreras && ingresosCounts && 
            <BarChart
              id_chart="ingresos-tipo-carrera"
              nombre_char="Ingresos"
              title='Ingresos por Carrera'
              color='light-blue'
              chart={websiteViewsChart} 
              clases={true}
              orientacion={true}
            />
            }
            
        </div>
    )
}

export default IngresosCarreraGrafico