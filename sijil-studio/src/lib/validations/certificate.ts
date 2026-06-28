import { z } from 'zod';

/**
 * Certificate validation schemas
 * Based on docs/frontend-discovery/05-forms-spec.md
 */

export const certificateSchema = z.object({
  issuerId: z.string().uuid('Invalid issuer ID'),
  recipientId: z.string().uuid('Invalid recipient ID'),
  issueDate: z.string().refine(
    (date) => !isNaN(Date.parse(date)),
    'Invalid date format'
  ),
  expiryDate: z
    .string()
    .optional()
    .refine(
      (date) => !date || !isNaN(Date.parse(date)),
      'Invalid expiry date format'
    ),
  status: z.enum(['active', 'revoked', 'expired', 'pending']).default('pending'),
  metadata: z.record(z.unknown()).optional(),
});

export const createCertificateSchema = certificateSchema.omit({}).extend({
  recipientEmail: z.string().email('Invalid email address'),
  recipientName: z.string().min(2, 'Recipient name must be at least 2 characters'),
});

export const updateCertificateSchema = certificateSchema.partial();

export const revokeCertificateSchema = z.object({
  reason: z.string().min(10, 'Reason must be at least 10 characters').optional(),
});

// Type exports
export type CertificateFormData = z.infer<typeof certificateSchema>;
export type CreateCertificateFormData = z.infer<typeof createCertificateSchema>;
export type UpdateCertificateFormData = z.infer<typeof updateCertificateSchema>;
export type RevokeCertificateFormData = z.infer<typeof revokeCertificateSchema>;
