const viviendas=require('../models/viviendas')
const personas=require('../models/personas')
const solicitud=require('../models/solicitudInspeccion')
const { Op } = require('sequelize');
const moment=require('moment')




const filtroBusquedaForm=async (req,res) => {
    
    try {
        const { expediente, fecha, apellido } = req.body;

//         const whereClause = {};

//          if (expediente) {
//              whereClause.numero_expediente = { [Op.like]: `%${expediente}%` };
//          }
//         if (fecha) {
//             whereClause.fecha_solicitud = { [Op.like]: `%${fecha}%` };

//         }
//          if (apellido) {
//              whereClause['$Persona.apellido$'] = { $like: `%${apellido}%` }; // Asumiendo una relación con la tabla Personas
//          }
// console.log(whereClause)
// console.log(fecha)
const fechaForm=moment(fecha).format();
        const resultados = await solicitud.findAll({
            where: {
                 fecha_solicitud: { [Op.like]: `%${fechaForm}%` },
             }, 
            include: [
                {
                    model: viviendas,
                    include: [
                        {
                            model: personas,
                            where: {
                                apellido: { [Op.like]: `%${apellido}%` },
                            },
                            required: apellido ? true : false,
                        },
                    ],
                    // where: {
                    //     numero_expediente: { [Op.like]: `%${expediente}%` },
                    // },
                    // required: expediente ? true : false,
                },
            ],
             
        });
console.log(resultados)
        res.json(resultados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar las inspecciones' });
    }
}
module.exports={
    filtroBusquedaForm
}