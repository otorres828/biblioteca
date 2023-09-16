import React, { useEffect,useState } from 'react'
import Chart from 'react-apexcharts';
import {
  Card,
} from "@material-tailwind/react";
function EstadisticaGraficoDesagregar({datos}) {
    const [dias, setDias] = useState(null);
      
    const [chartSeries, setChartSeries] = useState([]);

    const [chartOptions, setChartOptions] = useState({
      chart: {
        type: 'bar',
        stacked: true,
      },
      responsive: [{
        breakpoint: 650,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      xaxis: {
        categories: [],
        labels: {
          style:  {
            colors: "#333335",
            fontSize: "13px",
            fontFamily: "inherit",
            fontWeight: 300,
          }
        },
      },
      yaxis: {
        labels: {
          style: {
            colors:"#333335",
            fontFamily:"inherit",
            fontSize :  "13px",
            fontWeight :  300
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val;
        },
        style: {
          colors: ["#fff"]
        }
      },
      tooltip: {theme: "dark"},
      fill: {opacity:0.8},
      legend: {
        position: 'right',
        offsetX: 0,
        offsetY: 50
      },
    });
  
    useEffect(() => {
      if(datos){
        setChartOptions((prevOptions => ({
          ...prevOptions,
          xaxis: {
            ...prevOptions.xaxis,
            categories: datos.dias,
          },
        })));                                 //dias

        setChartSeries(datos.ingresosCounts.map(obj => ({ name: obj.name, data: obj.data })));
        setDias(datos.dias);
      }
    }, [datos]);
    
  
    return (
        <div>
              {dias && 
                <Card color='gray'>
                  <Chart
                    options={chartOptions}
                    series={chartSeries}
                    type="bar"
                    height={480}
                  />
              </Card>
              }
        </div>
    )
}

export default EstadisticaGraficoDesagregar