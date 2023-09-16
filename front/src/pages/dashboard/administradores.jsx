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
  import AgregarVisitante from "./../../components/graficos/AgregarVisitante";
  
  function Administradores() {
    const [administradores, setAdministradores] = useState([]);
    const [administrador, setAdministrador] = useState(null);
    const [nuevo, setNuevo] = useState(true);
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
    function obtener_administradores() {
      axios
        .get("/administradores/todos_administradores", { headers: headers,})
        .then((response) => {
          console.log(response.data)
          setAdministradores(response.data);
        });
    }
  
    useEffect(()=>{
      obtener_administradores();
    },[nuevo])
  
    function agregar_administrador(administrador=null){
      setAgregar(true);
      if(administrador){
          setNuevo(false)
          setAdministrador(administrador)
      }
    }
  
    const handleClose = () => {
      setNuevo(true);
      setOpen(false);
      setAgregar(false);
      setAdministrador(null);
    };
  
  
    return (
      <div className="mt-12 mx-3 md:mx-8 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Lista de Administradores
            </Typography>
          </CardHeader>
          <CardBody className=" px-0 pt-0 pb-2">

            <div className="overflow-x-scroll">
              <table className=" w-full table-auto" id="visitantes">
                <thead>
                  <tr>
                    {["Nick","Nombre y Apellido",  "Permisos","Estatus","Acciones"].map((el) => (
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
                  {administradores && administradores.map(
                    ({ id, nombre_completo, nick, estatus, permisos }, key) => {
                      const className = `py-3 px-5 ${
                        key === administradores.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <tr key={id} className="hover:bg-blue-gray-50 cursor-pointer">
                          <td className={className}>
                            <Typography className="text-lg w-full font-semibold text-blue-gray-600">
                              {nombre_completo}
                            </Typography>
                          </td>

                          <td className={className}>
                            <Typography className="text-lg font-semibold text-blue-gray-600">
                              {nick}
                            </Typography>
                          </td>

                          <td className={className}>
                            {permisos.map((permiso) => (
                              <>
                              <span key={permiso.id}>{permiso.nombre}</span><br/>
                              </>
                            ))}
                          </td>
                 
                          <td className={className} >
                            <Chip
                              variant="gradient"
                              color={estatus == 1 ? "green" : "red"}
                              value={estatus == 1 ? "ACTIVO" : "INACTIVO"}
                              className="py-0.5 px-2 text-[11px] font-medium"
                            />
                          </td>

                          <td className={className}>
                            <button className="bg-blue-500 font-semibold rounded-lg p-3 text-white cursor-pointer" onClick={() => { agregar_administrador(id) }}>
                              Editar
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>

              </table>
            </div>
         
          </CardBody>
        </Card>
  
        {/* MODAL PARA AGREGAR VISITANTE */}
        
      </div>
    );
  }
  
  export default Administradores;
  