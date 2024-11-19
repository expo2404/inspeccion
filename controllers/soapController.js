const soap = require("soap");

//  Funcion GET getExpedientes

exports.getExpedientes = async (req, res) => {
  const url = "http://localhost:8001/viviendaService?wsdl"; 

 console.log("Url:  "+url);
  try {
    const client = await soap.createClientAsync(url);
    console.log(client.describe());

    const args = { placeholder: "" };

    const [resultado] = await client.ObtenerListadoViviendasAsync(args);

    const listadoViviendas = resultado.listado.listado;

    res.json(listadoViviendas);

  } catch (error) {
    console.error("Error al consultar el servicio SOAP:", error);
    res.status(500).json({ error: "Error al obtener el listado de viviendas" });
  }
};

//  Funcion POST getVivienda

exports.getVivienda = async (req, res) => {
   const { expediente } = req.body; // Recibe el número de expediente como query param
   const url = "http://localhost:8001/viviendaService?wsdl"; 
  
   console.log("Url:  "+url);
    try {
      const client = await soap.createClientAsync(url);
      console.log(client.describe());
      const args = { id: expediente };
      console.log("argumentos enviados al soap: ", args);

      const [result] = await client.ObtenerViviendaAsync(args);

      console.log("Respuesta:  "+result);
  
      res.json(result);
  
    } catch (error) {
      console.error("Error al consultar el servicio SOAP:", error);
      res.status(500).json({ error: "Error al consultar informacio de Vivienda" });
    }
  };
  
