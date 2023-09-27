import React, { useEffect,useState } from 'react'
import axios from './../../api/axios'
import { chartsConfig } from "./../../configs";
import BarChart from './../../widgets/charts/BarChart';

function IngresosPersonalizado({fechaInicio,fechaFin,tipo_id,carrera_id}) {
    const [dias, setDias] = useState(null);
    const [ingresosCounts, setIngresosCounts] = useState(null);
    const token_biblioteca = localStorage.getItem("token_biblioteca");

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
      
        const headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Custom-Header": "Custom-Value",
          "Authorization": `Bearer ${token_biblioteca}`
        };
    
        axios.post("/panel/ingresos_personalizado",
        {
          fechaInicio: fechaInicio,
          fechaFin: fechaFin,
          tipo_id:tipo_id,
          carrera_id:carrera_id,
          },
        { headers: headers })
          .then((response) => {
            const dias = response.data.dias;
            const ingresosCounts = response.data.ingresos;
            const updatedChart = { ...websiteViewsChart };
      
            updatedChart.series[0].data = ingresosCounts;
            updatedChart.options.xaxis.categories = dias;
      
            setWebsiteViewsChart(updatedChart); // actualiza el estado con un nuevo objeto
            setDias(response.data.dias);
            setIngresosCounts(response.data.ingresos);
          })
          .catch(() => {
            console.log("Error: ", 'no se pudo realizar la consulta');
          });
    };
  
    useEffect(() => {
      ingresos_por_tipo_general();
  }, [fechaInicio, fechaFin, tipo_id, carrera_id]);
  
    return (
        <div>
            {dias && ingresosCounts && 
            <BarChart
              id_chart="ingresos-personalizado"
              nombre_char="Ingresos"
              title={``}
              color='gray'
              chart={websiteViewsChart} 
              clases={true}
              tamano={450}
            />
            }
            
        </div>
    )
}

export default IngresosPersonalizado