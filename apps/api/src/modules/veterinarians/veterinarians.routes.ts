import { Router } from 'express';
import { veterinariansController } from './veterinarians.controller';

export const veterinariansRoutes = Router();

/**
 * @swagger
 * /api/veterinarians:
 *   get:
 *     summary: Get all veterinarians
 *     tags: [Veterinarians]
 *     responses:
 *       200:
 *         description: List of veterinarians
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Veterinarian'
 */
veterinariansRoutes.get('/', veterinariansController.getAll);

