import { Router } from 'express';
import multer from 'multer';
import { env } from '../config/env.js';
import { knowledgeController } from '../controllers/knowledgeController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { validateRequest } from '../middleware/validateRequest.js';
import {
  deleteDocumentSchema,
  faqSchema,
  uploadDocumentSchema
} from '../validators/knowledge.validator.js';

const upload = multer({
  dest: env.uploadDir,
  limits: { fileSize: 10 * 1024 * 1024 }
});

export const knowledgeRoutes = Router();

knowledgeRoutes.post(
  '/documents',
  upload.single('file'),
  validateRequest(uploadDocumentSchema),
  asyncHandler(knowledgeController.uploadDocument)
);

knowledgeRoutes.post(
  '/faqs',
  validateRequest(faqSchema),
  asyncHandler(knowledgeController.createFaq)
);

knowledgeRoutes.get('/documents', asyncHandler(knowledgeController.listDocuments));

knowledgeRoutes.delete(
  '/documents/:documentId',
  validateRequest(deleteDocumentSchema),
  asyncHandler(knowledgeController.deleteDocument)
);
