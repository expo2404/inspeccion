Documentación del Backend del Proyecto

1. Introducción

Este documento proporciona una visión general de las herramientas y tecnologías utilizadas en el desarrollo del backend de la aplicación web. La aplicación está diseñada para gestionar inspecciones de viviendas, con diferentes roles y funcionalidades. El backend se desarrolló utilizando Node.js con el framework Express.js, y se conecta a una base de datos MySQL utilizando el ORM Sequelize. Se utilizaron herramientas adicionales como MySQL Workbench para el diseño de la base de datos y dotenv para la gestión de variables de entorno.

2. Estructura del Proyecto

El backend sigue la arquitectura MVC (Model-View-Controller) para separar las responsabilidades:

Modelos: Representan las tablas de la base de datos utilizando Sequelize.

Controladores: Manejan la lógica de negocio y procesan las solicitudes HTTP.

Rutas: Definen los puntos de entrada para las solicitudes API.


3. Tecnologías Utilizadas

3.1. Node.js

Descripción: Entorno de ejecución de JavaScript del lado del servidor.

Funcionalidad: Proporciona el entorno para construir el backend y manejar las solicitudes HTTP.


3.2. Express.js

Descripción: Framework minimalista para Node.js que facilita el desarrollo de aplicaciones web y APIs.

Funcionalidad: Maneja las rutas y las respuestas a las solicitudes HTTP, asegurando una estructura clara y eficiente.


3.3. MySQL

Descripción: Sistema de gestión de bases de datos relacional.

Funcionalidad: Se utiliza para almacenar toda la información relacionada con los usuarios, viviendas, inspecciones y personas.


3.4. MySQL Workbench

Descripción: Herramienta visual para gestionar bases de datos MySQL.

Funcionalidad: Utilizada para diseñar la base de datos, crear las tablas y gestionar las relaciones entre ellas.


3.5. Sequelize (ORM)

Descripción: Librería ORM que facilita la interacción con la base de datos mediante modelos en JavaScript.

Funcionalidad: Simplifica la gestión de datos y permite crear consultas SQL sin escribir SQL directamente. Además, facilita la creación de migraciones para mantener la base de datos sincronizada.


3.6. dotenv

Descripción: Librería para la gestión de variables de entorno.

Funcionalidad: Permite almacenar configuraciones sensibles como credenciales de la base de datos y claves API en un archivo .env, manteniendo la seguridad.


4. Estructura de Carpetas

/backend
│
├── /config
│   └── database.js (configuración de la conexión a la base de datos)
│
├── /controllers
│   └── solicitudesController.js (controlador para manejar las solicitudes)
│
├── /models
│   ├── Usuario.js
│   ├── Persona.js
│   └── SolicitudInspeccion.js (modelos definidos con Sequelize)
│
├── /routes
│   └── solicitudes.js (rutas para gestionar las solicitudes)
│
├── /migrations
│   └── (archivos de migración de Sequelize)
│
├── .env (archivo para variables de entorno)
└── server.js (punto de entrada principal del backend)

5. Configuración de la Base de Datos

5.1. Creación de la Base de Datos en MySQL Workbench

1. Abrir MySQL Workbench.


2. Conectar al servidor MySQL y ejecutar el script SQL para crear la base de datos gestion_inspecciones y sus tablas.


3. Asegurar que las relaciones entre las tablas sean correctas y que los índices estén bien configurados.



5.2. Conexión a la Base de Datos en el Backend

La conexión a la base de datos se configura en el archivo config/database.js de la siguiente manera:

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

module.exports = sequelize;

Variables de entorno (almacenadas en .env):

DB_NAME=gestion_inspecciones
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost

6. Rutas y Controladores

6.1. Gestión de Solicitudes de Inspección

En el controlador de solicitudesController.js, se maneja la lógica para:

Buscar solicitudes: Verificar si una solicitud de inspección ya existe antes de crear una nueva.

Crear nuevas solicitudes: Si no existe, se registra la solicitud junto con los datos de la vivienda y la persona.


Ejemplo de cómo se maneja una solicitud:

const { SolicitudInspeccion, Persona, Vivienda } = require('../models');

const crearSolicitud = async (req, res) => {
    const { personaData, viviendaData, solicitudData } = req.body;
    
    try {
        // Buscar o crear la persona
        let persona = await Persona.findOne({ where: { email: personaData.email } });
        if (!persona) {
            persona = await Persona.create(personaData);
        }
        
        // Buscar o crear la vivienda
        let vivienda = await Vivienda.findOne({ where: { direccion: viviendaData.direccion } });
        if (!vivienda) {
            vivienda = await Vivienda.create(viviendaData);
        }
        
        // Crear la solicitud de inspección
        const solicitud = await SolicitudInspeccion.create({
            ...solicitudData,
            idPersona: persona.id,
            idVivienda: vivienda.id
        });
        
        res.status(201).json(solicitud);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la solicitud' });
    }
};

7. Migraciones con Sequelize

Las migraciones se utilizan para gestionar los cambios en la estructura de la base de datos. Los archivos de migración contienen instrucciones sobre cómo aplicar o revertir esos cambios.

Ejemplo de comando para crear una migración:

npx sequelize-cli migration:generate --name create-solicitudes-inspeccion

8. Uso de Git y GitHub

8.1. Repositorio Git

Se utiliza Git para el control de versiones del proyecto. Las ramas principales son:

main: Rama principal del proyecto.

backend: Rama donde se desarrollan las funcionalidades del backend.


Comandos básicos utilizados:

# Inicializar Git en el proyecto
git init

# Añadir archivos al área de preparación
git add .

# Realizar un commit
git commit -m "Mensaje del commit"

# Subir los cambios al repositorio remoto
git push origin backend

9. Conclusión

El uso de estas herramientas y recursos proporciona una base sólida para el desarrollo del backend del proyecto, facilitando la escalabilidad, la seguridad, y la colaboración entre desarrolladores. La combinación de Node.js, Express, Sequelize y MySQL ofrece un entorno flexible y eficiente para gestionar los datos de la aplicación.


---

Con esta estructura y documentación, el proyecto es fácil de entender para otros colaboradores, y las tecnologías están bien justificadas para su uso en un entorno de desarrollo profesional.

