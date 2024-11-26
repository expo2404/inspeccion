const Usuario = require('../models/usuario');
const SolicitudInspeccion = require('../models/solicitudInspeccion');

// Obtener todas las personas
exports.verficaUsuarios = async (req, res) => {
    try {
        const count = await Usuario.count();
        res.json({ usersExist: count > 0 });
      } catch (error) {
        res.status(500).json({ error: 'Error al verificar usuarios' });
      }
    
};



exports.obtenerInspectorPorSolicitud = async (req, res) => {
  const { id_solicitud } = req.params;
  console.log("hola  "+req.params);

  try {
    // Buscar la solicitud con el inspector asociado
    const solicitud = await SolicitudInspeccion.findOne({
      where: { id_solicitud },
      include: [
        {
          model: Usuario,
          attributes: ['id_usuario', 'nombres', 'apellidos', 'email'], // Campos necesarios
        },
      ],
    });

    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    // Retornar únicamente el inspector
    const inspector = solicitud.Usuario; // Aquí accedemos directamente a 'Usuario'
    if (!inspector) {
      return res.status(404).json({ message: 'No hay un inspector asignado a esta solicitud' });
    }

    res.status(200).json(inspector);
  } catch (error) {
    console.error('Error al obtener el inspector:', error);
    res.status(500).json({ error: 'Error al obtener el inspector' });
  }
};
