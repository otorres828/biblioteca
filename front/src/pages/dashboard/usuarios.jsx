import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Switch,
} from "@material-tailwind/react";
import axios from './../../api/axios'
import { useEffect, useState } from "react";
import ReactHTMLTableToExcel from 'react-html-table-to-excel-3';
import HistorialUsuario from "./../../components/graficos/HistorialUsuario";
import { useSnackbar } from "notistack";

function Usuarios() {
  const { enqueueSnackbar } = useSnackbar();
  const [todosUsuarios, setTodosUsuarios] = useState([]);
  const [cedula, setCedula] = useState(null);
  const [tipoFilter, setTipoFilter] = useState("");
  const [carreraFilter, setCarreraFilter] = useState("");
  const [estatusFilter, setEstatusFilter] = useState("");
  const [buscar, setBuscar] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const token_biblioteca = localStorage.getItem("token_biblioteca");
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token_biblioteca}`
  };
  
  function obtener_usuarios() {
    axios
      .get("/usuarios", {headers: headers,})
      .then((response) => {
        setTodosUsuarios(response.data);
      });
  }

  const filterData = () => {
    return todosUsuarios.filter((data) => {
      const hasMatchInTipo = data.Tarjeta.some(tarjeta => tarjeta.Tipo.nombre.includes(tipoFilter));
      if(data.Tarjeta.Carrera)
        var hasMatchInCarrera = data.Tarjeta.some(tarjeta => tarjeta.Carrera.nombre.includes(carreraFilter));
      else
        var hasMatchInCarrera = true;

      const hasMatchInEstatus = data.estatus.includes(estatusFilter);

      const nombre_y_apellido= data.nombres+' '+data.apellidos;
      const apellido_y_nombre = data.apellidos + ' ' + data.nombres;

      const hasMatchInBuscar =
        nombre_y_apellido.toLowerCase().includes(buscar.toLowerCase()) ||
        apellido_y_nombre.toLowerCase().includes(buscar.toLowerCase()) ||
        data.cedula.toString().includes(buscar)
  
      return hasMatchInTipo && hasMatchInCarrera && hasMatchInEstatus  && hasMatchInBuscar  ;
    });
  };

  const paginatedData = recordsPerPage == "" 
  ? filterData() 
  : filterData().slice(currentPage * Number(recordsPerPage), (currentPage + 1) * Number(recordsPerPage));

  useEffect(()=>{
    obtener_usuarios();
  },[])

  function historial_usuario(cedula){
    setCedula(cedula)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  };

  function cambiarEstado(cedula){
    axios.get('usuarios/cambiar_estado/'+cedula,{headers:headers}).
    then((response)=>{
        enqueueSnackbar('Estatus actualizado con exito', { variant: 'success' });
    })
  }

  return (
    <div className="mt-12 mx-0 md:mx-8 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Lista de Usuarios
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          <div className="mx-5 flex flex-wrap justify-between mb-4">
            <div className="grid grid-cols-12 gap-4 w-full ">
              <select 
                value={recordsPerPage} 
                onChange={(e) => { setRecordsPerPage(e.target.value ? parseInt(e.target.value) : ""); setCurrentPage(0); }}
                className="border p-3 rounded col-span-3 md:col-span-1"
              >
                <option value="">Todo</option>
                {[5, 10, 20, 50, 100].map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
              <input
                type="search"
                placeholder="Escriba algo para filtrar..."
                onChange={(e) => setBuscar(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 rounded border-blue-100  col-span-9 md:col-span-3"
              />
               <select
                onChange={(e) => setCarreraFilter(e.target.value)}
                className="border p-3 rounded col-span-6 md:col-span-2"
              >
                <option value="">Tipo de Carrera</option>
                <option value="informatica">Ingenieria en Informatica</option>
                <option value="ingenieria industrial">Ingenieria Industrial</option>
                <option value="civil">Ingenieria Civil</option>
                <option value="derecho">Derecho</option>
                <option value="comunicacion">Comunicacion Social</option>
                <option value="administracion">Administracion de Empresas</option>
                <option value="contaduria">Contaduria Publica</option>
                <option value="relaciones">Relaciones Industriales</option>
              </select>
              <select
                onChange={(e) => setTipoFilter(e.target.value)}
                className="border p-3 rounded col-span-6 md:col-span-2"
              >
                <option value="">Tipo de Usuario</option>
                <option value="estudiante">Estudiante</option>
                <option value="profesor">Profesor</option>
                <option value="trabajador">Trabajador</option>
                <option value="administrativo">Adminstrativo</option>
              </select>
              <select
                onChange={(e) => setEstatusFilter(e.target.value)}
                className="border p-3 rounded col-span-6 md:col-span-2"
              >
                <option value="">Estatus</option>
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </select>
              
              <ReactHTMLTableToExcel
                    className="rounded-lg  shadow-lg bg-green-300 w-full col-span-6 md:col-span-1 text-center"
                    table="usuarios"
                    filename="Listado de Usuarios"
                    filetype="xls"
                    sheet="usuarios"
                    buttonText="Excel"/>
                <Typography className="text-lg col-span-12 md:col-span-1 text-center md:text-left">
                    hay: {todosUsuarios ? todosUsuarios.length: 0} Usuarios
                </Typography>
            </div>
          </div>

          <div className="overflow-x-scroll">
            <table className=" w-full table-auto " id="usuarios">
              <thead>
                <tr>
                  {["Cedula","Nombre y Apellido", "Tipo de Usuario", "Carrera","Ingresos", "Estatus"].map((el) => (
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
                  ({ nombres,apellidos, cedula, Tarjeta, estatus }, key) => {
                    const className = `py-3 px-5 ${
                      key == paginatedData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={cedula+key} className="hover:bg-blue-gray-50 " >
                        <td className={className}>
                          <Typography className="text-md font-semibold text-blue-gray-600">
                            {cedula}
                          </Typography>
                        </td>
                        <td  className={`${className} cursor-pointer`} onClick={()=>{historial_usuario(cedula)}}>
                        <Typography className="text-md font-semibold text-blue-gray-600">
                                {nombres+', '+apellidos}
                            </Typography>
                        </td>
                      
                        <td className={`${className} cursor-pointer`} onClick={()=>{historial_usuario(cedula)}}>
                            {Tarjeta.map((tarjeta) => (
                               <Typography key={tarjeta.iCardCode} className="text-sm font-semibold text-blue-gray-600">
                                  {tarjeta.Tipo.nombre}
                                </Typography>
                            ))} 
                        </td>

                        <td className={`${className} cursor-pointer`} onClick={()=>{historial_usuario(cedula)}}>
                            {Tarjeta.map((tarjeta) => (
                               <Typography key={tarjeta.iCardCode} className="text-sm font-semibold text-blue-gray-600">
                                  {tarjeta.Carrera ? tarjeta.Carrera.nombre : 'No posee Carrera'}
                                </Typography>
                            ))} 
                        </td>

                        <td className={`${className} cursor-pointer`} onClick={()=>{historial_usuario(cedula)}}>
                            {Tarjeta.map((tarjeta) => (
                               <Typography key={tarjeta.iCardCode} className="text-sm font-semibold text-blue-gray-600">
                                  {tarjeta.totalIngresos}
                                </Typography>
                            ))} 
                        </td>

                        <td className={className} >
                            <Switch
                              id={cedula}
                              value={estatus} // El valor del switch es controlado por el estado 'cambiar'
                              onChange={()=>{cambiarEstado(cedula)}} // Al hacer click, se invierte el valor de 'cambiar'
                              defaultChecked={estatus==1 ? true: false}
                            />
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
      {open && (
            <HistorialUsuario open={open} handleClose={handleClose} cedula={cedula} headers={headers}/>
          )}
    </div>
  );
}

export default Usuarios;
