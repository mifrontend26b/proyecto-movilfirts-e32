//   configuración de contenedores para Moulos DE Entorno importados
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const app = express();

// 1.  MIDDLEWARES PARA seguridad integral
app.use(helmet()); // Configura encabezados HTTP  contra exploits comunes

//  Se flexibiliza el CORS para aceptar tanto IP como localhost en el puerto de Live Server(conexion a base de datos Mongodb) mayor seguridad
app.use(cors({ 
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
})); 

app.use(express.json({ limit: '10kb' })); // Mitiga ataques de denegación de servicio (DoS) limitando el peso del payload.
app.use(mongoSanitize()); //  remueve selectores maliciosos para prevenir inyección NoSQL en MongoDB
app.use(xss()); // Sanitiza cualquier código HTML/Script 

// 2. CONEXIÓN A LA BASE DE DATOS MONGODB( seleccionada por el tipo de dato a almacenar)
const MONGO_URI = 'mongodb://127.0.0.1:27017/lapuertatees';
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Conexión blindada y exitosa establecida con MongoDB.'))
    .catch(err => console.error('❌ Falla crítica de conexión con la base de datos:', err));

// 3. DEFINICIÓN DEL ESQUEMA Y MODELO DE PERSISTENCIA
const EsquemaPedido = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    correo: { type: String, required: true, trim: true, lowercase: true },
    telefono: { type: String, required: true, trim: true },
    cantidad: { type: Number, required: true, min: 1 },
    detalles: { type: String, required: true, trim: true },
    fechaRegistro: { type: Date, default: Date.now }
});

const Pedido = mongoose.model('Pedido', EsquemaPedido);

// 4. MÉTODOS HTTP / ENRUTAMIENTO (ENDPOINTS)
app.post('/api/pedidos', async (req, res) => {
    try {
        const nuevoPedido = new Pedido(req.body);
        await nuevoPedido.save();
        res.status(201).json({ mensaje: 'Registro persistido de forma segura', id: nuevoPedido._id });
    } catch (error) {
        console.error('❌ Error al procesar la solicitud en el servidor:', error);
        res.status(400).json({ error: 'No se pudo procesar el pedido. Verifique los campos e intente de nuevo.' });
    }
});

// 5. ARRANCAR EL SERVIDOR
const PUERTO = 3000;
app.listen(PUERTO, () => {
    console.log(`🚀 API RESTful Corriendo de manera segura en http://127.0.0.1:${PUERTO}`);
});
//  este tipo de aplicacion de produccion baja a mediana requiere un  diseño de backend monolitico de un solo archivo.