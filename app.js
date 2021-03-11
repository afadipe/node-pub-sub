require('dotenv').config()
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const errorHandler = require('./middleware/error');

// Route files
const ordersRoute = require('./routes/orders');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

const app = express();
// Body parser
app.use(express.json());
// Set security headers
app.use(helmet());
// Prevent XSS attacks
app.use(xss());
// Prevent http param pollution
app.use(hpp());
// Enable CORS
app.use(cors());

// Require our routes into the application.
app.get('/', (req, res) => {
  res.send({
      status: true,
      message: "You probably shouldn't be here, but...",
      data: {
        service: "nodejs pub-sub api",
        version: "1.0"
      }
    });
});

// Mount routers
app.use('/api/v1/orders', ordersRoute);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT,console.log( `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});