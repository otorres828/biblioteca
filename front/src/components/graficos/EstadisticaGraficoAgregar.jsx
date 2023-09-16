import React, { useEffect,useState } from 'react'
import { chartsConfig } from "./../../configs";
import BarChart from './../../widgets/charts/BarChart';

function EstadisticaGraficoAgregar({datos}) {
    const [dias, setDias] = useState(null);
    const [ingresosCounts, setIngresosCounts] = useState(null);
      
    const [websiteViewsChart, setWebsiteViewsChart] = useState({
        type: "bar",
        series: [
          {
            data: [],
          },
        ],
        options: {
          ...chartsConfig,
        },
    });
  
    useEffect(() => {
      if(datos){
        const updatedChart = { ...websiteViewsChart };
        updatedChart.series[0].data = datos.ingresosCounts;
        updatedChart.options.xaxis.categories = datos.dias;
  
        setWebsiteViewsChart(updatedChart); // actualiza el estado con un nuevo objeto
        setDias(datos.dias);
        setIngresosCounts(datos.ingresosCounts);
      }
  }, [datos]);
  
    return (
        <div>
            {dias && ingresosCounts && 
            <BarChart
              id_chart="ingresos"
              nombre_char="Ingresos"
              title={``}
              color='gray'
              chart={websiteViewsChart} 
              clases={true}
              tamano={450}
              colorxaxie={'#333335'}
            />
            }
            
        </div>
    )
}

export default EstadisticaGraficoAgregar