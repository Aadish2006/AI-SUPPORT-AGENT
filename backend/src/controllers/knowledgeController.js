import { documentIngestionService } from '../services/documentIngestionService.js';
import { ApiError } from '../utils/ApiError.js';
import { created, ok } from '../utils/ApiResponse.js';

export const knowledgeController = {
  async uploadDocument(req, res) {
    if (!req.file) {
      throw new ApiError(400, 'A file is required.');
    }

    const document = await documentIngestionService.ingestUploadedDocument({
      file: req.file,
      title: req.validated.body.title,
      sourceType: req.validated.body.sourceType
    });

    return created(res, {
      documentId: document.id,
      title: document.title,
      sourceType: document.source_type,
      chunksCreated: document.chunks_count,
      status: 'indexed'
    });
  },

  async createFaq(req, res) {
    const document = await documentIngestionService.ingestFaq(req.validated.body);
    return created(res, {
      documentId: document.id,
      chunksCreated: document.chunks_count,
      status: 'indexed'
    });
  },

  async listDocuments(_req, res) {
    const documents = await documentIngestionService.listDocuments();
    return ok(res, documents);
  },

  async deleteDocument(req, res) {
    await documentIngestionService.deleteDocument(req.validated.params.documentId);
    return ok(res, { message: 'Document removed from knowledge base.' });
  }
};
