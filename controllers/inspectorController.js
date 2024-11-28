const Usuario = require('../models/usuario');
const Rol = require('../models/rol');
const SolicitudInspeccion = require('../models/solicitudInspeccion');

exports.obtenerInspectores = async (req, res) => {
  try {
    const inspectores = await Usuario.findAll({
      include: {
        model: Rol,
        as: 'roles',
        where: { nombre: 'Inspector' } // Filtra por el rol "Inspector"
      }
    });

    res.json(inspectores);
  } catch (error) {
    console.error('Error al obtener los inspectores:', error);
    res.status(500).json({ message: 'Error al obtener los inspectores' });
  }
};



exports.asignarInspector = async (req, res) => {
    const { idSolicitud, idInspector } = req.body; // Datos enviados desde el cliente
  
    try {
      // Actualiza el campo `id_inspector` en la solicitud
      const resultado = await SolicitudInspeccion.update(
        { id_inspector: idInspector }, // Campo a actualizar
        { where: { id_solicitud: idSolicitud } } // Condición para la actualización
      );
  
      if (resultado[0] === 0) {
        return res.status(404).json({ message: 'Solicitud no encontrada' });
      }
  
      res.status(200).json({ message: 'Inspector asignado con éxito' });
    } catch (error) {
      console.error('Error al asignar inspector:', error);
      res.status(500).json({ message: 'Error al asignar inspector' });
    }
}


exports.verificarAccesoInspector = async (req, res) => {
  const { id_solicitud, id_inspector } = req.params;

  try {
    const solicitud = await SolicitudInspeccion.findOne({
      where: { id_solicitud, id_inspector },
    });

    if (solicitud) {
      return res.status(200).json(true); // Tiene acceso
    } else {
      return res.status(200).json(false); // No tiene acceso
    }
  } catch (error) {
    console.error('Error al verificar acceso:', error);
    res.status(500).json({ message: 'Error interno' });
  }
};
