import {
    CardBody,
    Avatar,
    Typography,
    Tabs,
    TabsHeader,
    Tab,
    Tooltip,
    Chip,
  } from "@material-tailwind/react";
import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    PencilIcon,
  } from "@heroicons/react/24/solid";
import { ProfileInfoCard } from "./../widgets/cards";
import { useEffect, useState } from "react";
import FechaInput from "./FechaInput";

export function PerfilUsuario({usuario,visitante,historialUsuario,fechaInicio,setFechaInicio,fechaFin,setFechaFin,obtener_tipo}) {
    const [value, setValue] = useState("1");

    const handleChange = (newValue) => {
        setValue(newValue);
    };  
    function formatoFecha(fecha) {
        const fechaObj = new Date(fecha);
        const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const fechaFormateada = fechaObj.toLocaleDateString('es-ES', opciones).replace('/', '-').replace('/', '-');
        const horaFormateada = fechaObj.toLocaleTimeString('es-ES', { hour12: true });
        return `${fechaFormateada} - ${horaFormateada}`;
    }

    return (
      <>
        {/* <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
          <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
        </div> */}
          <CardBody className="p-4">
            <div className="mb-10 md:flex items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <Avatar
                  src={usuario.avatar}
                  alt="bruce-mars"
                  size="xl"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {usuario.nombres+', '+usuario.apellidos}
                  </Typography>
                  <Typography
                    variant="small"
                    className={`font-bold `}
                  >
                    {usuario.estatus == 1 ? 'Activo' : 'Inactivo'}
                  </Typography>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:w-96">
                <Tabs  value={value} >
                  <TabsHeader>
                    <Tab value="1" onClick={()=>{handleChange('1')}}>
                      <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                      Informacion Basica
                    </Tab>
                    <Tab value="2" onClick={()=>{handleChange('2')}}>
                      <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                      Historial de Accesos
                    </Tab>
                  </TabsHeader>
                </Tabs>
              </div>
            </div>

            {/* INFORMACION DE PERFIL E HISTORIAL */}
            {value=="1" ? 
            <div className="gird-cols-1 mb-12 grid gap-12">             
              <ProfileInfoCard
                title="Informacion de Perfil"
                description={usuario.detalles}
                details={{
                   
                    ...(usuario.telefono ? { Telefono: usuario.telefono } : {}),
                    "Correo Ucab": usuario.correo,
                  }}
                  
                action={
                  <Tooltip content="Editar Detalle">
                    <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                  </Tooltip>
                }
              />
             
            </div>
            :
            <div className="gird-cols-1 mb-12 grid">
                    {/* FILTRO SEARCH */}
                    <div className='flex justify-start items-center -mb-5'>
                        <FechaInput
                            fechaInicio={fechaInicio}
                            fechaFin={fechaFin}
                            setFechaInicio={setFechaInicio}
                            setFechaFin={setFechaFin}
                            boton={true}
                            excel={true}
                            historialUsuario={historialUsuario}
                            usuario={usuario}
                        />
                       
                        <Typography className="flex justify-end mb-8">
                            {historialUsuario.length} Accesos 
                        </Typography>
                    </div>
                    <hr/>
                    {/* TABLE */}
                    <div className="overflow-x-scroll">
                        <table className="w-full min-w-[640px] table-auto" id="historial">
                            <thead>
                            <tr>
                                {visitante ? ["fecha", "Puerta de", "Estatus de Ingreso"].map((el) => (
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
                                ))
                                : ["fecha", "Ingreso Como", "Carrera", "Puerta de", "Estatus de Ingreso"]
                                .map((el) => (
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
                                {historialUsuario &&
                                    historialUsuario.map(
                                    ({ fecha,Carrera,tipo,tipo_id,estatus}, key) => {
                                        const className = `py-3 px-5 ${
                                        key == historialUsuario.length - 1
                                            ? ""
                                            : "border-b border-blue-gray-50"
                                        }`;

                                        return (
                                        <tr key={`${fecha}-${key}`}  className="hover:bg-blue-gray-50">
                                            <td className={className}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-semibold"
                                                >
                                                    {formatoFecha(fecha)}
                                                </Typography> 
                                            </td>
                                            {!visitante && (
                                                <>
                                                    <td className={className}>
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                        {obtener_tipo(tipo_id).toUpperCase()}
                                                    </Typography>
                                                    </td>

                                                    <td className={className}>
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                        {Carrera ? Carrera.nombre : 'VISITANTE'}
                                                    </Typography>
                                                    </td>
                                                </>
                                                )}

                                            
                                            <td className={className}>
                                                <Chip
                                                    variant="gradient"
                                                    color={tipo == 1 ? "blue" : "yellow"}
                                                    value={tipo == 1 ? "Entrada" : "Salida"}
                                                    className="py-0.5 px-2 text-[12px] font-medium"
                                                />
                                            </td>

                                            <td className={className}>
                                                <Chip
                                                    variant="gradient"
                                                    color={estatus == 1 ? "green" : "red"}
                                                    value={estatus == 1 ? "PASO" : estatus == 2 ? "NO PASO" : estatus == 3 ? "RECHAZADO" : ""}
                                                    className="py-0.5 px-2 text-[12px] font-medium"
                                                />
                                            </td>                               
                                        </tr>
                                        );
                                    }
                                    )}
                            </tbody>
                        </table>
                    </div>           
            </div>
            }

          </CardBody>
      </>
    );
}
  
export default PerfilUsuario;
  