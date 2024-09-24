const solicitud = require('../models/solicitudInspeccion');
var personas=require('../models/personas');
var viviendas=require('../models/viviendas')

// Obtener todas las solicitudes
const solicitudesInspeccion = async (req, res) => {
    try {
        const solicitudes = await solicitud.findAll()
        res.status(200).json(solicitudes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener solicitudes' });
    }
};

// Crear una nueva solicitud
// exports.createSolicitud = async (req, res) => {
//     try {
//         console.log(req.body)
        
//         var buscarViviendas=[]
//         buscarViviendas=await viviendas.findAll()
      
//      if (buscarViviendas.length==0) {
//         var nuevaPersona=await personas.create()
//         const nuevaSolicitud = await solicitud.create(req.body);
//         res.status(201).json(nuevaSolicitud);
//         console.log('vaciono hay datos')
//      }
        
//     } catch (error) {
//         res.status(500).json({ error: 'Error al crear la solicitud' });
//         console.log(error)
//     }
// };
const crearSolicitudInspeccion = async (req, res) => {
  const { nombre, apellido, telefono, email, barrio, sector, manzana, lote,fechaSolicitud,estado,numeroExpediente,tipo_Solicitud } = req.body;

  try {
    // 1. Buscar si ya existe una vivienda con los datos proporcionados
    const viviendaExistente = await viviendas.findOne({
      where: {
        barrio: barrio,
        sector: sector,
        manzana: manzana,
        lote: lote
      },
      include: personas
    });

    if (viviendaExistente!=null) {
        console.log(tipo_Solicitud)
      // Si la vivienda ya existe, retornamos el registro
      const nuevaSolicitud = await solicitud.create({
        fecha_solicitud: fechaSolicitud,
        estado: estado,
        id_vivienda: viviendaExistente.id_vivienda,
        numero_expediente: numeroExpediente,
        tipo_solicitud: tipo_Solicitud,
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
        id_persona: nuevaPersona.dataValues.id_persona // Relacionamos la vivienda con la persona recién creada
      });
      const nuevaSolicitud = await solicitud.create({
        fecha_solicitud: fechaSolicitud,
        estado: estado,
        id_vivienda: nuevaVivienda.dataValues.id_vivienda,
        numero_expediente: numeroExpediente,
        tipo_solicitud: tipo_Solicitud,
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

module.exports = {
  crearSolicitudInspeccion,
  solicitudesInspeccion
};
























