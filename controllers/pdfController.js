const solicitud = require('../models/solicitudInspeccion');
var viviendas=require('../models/viviendas');

// Generar un pdf
const generarPdf = async (req, res) => {
    var id_solicitud=req.params.id_solicitud
    const API_URL = "https://api.pdfmonkey.io/api/v1/documents"
    try {
        const unaSolicitud = await solicitud.findOne({
            where: {
                id_solicitud:id_solicitud
            },
            include: viviendas
        })
        const bodyApi = {};
        bodyApi.document = {};
        bodyApi.document.document_template_id = process.env.TEMPLATE_ID;

        bodyApi.document.payload = {
        expe: unaSolicitud.Vivienda.numero_expediente,
        fecha: unaSolicitud.fecha_solicitud,
        barrio: unaSolicitud.Vivienda.barrio,
        sector: unaSolicitud.Vivienda.sector,
        manzana: unaSolicitud.Vivienda.manzana
        };

        bodyApi.document.meta = {};
        bodyApi.document.meta._filename = "Solicitud_"+unaSolicitud.Vivienda.numero_expediente+".pdf";
        bodyApi.document.status= "pending" //Estoy creando un documento con "pending"
        
        try{
            const respuesta = await fetch(API_URL, {
                method: 'POST',
                headers:{'Content-Type': 'application/json','Authorization': `Bearer ${process.env.PDF_TOKEN}`},
                body:JSON.stringify(bodyApi)
            });
            const data = await respuesta.json();
            res.status(respuesta.status).json(data.document.preview_url); //Devuelve la preview, no el link de descarga
        } catch (error){
            console.error('Error al intentar llamar API PDF', error);
            res.status(500).json({message: 'Error al intentar llamar API PDF'})
        }

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener solicitud' });
    }
  };

module.exports = {
generarPdf
};