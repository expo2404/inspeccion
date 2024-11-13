const solicitud = require('../models/solicitudInspeccion');
var personas=require('../models/personas');
var viviendas=require('../models/viviendas');
const Usuario = require('../models/usuario');
const SolicitudInspeccion = require('../models/solicitudInspeccion');
const Viviendas = require('../models/viviendas');

// Obtener todas las solicitudes
const solicitudesInspeccion = async (req, res) => {
    try {
        const solicitudes = await solicitud.findAll()
        res.status(200).json(solicitudes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener solicitudes' });
    }
};


const verSolicitudeInspeccion = async (req, res) => {
  var id_solicitud=req.params.id
  try {
      const solicitud = await SolicitudInspeccion.findOne({
        where: {
          id_solicitud: id_solicitud
        }
      })

      if (solicitud!=null){
        try{
        const viviendaConPersona = await Viviendas.findOne({
          where: {
            id_vivienda:solicitud.id_vivienda
          },
          include: personas
        });        
        if (viviendaConPersona!=null){
          return res.status(200).json({solicitud,viviendaConPersona});
        }else{
          return res.status(200).json(solicitud);        }
        
      } catch {error}{
        return res.status(500).json({ error: 'Error al intentar buscar vivienda' });
      }
      }else{
        return res.status(404).json({ error: 'Solicitud vacia' });
      }
      
      
  } catch (error) {
    return res.status(500).json({ error: 'Error al intentar buscar solicitud' });
  }
};

const crearSolicitudInspeccion = async (req, res) => {
  const { nombre, apellido, telefono, email, barrio, sector, manzana, lote,fechaSolicitud,estado,numero_expediente,tipo_solicitud } = req.body;

  try {
    // 1. Buscar si ya existe una vivienda con los datos proporcionados
    const viviendaExistente = await viviendas.findOne({
      where: {
        numero_expediente:numero_expediente,
        barrio: barrio,
        sector: sector,
        manzana: manzana,
        lote: lote
      },
      include: personas
    });

    if (viviendaExistente!=null) {
       
      // Si la vivienda ya existe, retornamos el registro
      const nuevaSolicitud = await solicitud.create({
        fecha_solicitud: fechaSolicitud,
        estado: estado,
        id_vivienda: viviendaExistente.id_vivienda,
        tipo_solicitud: tipo_solicitud,
        id_sector:1
      });
      return res.status(200).json({ message: 'La vivienda ya está registrada', vivienda: viviendaExistente });
    } else {
      
      // 2. Si no existe la vivienda, crear la persona
      const nuevaPersona = await personas.create({
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        email: email
      });
    

      // 3. Crear la vivienda asociada a la persona
      const nuevaVivienda = await viviendas.create({
       
        barrio: barrio,
        sector: sector,
        manzana: manzana,
        lote: lote,
        id_persona: nuevaPersona.dataValues.id_persona, // Relacionamos la vivienda con la persona recién creada
        numero_expediente:numero_expediente
      });
      const nuevaSolicitud = await solicitud.create({
        fecha_solicitud: fechaSolicitud,
        estado: estado,
        id_vivienda: nuevaVivienda.dataValues.id_vivienda,
        tipo_solicitud: tipo_solicitud,
        id_sector:1
      });
      return res.status(201).json({
        message: 'Vivienda y persona registradas correctamente',
        vivienda: nuevaVivienda,
        persona: nuevaPersona
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear la solicitud de inspección' });
  }
};


 // ELIMINA LA SOLICITUD

const EliminarSolicitud= async (req,res) => {
  var id_solicitud=req.params.id
  console.log(id_solicitud)
  try {
    // busca si existe algun registro con el id
    const encontrarSolicitud = await solicitud.findOne({
      where: { id_solicitud:id_solicitud },
      include: [{Usuario}],
      include: [
        {
            model:viviendas, 
            include: { model: personas } // Relación indirecta con Persona a través de Vivienda
        }
    ]
   
    
  });
  if (!encontrarSolicitud) {
       res.status(400).json({message:'no se ha encontrado registro'})
  }else{
    await encontrarSolicitud.destroy();
    res.json({ message: 'Solicitud de inspección eliminada correctamente.' });
   
  }
 
 
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error al eliminar la solicitud de inspección' });
  }
}

// ACTUALIZA LA SOLICITUD

const actualizarInspeccion=async (req,res) => {
  const{idSolicitud,fechaSolicitud}=req.body
  
  try {
    // busca si existe algun registro con el id 
    const encontrarSolicitud=await solicitud.findOne({
      where:{id_solicitud:idSolicitud},
      include: [{model:Usuario}],
      include:[
        {
          model:viviendas,
          include:[{model:personas}]
        }
      ]
    })
    console.log(encontrarSolicitud)
    if (!encontrarSolicitud) {
      res.status(400).json({message:'no se ha encontrado registro'})
    }else{
      SolicitudInspeccion.fecha_solicitud=fechaSolicitud
      await solicitud.save()
      res.json({ message: 'Solicitud de inspección actualizada correctamente.' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error al actualizar la solicitud de inspección' });
  }
}
module.exports = {
  crearSolicitudInspeccion,
  solicitudesInspeccion,
  EliminarSolicitud,
  actualizarInspeccion,
  verSolicitudeInspeccion
};
























