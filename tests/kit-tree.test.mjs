import test from 'node:test';
import assert from 'node:assert/strict';
import { formatKitTree } from '../src/lib/kit-tree.mjs';

test('demo kit tree shows exact file paths, nested directories and annotations', () => {
  const entries = ['README.txt', '02_Agreement.docx', 'Inbox/', 'Inbox/01-A1.eml', 'Cowork/email-triage/SKILL.md', 'Cowork/', 'Cowork/email-triage/', 'Empty/'];
  const text = formatKitTree({ root: 'FICTIONAL_test', entries }, new Map([['README.txt', 'Setup notes and answer key'], ['02_Agreement.docx', 'Vendor agreement']]));
  assert.equal(text.split('\n')[0], 'FICTIONAL_test/');
  assert.match(text, /├── Cowork\/\n│   └── email-triage\/\n│       └── SKILL\.md/);
  assert.match(text, /├── Empty\//);
  assert.match(text, /├── Inbox\/\n│   └── 01-A1\.eml/);
  assert.match(text, /02_Agreement\.docx\s+# Vendor agreement/);
  assert.match(text, /README\.txt\s+# Setup notes and answer key/);
  assert.equal(text.match(/SKILL\.md/g).length, 1);
  assert.equal(text, formatKitTree({ root: 'FICTIONAL_test', entries: [...entries].reverse() }, new Map([['README.txt', 'Setup notes and answer key'], ['02_Agreement.docx', 'Vendor agreement']])));
});

test('demo kit tree preserves filename characters as plain text and rejects invalid paths', () => {
  assert.match(formatKitTree({ root: 'kit', entries: ['A&B.docx', '<example>.txt'] }), /A&B\.docx/);
  assert.match(formatKitTree({ root: 'kit', entries: ['A&B.docx', '<example>.txt'] }), /<example>\.txt/);
  for (const path of ['../escape.txt', '/absolute.txt', 'dir//file.txt', 'dir\\file.txt', 'file\nname.txt']) {
    assert.throws(() => formatKitTree({ root: 'kit', entries: [path] }), /Invalid demo kit/);
  }
  assert.throws(() => formatKitTree({ root: 'kit', entries: ['same', 'same/child.txt'] }), /Conflicting demo kit path/);
  assert.throws(() => formatKitTree({ root: '../kit', entries: [] }), /Invalid demo kit manifest/);
});
