import type { DeliveryAddress, WholesaleLine } from '../domain/commerce';

export interface FreightQuoteRequest { lines: WholesaleLine[]; deliveryAddress: DeliveryAddress }
export type FreightQuote =
  | { status: 'quote-required'; amount: null }
  | { status: 'available'; amount: number; currency: 'USD'; source: string };

export interface FreightProvider { quote(request: FreightQuoteRequest): Promise<FreightQuote> }

// Replace this adapter only after Artimex approves a carrier API or rate table.
export const freightProvider: FreightProvider = {
  async quote() { return { status: 'quote-required', amount: null }; }
};
