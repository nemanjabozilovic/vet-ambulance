import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Veterinary Ambulance API',
      version: '1.0.0',
      description: 'API documentation for Veterinary Ambulance application',
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Veterinarian: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Veterinarian unique identifier',
            },
            firstName: {
              type: 'string',
              description: 'First name of the veterinarian',
            },
            lastName: {
              type: 'string',
              description: 'Last name of the veterinarian',
            },
            specialty: {
              type: 'string',
              description: 'Veterinarian specialization',
            },
          },
          required: ['id', 'firstName', 'lastName', 'specialty'],
        },
        Pet: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Pet unique identifier',
            },
            name: {
              type: 'string',
              description: 'Pet name',
            },
            ownerName: {
              type: 'string',
              description: 'Owner name',
            },
            birthDate: {
              type: 'string',
              format: 'date-time',
              description: 'Pet birth date',
            },
            isVaccinated: {
              type: 'boolean',
              description: 'Vaccination status',
            },
            imageUrl: {
              type: 'string',
              format: 'uri',
              description: 'Pet image URL',
            },
            isActive: {
              type: 'boolean',
              description: 'Active status (soft delete flag)',
            },
            veterinarianId: {
              type: 'string',
              format: 'uuid',
              description: 'Assigned veterinarian ID',
            },
            veterinarian: {
              $ref: '#/components/schemas/Veterinarian',
            },
          },
          required: [
            'id',
            'name',
            'ownerName',
            'birthDate',
            'isVaccinated',
            'imageUrl',
            'isActive',
            'veterinarianId',
            'veterinarian',
          ],
        },
        CreatePetInput: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              minLength: 1,
              maxLength: 100,
            },
            ownerName: {
              type: 'string',
              minLength: 1,
              maxLength: 100,
            },
            birthDate: {
              type: 'string',
              format: 'date-time',
            },
            isVaccinated: {
              type: 'boolean',
              default: false,
            },
            imageUrl: {
              type: 'string',
              format: 'uri',
            },
            veterinarianId: {
              type: 'string',
              format: 'uuid',
            },
          },
          required: ['name', 'ownerName', 'birthDate', 'imageUrl', 'veterinarianId'],
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                },
                code: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [
    './src/**/*.routes.ts',
    './src/**/*.controller.ts',
  ],
};

export const swaggerSpec = swaggerJsdoc(options);

