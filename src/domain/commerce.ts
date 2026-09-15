export const RETAIL_LIMITS = { bakedUnits: 24, unbakedBoxes: 2 } as const;

export type RetailFormat = 'baked' | 'unbaked';
export type WholesaleUnit = 'case' | 'pallet';

export interface DeliveryAddress {
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
}

export interface WholesaleLine {
  productId: string;
  unit: WholesaleUnit;
  quantity: number;
}

export function retailQuantityError(format: RetailFormat, quantity: number): string | null {
  const maximum = format === 'baked' ? RETAIL_LIMITS.bakedUnits : RETAIL_LIMITS.unbakedBoxes;
  if (!Number.isInteger(quantity) || quantity < 0) return 'Quantity must be a whole number of zero or more.';
  if (quantity > maximum) return `Maximum quantity is ${maximum}.`;
  return null;
}

export function wholesaleQuantityError(quantity: number): string | null {
  if (!Number.isInteger(quantity) || quantity < 1) return 'Enter a whole number of one or more.';
  return null;
}

export function deliveryAddressErrors(address: DeliveryAddress): Partial<Record<keyof DeliveryAddress, string>> {
  const errors: Partial<Record<keyof DeliveryAddress, string>> = {};
  for (const key of ['street', 'city', 'region', 'postalCode', 'country'] as const) {
    if (!address[key].trim()) errors[key] = 'Required';
  }
  return errors;
}
