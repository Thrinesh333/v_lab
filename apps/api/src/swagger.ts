import swaggerUi from 'swagger-ui-express';
import type { Express } from 'express';

export const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Virtual Lab - Computer Hardware Assembly API',
    version: '1.0.0',
    description:
      'Backend REST API for PC Assembly Virtual Laboratory (Interactive learning, simulation, quizzes, and troubleshooting).'
  },
  servers: [
    {
      url: '/api/v1',
      description: 'API v1'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      ApiError: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              code: { type: 'string' },
              message: { type: 'string' },
              details: { type: 'object' }
            },
            required: ['code', 'message']
          }
        }
      },
      UserSafe: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          email: { type: 'string', format: 'email' },
          name: { type: 'string' },
          role: { type: 'string', enum: ['student', 'teacher'] },
          createdAt: { type: 'string', format: 'date-time' }
        }
      },
      AuthResponse: {
        type: 'object',
        properties: {
          user: { $ref: '#/components/schemas/UserSafe' },
          token: { type: 'string' }
        }
      },
      RegisterInput: {
        type: 'object',
        required: ['email', 'password', 'name'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 },
          name: { type: 'string', minLength: 2 },
          role: { type: 'string', enum: ['student', 'teacher'], default: 'student' }
        }
      },
      LoginInput: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string' }
        }
      },
      BuildEvent: {
        type: 'object',
        required: ['mode', 'type', 'timestamp'],
        properties: {
          userId: { type: 'string' },
          sessionId: { type: 'string' },
          mode: { type: 'string', enum: ['guided', 'free', 'troubleshoot', 'quiz'] },
          stepId: { type: 'string' },
          type: { type: 'string' },
          timestamp: { oneOf: [{ type: 'string' }, { type: 'number' }] },
          payload: { type: 'object' }
        }
      }
    }
  },
  paths: {
    '/health': {
      get: {
        summary: 'Health Check',
        responses: {
          '200': {
            description: 'API is healthy and online',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'ok' },
                    timestamp: { type: 'string', format: 'date-time' },
                    uptime: { type: 'number' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/auth/register': {
      post: {
        summary: 'Register a new user account',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterInput' }
            }
          }
        },
        responses: {
          '201': {
            description: 'User registered successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthResponse' }
              }
            }
          },
          '400': { $ref: '#/components/responses/ValidationError' },
          '409': { description: 'Email already registered' }
        }
      }
    },
    '/auth/login': {
      post: {
        summary: 'Log in with email and password',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginInput' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthResponse' }
              }
            }
          },
          '401': { description: 'Invalid credentials' }
        }
      }
    },
    '/auth/me': {
      get: {
        summary: 'Get current authenticated user profile',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Profile information retrieved',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    user: { $ref: '#/components/schemas/UserSafe' }
                  }
                }
              }
            }
          },
          '401': { description: 'Unauthorized' }
        }
      }
    },
    '/events': {
      post: {
        summary: 'Log build or lab telemetry events (single or batch)',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                oneOf: [
                  { $ref: '#/components/schemas/BuildEvent' },
                  {
                    type: 'array',
                    items: { $ref: '#/components/schemas/BuildEvent' }
                  }
                ]
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Events recorded successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    count: { type: 'number' },
                    message: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  responses: {
    ValidationError: {
      description: 'Validation failed on request body',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ApiError' }
        }
      }
    }
  }
};

export function setupSwagger(app: Express): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));
  app.get('/api-docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(openApiSpec);
  });
}
