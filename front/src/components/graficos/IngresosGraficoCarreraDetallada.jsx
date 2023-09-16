import React, { useEffect,useState } from 'react'
import axios from './../../api/axios'
import { chartsConfig } from "./../../configs";
import BarChart from './../../widgets/charts/BarChart';

function IngresosGraficoCarreraDetallada({fechaInicio,fechaFin,chart,headers}) {
    //INGENIERIA EN INFORMATICA
    const [informatica, setInformatica] = useState(null);
    const [ingresosCountsInformatica, setIngresosCountsInformatica] = useState(null);

    //INGENIERIA INDUSTRIAL
    const [industrial, setIndustrial] = useState(null);
    const [ingresosCountsIndustrial, setIngresosCountsIndustrial] = useState(null);  

    //INGENIERIA CIVIL
    const [civil, setCivil] = useState(null);
    const [ingresosCountCivil, setIngresosCountsCivil] = useState(null);  

    //COMUNICACION
    const [comunicacion, setComunicacion] = useState(null);
    const [ingresosCountComunicacion, setIngresosCountsComunicacion] = useState(null);  

    //Derecho
    const [derecho, setDerecho] = useState(null);
    const [ingresosCountDerecho, setIngresosCountsDerecho] = useState(null);  

    //ADMINISTRA DE EMPRESAS
    const [administracion, setAdministracion] = useState(null);
    const [ingresosCountAdministracion, setIngresosCountAdministracion] = useState(null);  

    //CONTADURIA PUBLICA
    const [contaduria, setContaduria] = useState(null);
    const [ingresosCountContaduria, setIngresosCountContaduria] = useState(null);  

    //RELACIONES INDUSTRIALES
    const [relaciones, setRelaciones] = useState(null);
    const [ingresosCountRelaciones, setIngresosCountRelaciones] = useState(null);  

    const [chartInformatica, setChartInformatica] = useState({
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

    const [chartIndustrial, setChartIndustrial] = useState({
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

    const [chartCivil, setChartCivil] = useState({
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

    const [chartComunicacion, setChartComunicacion] = useState({
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

    const [chartDerecho, setChartDerecho] = useState({
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
    
    const [chartAdministracion, setChartAdministracion] = useState({
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

    const [chartContaduria, setChartContaduria] = useState({
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

    const [chartRelaciones, setChartRelaciones] = useState({
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

    const ingresos_por_carrera_detallado = () => {
        axios.post("/panel/ingresos_por_carrera_detallado",
        {
          fechaInicio: fechaInicio,
          fechaFin: fechaFin,
          },
        { headers: headers })
          .then((response) => {
            const dias = response.data.dias;

            const ingresosInformatica = response.data.ingresosInformatica;
            const ingresosIndustrial = response.data.ingresosIndustrial;
            const ingresosCivil = response.data.ingresosCivil;
            const ingresosDerecho = response.data.ingresosDerecho;
            const ingresosComunicacion = response.data.ingresosComunicacion;
            const ingresosAdministracion = response.data.ingresosAdministracionEmpresas;
            const ingresosContaduria = response.data.ingresosContaduriaPublica;
            const ingresosRelaciones = response.data.ingresosRelacionesIndustriales;

            const updatedChartInformatica = { ...chartInformatica };
            const updatedChartIndustrial = { ...chartIndustrial };
            const updatedChartCivil = { ...chartCivil };
            const updatedChartDerecho = { ...chartDerecho };
            const updatedChartComunicacion = { ...chartComunicacion };
            const updatedChartArministracion = { ...chartAdministracion };
            const updatedChartContaduria = { ...chartContaduria };
            const updatedChartRelaciones = { ...chartRelaciones };
            
            updatedChartInformatica.series[0].data = ingresosInformatica;
            updatedChartIndustrial.series[0].data = ingresosIndustrial;
            updatedChartCivil.series[0].data = ingresosCivil;
            updatedChartDerecho.series[0].data = ingresosDerecho;
            updatedChartComunicacion.series[0].data = [...ingresosComunicacion];
            updatedChartArministracion.series[0].data = ingresosAdministracion;
            updatedChartContaduria.series[0].data = ingresosContaduria;
            updatedChartRelaciones.series[0].data = ingresosRelaciones;

            updatedChartInformatica.options.xaxis.categories = dias;
            updatedChartIndustrial.options.xaxis.categories = dias;
            updatedChartCivil.options.xaxis.categories = dias;
            updatedChartDerecho.options.xaxis.categories = dias;
            updatedChartComunicacion.options.xaxis.categories = dias;
            updatedChartArministracion.options.xaxis.categories = dias;
            updatedChartContaduria.options.xaxis.categories = dias;
            updatedChartRelaciones.options.xaxis.categories = dias;
      
            setChartInformatica(updatedChartInformatica); // actualiza el estado con un nuevo objeto
            setChartIndustrial(updatedChartIndustrial); // actualiza el estado con un nuevo objeto
            setChartCivil(updatedChartCivil); // actualiza el estado con un nuevo objeto
            setChartDerecho(updatedChartDerecho); // actualiza el estado con un nuevo objeto
            setChartComunicacion(updatedChartComunicacion); // actualiza el estado con un nuevo objeto
            setChartAdministracion(updatedChartArministracion); // actualiza el estado con un nuevo objeto
            setChartContaduria(updatedChartContaduria); // actualiza el estado con un nuevo objeto
            setChartRelaciones(updatedChartRelaciones); // actualiza el estado con un nuevo objeto
            
            setInformatica(response.data.dias);
            setIndustrial(response.data.dias);
            setCivil(response.data.dias);
            setDerecho(response.data.dias);
            setComunicacion(response.data.dias);
            setAdministracion(response.data.dias);
            setContaduria(response.data.dias);
            setRelaciones(response.data.dias);

            setIngresosCountsIndustrial(ingresosIndustrial);
            setIngresosCountsInformatica(ingresosInformatica);
            setIngresosCountsCivil(ingresosCivil);
            setIngresosCountsDerecho(ingresosDerecho);
            setIngresosCountsComunicacion(ingresosComunicacion);      
            setIngresosCountAdministracion(ingresosAdministracion);
            setIngresosCountContaduria(ingresosContaduria);
            setIngresosCountRelaciones(ingresosRelaciones);

          })
          .catch(() => {
            console.log("Error: ", 'no se pudo realizar la consulta');
          });
    };
  
    useEffect(()=>{
        ingresos_por_carrera_detallado()
    },[fechaInicio, fechaFin])

    return (
        <>
        <div>  
            {informatica && ingresosCountsInformatica && 
                <BarChart
                id_chart="ingenieria-informatica"
                nombre_char="Ingresos"
                title='Ingenieria en Informatica'
                color='blue'
                chart={chartInformatica} 
                clases={true}
                orientacion={false}
                />
            }           
        </div>

        <div>  
            {industrial && ingresosCountsIndustrial && 
                <BarChart
                id_chart="ingenieria-industrial"
                nombre_char="Ingresos"
                title='Ingenieria Industrial'
                color='indigo'
                chart={chartIndustrial} 
                clases={true}
                orientacion={false}
                />
            }           
        </div> 

        <div>  
            {civil && ingresosCountCivil && 
                <BarChart
                id_chart="ingenieria-civil"
                nombre_char="Ingresos"
                title='Ingenieria Civil'
                color='cyan'
                chart={chartCivil} 
                clases={true}
                orientacion={false}
                />
            }           
        </div>

        <div>  
            {derecho && ingresosCountDerecho && 
                <BarChart
                id_chart="derecho"
                nombre_char="Ingresos"
                title='Derecho'
                color='lime'
                chart={chartDerecho} 
                clases={true}
                orientacion={false}
                />
            }           
        </div>  

        <div>  
            {comunicacion && ingresosCountComunicacion && 
                <BarChart
                id_chart="Comunicacion-Social"
                nombre_char="Ingresos"
                title='Comunicacion Social'
                color='amber'
                chart={chartComunicacion} 
                clases={true}
                orientacion={false}
                />
            }           
        </div>  

        <div>  
            {administracion && ingresosCountAdministracion && 
                <BarChart
                id_chart="administracion"
                nombre_char="Ingresos"
                title='Administracion de Empresas'
                color='green'
                chart={chartAdministracion} 
                clases={true}
                orientacion={false}
                />
            }           
        </div>

        <div>  
            {contaduria && ingresosCountContaduria && 
                <BarChart
                id_chart="contaduria"
                nombre_char="Ingresos"
                title='Contaduria Publica'
                color='red'
                chart={chartContaduria} 
                clases={true}
                orientacion={false}
                />
            }           
        </div>

        <div>  
            {relaciones && ingresosCountRelaciones && 
                <BarChart
                id_chart="relaciones"
                nombre_char="Ingresos"
                title='Relaciones Industriales'
                color='deep-orange'
                chart={chartRelaciones} 
                clases={true}
                orientacion={false}
                />
            }           
        </div>    
        </>
    )
}

export default IngresosGraficoCarreraDetallada