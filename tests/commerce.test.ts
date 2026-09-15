import assert from 'node:assert/strict';
import test from 'node:test';
import { RETAIL_LIMITS, deliveryAddressErrors, retailQuantityError, wholesaleQuantityError } from '../src/domain/commerce.ts';

test('baked retail quantity accepts 24 and rejects 25', () => {
  assert.equal(RETAIL_LIMITS.bakedUnits, 24);
  assert.equal(retailQuantityError('baked', 24), null);
  assert.match(retailQuantityError('baked', 25) || '', /24/);
});

test('un-baked retail quantity accepts 2 boxes and rejects 3', () => {
  assert.equal(RETAIL_LIMITS.unbakedBoxes, 2);
  assert.equal(retailQuantityError('unbaked', 2), null);
  assert.match(retailQuantityError('unbaked', 3) || '', /2/);
});

test('retail and wholesale quantities must be whole numbers', () => {
  assert.ok(retailQuantityError('baked', 1.5));
  assert.ok(wholesaleQuantityError(0));
  assert.ok(wholesaleQuantityError(1.5));
  assert.equal(wholesaleQuantityError(1), null);
});

test('delivery address validation reports every required empty field', () => {
  const errors = deliveryAddressErrors({ street: '', city: '', region: '', postalCode: '', country: '' });
  assert.deepEqual(Object.keys(errors), ['street', 'city', 'region', 'postalCode', 'country']);
});
