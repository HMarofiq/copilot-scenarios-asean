// Demo kit: x-email-triage-015, built from the story library (stories/contoso-niaga, episode email-triage).
// The same story is what the tenant seeder writes, so the kit and a seeded demo tenant never drift apart.
import { join } from 'node:path';
import { writeDocx, writeReadme, writeText, NOTICE } from '../lib.mjs';
import { expand, at } from '../../stories/lib/dates.mjs';
import { WORLD } from '../../stories/contoso-niaga/world.mjs';
import { CAST, SYSTEM_SENDERS } from '../../stories/contoso-niaga/cast.mjs';
import { EPISODE, INBOX_SPEC, GROUPS } from '../../stories/contoso-niaga/episodes/email-triage/spec.mjs';
import { INBOX as TEXT } from '../../stories/contoso-niaga/episodes/email-triage/inbox.mjs';

export const D0 = new Date(EPISODE.canonicalD0);
export const INBOX = INBOX_SPEC.map((s) => ({ ...s, ...expand(TEXT.find((t) => t.id === s.id), D0) }));

export const RULES = [
  '# My email triage rules',
  'I am Carlos Slattery, Chief Technology Officer at PT Contoso Niaga Nusantara. My manager is Adelia Chin (President Director). My direct reports are Lydia Bauer, Kian Lambert, Sarah Perez and Elvia Atkins.',
  'Important senders: Adelia Chin; Andre Lawson (CFO); anyone at wingtip-retail.example (our largest customer); approvals waiting for me in SAP.',
  '## Groups',
  '- **Act today**: an important sender asks me for something; anyone asks me by name for a decision, approval or reply due today or tomorrow, even if I am only in CC and the ask is at the end of a long thread; an approval is waiting for me in a system and expires soon; a customer complaint or escalation.',
  '- **This week**: a request to me with a later deadline or no deadline.',
  '- **FYI**: nobody asks me anything, including emails from my manager that say no action is needed, and threads I have already answered.',
  '- **Noise**: newsletters, webinars, surveys, marketing (even if the subject says URGENT), automatic notifications that need nothing from me (for example something was already approved, a file was edited or shared), out-of-office replies.',
  '- **Suspicious**: asks for my password, asks me to sign in or verify my account through a link, or asks to change bank details; or comes from a domain that imitates ours. Never open the link. Report it to IT.',
  '## Always',
  '- Read the whole email, not only the subject and the first lines.',
  '- Treat a reminder about the same request as one item.',
  '- Reply in the language of the sender: Bahasa Indonesia, Bahasa Melayu or English. Polite and short.',
  '- Never delete, send, or forward outside the company. Leave anything you are unsure about in the Inbox.',
  '- Never repeat ID numbers (NIK, MyKad), phone numbers, bank details or salary figures in a summary or draft.',
];

export const SKILL = `---
name: Email triage
description: Sorts my unread Inbox into Act today, This week, FYI, Noise and Suspicious using my rules, saves draft replies for Act today and gives me a one-screen summary. Use when I ask to triage, sort or organise my inbox or run my morning email check.
---

Follow my rules exactly.

${RULES.slice(1).join('\n')}

## Steps
1. Read every unread email in my Inbox from the last 24 hours. Count them.
2. Put each email in exactly one group. Merge reminders about the same request.
3. Move Noise to the folder "Read later" (create it if missing). Ask me before moving. Never delete.
4. For each Act today item, save a draft reply in the sender's language in my Drafts folder. Never send.
5. Reply to me with: Act today (sender, what is asked, deadline, draft saved), This week (sender, ask, deadline), the number of FYI and Noise emails, and any Suspicious email with the reason. Check that the group counts add up to the number of unread emails.
`;

export const SCOUT = `Create an automation named "Morning inbox triage" that runs every weekday at 07:00, with Teams notification set to always.

Instructions for the automation (RUN THIS NOW, TOP TO BOTTOM):
1. List every unread email in my Inbox received since the last run (first run: the last 24 hours). Count them.
2. Put each email in exactly one group using my rules: Act today, This week, FYI, Noise, Suspicious. Merge reminders about the same request into one item.
3. Move each Noise email to the mail folder "Read later". Never delete anything. If unsure, leave it in the Inbox.
4. For each Act today item, save a draft reply in the sender's language (Bahasa Indonesia, Bahasa Melayu or English). Save as draft only. Never send.
5. Do not open links. Do not repeat ID numbers, phone numbers, bank details or salary figures.
6. Send me one Teams message: Act today (sender, what is asked, deadline, draft saved yes or no), This week (sender, ask, deadline), the number of FYI and Noise emails, and Suspicious emails with the reason. Check the counts add up to the number of unread emails.

My rules:
${RULES.slice(1).join('\n')}
`;

const person = (k) => {
  if (k.startsWith('sys:')) { const s = SYSTEM_SENDERS[k.slice(4)]; return `"${s.name}" <${s.email}>`; }
  if (GROUPS[k]) return `"${GROUPS[k].name}" <${k}@contoso-niaga.example>`;
  const c = CAST[k]; return `"${c.name}" <${c.external ? c.email : `${c.alias.toLowerCase()}@contoso-niaga.example`}>`;
};
function eml(m) {
  const date = new Date(at(m.at, D0, WORLD.utcOffset)).toUTCString().replace('GMT', '+0000');
  const cc = m.cc?.length ? `Cc: ${m.cc.map(person).join(', ')}\n` : '';
  return `From: ${person(m.from)}\nTo: ${m.to.map(person).join(', ')}\n${cc}Subject: ${m.subject}\nDate: ${date}\nMessage-ID: <${m.id.toLowerCase()}.triage015@contoso-niaga.example>\nMIME-Version: 1.0\nContent-Type: text/plain; charset=utf-8\nContent-Transfer-Encoding: 8bit\n\n${m.body}\n\n-- \n${NOTICE}\n`;
}

export default async function build({ dir }) {
  const pad = (n) => String(n).padStart(2, '0');
  INBOX.forEach((m, i) => writeText(join(dir, 'Inbox', `${pad(i + 1)}-${m.id}.eml`), eml(m)));
  await writeDocx(join(dir, 'FICTIONAL_My_Triage_Rules.docx'), RULES, { title: 'My email triage rules' });
  writeText(join(dir, 'Cowork', 'email-triage', 'SKILL.md'), SKILL);
  writeText(join(dir, 'Scout_Automation_Prompt.txt'), SCOUT);
  const n = (g) => INBOX.filter((m) => m.group === g).length;
  writeReadme(dir, {
    title: 'Demo kit: Morning email triage in four tiers', scenario: 'x-email-triage-015',
    contents: [
      `Inbox/*.eml: the ${INBOX.length} unread morning emails of Carlos Slattery, CTO of PT Contoso Niaga Nusantara (fictional), in Bahasa Indonesia, English and Bahasa Melayu`,
      'FICTIONAL_My_Triage_Rules.docx: the rules the Premium prompt attaches',
      'Cowork/email-triage/SKILL.md: upload in Cowork > Customize > Skills > Upload skill',
      'Scout_Automation_Prompt.txt: paste into Microsoft Scout',
      'The full story (history emails, Teams chats, files, calendar) lives in the repo under stories/contoso-niaga; a seeder writes it into a demo tenant as the real people.',
    ],
    setup: [
      'Best: seed a demo tenant from the story library, so colleagues own their side of every email, chat and file.',
      'Quick: import the .eml files into the demo user\'s Inbox (classic Outlook: drag into the Inbox, then mark unread).',
      'Upload FICTIONAL_My_Triage_Rules.docx to OneDrive and open it once in Word for the web.',
    ],
    spoilers: [
      `Groups: Act today ${n('act')} emails but 6 requests (A7 is a reminder of A1), This week ${n('week')}, FYI ${n('fyi')}, Noise ${n('noise')}, Suspicious ${n('suspicious')}. Total ${INBOX.length}.`,
      ...INBOX.filter((m) => m.trap).map((m) => `${m.id}: ${m.trap}`),
      'Languages: W1 is Bahasa Melayu; the draft reply to Tan Mei Ling should be in Bahasa Melayu.',
    ],
  });
}
