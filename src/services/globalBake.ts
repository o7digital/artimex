export interface GlobalBakeOrderDraft { channel: 'retail' | 'wholesale'; lines: Array<{ productId: string; quantity: number }> }
export type GlobalBakeResult = { status: 'not-configured' };

export interface GlobalBakeGateway { createOrderDraft(order: GlobalBakeOrderDraft): Promise<GlobalBakeResult> }

// Corporate UI boundary for the future GlobalBake integration.
export const globalBakeGateway: GlobalBakeGateway = {
  async createOrderDraft() { return { status: 'not-configured' }; }
};
