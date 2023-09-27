import React, { useEffect,useState } from 'react'
import axios from './../../api/axios'
import { chartsConfig } from "./../../configs";
import BarChart from './../../widgets/charts/BarChart';

function IngresosTipoUsuarioGrafico({fechaInicio,fechaFin,headers}) {
    const [tipos, setTipos] = useState(null);
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
        axios.post("/panel/ingresos_por_tipo_general",
        {
          fechaInicio: fechaInicio,
          fechaFin: fechaFin,
          },
        { headers: headers })
          .then((response) => {
            const tipos = response.data.tipos;
            const ingresosCounts = response.data.ingresosCounts;
            const updatedChart = { ...websiteViewsChart };
      
            updatedChart.series[0].data = ingresosCounts;
            updatedChart.options.xaxis.categories = tipos;
      
            setWebsiteViewsChart(updatedChart); // actualiza el estado con un nuevo objeto
            setTipos(response.data.tipos);
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
            {tipos && ingresosCounts && 
            <BarChart
              id_chart="ingresos-tipo-usuario"
              nombre_char="Ingresos"
              title='Ingresos por Tipo de Usuario'
              color='pink'
              chart={websiteViewsChart} 
              clases={true}
              orientacion={true}
            />
            }
            
        </div>
    )
}

export default IngresosTipoUsuarioGrafico