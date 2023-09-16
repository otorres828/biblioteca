import React, { useEffect, useRef } from 'react';
import Chart from 'react-apexcharts';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

const StackedChart = ({id_chart,nombre_char='Ingresos', color, title=null, description=null, footer,clases=null,chart,orientacion=false ,tamano=null}) => {

  const chartOptions = {
    chart: {
      id: {id_chart},
      toolbar: {
        show: true,
        tools: {
          download: true,
        },
        autoSelected: 'zoom' 
      },
      
    },
    colors: "#fff",
    xaxis: {
      categories: chart.options.xaxis.categories,
      labels: {
        style:  {
          colors: "#fff",
          fontSize: "13px",
          fontFamily: "inherit",
          fontWeight: 300
      }
      },
    },
    yaxis: {
      labels: {
        style: {
          colors:"#fff",
          fontFamily:"inherit",
          fontSize :  "13px",
          fontWeight :  300
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: orientacion,
        distributed: false,
        colors: {
          ranges: [{
            color: 'white' // color de la barra
          }],
        },
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      },
      style: {
        colors: ["#555B5F"]
      }
    },
    grid:{
      show: true,
      borderColor: "#ffffff40",
      strokeDashArray: 5,
      xaxis: {
          lines: {
              show: true
          }
      },
      padding: {
          top: 5,
          right: 20
      }
    },
    tooltip: {theme: "dark"},
    fill: {opacity:0.8},
  };
  
  const chartSeries = [
    {
      name: nombre_char,
      data: chart.series[0].data
    }
  ];
  
  useEffect(()=>{
  },[chart])

  return (
       <Card >
        <CardHeader  color={color}>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={tamano ? tamano: 230}
          />
        </CardHeader>
        <CardBody className="p-6">
          <Typography variant="h6" color="blue-gray" className={clases && "text-center"}>
            {title}
          </Typography>
          <Typography variant="small" className="font-normal text-blue-gray-600">
            {description ? description : ''}
          </Typography>
        </CardBody>
        {footer && (
          <CardFooter className="border-t border-blue-gray-50 px-6 py-5">
            {footer}
          </CardFooter>
        )}
      </Card>
  );
};

StackedChart.defaultProps = {
  color: "blue",
  footer: null,
};

StackedChart.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  chart: PropTypes.object.isRequired,
  footer: PropTypes.node,
};

export default StackedChart;
