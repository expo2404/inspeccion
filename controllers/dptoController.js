const solicitud = require('../models/solicitudInspeccion');
var viviendas=require('../models/viviendas');


const obtenerDptos = async (req, res) => {
    var id_solicitud=req.params.id_solicitud
    const API_URL = "https://apis.datos.gob.ar/georef/api/departamentos?provincia=Neuquen&orden=nombre&campos=estandar&inicio=0&formato=json"
         
    try{
        const respuesta = await fetch(API_URL, {
            method: 'GET',
            headers:{'Content-Type': 'application/json'},
            // body:JSON.({})
        });
        const data = await respuesta.json();
        console.log(data.departamentos);
        res.status(respuesta.status).json(data.departamentos);
        
    } catch (error){
        console.error('Error al intentar llamar a georefar', error);
        res.status(500).json({message: 'Error al intentar llamar georefar'})
    }

  };

module.exports = {
    obtenerDptos
};