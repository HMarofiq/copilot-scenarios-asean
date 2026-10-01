export const CHATS = [
  {
    key: 'T1', topic: '[Triage] Uptime & insiden September', members: ['adelia', 'carlos', 'lydia'], arc: 'board',
    messages: [
      { from: 'adelia', at: { d: -7, t: '16:10' }, text: 'Carlos, Lydia, saya mulai susun Direksi pack untuk rapat {{d:0:day-id}} jam 14.00. Saya butuh angka September uptime per system dan ringkasan P1 yang bisa dibaca non-teknis.' },
      { from: 'adelia', at: { d: -7, t: '16:12' }, text: 'Kalau bisa jangan menunggu pagi rapat. Direksi biasanya tanya Wingtip dulu, baru detail sistem.' },
      { from: 'lydia', at: { d: -7, t: '16:18' }, text: 'Noted Bu Adelia. Saya pakai Uptime_Insiden_Sep2026.xlsx sebagai single source. Portal Mitra, SAP ECC, WMS, Microsoft 365, Johor WAN, dan data warehouse sudah ada.' },
      { from: 'carlos', at: { d: -7, t: '16:22' }, text: 'Thanks. Lydia, please keep the P1 action table very crisp: done, scheduled, in progress.' },
      { from: 'lydia', at: { d: -6, t: '09:35' }, text: 'Update sementara: September incidents total 5. P1 satu, P2 dua, P3 dua. Portal Mitra actual 99.58% vs target 99.90%.' },
      { from: 'adelia', at: { d: -6, t: '09:41' }, text: 'Itu gap yang akan terlihat. Tolong ada kalimat impact bisnis dan corrective action, bukan hanya SLA.' },
      { from: 'lydia', at: { d: -5, t: '11:05' }, text: 'Saya sudah masukkan impact: 1.146 order tertunda, 212 Wingtip, IDR 3,1 miliar delayed 1-3 hari. Data sesuai PIR.' },
      { from: 'carlos', at: { d: -5, t: '11:12' }, text: 'Good. Add PRB-2026-0031 status and note no data breach.' },
      { from: 'lydia', at: { d: -4, t: '15:04' }, text: '@Carlos added. Satu gap: last-week Johor WAN data masih pending dari Northwind. Angka saat ini belum final untuk Johor.' },
      { from: 'adelia', at: { d: -4, t: '15:20' }, text: 'Johor jangan kosong. Kalau pending, tulis pending dan owner follow-up.' },
      { from: 'lydia', at: { d: -3, t: '10:16' }, text: 'Johor preliminary 99.71%, ada two link flaps. Saya tunggu raw log final supaya tidak double-count duration.' },
      { from: 'carlos', at: { d: -3, t: '10:21' }, text: 'Use conservative number unless logs prove otherwise. Board pack should not change after pre-read.' },
      { from: 'lydia', at: { d: -2, t: '18:03' }, text: 'Uptime_Insiden_Sep2026.xlsx updated except Johor final. Corrective actions tab has 4 items from PIR.' },
      { from: 'adelia', at: { d: -2, t: '18:15' }, text: 'Terima kasih. Carlos, saya akan minta 1 page plus backup table by noon hari {{d:0:day-id}}.' },
      { from: 'lydia', at: { d: -1, t: '19:06' }, text: 'Johor last-week data sudah masuk. Final: Johor WAN 99.71%, downtime 125 minutes, two flaps. File updated and shared again.' },
      { from: 'carlos', at: { d: -1, t: '19:14' }, text: 'Noted. I will finalise in the morning after weekly coordination moves. Keep file as source of truth.' }
    ]
  },
  {
    key: 'T2', topic: '[Triage] Proyek Nusa – cutover weekend', members: ['kian', 'carlos', 'lydia', 'serena'], arc: 'cutover',
    messages: [
      { from: 'kian', at: { d: -5, t: '09:05' }, text: 'Team, mock cutover 2 dry run sudah scheduled. Saya ingin hasilnya langsung masuk Cutover runbook v3.xlsx, bukan notes terpisah.' },
      { from: 'serena', at: { d: -5, t: '09:11' }, text: 'Siap. Regression pack Portal Mitra ada 84 case; saya tag 12 yang paling risk terkait pricing dan partner inactive.' },
      { from: 'lydia', at: { d: -5, t: '09:18' }, text: 'Infra side: backup window masih 3 jam 20 menit di mock pertama. Saya target turunkan dengan snapshot pre-stage.' },
      { from: 'carlos', at: { d: -5, t: '09:24' }, text: 'Remember the board will ask go/no-go status. Be factual on risks and resource gaps.' },
      { from: 'kian', at: { d: -4, t: '19:02' }, text: 'Mock cutover 2 selesai: 31h elapsed vs 36h production window. 7 defects, 0 critical.' },
      { from: 'kian', at: { d: -4, t: '19:06' }, text: 'Two high defects: tax code consignment and inventory delta restart manual. Owners sudah assigned ke Serena dan Lydia.' },
      { from: 'serena', at: { d: -4, t: '19:12' }, text: 'Tax code fix sudah di branch release. Saya re-run 18 sample order plus regression pack besok pagi.' },
      { from: 'lydia', at: { d: -4, t: '19:18' }, text: 'Inventory delta mitigation masuk runbook: health check sebelum batch dan clear restart step. Tidak perlu code change.' },
      { from: 'carlos', at: { d: -4, t: '19:27' }, text: 'Recommendation?' },
      { from: 'kian', at: { d: -4, t: '19:31' }, text: 'Proceed, dengan criteria: regression clear, backup/restore sample valid, dan Saturday resource confirmed.' },
      { from: 'kian', at: { d: -3, t: '08:20' }, text: 'Freeze tetap {{w:+2:id}} 18:00. Go/no-go call {{w:+2:day-id}} 16:00. Cutover mulai {{w:+3:id}} 06:00.' },
      { from: 'lydia', at: { d: -3, t: '08:29' }, text: 'Backup final akan start setelah freeze. Rollback point utama sebelum migration wave 1.' },
      { from: 'serena', at: { d: -2, t: '13:42' }, text: 'Regression re-run passed untuk tax code. Partner inactive validation message masih cosmetic, not blocking.' },
      { from: 'kian', at: { d: -2, t: '16:25' }, text: 'Saya kirim email plan ke Lydia, cc Pak Carlos dan Serena. Resource gap Sabtu saya tulis jelas.' },
      { from: 'lydia', at: { d: -1, t: '11:30' }, text: 'Proseware confirms 12 contractors available Saturday if they receive written confirmation by {{d:0:day-en}} 16.00.' },
      { from: 'kian', at: { d: -1, t: '11:34' }, text: 'Cost is IDR 38,400,000 for contractors. Internal overtime 9 staff separate under Technology overtime budget.' },
      { from: 'lydia', at: { d: -1, t: '11:38' }, text: 'I will send the formal approval request by email tonight, cc Pak Carlos. Need approval by {{d:0:day-en}} 15.00.' },
      { from: 'carlos', at: { d: -1, t: '11:45' }, text: 'Noted. Make it easy to approve: cost, risk if not approved, deadline.' },
      { from: 'serena', at: { d: -1, t: '18:50' }, text: 'Final load test side note: Portal Mitra passed 3x peak, p95 1.8s. Good supporting point for go/no-go.' }
    ]
  },
  {
    key: 'T3', topic: '[Triage] Q4 re-forecast IT', members: ['andre', 'babak', 'carlos'], arc: 'reforecast',
    messages: [
      { from: 'andre', at: { d: -6, t: '08:40' }, text: 'Carlos, Babak: Q4 re-forecast opens today. Technology input is material because IT opex is 6% over budget YTD.' },
      { from: 'babak', at: { d: -6, t: '08:45' }, text: 'Template is Q4_Reforecast_Template_IT.xlsx. I have placed it in the Finance forecast folder and shared it with Carlos.' },
      { from: 'babak', at: { d: -6, t: '08:47' }, text: 'Required split: licences, cloud, staff & contractors. Months: Oct, Nov, Dec. Deadline {{d:+1:id}} 10:00 WIB.' },
      { from: 'carlos', at: { d: -6, t: '09:02' }, text: 'Thanks. Cloud variance is Portal Mitra load plus extra logging after the outage. I will keep the explanation short.' },
      { from: 'andre', at: { d: -6, t: '09:10' }, text: 'Please do. Two lines on the cause, then mitigation. The mitigation matters more than the variance narrative.' },
      { from: 'babak', at: { d: -5, t: '14:25' }, text: 'Current YTD: budget IDR 12,450m, actual IDR 13,197m, variance +6.0%. Cloud accounts for most of it.' },
      { from: 'carlos', at: { d: -5, t: '14:31' }, text: 'Reserved-instance renewal in November should save about IDR 410m a year if Procurement timing holds.' },
      { from: 'andre', at: { d: -5, t: '14:40' }, text: 'Include it as a mitigation but do not net it until renewal is approved. Finance will challenge any savings without committed start.' },
      { from: 'babak', at: { d: -4, t: '10:05' }, text: 'I added a YTD sheet with category-level budget and actuals so you can reconcile to the 6% overrun.' },
      { from: 'carlos', at: { d: -4, t: '10:18' }, text: 'Noted. Staff & contractors will also move because of cutover weekend, but one-off.' },
      { from: 'andre', at: { d: -3, t: '16:00' }, text: 'Treat Proyek Nusa overtime separately in the comment column. The Board should not see that as structural run-rate.' },
      { from: 'babak', at: { d: -3, t: '16:08' }, text: 'Consolidation working session is {{d:+1:day-en}} 14:00-16:00. I can take Technology input until 10:00, no later.' },
      { from: 'carlos', at: { d: -2, t: '09:22' }, text: 'Will submit tomorrow morning after I clear the board pack asks.' },
      { from: 'andre', at: { d: -2, t: '09:30' }, text: 'Understood, but the deadline stays. If you need assumptions, use the template comments rather than separate email.' },
      { from: 'babak', at: { d: -2, t: '09:35' }, text: 'I will send a reminder to division heads. Carlos, your file is already pre-populated for Budget Q4 and YTD actuals.' }
    ]
  },
  {
    key: 'T4', topic: '[Triage] Wingtip – tindak lanjut insiden P1', members: ['mona', 'carlos', 'lydia'], arc: 'outage',
    messages: [
      { from: 'mona', at: { d: -15, t: '13:05' }, text: 'Carlos, Lydia, Wingtip sudah escalate soal outage kemarin. Tone mereka polite tapi jelas frustrated.' },
      { from: 'mona', at: { d: -15, t: '13:07' }, text: 'Angka yang paling mereka ulang: 212 order Wingtip terdampak, dan store team tidak punya script untuk menjawab customer.' },
      { from: 'lydia', at: { d: -15, t: '13:18' }, text: 'Saya masih finalisasi timeline teknis. Root cause mengarah ke mTLS certificate API gateway ke ERP connector.' },
      { from: 'carlos', at: { d: -15, t: '13:25' }, text: 'Mona, please keep relationship warm. Lydia, facts only until PIR closes.' },
      { from: 'mona', at: { d: -14, t: '09:40' }, text: 'Yohana minta assurance bukan hanya RCA. Mereka ingin tahu kapan kita notify partner kalau Portal Mitra berhenti menerima order.' },
      { from: 'lydia', at: { d: -14, t: '10:02' }, text: 'Agree. Secara teknis P1 bridge dibuka 09:18, tapi partner notification belum punya trigger formal.' },
      { from: 'mona', at: { d: -13, t: '15:12' }, text: 'Itu gap besar. Kalau store tahu dari customer duluan, relationship damage-nya lebih mahal daripada SLA credit.' },
      { from: 'carlos', at: { d: -13, t: '15:30' }, text: 'Action: partner notification playbook. Mona owns customer wording, Lydia owns technical trigger and severity.' },
      { from: 'lydia', at: { d: -12, t: '11:20' }, text: 'Saya bisa provide severity matrix: P1 order submission down, P2 degradation, P3 informational. Need Sales approval for distribution list.' },
      { from: 'mona', at: { d: -12, t: '11:31' }, text: 'Saya siapkan partner tiering. Wingtip, Northwind retail group, dan top revenue partners masuk first wave.' },
      { from: 'mona', at: { d: -10, t: '17:45' }, text: 'QBR Wingtip coming. Mereka ingin Carlos hadir, bukan hanya Sales. Saya akan propose options setelah PIR.' },
      { from: 'lydia', at: { d: -9, t: '16:50' }, text: 'PIR meeting selesai. Corrective actions ada 4; playbook status in progress dengan Mona + Lydia.' },
      { from: 'carlos', at: { d: -9, t: '17:05' }, text: 'Good. Keep the PIR language usable for customer statement, but no over-sharing internal controls.' },
      { from: 'mona', at: { d: -8, t: '09:00' }, text: 'Saya kirim email formal. Wingtip juga minta direct escalation line saat future P1. Bisa kita define delegate kalau Carlos in another meeting?' },
      { from: 'carlos', at: { d: -8, t: '09:08' }, text: 'Yes. Primary CTO office, delegate Service Delivery Lead if I am unavailable. But final wording through Sales.' },
      { from: 'mona', at: { d: -2, t: '18:20' }, text: 'Heads-up: saya di Surabaya hari {{d:0:day-id}} untuk partner visits sampai evening, limited email. Kalau Wingtip escalates, please call my mobile or Teams.' }
    ]
  }
];
