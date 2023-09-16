import { useEffect, useState } from "react";
import axios from './../../api/axios'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Switch,
  } from "@material-tailwind/react";
import { useSnackbar } from "notistack";
import AgregarAdministrador from "../../components/AgregarAdministrador";
  
  function Administradores() {
    const { enqueueSnackbar } = useSnackbar();
    const [administradores, setAdministradores] = useState([]);
    const [administrador, setAdministrador] = useState(null);
    const [nuevo, setNuevo] = useState(true);
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
        .get("/administradores/todos_administradores", { headers: headers})
        .then((response) => {
          setAdministradores(response.data);
        });
    }
  
    useEffect(()=>{
      obtener_administradores();
    },[nuevo])
  
    function agregar_administrador(id=null,nombre_completo=null,nick=null,permisos=[]){
      const administrador = {id,nombre_completo,nick,permisos}
      setAgregar(true);
      if(administrador.id){
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
  
    function cambiarEstado(id){
      console.log(id)
      axios.get('administradores/cambiar_estado/'+id,{headers:headers}).
      then((response)=>{
          enqueueSnackbar('Estatus actualizado con exito', { variant: 'success' });
      })
    }
  
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
                        <tr key={key} className="hover:bg-blue-gray-50">
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
                              <div key={permiso.id}>
                                <span >{permiso.nombre}</span>
                              </div>
                            ))}
                          </td>
                 
                          <td className={className} >
                            <Switch
                              id={id}
                              value={estatus} // El valor del switch es controlado por el estado 'cambiar'
                              onChange={()=>{cambiarEstado(id)}} // Al hacer click, se invierte el valor de 'cambiar'
                              defaultChecked={estatus==1 ? true: false}
                            />
                          </td>

                          <td className={className}>
                            <button className="bg-blue-500 font-semibold rounded-lg p-3 text-white cursor-pointer" onClick={() => { agregar_administrador(id,nombre_completo,nick,permisos) }}>
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
      {agregar && (
          <AgregarAdministrador nuevo={nuevo} open={agregar} administrador={administrador} handleClose={handleClose} obtener_administradores={obtener_administradores} headers={headers}/>
      )}
      </div>
    );
  }
  
  export default Administradores;
  