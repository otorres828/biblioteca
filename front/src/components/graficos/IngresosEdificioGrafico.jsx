import React, { useEffect,useState } from 'react'
import axios from './../../api/axios'
import { chartsConfig } from "./../../configs";
import BarChart from './../../widgets/charts/BarChart';

function IngresosEdificioGrafico({fechaInicio,fechaFin,headers}) {
    const [dias, setDias] = useState(null);
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

    const ingresos_grafico = () => {
        axios.post("/panel/ingresos_grafico",
        {
          fechaInicio: fechaInicio,
          fechaFin: fechaFin,
          },
        { headers: headers })
          .then((response) => {
            const dias = response.data.dias;
            const ingresosCounts = response.data.ingresosCounts;
            const updatedChart = { ...websiteViewsChart };
      
            updatedChart.series[0].data = ingresosCounts;
            updatedChart.options.xaxis.categories = dias;
      
            setWebsiteViewsChart(updatedChart); // actualiza el estado con un nuevo objeto
            setDias(response.data.dias);
            setIngresosCounts(response.data.ingresosCounts);
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
    };
  
    useEffect(()=>{
        ingresos_grafico()
    },[fechaInicio, fechaFin])

    return (
        <div>
            {dias && ingresosCounts && 
            <BarChart
                  id_chart="ingresos-en-rango"
                  nombre_char="Ingresos"
                  title='Ingresos al Edificio'
                  color='green'
                  chart={websiteViewsChart} 
                  clases={true}
            />
            }
            
        </div>
    )
}

export default IngresosEdificioGrafico