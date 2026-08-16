const pptxgen = require('pptxgenjs');
const path = require('path');

// Brand system lifted from the source decks (same values the film uses).
const C = {
  orange: 'EB6336',
  gold: 'FDD35D',
  amber: 'FFA415',
  magenta: 'E13461',
  maroon: 'AB274F',
  teal: '008081',
  cream: 'FFF3E4',
  paper: 'FAF8F6',
  white: 'FFFFFF',
  ink: '1A1A1A',
  inkSoft: '4A4441',
  inkMute: '8A8078',
  dark: '141110',
  darkCard: '221C19',
  darkMute: '9A8D82',
  line: 'E4DAD0',
};

const HEAD = 'Century Gothic'; // brand face, as in the source decks
const BODY = 'Calibri';

const LOGO = path.join(__dirname, '..', 'public', 'logo.png');
const W = 13.3;
const M = 0.62; // page margin
const CW = W - M * 2;

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';
pres.author = 'Infinite Possibilities';
pres.title = 'Custom AI Platforms for Portfolio Companies';

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

/** Corner logo. Dark slides get it too — the mark reads on both grounds. */
const mark = (s, w = 1.85) =>
  s.addImage({path: LOGO, x: W - M - w, y: 0.34, w, h: w * (364 / 1728)});

/** Eyebrow + title block used on every content slide. */
const head = (s, eyebrow, title, tone = 'light') => {
  s.addText(eyebrow.toUpperCase(), {
    x: M, y: 0.42, w: 8.2, h: 0.3,
    fontFace: BODY, fontSize: 11, bold: true, charSpacing: 2.6,
    color: tone === 'light' ? C.orange : C.gold, margin: 0,
  });
  s.addText(title, {
    x: M, y: 0.76, w: 10.15, h: 0.95,
    fontFace: HEAD, fontSize: 27, bold: true,
    color: tone === 'light' ? C.ink : C.white, margin: 0,
  });
};

/** Numbered chip — the deck's repeated motif. */
const chip = (s, n, x, y, tone = 'orange') =>
  s.addText(n, {
    shape: pres.ShapeType.roundRect, rectRadius: 0.06,
    x, y, w: 0.42, h: 0.32,
    fill: {color: tone === 'orange' ? C.orange : C.teal},
    color: C.white, fontFace: BODY, fontSize: 12, bold: true,
    align: 'center', valign: 'middle', margin: 0,
  });

const card = (s, o) =>
  s.addShape(pres.ShapeType.roundRect, {
    x: o.x, y: o.y, w: o.w, h: o.h, rectRadius: 0.09,
    fill: {color: o.fill || C.white},
    line: {color: o.line || C.orange, width: o.lw || 1.25},
    shadow: o.shadow
      ? {type: 'outer', angle: 90, blur: 12, offset: 3, color: 'D9CFC6', opacity: 0.5}
      : undefined,
  });

// ===========================================================================
// 1 · COVER
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = {color: C.dark};
  s.addImage({path: LOGO, x: M, y: 1.5, w: 5.0, h: 5.0 * (364 / 1728)});
  s.addText('Custom AI platforms for\nportfolio companies', {
    x: M, y: 2.75, w: 9.4, h: 1.9,
    fontFace: HEAD, fontSize: 44, bold: true, color: C.white,
    lineSpacingMultiple: 1.05, margin: 0,
  });
  s.addText('Accelerate AI-driven value creation', {
    x: M, y: 4.75, w: 9.4, h: 0.45,
    fontFace: BODY, fontSize: 19, color: C.darkMute, margin: 0,
  });
  [['AI Agents', 0], ['AI Workflows', 2.3], ['Document Intelligence', 4.6]].forEach(
    ([t, dx]) => {
      s.addText(t, {
        shape: pres.ShapeType.roundRect, rectRadius: 0.1,
        x: M + dx, y: 5.5, w: 2.15, h: 0.46,
        fill: {color: C.darkCard}, line: {color: '3A2F28', width: 1},
        color: C.cream, fontFace: BODY, fontSize: 12, align: 'center',
        valign: 'middle', margin: 0,
      });
    },
  );
  s.addNotes('Cover. Infinite Possibilities builds custom AI platforms for portfolio companies.');
}

// ===========================================================================
// 2 · THE PROOF
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = {color: C.dark};
  mark(s);
  s.addText('PROVEN AT ENTERPRISE SCALE', {
    x: M, y: 0.55, w: 7, h: 0.3,
    fontFace: BODY, fontSize: 11, bold: true, charSpacing: 2.6,
    color: C.gold, margin: 0,
  });
  s.addText(
    'One of the world’s leading consulting firms\nruns its AI on a platform we built',
    {x: M, y: 1.0, w: 10.15, h: 1.5, fontFace: HEAD, fontSize: 28, bold: true,
     color: C.white, lineSpacingMultiple: 1.12, margin: 0},
  );
  const stats = [
    ['10,000+', 'platform users'],
    ['Six', 'continents'],
    ['15B+', 'tokens per month'],
    ['99%', 'RAG accuracy'],
  ];
  stats.forEach(([v, l], i) => {
    const x = M + i * (CW / 4);
    s.addText(v, {x, y: 3.15, w: CW / 4 - 0.3, h: 0.95,
      fontFace: HEAD, fontSize: 40, bold: true, color: C.orange, margin: 0});
    s.addText(l.toUpperCase(), {x, y: 4.05, w: CW / 4 - 0.3, h: 0.35,
      fontFace: BODY, fontSize: 11, charSpacing: 1.6, color: C.darkMute, margin: 0});
  });
  s.addText(
    'Sole AI platform partner since 2023 — scaled from 20 to 10,000+ users across 20+ countries, supporting 100+ use cases.',
    {x: M, y: 5.35, w: 11.2, h: 0.5, fontFace: BODY, fontSize: 13,
     color: C.darkMute, italic: true, margin: 0},
  );
  s.addNotes('Open on proof, not positioning. The numbers earn the right to be heard.');
}

// ===========================================================================
// 3 · WHO WE ARE
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = {color: C.paper};
  mark(s);
  head(s, 'Who we are', 'From AI ambition to AI in production');
  s.addText(
    'We are a software development partner for enterprise-ready custom AI, building platforms that portfolio companies own.',
    {x: M, y: 1.72, w: 8.4, h: 0.7, fontFace: BODY, fontSize: 16,
     color: C.inkSoft, margin: 0},
  );
  const facts = [
    ['Apr 2013', 'Founded'],
    ['Apr 2022', 'AI solutions since'],
    ['Private markets', 'Market focus'],
    ['30+', 'AI engineers'],
    ['50+', 'Battle-tested accelerators'],
    ['100%', 'AI project share'],
  ];
  facts.forEach(([v, l], i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = M + col * (CW / 3), y = 2.85 + row * 1.45;
    card(s, {x, y, w: CW / 3 - 0.28, h: 1.15, fill: C.white, line: C.line, lw: 1});
    s.addText(v, {x: x + 0.3, y: y + 0.16, w: CW / 3 - 0.85, h: 0.45,
      fontFace: HEAD, fontSize: 20, bold: true, color: C.orange, margin: 0});
    s.addText(l, {x: x + 0.3, y: y + 0.62, w: CW / 3 - 0.85, h: 0.35,
      fontFace: BODY, fontSize: 12, color: C.inkMute, margin: 0});
  });
  s.addNotes('Firm at a glance — credibility markers before the argument.');
}

// ===========================================================================
// 4 · THE REALITY
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = {color: C.dark};
  mark(s);
  head(s, 'Inside most mid-market portfolio companies', 'The same four things, every time', 'dark');
  const rows = [
    ['01', 'Citizen developers build', 'Unable to scale'],
    ['02', 'Vendors sell', 'Unable to fit the ecosystem'],
    ['03', 'Leaders want to invest', 'Unable to determine what and when'],
    ['04', 'Tokens burn', 'Unable to verify ROI'],
  ];
  rows.forEach(([n, a, b], i) => {
    const y = 2.15 + i * 1.15;
    s.addShape(pres.ShapeType.roundRect, {
      x: M, y, w: CW, h: 0.92, rectRadius: 0.08,
      fill: {color: C.darkCard}, line: {color: '332A24', width: 1},
    });
    s.addText(n, {x: M + 0.32, y: y + 0.26, w: 0.5, h: 0.4,
      fontFace: BODY, fontSize: 13, bold: true, color: C.orange, margin: 0});
    s.addText(a, {x: M + 0.95, y: y + 0.2, w: 4.6, h: 0.5,
      fontFace: HEAD, fontSize: 19, color: C.white, margin: 0});
    s.addText(b, {x: M + 5.7, y: y + 0.2, w: 5.9, h: 0.5,
      fontFace: HEAD, fontSize: 19, bold: true, color: C.magenta, margin: 0});
  });
  s.addNotes('MIT: 95% of GenAI pilots show no P&L impact. Gartner: 41% of employees are citizen developers. EY: token costs now trigger fiscal scrutiny.');
}

// ===========================================================================
// 5 · THE THESIS
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = {color: C.orange};
  s.addText('What a portfolio company needs', {
    x: M, y: 0.95, w: 10, h: 0.55,
    fontFace: BODY, fontSize: 21, color: 'FFE3D6', margin: 0,
  });
  s.addText('Not another one-off solution', {
    x: M, y: 1.75, w: 8, h: 0.5, fontFace: HEAD, fontSize: 22,
    color: 'FFD5C2', strike: true, margin: 0,
  });
  s.addText('Not another vendor’s platform', {
    x: M, y: 2.3, w: 8, h: 0.5, fontFace: HEAD, fontSize: 22,
    color: 'FFD5C2', strike: true, margin: 0,
  });
  s.addText('A purpose-built AI platform', {
    x: M, y: 3.15, w: 11.5, h: 1.0,
    fontFace: HEAD, fontSize: 46, bold: true, color: C.white, margin: 0,
  });
  s.addText('A strategic asset they own', {
    x: M, y: 4.2, w: 9, h: 0.55,
    fontFace: HEAD, fontSize: 24, bold: true, color: C.gold, margin: 0,
  });
  [['Drives profitable growth', 0], ['Improves exit value', 4.3]].forEach(([t, dx]) => {
    s.addText(t, {
      shape: pres.ShapeType.roundRect, rectRadius: 0.1,
      x: M + dx, y: 5.25, w: 4.0, h: 0.62,
      fill: {color: 'D9522A'}, line: {color: 'D9522A', width: 1},
      color: C.white, fontFace: BODY, fontSize: 15, bold: true,
      align: 'center', valign: 'middle', margin: 0,
    });
  });
  s.addNotes('The thesis. Proprietary IP owned at exit is the AI value lever that carries a durable premium.');
}

// ===========================================================================
// 6 · WHAT WE DELIVER
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = {color: C.paper};
  mark(s);
  head(s, 'What we deliver', 'We build these strategic AI assets for portfolio companies');
  const items = [
    ['01', 'Prioritized workflows', 'that drive profitable growth'],
    ['02', 'One platform', 'your tools, knowledge and templates — one connection to your core systems'],
    ['03', 'Model-agnostic', 'stay on top of every AI wave, never locked to one vendor'],
    ['04', 'Cost-managed', 'token spend never outruns the work it replaces'],
    ['05', 'Secure by design', 'every new build inherits it'],
  ];
  items.forEach(([n, t, b], i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = M + col * (CW / 2 + 0.2), y = 2.0 + row * 1.55;
    chip(s, n, x, y + 0.06);
    s.addText(t, {x: x + 0.62, y, w: CW / 2 - 1.0, h: 0.45,
      fontFace: HEAD, fontSize: 19, bold: true, color: C.ink, margin: 0});
    s.addText(b, {x: x + 0.62, y: y + 0.46, w: CW / 2 - 1.0, h: 0.72,
      fontFace: BODY, fontSize: 13.5, color: C.inkSoft, margin: 0});
  });
  s.addNotes('Five design principles. Each answers one of the four problems from the previous slide.');
}

// ===========================================================================
// 7 · ARCHITECTURE
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = {color: C.paper};
  mark(s);
  head(s, 'Architecture', 'Strategic AI platform: what are we building?');

  // owned boundary
  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 2.05, w: 7.9, h: 3.55, rectRadius: 0.1,
    fill: {color: 'FFFFFF'}, line: {color: C.orange, width: 2},
  });
  s.addText('WHAT WE BUILD · WHAT YOU OWN', {
    x: M + 0.24, y: 1.88, w: 3.6, h: 0.32,
    fontFace: BODY, fontSize: 10.5, bold: true, charSpacing: 1.6,
    color: C.orange, fill: {color: C.paper}, align: 'center',
    valign: 'middle', margin: 0,
  });

  card(s, {x: M + 0.32, y: 2.4, w: 7.26, h: 0.86, line: C.orange});
  s.addText('Custom Workflows', {x: M + 0.32, y: 2.5, w: 7.26, h: 0.4,
    fontFace: HEAD, fontSize: 18, bold: true, color: C.ink, align: 'center', margin: 0});
  s.addText('the priority workflows that drive profit', {x: M + 0.32, y: 2.88, w: 7.26, h: 0.32,
    fontFace: BODY, fontSize: 12, color: C.inkSoft, align: 'center', margin: 0});

  s.addShape(pres.ShapeType.line, {x: M + 3.95, y: 3.32, w: 0, h: 0.36,
    line: {color: C.orange, width: 1.5, beginArrowType: 'triangle', endArrowType: 'triangle'}});

  card(s, {x: M + 0.32, y: 3.72, w: 7.26, h: 1.6, shadow: true});
  s.addText('Enterprise AI Core', {x: M + 0.32, y: 3.85, w: 7.26, h: 0.42,
    fontFace: HEAD, fontSize: 19, bold: true, color: C.orange, align: 'center', margin: 0});
  const chips = ['MCP connectors', 'Skills', 'Knowledge bases', 'Business & office templates', 'Components'];
  const cw = [1.6, 0.85, 1.6, 2.5, 1.35];
  let cx = M + 0.32 + (7.26 - (cw[0] + cw[1] + cw[2] + 0.24)) / 2;
  chips.slice(0, 3).forEach((t, i) => {
    s.addText(t, {shape: pres.ShapeType.roundRect, rectRadius: 0.14,
      x: cx, y: 4.34, w: cw[i], h: 0.36, fill: {color: C.cream},
      line: {color: C.orange, width: 0.75}, fontFace: BODY, fontSize: 10.5,
      color: C.ink, align: 'center', valign: 'middle', margin: 0});
    cx += cw[i] + 0.12;
  });
  let cx2 = M + 0.32 + (7.26 - (cw[3] + cw[4] + 0.12)) / 2;
  chips.slice(3).forEach((t, i) => {
    s.addText(t, {shape: pres.ShapeType.roundRect, rectRadius: 0.14,
      x: cx2, y: 4.78, w: cw[i + 3], h: 0.36, fill: {color: C.cream},
      line: {color: C.orange, width: 0.75}, fontFace: BODY, fontSize: 10.5,
      color: C.ink, align: 'center', valign: 'middle', margin: 0});
    cx2 += cw[i + 3] + 0.12;
  });

  // outside — personal productivity AI
  s.addShape(pres.ShapeType.roundRect, {
    x: 9.35, y: 3.5, w: 3.35, h: 1.15, rectRadius: 0.08,
    fill: {color: 'EFE9E3'}, line: {color: 'C4B9AE', width: 1, dashType: 'dash'},
  });
  s.addText('PERSONAL PRODUCTIVITY AI', {x: 9.35, y: 3.62, w: 3.35, h: 0.35,
    fontFace: BODY, fontSize: 10.5, bold: true, charSpacing: 0.8,
    color: C.inkSoft, align: 'center', margin: 0});
  s.addText('Claude · Copilot · ChatGPT Enterprise', {x: 9.35, y: 3.98, w: 3.35, h: 0.5,
    fontFace: BODY, fontSize: 10.5, color: C.inkMute, align: 'center', margin: 0});
  s.addShape(pres.ShapeType.line, {x: 8.62, y: 4.08, w: 0.66, h: 0,
    line: {color: C.orange, width: 1.5, beginArrowType: 'triangle', endArrowType: 'triangle'}});

  // outside — enterprise systems
  s.addShape(pres.ShapeType.line, {x: M + 3.95, y: 5.64, w: 0, h: 0.42,
    line: {color: C.orange, width: 1.5, beginArrowType: 'triangle', endArrowType: 'triangle'}});
  s.addShape(pres.ShapeType.roundRect, {
    x: M + 0.7, y: 6.06, w: 6.5, h: 0.72, rectRadius: 0.08,
    fill: {color: 'EFE9E3'}, line: {color: 'C4B9AE', width: 1, dashType: 'dash'},
  });
  s.addText('ENTERPRISE SYSTEMS & DATA', {x: M + 0.7, y: 6.14, w: 6.5, h: 0.32,
    fontFace: BODY, fontSize: 10.5, bold: true, charSpacing: 0.8,
    color: C.inkSoft, align: 'center', margin: 0});
  s.addText('ERP · CRM · HCM — governed, RBAC-scoped, audited', {x: M + 0.7, y: 6.44, w: 6.5, h: 0.3,
    fontFace: BODY, fontSize: 10.5, color: C.inkMute, align: 'center', margin: 0});

  s.addText(
    'The tools are how you talk to it.\nThe Core is what you own.',
    {x: 9.35, y: 5.4, w: 3.35, h: 1.0, fontFace: HEAD, fontSize: 12,
     bold: true, color: C.ink, margin: 0, lineSpacingMultiple: 1.25},
  );
  s.addNotes('Everything inside the line is new and owned. Everything outside it already exists.');
}

// ===========================================================================
// 8 · CASE STUDY — THE ARCHITECTURE INSTANTIATED
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = {color: C.paper};
  mark(s);
  head(s, 'Case study', 'The same architecture, instantiated');
  s.addText(
    'A mid-market portfolio company in heavy-duty equipment service and repair — multi-branch work orders, warranty claims, parts and field service.',
    {x: M, y: 1.72, w: 10.0, h: 0.4, fontFace: BODY, fontSize: 13.5,
     color: C.inkSoft, italic: true, margin: 0},
  );

  // --- the five prioritized workflows, first one live ---
  s.addText('CUSTOM WORKFLOWS · THE FIVE PRIORITIZED PROCESSES', {
    x: M, y: 2.25, w: 7, h: 0.28, fontFace: BODY, fontSize: 10,
    bold: true, charSpacing: 1.6, color: C.inkMute, margin: 0,
  });
  const procs = [
    ['01', 'Warranty recovery', 'validate · submit · reconcile · appeal', true],
    ['02', 'Procurement & AP', 'intake · three-way match · gated posting', false],
    ['03', 'Quote-to-cash', 'quoting · stale-quote chase · invoicing', false],
    ['04', 'Bay operations', 'work orders · dispatch · technician time', false],
    ['05', 'Parts & inventory', 'on-hand · transfers · cycle counts', false],
  ];
  const pw = (CW - 4 * 0.16) / 5;
  procs.forEach(([n, t, d, live], i) => {
    const x = M + i * (pw + 0.16);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 2.6, w: pw, h: 1.12, rectRadius: 0.08,
      fill: {color: live ? C.cream : 'F1ECE7'},
      line: {color: live ? C.orange : 'D5CCC3', width: live ? 1.75 : 1},
    });
    s.addText(live ? `${n}  ·  LIVE` : n, {
      x: x + 0.18, y: 2.7, w: pw - 0.36, h: 0.26,
      fontFace: BODY, fontSize: 9.5, bold: true, charSpacing: 1.2,
      color: live ? C.orange : C.inkMute, margin: 0,
    });
    s.addText(t, {x: x + 0.18, y: 2.96, w: pw - 0.36, h: 0.34,
      fontFace: HEAD, fontSize: 13, bold: true,
      color: live ? C.ink : C.inkSoft, margin: 0});
    s.addText(d, {x: x + 0.18, y: 3.3, w: pw - 0.36, h: 0.38,
      fontFace: BODY, fontSize: 9.5, color: C.inkMute, margin: 0});
  });

  s.addShape(pres.ShapeType.line, {
    x: W / 2, y: 3.78, w: 0, h: 0.3,
    line: {color: C.orange, width: 1.5,
      beginArrowType: 'triangle', endArrowType: 'triangle'},
  });

  // --- their Core ---
  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 4.12, w: CW, h: 2.05, rectRadius: 0.1,
    fill: {color: C.white}, line: {color: C.orange, width: 2},
  });
  s.addText('ENTERPRISE AI CORE · BUILT ONCE, REUSED BY ALL FIVE', {
    x: M, y: 4.26, w: CW, h: 0.3, fontFace: BODY, fontSize: 10.5,
    bold: true, charSpacing: 1.6, color: C.orange, align: 'center', margin: 0,
  });
  const layers = [
    ['Connectors', 'dealer-management ERP · CRM · HCM · OEM warranty portals · enterprise data lake'],
    ['Knowledge', 'OEM warranty policy manuals · coverage and rate tables · service manuals · SOPs'],
    ['Templates', 'claim forms · appeal letters · write-off memos · quotes · journal entries'],
  ];
  layers.forEach(([t, d], i) => {
    const y = 4.66 + i * 0.46;
    s.addText(t, {x: M + 0.35, y, w: 1.6, h: 0.34,
      fontFace: HEAD, fontSize: 13, bold: true, color: C.ink, margin: 0});
    s.addText(d, {x: M + 2.0, y: y + 0.02, w: CW - 2.5, h: 0.34,
      fontFace: BODY, fontSize: 12, color: C.inkSoft, margin: 0});
  });
  s.addText(
    'Identity-scoped end to end — 23 roles inheriting the same access controls as the systems of record.',
    {x: M, y: 6.32, w: 11.0, h: 0.35, fontFace: BODY, fontSize: 12,
     color: C.inkMute, italic: true, margin: 0},
  );
  s.addNotes('This is the previous slide made concrete: five workflows on top, one Core beneath, built from their own systems and know-how.');
}

// ===========================================================================
// 9 · CASE STUDY — MONTH 3 OF 24
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = {color: C.paper};
  mark(s);
  head(s, 'Case study', 'Month 3 of a 24-month journey');

  s.addText(
    'Warranty receivables went first. The other four processes are scoped and sequenced behind it — each reusing the same connectors, knowledge and policy gates, so every build after the first is faster and cheaper than the one before.',
    {x: M, y: 1.78, w: 6.35, h: 1.1, fontFace: BODY, fontSize: 14,
     color: C.inkSoft, margin: 0},
  );

  // progress marker
  const barX = M, barY = 3.15, barW = 6.35;
  s.addShape(pres.ShapeType.roundRect, {
    x: barX, y: barY, w: barW, h: 0.26, rectRadius: 0.13,
    fill: {color: 'E8DFD6'}, line: {color: 'E8DFD6', width: 0},
  });
  s.addShape(pres.ShapeType.roundRect, {
    x: barX, y: barY, w: barW * (3 / 24), h: 0.26, rectRadius: 0.13,
    fill: {color: C.orange}, line: {color: C.orange, width: 0},
  });
  s.addText('Month 3', {x: barX, y: barY + 0.34, w: 2, h: 0.3,
    fontFace: BODY, fontSize: 11, bold: true, color: C.orange, margin: 0});
  s.addText('Month 24', {x: barX + barW - 2, y: barY + 0.34, w: 2, h: 0.3,
    fontFace: BODY, fontSize: 11, color: C.inkMute, align: 'right', margin: 0});

  s.addText('WHAT THE FULL BUILD TARGETS', {
    x: M, y: 4.15, w: 6.35, h: 0.28, fontFace: BODY, fontSize: 10,
    bold: true, charSpacing: 1.6, color: C.inkMute, margin: 0,
  });
  [['≥ 25%', 'of the stuck warranty queue recovered or dispositioned'],
   ['− 30%', 'days-to-cash on warranty claims'],
   ['− 60%', 'processor hours per claim']].forEach(([v, l], i) => {
    const y = 4.5 + i * 0.55;
    s.addText(v, {x: M, y, w: 1.15, h: 0.42, fontFace: HEAD, fontSize: 17,
      bold: true, color: C.ink, margin: 0});
    s.addText(l, {x: M + 1.25, y: y + 0.04, w: 5.1, h: 0.42,
      fontFace: BODY, fontSize: 12.5, color: C.inkSoft, margin: 0});
  });

  // early signals panel
  const px = 7.35, pw2 = W - px - M;
  s.addShape(pres.ShapeType.roundRect, {
    x: px, y: 1.78, w: pw2, h: 4.5, rectRadius: 0.1,
    fill: {color: C.white}, line: {color: C.orange, width: 1.5},
  });
  s.addText('EARLY SIGNALS', {
    x: px + 0.4, y: 2.02, w: pw2 - 0.8, h: 0.3, fontFace: BODY, fontSize: 10.5,
    bold: true, charSpacing: 1.6, color: C.orange, margin: 0,
  });
  [['$1.5M+', 'of stuck warranty claims surfaced and being worked'],
   ['218', 'tables in the decision store — every proposal, gate decision and approval auditable'],
   ['23', 'roles scoped end to end, day one']].forEach(([v, l], i) => {
    const y = 2.5 + i * 1.28;
    s.addText(v, {x: px + 0.4, y, w: pw2 - 0.8, h: 0.55,
      fontFace: HEAD, fontSize: 28, bold: true, color: C.orange, margin: 0});
    s.addText(l, {x: px + 0.4, y: y + 0.56, w: pw2 - 0.8, h: 0.62,
      fontFace: BODY, fontSize: 12.5, color: C.inkSoft, margin: 0});
  });
  s.addNotes('Honest framing: one workflow live, four sequenced. The compounding argument is the point — each build after the first is cheaper.');
}
// ===========================================================================
// 10 · SECTION — USE CASES
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = {color: C.dark};
  mark(s);
  s.addText('Section', {
    x: M, y: 2.6, w: 6, h: 0.35,
    fontFace: BODY, fontSize: 11, bold: true, charSpacing: 2.6,
    color: C.gold, margin: 0,
  });
  s.addText('Use cases', {
    x: M, y: 3.0, w: 9, h: 1.1,
    fontFace: HEAD, fontSize: 50, bold: true, color: C.white, margin: 0,
  });
  s.addText(
    'Where the platform earns its keep — proven in production across a 10,000-user deployment.',
    {x: M, y: 4.2, w: 8.6, h: 0.6, fontFace: BODY, fontSize: 16,
     color: C.darkMute, margin: 0},
  );
  s.addNotes('Section divider into the use-case detail carried over from the capabilities deck.');
}

// ===========================================================================
// 11 · USE CASES TABLE
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = {color: C.paper};
  mark(s);
  head(s, 'Use cases', 'Key platform features that improve productivity');

  const hdr = (t) => ({
    text: t,
    options: {fill: {color: C.orange}, color: C.white, bold: true,
      fontFace: BODY, fontSize: 12.5, valign: 'middle', margin: 0.08},
  });
  const rows = [
    [
      'Search Internal Docs',
      'Search past projects knowledgebase (KB)',
      '75%',
      '22 hours → 5 hours\nper new engagement',
      'Prompt context of engagement → Identify similar past engagements → Answer queries on scope, approach, issue tree, benchmarks',
    ],
    [
      'Search Web & LLMs',
      'Competitor product and positioning analysis',
      '70%',
      '15 hours → 4 hours\nper competitor',
      'Prompt competitor info → Analyze website, news articles and analyst reports → Summarize per pre-defined template',
    ],
    [
      'Write Reports / Decks',
      'Create executive summary slide',
      '75%',
      '3 hours → 45 min\nper presentation',
      'Upload slides → Extract key messages → Generate executive summary in client style → Refine content and visuals',
    ],
    [
      'Extract Information',
      'Customer contract analysis',
      '80%',
      '15 hours → 3 hours\nfor 100 contracts',
      'Upload contracts → Extract renewal dates, products and pricing terms → Recommend upsell opportunity',
    ],
    [
      'Translate',
      'Consolidate subsidiary annual reports',
      '75%',
      '50 hours → 12 hours\nper annual analysis',
      'Upload subsidiary reports → Translate into a single preferred language → Generate combined parent and subsidiary report',
    ],
  ];

  const body = rows.map(([f, u, imp, delta, wf], i) => {
    const bg = i % 2 ? C.white : C.cream;
    const cell = (t, o = {}) => ({
      text: t,
      options: Object.assign(
        {fill: {color: bg}, fontFace: BODY, fontSize: 11,
         color: C.inkSoft, valign: 'middle', margin: 0.08},
        o,
      ),
    });
    return [
      cell(f, {bold: true, color: C.ink, fontSize: 11.5, fontFace: HEAD}),
      cell(u),
      cell(imp, {bold: true, color: C.orange, fontSize: 19, align: 'center', fontFace: HEAD}),
      cell(delta, {fontSize: 10.5}),
      cell(wf, {fontSize: 10}),
    ];
  });

  s.addTable(
    [[hdr('Feature'), hdr('Popular use case'), hdr('Impact'), hdr('Time saved'), hdr('Workflow')], ...body],
    {
      x: M, y: 2.02, w: CW,
      colW: [1.95, 2.35, 1.05, 2.05, 4.66],
      rowH: [0.4, 0.86, 0.86, 0.86, 0.86, 0.86],
      border: {type: 'solid', color: C.line, pt: 0.75},
      autoPage: false,
    },
  );
  s.addText('Measured across a 10,000-user consulting deployment.', {
    x: M, y: 7.0, w: 8, h: 0.3, fontFace: BODY, fontSize: 10,
    color: C.inkMute, italic: true, margin: 0,
  });
  s.addNotes('Use cases carried over verbatim from the capabilities deck.');
}

// ===========================================================================
// 12 · THE AI POD
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = {color: C.paper};
  mark(s);
  head(s, 'How we deliver', 'A dedicated AI Pod, embedded in your team');

  s.addShape(pres.ShapeType.roundRect, {
    x: 4.4, y: 1.95, w: 4.5, h: 0.58, rectRadius: 0.08,
    fill: {color: 'EFE9E3'}, line: {color: 'C4B9AE', width: 1, dashType: 'dash'},
  });
  s.addText('PORTCO AI TRANSFORMATION TEAM', {x: 4.4, y: 1.95, w: 4.5, h: 0.58,
    fontFace: BODY, fontSize: 11.5, bold: true, charSpacing: 1, color: C.inkSoft,
    align: 'center', valign: 'middle', margin: 0});
  s.addShape(pres.ShapeType.line, {x: W / 2, y: 2.53, w: 0, h: 0.34,
    line: {color: 'D8CCC1', width: 1.5}});

  s.addShape(pres.ShapeType.roundRect, {
    x: 4.75, y: 2.87, w: 3.8, h: 0.6, rectRadius: 0.08,
    fill: {color: C.orange}, line: {color: C.orange, width: 1},
  });
  s.addText('Engineering Manager', {x: 4.75, y: 2.87, w: 3.8, h: 0.6,
    fontFace: HEAD, fontSize: 17, bold: true, color: C.white,
    align: 'center', valign: 'middle', margin: 0});

  const roles = [
    ['Product', 'technical PM'],
    ['AI + Backend', 'pipelines & services'],
    ['UX + Frontend', 'design & build'],
    ['QA', 'test & automation'],
    ['DevOps', 'infra & CI/CD'],
  ];
  const rw = 2.28, gap = 0.18;
  const total = roles.length * rw + (roles.length - 1) * gap;
  const x0 = (W - total) / 2;
  s.addShape(pres.ShapeType.line, {x: W / 2, y: 3.47, w: 0, h: 0.28,
    line: {color: 'D8CCC1', width: 1.5}});
  s.addShape(pres.ShapeType.line, {x: x0 + rw / 2, y: 3.75, w: total - rw, h: 0,
    line: {color: 'D8CCC1', width: 1.5}});
  roles.forEach(([t, sub], i) => {
    const x = x0 + i * (rw + gap);
    s.addShape(pres.ShapeType.line, {x: x + rw / 2, y: 3.75, w: 0, h: 0.24,
      line: {color: 'D8CCC1', width: 1.5}});
    card(s, {x, y: 3.99, w: rw, h: 0.85});
    s.addText(t, {x, y: 4.09, w: rw, h: 0.34, fontFace: HEAD, fontSize: 14,
      bold: true, color: C.ink, align: 'center', margin: 0});
    s.addText(sub, {x, y: 4.42, w: rw, h: 0.3, fontFace: BODY, fontSize: 10.5,
      color: C.inkMute, align: 'center', margin: 0});
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 5.45, w: CW, h: 0.82, rectRadius: 0.08,
    fill: {color: C.cream}, line: {color: C.orange, width: 1.25},
  });
  s.addText(
    [{text: 'Founder & CEO  ', options: {bold: true, fontFace: HEAD, fontSize: 17, color: C.ink}},
     {text: '— ultimate accountability for every outcome', options: {fontFace: BODY, fontSize: 15, color: C.inkSoft}}],
    {x: M + 0.4, y: 5.45, w: CW - 0.8, h: 0.82, valign: 'middle', margin: 0},
  );
  s.addNotes('The pod reports into the client organisation, not alongside it.');
}

// ===========================================================================
// 13 · OPERATING MODELS
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = {color: C.paper};
  mark(s);
  head(s, 'How we engage', 'Flexible operating models');
  const models = [
    ['01', 'AI Pod', 'A dedicated cross-functional team, embedded in yours.'],
    ['02', 'Staff augmentation', 'Targeted specialists into the team you already have.'],
    ['03', 'Build-operate-transfer', 'We build it, run it, then hand it over to you.'],
  ];
  const mw = (CW - 0.6) / 3;
  models.forEach(([n, t, b], i) => {
    const x = M + i * (mw + 0.3);
    card(s, {x, y: 2.05, w: mw, h: 2.1, shadow: true});
    chip(s, n, x + 0.35, 2.32);
    s.addText(t, {x: x + 0.35, y: 2.78, w: mw - 0.7, h: 0.6,
      fontFace: HEAD, fontSize: 18, bold: true, color: C.ink, margin: 0});
    s.addText(b, {x: x + 0.35, y: 3.34, w: mw - 0.7, h: 0.72,
      fontFace: BODY, fontSize: 13, color: C.inkSoft, margin: 0});
  });
  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 4.65, w: CW, h: 1.25, rectRadius: 0.09,
    fill: {color: C.cream}, line: {color: C.orange, width: 1.25},
  });
  s.addText('Commitment earned in four-week increments', {
    x: M + 0.45, y: 4.82, w: CW - 0.9, h: 0.45,
    fontFace: HEAD, fontSize: 20, bold: true, color: C.ink, margin: 0,
  });
  s.addText('Never assumed. At every gate, you decide whether we continue.', {
    x: M + 0.45, y: 5.28, w: CW - 0.9, h: 0.4,
    fontFace: BODY, fontSize: 15, color: C.inkSoft, margin: 0,
  });
  s.addNotes('Three ways to engage. Commitment is earned, never assumed.');
}

// ===========================================================================
// 14 · RECAP
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = {color: C.paper};
  mark(s);
  s.addText('RECAP', {
    x: M, y: 0.42, w: 6, h: 0.3, fontFace: BODY, fontSize: 11, bold: true,
    charSpacing: 2.6, color: C.orange, margin: 0,
  });
  s.addText('Don’t scatter efforts and funds', {
    x: M, y: 0.8, w: 9.5, h: 0.45, fontFace: BODY, fontSize: 18,
    color: C.inkSoft, margin: 0,
  });
  s.addText('Build a strategic AI asset', {
    x: M, y: 1.25, w: 10, h: 0.8, fontFace: HEAD, fontSize: 36, bold: true,
    color: C.ink, margin: 0,
  });
  const pts = [
    'Focus your AI program',
    'Build on the right architecture',
    'Don’t lock to a single LLM model',
    'Partner with a credible, reliable AI vendor',
  ];
  pts.forEach((t, i) => {
    const y = 2.45 + i * 0.78;
    s.addShape(pres.ShapeType.ellipse, {
      x: M + 0.06, y: y + 0.16, w: 0.16, h: 0.16, fill: {color: C.orange},
      line: {color: C.orange, width: 0},
    });
    s.addText(t, {x: M + 0.45, y, w: 9.5, h: 0.5,
      fontFace: HEAD, fontSize: 20, color: C.ink, margin: 0});
  });
  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 5.85, w: 8.6, h: 0.85, rectRadius: 0.09,
    fill: {color: C.orange}, line: {color: C.orange, width: 1},
  });
  s.addText(
    [{text: 'IMPACT   ', options: {bold: true, fontSize: 12, charSpacing: 1.8, color: 'FFDCCB', fontFace: BODY}},
     {text: 'Profitable growth and higher exit value', options: {bold: true, fontSize: 20, color: C.white, fontFace: HEAD}}],
    {x: M + 0.4, y: 5.85, w: 8.0, h: 0.85, valign: 'middle', margin: 0},
  );
  s.addNotes('Recap and the single impact statement.');
}

// ===========================================================================
// 15 · SIGN-OFF
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = {color: C.dark};
  s.addImage({path: LOGO, x: (W - 6.2) / 2, y: 2.15, w: 6.2, h: 6.2 * (364 / 1728)});
  s.addText('Accelerate AI-driven value creation', {
    x: 0, y: 3.65, w: W, h: 0.5, fontFace: BODY, fontSize: 19,
    color: C.darkMute, align: 'center', margin: 0,
  });
  s.addText('Let’s build your AI advantage', {
    x: 0, y: 4.25, w: W, h: 0.7, fontFace: HEAD, fontSize: 30, bold: true,
    color: C.white, align: 'center', margin: 0,
  });
  s.addText('infinitepossibilities.ai', {
    x: 0, y: 5.15, w: W, h: 0.45, fontFace: BODY, fontSize: 16,
    color: C.orange, align: 'center', margin: 0,
  });
  s.addNotes('Close.');
}

pres
  .writeFile({fileName: path.join(__dirname, 'InfinitePossibilities-PortCo-AI.pptx')})
  .then((f) => console.log('wrote', f));
