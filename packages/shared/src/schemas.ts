import { z } from 'zod';

export const ComponentCategorySchema = z.enum([
  'cpu',
  'motherboard',
  'ram',
  'storage',
  'psu',
  'gpu',
  'cooler',
  'thermal_paste',
  'cabinet'
]);

export const ComponentSchema = z.object({
  id: z.string().min(1),
  category: ComponentCategorySchema,
  name: z.string().min(1),
  brand: z.string().min(1),
  specs: z.record(z.union([z.string(), z.number(), z.boolean()])),
  description: z.string(),
  whyItMatters: z.string()
});

export const ConnectionSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  cableType: z.string().optional()
});

export const BuildModeSchema = z.enum(['guided', 'free', 'troubleshoot', 'quiz']);

export const BuildEventSchema = z.object({
  userId: z.string().optional(),
  sessionId: z.string().optional(),
  mode: BuildModeSchema,
  stepId: z.string().optional(),
  type: z.string().min(1),
  timestamp: z.union([z.string(), z.number()]),
  payload: z.record(z.unknown()).optional()
});

export const BuildEventBatchSchema = z.union([
  BuildEventSchema,
  z.array(BuildEventSchema).min(1)
]);

export const BuildStateSchema = z.object({
  placed: z.record(z.string(), z.string()),
  connections: z.array(ConnectionSchema),
  flags: z.object({
    thermalPasteApplied: z.boolean(),
  }).catchall(z.union([z.boolean(), z.string(), z.number(), z.undefined()])),
  stepLog: z.array(BuildEventSchema)
});

export const ValidationSeveritySchema = z.enum(['info', 'warning', 'error']);

export const ValidationResultSchema = z.object({
  ok: z.boolean(),
  severity: ValidationSeveritySchema,
  ruleId: z.string().min(1),
  message: z.string(),
  explanation: z.string()
});

export const BootStatusSchema = z.enum(['success', 'failure']);

export const BootResultSchema = z.object({
  status: BootStatusSchema,
  beepCode: z.string().optional(),
  postLines: z.array(z.string()),
  faults: z.array(z.string())
});

export const UserRoleSchema = z.enum(['student', 'teacher']);

export const RegisterInputSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: UserRoleSchema.default('student')
});

export type RegisterInput = z.infer<typeof RegisterInputSchema>;

export const LoginInputSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

export type LoginInput = z.infer<typeof LoginInputSchema>;

export const ApiErrorSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.unknown().optional()
  })
});
