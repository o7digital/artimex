export type FormKind = 'wholesale' | 'retail-support' | 'careers' | 'contact';
export type FormResult = { status: 'not-configured' };

export interface FormGateway { submit(kind: FormKind, data: Record<string, unknown>): Promise<FormResult> }

// No form backend is configured. UI forms must never claim a successful submission.
export const formGateway: FormGateway = {
  async submit() { return { status: 'not-configured' }; }
};
