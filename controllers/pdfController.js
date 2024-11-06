const solicitud = require('../models/solicitudInspeccion');
var viviendas=require('../models/viviendas');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Generar un pdf
const generarPdf = async (req, res) => {
    var id_solicitud=req.params.id_solicitud
    const API_URL = "https://api.pdfmonkey.io/api/v1"
    const MAX_INTENTOS = 5;
    let intentos = 0;

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
        
        try{ // Primera llamada para crear el documento y obtener el ID
            const respuesta = await fetch(API_URL+"/documents", {
                method: 'POST',
                headers:{'Content-Type': 'application/json','Authorization': `Bearer ${process.env.PDF_TOKEN}`},
                body:JSON.stringify(bodyApi)
            });
            const dataDocumento = await respuesta.json();
            idDocumento = dataDocumento.document.id;

            if (!idDocumento){ //
                return res.status(500).json({ message: 'No se pudo obtener el ID del documento.' });
            }

            while (intentos <= MAX_INTENTOS){
                intentos++;
                console.log(`Intento ${intentos}: verificando el estado del documento...`);

                await delay(1000); //Espero 1 segundo
                const respuestaGet= await fetch(API_URL+"/document_cards/"+idDocumento, { //Llamada GET
                    method: 'GET',
                    headers:{'Content-Type': 'application/json','Authorization': `Bearer ${process.env.PDF_TOKEN}`}
                });

                console.log("res: ", respuestaGet);

                dataGet = await respuestaGet.json();

                if(dataGet.document_card.status ==="success"){
                    return res.status(200).json (dataGet.document_card.download_url);//Devuelve el link de descarga
                }
            }
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