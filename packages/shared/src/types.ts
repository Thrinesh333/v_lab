/**
 * @vlab/shared - Core Shared Contracts and Types
 * Virtual Laboratory for Computer Hardware Assembly
 */

export const API_PREFIX = '/api/v1' as const;

export type ComponentCategory =
  | 'cpu'
  | 'motherboard'
  | 'ram'
  | 'storage'
  | 'psu'
  | 'gpu'
  | 'cooler'
  | 'thermal_paste'
  | 'cabinet';

export type SlotId = string;
export type ComponentId = string;

export interface Component {
  id: ComponentId;
  category: ComponentCategory;
  name: string;
  brand: string;
  specs: Record<string, string | number | boolean>;
  description: string;
  whyItMatters: string;
}

export interface Connection {
  from: string;
  to: string;
  cableType?: string;
}

export interface BuildFlags {
  thermalPasteApplied: boolean;
  [key: string]: boolean | string | number | undefined;
}

export type BuildMode = 'guided' | 'free' | 'troubleshoot' | 'quiz';

export interface BuildEvent {
  userId?: string;
  sessionId?: string;
  mode: BuildMode;
  stepId?: string;
  type: string;
  timestamp: string | number;
  payload?: Record<string, unknown>;
}

export interface BuildState {
  placed: Record<SlotId, ComponentId>;
  connections: Connection[];
  flags: {
    thermalPasteApplied: boolean;
    [key: string]: boolean | string | number | undefined;
  };
  stepLog: BuildEvent[];
}

export type ValidationSeverity = 'info' | 'warning' | 'error';

export interface ValidationResult {
  ok: boolean;
  severity: ValidationSeverity;
  ruleId: string;
  message: string;
  explanation: string;
}

export type BootStatus = 'success' | 'failure';

export interface BootResult {
  status: BootStatus;
  beepCode?: string;
  postLines: string[];
  faults: string[];
}

export type UserRole = 'student' | 'teacher';

export interface UserSafe {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string | Date;
}

export interface AuthTokens {
  token: string;
}

export interface AuthResponse {
  user: UserSafe;
  token: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiResponseError {
  error: ApiError;
}
