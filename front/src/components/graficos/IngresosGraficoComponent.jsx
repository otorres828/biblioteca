import React, { useEffect,useState } from 'react'
import axios from './../../api/axios'
import { chartsConfig } from "./../../configs";
import BarChart from './../../widgets/charts/BarChart';

function IngresosGraficoComponent({fechaInicio,fechaFin}) {
    //ESTUDIANTES
    const [estudiantes, setEstudiantes] = useState(null);
    const [ingresosCountsEstudiantes, setIngresosCountsEstudiantes] = useState(null);

    //PROFESORES
    const [profesores, setProfesores] = useState(null);
    const [ingresosCountsProfesores, setIngresosCountsProfesores] = useState(null);  

    //PROFESORES
    const [administrativos, setAdministrativos] = useState(null);
    const [ingresosCountAdministrativos, setIngresosCountsAdministrativos] = useState(null);  

    //EMPLEADOS
    const [empleados, setEmpleados] = useState(null);
    const [ingresosCountempleados, setIngresosCountsEmpleados] = useState(null);  


    //VISITANTES
    const [visitantes, setVisitantes] = useState(null);
    const [ingresosCountVisitantes, setIngresosCountsVisitantes] = useState(null);  

    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Custom-Header": "Custom-Value"
      };
      
    const [chartEstudiantes, setChartEstudiantes] = useState({
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

    const [chartProfesores, setChartProfesores] = useState({
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

    const [chartAdministrativos, setChartAdministrativos] = useState({
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

    const [chartEmpleados, setChartEmpleados] = useState({
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

    const [chartVisitantes, setChartVisitantes] = useState({
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

    const ingresos_por_tipo_detallado = () => {
        axios.post("/panel/ingresos_por_tipo_detallado",
        {
          fechaInicio: fechaInicio,
          fechaFin: fechaFin,
          },
        { headers: headers })
          .then((response) => {

            const dias = response.data.dias;
            //estudiantes
            const ingresosCountsEstudiantes = response.data.ingresosEstudiantes;
            const updatedChartEstudiantes = { ...chartEstudiantes };
      
            updatedChartEstudiantes.series[0].data = ingresosCountsEstudiantes;
            updatedChartEstudiantes.options.xaxis.categories = dias;
      
            setChartEstudiantes(updatedChartEstudiantes); // actualiza el estado con un nuevo objeto
            setEstudiantes(response.data.dias);
            setIngresosCountsEstudiantes(response.data.ingresosEstudiantes);

            //profesores
            const ingresosCountsProfesores = response.data.ingresosProfesores;
            const updatedChartProfesores = { ...chartProfesores };
      
            updatedChartProfesores.series[0].data = ingresosCountsProfesores;
            updatedChartProfesores.options.xaxis.categories = dias;
      
            setChartProfesores(updatedChartProfesores); // actualiza el estado con un nuevo objeto
            setProfesores(response.data.dias);
            setIngresosCountsProfesores(response.data.ingresosProfesores);

            //administrativo
            const ingresosCountsAdministrativos = response.data.ingresosAdministrativos;
            const updatedChartAdministrativos = { ...chartAdministrativos };
      
            updatedChartAdministrativos.series[0].data = ingresosCountsAdministrativos;
            updatedChartAdministrativos.options.xaxis.categories = dias;
      
            setChartAdministrativos(updatedChartAdministrativos); // actualiza el estado con un nuevo objeto
            setAdministrativos(response.data.dias);
            setIngresosCountsAdministrativos(response.data.ingresosAdministrativos);

            //empleados
            const ingresosCountsEmpleados = response.data.ingresosEmpleados;
            const updatedChartEmpleados = { ...chartEmpleados };
      
            updatedChartEmpleados.series[0].data = ingresosCountsEmpleados;
            updatedChartEmpleados.options.xaxis.categories = dias;
      
            setChartEmpleados(updatedChartEmpleados); // actualiza el estado con un nuevo objeto
            setEmpleados(response.data.dias);
            setIngresosCountsEmpleados(response.data.ingresosEmpleados);

            //visitantes
            const ingresosCountsVisitantes = response.data.ingresosVisitantes;
            const updatedChartVisitantes = { ...chartVisitantes };
      
            updatedChartVisitantes.series[0].data = ingresosCountsVisitantes;
            updatedChartVisitantes.options.xaxis.categories = dias;
      
            setChartVisitantes(updatedChartVisitantes); // actualiza el estado con un nuevo objeto
            setVisitantes(response.data.dias);
            setIngresosCountsVisitantes(response.data.ingresosVisitantes);

          })
          .catch(() => {
            console.log("Error: ", 'no se pudo realizar la consulta');
          });
    };
  
    useEffect(()=>{
        ingresos_por_tipo_detallado()
    },[fechaInicio, fechaFin])

    return (
        <>
        <div>  
            {estudiantes && ingresosCountsEstudiantes && 
                <BarChart
                id_chart="ingresos-tipo-estudiantes"
                nombre_char="Ingresos"
                title='Estudiantes'
                color='blue'
                chart={chartEstudiantes} 
                clases={true}
                orientacion={false}
                />
            }           
        </div>

        <div>  
            {profesores && ingresosCountsProfesores && 
                <BarChart
                id_chart="ingresos-tipo-estudiantes"
                nombre_char="Ingresos"
                title='Profesores'
                color='indigo'
                chart={chartProfesores} 
                clases={true}
                orientacion={false}
                />
            }           
        </div> 

        <div>  
            {administrativos && ingresosCountAdministrativos && 
                <BarChart
                id_chart="ingresos-tipo-administrativos"
                nombre_char="Ingresos"
                title='Administrativos'
                color='cyan'
                chart={chartAdministrativos} 
                clases={true}
                orientacion={false}
                />
            }           
        </div>

        <div>  
            {empleados && ingresosCountempleados && 
                <BarChart
                id_chart="ingresos-tipo-empleados"
                nombre_char="Ingresos"
                title='Empleados'
                color='amber'
                chart={chartEmpleados} 
                clases={true}
                orientacion={false}
                />
            }           
        </div>  

        <div>  
            {visitantes && ingresosCountVisitantes && 
                <BarChart
                id_chart="ingresos-tipo-visitantes"
                nombre_char="Ingresos"
                title='Visitantes'
                color='lime'
                chart={chartVisitantes} 
                clases={true}
                orientacion={false}
                />
            }           
        </div>  
        </>
    )
}

export default IngresosGraficoComponent