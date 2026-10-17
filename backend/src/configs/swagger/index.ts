import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bookabase API',
      version: '1.0.0',
      description: 'API for the Bookabase catalog',
    },
    tags: [
      {
        name: 'Items',
        description: 'Items management',
      },
    ],
  },
  apis: ['./src/routes/**/*.ts'],
};

const swaggerDocs = swaggerJsdoc(options);

export default swaggerDocs;