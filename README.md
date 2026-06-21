👕 La Puerta Tees - Plataforma de Pedidos
Bienvenido al repositorio oficial de La Puerta Tees. Este proyecto es una aplicación web full-stack diseñada para gestionar pedidos de camisetas personalizadas, integrando un frontend dinámico y un backend robusto enfocado en la seguridad y la persistencia de datos.

🚀 Características Principales
Frontend: Interfaz moderna y adaptable con manejo de eventos para formularios.

Backend: API RESTful construida con Node.js y Express.

Seguridad: Implementación de capas de protección (Helmet, CORS, Express-Mongo-Sanitize, XSS-Clean) para prevenir vulnerabilidades comunes.

Persistencia: Base de datos NoSQL con MongoDB para el almacenamiento estructurado de pedidos.

🛠️ Requisitos Previos
Para ejecutar este proyecto en tu entorno local, asegúrate de tener instalado:

Node.js (versión 18 o superior recomendada).

MongoDB (instalado localmente o utilizando un servicio en la nube como MongoDB Atlas).

Gestor de paquetes: npm (se instala automáticamente con Node.js).

⚙️ Configuración y Ejecución
Sigue estos pasos para poner el proyecto en marcha:

1. Clonar el repositorio
Bash
git clone <url-de-tu-repositorio>
cd <nombre-de-tu-carpeta>
2. Instalar dependencias
Navega a la carpeta del backend y ejecuta el siguiente comando para descargar todas las librerías necesarias:

Bash
npm install
3. Iniciar MongoDB
Asegúrate de que tu servicio de MongoDB esté corriendo localmente. Por defecto, la aplicación busca la base de datos en:
mongodb://127.0.0.1:27017/lapuertatees

4. Ejecutar el Servidor
Inicia la API con el siguiente comando:

Bash
npm start
Verás un mensaje en consola confirmando: 🚀 API RESTful Corriendo de manera segura en http://127.0.0.1:3000.

5. Frontend
Para visualizar la interfaz, abre el archivo index.html utilizando la extensión Live Server de Visual Studio Code (asegúrate de que esté configurada en el puerto 5500 para que el CORS permita la comunicación con la API).

🔒 Arquitectura de Seguridad
La aplicación incluye middleware de seguridad para proteger los datos de tus usuarios:

Helmet: Asegura los encabezados HTTP.

Rate Limiting: Control de carga (10kb) para mitigar ataques DoS.

Sanitización: Filtrado de inyecciones NoSQL y ataques XSS (Cross-Site Scripting).

📝 Licencia
Este proyecto se encuentra bajo la licencia ISC