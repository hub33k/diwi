import { z } from 'zod';
import { record } from '../utils';

export const userSchema = z.object({
  id: record('user'),

  // Core user fields
  email: z.string().email().min(1),
  username: z.string().min(1),

  name: z.string().optional(),
  avatarUrl: z.string().url().optional(),

  // Status and verification
  status: z
    .enum(['active', 'inactive', 'suspended', 'deleted'])
    .default('active'),
  isEmailVerified: z.boolean().default(false),
  emailVerifiedAt: z.coerce.date().optional(),

  // Timestamps
  createdAt: z.coerce.date().readonly(),
  updatedAt: z.coerce.date(),
  lastLoginAt: z.coerce.date().optional(),

  // Soft delete support
  deletedAt: z.coerce.date().optional(),
});
export type TUser = z.infer<typeof userSchema>;
