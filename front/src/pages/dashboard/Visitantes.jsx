import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
} from "@material-tailwind/react";
import axios from './../../api/axios'
import { useEffect, useState } from "react";
import ReactHTMLTableToExcel from 'react-html-table-to-excel-3';
import HistorialUsuario from "./../../components/graficos/HistorialUsuario";
import AgregarVisitante from "./../../components/AgregarVisitante";

function Visitantes() {
  const [todosUsuarios, setTodosUsuarios] = useState([]);
  const [cedula, setCedula] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [nuevo, setNuevo] = useState(true);
  const [estatusFilter, setEstatusFilter] = useState("");
  const [buscar, setBuscar] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [agregar, setAgregar] = useState(false);
  const token_biblioteca = localStorage.getItem("token_biblioteca");
  const headers ={
    Accept: "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token_biblioteca}`
  }
  function obtener_visitantes() {
    axios
      .get("/visitantes", { headers: headers,})
      .then((response) => {
        setTodosUsuarios(response.data);
      });
  }

  const filterData = () => {
    return todosUsuarios.filter((data) => {

      const hasMatchInEstatus = data.estatus.includes(estatusFilter);
      const nombre_y_apellido= data.Usuario.nombres+' '+data.Usuario.apellidos;
      const apellido_y_nombre = data.Usuario.apellidos + ' ' + data.Usuario.nombres;

      const hasMatchInBuscar =
        nombre_y_apellido.toLowerCase().includes(buscar.toLowerCase()) ||
        apellido_y_nombre.toLowerCase().includes(buscar.toLowerCase()) ||
        data.cedula.toString().includes(buscar)
  
      return  hasMatchInEstatus  && hasMatchInBuscar  ;
    });
  };

  const paginatedData = recordsPerPage == "" 
  ? filterData() 
  : filterData().slice(currentPage * Number(recordsPerPage), (currentPage + 1) * Number(recordsPerPage));

  useEffect(()=>{
    obtener_visitantes();
  },[nuevo])

  function historial_usuario(cedula){
    setCedula(cedula)
    setOpen(true)
  }

  function agregar_visitante(usuario=null){
    setAgregar(true);
    if(usuario){
        setNuevo(false)
        setUsuario(usuario)
    }
  }

  const handleClose = () => {
    setNuevo(true);
    setOpen(false);
    setAgregar(false);
    setUsuario(null);
  };


  return (
    <div className="mt-12 mx-3 md:mx-8 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Lista de Visitantes
          </Typography>
        </CardHeader>
        <CardBody className=" px-0 pt-0 pb-2">
          <div className="mx-5 mb-4">
            <div className="grid grid-cols-12 gap-4 w-full">
              <select 
                value={recordsPerPage} 
                onChange={(e) => { setRecordsPerPage(e.target.value ? parseInt(e.target.value) : ""); setCurrentPage(0); }}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white col-span-3 md:col-span-1"
              >
                <option value="">Todo</option>
                {[ 10, 20, 50, 100].map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>

              <input
                type="search"
                placeholder="Escriba algo para filtrar..."
                onChange={(e) => setBuscar(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white col-span-9 md:col-span-4"
              />
             
              <select
                onChange={(e) => setEstatusFilter(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white col-span-6 md:col-span-2"
              >
                <option value="">Estatus</option>
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </select>
              
              <ReactHTMLTableToExcel className="appearance-none block w-full border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white bg-green-300 col-span-6 md:col-span-2"
                    table="visitantes"
                    filename="Listado de Visitantes"
                    filetype="xls"
                    sheet="usuarios"
                    buttonText="Excel"/>
                <Typography className="text-lg  col-span-12 md:col-span-2 text-center md:text-left">
                    Se filtraron: {paginatedData ? paginatedData.length: 0} de {todosUsuarios.length} Visitantes
                </Typography>
                <button className="appearance-none block w-full col-span-6 md:col-span-1 p-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-800 px-4 mb-3 leading-tight focus:outline-none" onClick={()=>{agregar_visitante()}}>Agregar Visitante</button>
            </div>
          </div>

          <div className="overflow-x-scroll">
            <table className=" w-full table-auto" id="visitantes">
              <thead>
                <tr>
                  {["Cedula","Nombre y Apellido",  "Estatus","Acciones"].map((el) => (
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
                {paginatedData && paginatedData.map(
                  ({ Usuario, cedula, estatus }, key) => {
                    const className = `py-3 px-5 ${
                      key == paginatedData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={cedula+key} className="hover:bg-blue-gray-50 cursor-pointer">
                        <td className={className} onClick={()=>{historial_usuario(cedula)}}>
                          <Typography className="text-lg w-full font-semibold text-blue-gray-600" >
                            {`V-${cedula}`}
                          </Typography>
                        </td>

                        <td  className={className} onClick={()=>{historial_usuario(cedula)}}>
                          <Typography className="text-lg font-semibold text-blue-gray-600">
                                {Usuario.nombres+', '+Usuario.apellidos}
                            </Typography>
                        </td>
                    
                        <td className={className} onClick={()=>{historial_usuario(cedula)}}>
                          <Chip
                            variant="gradient"
                            color={estatus == 1 ? "green" : "red"}
                            value={estatus == 1 ? "ACTIVO" : "INACTIVO"}
                            className="py-0.5 px-2 text-[11px] font-medium"
                          />
                        </td>
                      
                        <td className={className}>
                          <button className="bg-blue-500 font-semibold rounded-lg p-3 text-white cursor-pointer" onClick={()=>{agregar_visitante(Usuario)}}>Editar</button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center m-4">
            <button 
              onClick={() => setCurrentPage(currentPage - 1)} 
              disabled={currentPage == 0}
              className={`px-4 py-2 rounded bg-blue-500 text-white ${currentPage == 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              Anterior
            </button>
            <button 
              onClick={() => setCurrentPage(currentPage + 1)} 
              disabled={(currentPage + 1) * recordsPerPage >= filterData().length}
              className={`px-4 py-2 rounded bg-blue-500 text-white ${((currentPage + 1) * recordsPerPage >= filterData().length) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              Siguiente
            </button>
          </div>
        </CardBody>
      </Card>
      {/* HISTORIAL DE VISITANTE */}
      {open && (
          <HistorialUsuario visitante={true} open={open} handleClose={handleClose} cedula={cedula} headers={headers}/>
      )}

      {/* MODAL PARA AGREGAR VISITANTE */}
      {agregar && (
          <AgregarVisitante nuevo={nuevo} open={agregar} usuario={usuario} handleClose={handleClose} obtener_visitantes={obtener_visitantes} headers={headers}/>
      )}
    </div>
  );
}

export default Visitantes;
