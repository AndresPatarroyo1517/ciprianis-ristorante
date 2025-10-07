# Cipriani’s Ristorante (Proyecto Fullstack)

Este proyecto es una **simulación de un restaurante virtual**, con backend en **Express.js** y frontend en **React**, que implementa toda la lógica de negocio —excepto la integración con métodos de pago reales—, como parte de un ejercicio de programación.  

El restaurante no existe en la vida real; el propósito es demostrar habilidades completas de desarrollo fullstack.

---

## 🏗️ Estructura del Proyecto

```
ciprianis-ristorante/
├── backend/ # Servidor Express y lógica de negocio
│ ├── controllers/ # Controladores de rutas
│ ├── models/ # Modelos de datos (puede ser un “fake database” o conexión)
│ ├── routes/ # Definición de rutas REST
│ ├── middleware/ # Middlewares (autenticación, validaciones, errores)
│ ├── app.js # Inicialización del servidor Express
│ └── package.json
├── frontend/ # Aplicación React
│ ├── src/
│ │ ├── components/ # Componentes React reutilizables
│ │ ├── pages/ # Vistas o páginas principales
│ │ ├── services/ # Llamadas HTTP al backend
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
└── README.md # Este archivo
```

---

## 🎯 Características / Funcionalidades Simuladas

Algunas de las funcionalidades principales que este proyecto ofrece:

- Gestión de menú del restaurante (listar platos, categoría, descripciones, precios).  
- CRUD de platos (crear, leer, actualizar, eliminar) (solo para uso administrativo).  
- Página de usuario: ver menú, agregar platos al carrito local, simular orden.  
- API REST que gestiona órdenes, estado de órdenes (pendiente, en preparación, completada).  
- Validaciones de datos al backend (campos obligatorios, formatos).  
- Manejo de errores y respuestas HTTP con códigos adecuados (400, 404, 500, etc.).  
- Comunicación frontend → backend usando fetch / axios.  
- Rutas protegidas para administración (simulación de autenticación básica, si la implementaste).  

*No incluye*: integración real con pasarelas de pago, procesamiento de pagos, manejo de tarjetas.

---

## 🛠 Tecnologías Utilizadas

- **Backend**  
  • Node.js + Express.js  
  • Middleware para manejo de errores y validaciones  
  • JSON como formato de intercambio de datos  

- **Frontend**  
  • React (con hooks, rutas, estado local o contexto)  
  • Axios o Fetch para interacción con la API  
  • CSS / Styled Components / Bootstrap / Tailwind (lo que hayas usado)  

---

## 📌 Cómo Ejecutar el Proyecto Localmente

### Backend

1. Ve al directorio `backend`:

```bash
   cd ciprianis-ristorante/backend
```
2. Instala dependencias:
```bash
 npm install
```
3. Ejecuta el servidor:
```bash
   npm start
```
Por defecto escuchará en http://localhost:PORT (el puerto que hayas configurado, por ejemplo 5000).


Frontend

Ve al directorio frontend:
```bash
   cd ciprianis-ristorante/frontend
```
2. Instala dependencias:
```bash
 npm install
```
3. Inicia la app React:
```bash
   npm start
```
La aplicación se abrirá normalmente en http://localhost:3000.
