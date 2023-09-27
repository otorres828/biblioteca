import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
} from "@material-tailwind/react";
import axios from './../../api/axios'
import ReactHTMLTableToExcel from 'react-html-table-to-excel-3';

function Historial() {
  const [usuariosHistorial, setUsuariosHistorial] = useState([]);
  const [tipoFilter, setTipoFilter] = useState("");
  const [tipoAcceso, setTipoAcceso] = useState("0");
  const [estatusFilter, setEstatusFilter] = useState("");
  const [fechaInicioFilter, setFechaInicioFilter] = useState("");
  const [fechaFinalFilter, setFechaFinalFilter] = useState("");
  const [carreraFilter, setCarreraFilter] = useState("");

  const [buscar, setBuscar] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(20);

  const [fechaInicio, setFechaInicio] = useState(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    const monday = new Date(today.setDate(diff));
    const year = monday.getFullYear();
    const month = String(monday.getMonth() + 1).padStart(2, '0');
    const date = String(monday.getDate()).padStart(2, '0');
    return `${year}-${month}-${date}T00:00`;
  });
  
  const [fechaFin, setFechaFin] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  });
  const token_biblioteca = localStorage.getItem("token_biblioteca");
  const headers={
    Accept: "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token_biblioteca}`
  }
  function formatoFecha(fecha) {
    const date = new Date(fecha);
    
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const anio = date.getFullYear();
    const hora = date.getHours();
    const minutos = date.getMinutes();
    const ampm = hora >= 12 ? 'pm' : 'am';
    const horaFormateada = hora % 12 || 12;
    
    const fechaFormateada = `${dia}/${mes}/${anio} ${horaFormateada}:${minutos} ${ampm}`;    
    return `${fechaFormateada}`;
  }
  
  function obtener_historial() {
    axios.post("/historial",{fechaInicio,fechaFin}, {headers: headers})
      .then((response) => {
        setUsuariosHistorial(response.data);
      });
  }

  const filterData = () => {
    return usuariosHistorial.filter((data) => {

      const hasMatchInTipo = data.tipo.includes(tipoFilter);
      const hasMatchInCarrera = data.carrera.includes(carreraFilter);

      const hasMatchInEstatus = data.estatus.includes(estatusFilter);
      const hasMatchInTipoAcceso = tipoAcceso == '0' ? true : data.tipo_acceso == tipoAcceso;

      const nombre_y_apellido= data.nombres+' '+data.apellidos;
      const apellido_y_nombre = data.apellidos + ' ' + data.nombres;
      const hasMatchInBuscar =
      (typeof nombre_y_apellido === 'string' ? nombre_y_apellido.toLowerCase() : '').includes(typeof buscar === 'string' ? buscar.toLowerCase() : '') ||
      (typeof apellido_y_nombre === 'string' ? apellido_y_nombre.toLowerCase() : '').includes(typeof buscar === 'string' ? buscar.toLowerCase() : '') ||
      data.cedula.toString().includes(buscar)
    
  
      // All filters must match
      return hasMatchInTipo && hasMatchInEstatus && hasMatchInTipoAcceso && hasMatchInCarrera && hasMatchInBuscar ;
    });
  };
  
  function subtractHours(date, hours) {
    date.setHours(date.getHours() - hours);
    return date;
  }
  
  const paginatedData = recordsPerPage == "" 
  ? filterData() 
  : filterData().slice(currentPage * Number(recordsPerPage), (currentPage + 1) * Number(recordsPerPage));

  useEffect(()=>{
    obtener_historial();
  },[fechaInicio,fechaFin])

  return (
    <div className="mx-0 mt-12 mb-8 flex flex-col gap-12 md:mx-8">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-3">
          <Typography variant="h6" color="white">
            Historial de Accesos
          </Typography>
        </CardHeader>
        <CardBody className=" px-0 pt-0 pb-2">
          <div className="mx-5 mb-4">
            <div className="mb-4 grid w-full grid-cols-12 gap-3">
              {/* PAGINADOR */}
              <select
                value={recordsPerPage}
                onChange={(e) => {
                  setRecordsPerPage(
                    e.target.value ? parseInt(e.target.value) : ""
                  );
                  setCurrentPage(0);
                }}
                className="col-span-3 md:col-span-1 rounded border border-blue-100 p-3"
              >
                <option value="">Todo</option>
                {[5,10, 20, 50, 100].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>

              {/* SEARCH */}
              <input
                type="search"
                placeholder="Escriba algo para filtrar..."
                onChange={(e) => setBuscar(e.target.value)}
                className="col-span-9 md:col-span-3 block w-full appearance-none rounded border border-blue-100 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none "
              />

              {/* TIPO DE CARRERA */}
              <select
                onChange={(e) => setCarreraFilter(e.target.value)}
                className="col-span-6 md:col-span-2 rounded border p-1"
              >
                <option value="">Tipo de Carrera</option>
                <option value="informatica">Ingenieria en Informatica</option>
                <option value="ingenieria industrial">
                  Ingenieria Industrial
                </option>
                <option value="civil">Ingenieria Civil</option>
                <option value="derecho">Derecho</option>
                <option value="comunicacion">Comunicacion Social</option>
                <option value="administracion">
                  Administracion de Empresas
                </option>
                <option value="contaduria">Contaduria Publica</option>
                <option value="relaciones">Relaciones Industriales</option>
              </select>

              {/* TIPO ACCESO */}
              <select
                className="col-span-6 md:col-span-2 rounded border border-blue-100 p-3"
                onChange={(e) => setTipoAcceso(e.target.value)}
              >
                <option value="0">Todas las Acciones</option>
                <option value="1">Entrada</option>
                <option value="2">Salida</option>
              </select>

              {/* TIPO DE USUARIO */}
              <select
                onChange={(e) => setTipoFilter(e.target.value)}
                className="col-span-6 md:col-span-2 rounded border border-blue-100 p-3"
              >
                <option value="">Tipo de Usuario</option>
                <option value="estudiante">Estudiante</option>
                <option value="profesor">Profesor</option>
                <option value="administrativo">Adminstrativo</option>
                <option value="empleado">Empleado</option>
                <option value="visitante">Visitante</option>
              </select>

              {/* ESTATUS */}
              <select
                onChange={(e) => setEstatusFilter(e.target.value)}
                className="col-span-6 md:col-span-2 rounded border border-blue-100 p-3"
              >
                <option value="">Todo - Estatus</option>
                <option value="1">PASO</option>
                <option value="2">NO PASO</option>
                <option value="3">RECHAZADO</option>
              </select>

              {/* FECHA DE INICIO */}
              <input style={{width:"100%"}}
                className={`col-span-6 md:col-span-2 rounded border border-blue-100 p-2 md:p-0`}
                type="datetime-local"
                value={fechaInicio && fechaInicio.slice(0, 16)}
                onChange={(e) => {
                  let selectedDate = new Date(e.target.value);
                  selectedDate = subtractHours(selectedDate, 4);
                  const formattedDate = selectedDate.toISOString().slice(0, 16);
                  setFechaInicio(formattedDate);
                }}
              />
              {/* FECHA DE FIN */}
              <input style={{width:"100%"}}
                className={`col-span-6 md:col-span-2 rounded border border-blue-100 p-2 md:p-0`}
                type="datetime-local"
                value={fechaFin && fechaFin.slice(0, 16)}
                onChange={(e) => {
                  let selectedDate = new Date(e.target.value);
                  selectedDate = subtractHours(selectedDate, 4);
                  const formattedDate = selectedDate.toISOString().slice(0, 16);
                  setFechaFin(formattedDate);
                }}
              />
              <ReactHTMLTableToExcel
                className="col-span-12 p-2 md:col-span-1  rounded-lg bg-green-300 shadow-lg"
                table="historial"
                filename="Historial de Accessos"
                filetype="xls"
                sheet="historial"
                buttonText="Excel"
              />
              <Typography className="col-span-12 md:col-span-2 mt-3 items-center text-lg text-center md:text-left">
                Se filtraron: {paginatedData ? paginatedData.length : 0} de{" "}
                {usuariosHistorial ? usuariosHistorial.length : 0} Registros
              </Typography>
            </div>

            <div className="mb-4 grid grid-cols-12 gap-3">

            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-scroll">
            <table className="w-full min-w-[640px] table-auto" id="historial">
              <thead>
                <tr>
                  {[
                    "Ceula",
                    "Nombres y Apellidos",
                    "Tipo Usuario",
                    "Carrera",
                    "Estatus",
                    "Tipo Accion",
                    "Fecha y Hora",
                  ].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map(
                  (
                    {
                      nombres,
                      apellidos,
                      carrera,
                      cedula,
                      tipo,
                      tipo_acceso,
                      estatus,
                      fecha,
                    },
                    key
                  ) => {
                    const className = `py-3 px-5 ${
                      key == paginatedData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr
                        key={`${fecha}-${key}`}
                        className="hover:bg-blue-gray-50"
                      >
                        <td className={className}>
                          <Typography className="text-xl font-semibold text-blue-gray-600">
                            {cedula}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="font-semibold text-blue-gray-600">
                            {nombres + ", " + apellidos}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-lg font-semibold text-blue-gray-600">
                            {tipo}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-lg font-semibold text-blue-gray-600">
                            {carrera}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Chip
                            variant="gradient"
                            color={estatus == 1 ? "green" : "red"}
                            value={
                              estatus == 1
                                ? "PASO"
                                : estatus == 2
                                ? "NO PASO"
                                : estatus == 3
                                ? "RECHAZADO"
                                : ""
                            }
                            className="py-0.5 px-2 text-[12px] font-medium"
                          />
                        </td>

                        <td className={className}>
                          <Chip
                            variant="gradient"
                            color={tipo_acceso == 1 ? "blue" : "yellow"}
                            value={tipo_acceso == 1 ? "Entrada" : "Salida"}
                            className="py-0.5 px-2 text-[12px] font-medium"
                          />
                        </td>
                        
                        <td className={className}>
                          <Typography className="text-md font-semibold text-blue-gray-600">
                            {formatoFecha(fecha)}
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>

          <div className="m-4 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage == 0}
              className={`rounded bg-blue-500 px-4 py-2 text-white ${
                currentPage == 0
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-blue-700"
              }`}
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                (currentPage + 1) * recordsPerPage >= filterData().length
              }
              className={`rounded bg-blue-500 px-4 py-2 text-white ${
                (currentPage + 1) * recordsPerPage >= filterData().length
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-blue-700"
              }`}
            >
              Siguiente
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Historial;