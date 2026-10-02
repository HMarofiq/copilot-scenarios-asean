import test from 'node:test';
import assert from 'node:assert/strict';
import { isPublished } from '../src/lib/publication.mjs';

test('only validated scenarios or explicitly approved drafts publish by default', () => {
  assert.equal(isPublished('validated', false, false), true);
  assert.equal(isPublished('draft', false, false), false);
  assert.equal(isPublished('draft', true, false), true);
  assert.equal(isPublished('draft', 'true', false), false);
  assert.equal(isPublished('partly-validated', false, false), false);
  assert.equal(isPublished('partly-validated', true, false), false);
  assert.equal(isPublished('invalid', true, false), false);
});

test('the local preview override still includes unpublished workflows', () => {
  assert.equal(isPublished('draft', false, true), true);
  assert.equal(isPublished('partly-validated', false, true), true);
});
