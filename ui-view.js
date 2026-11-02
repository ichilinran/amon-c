// Display-only helpers: colour classes, the highlighted C editor and copy buttons.
// Nothing here changes analysis or translation results.
const TYPE_WORDS = new Set('void char short int long float double signed unsigned _Bool _Complex _Imaginary struct union enum typedef const volatile restrict _Atomic static extern auto register inline _Noreturn _Thread_local _Alignas _Alignof sizeof _Static_assert _Generic'.split(' '));
const CONTROL_WORDS = new Set('if else for while do switch case default break continue goto return'.split(' '));
const TOKEN = /(\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$))|("(?:[^"\\\n]|\\.)*"?|'(?:[^'\\\n]|\\.)*'?)|(\.?\d(?:[\w.]|[eEpP][+-])*)|([A-Za-z_À-￿][\wÀ-￿]*)|(\s+)|([\s\S])/gy;

// Colour class for one piece of original C text, judged only from its spelling and
// the characters around it. Used for display, never for translation decisions.
export function classify(source, start, end) {
  const text = source.slice(start, end);
  const before = source.slice(Math.max(0, start - 40), start);
  if (/^#\s*$/.test(before.split('\n').at(-1) ?? '') || /^#/.test(text)) return 'c-pre';
  if (/^\/[/*]/.test(text)) return 'c-comment';
  if (/^["'<]/.test(text)) return 'c-string';
  if (/^\.?\d/.test(text)) return 'c-number';
  if (TYPE_WORDS.has(text)) return 'c-type';
  if (CONTROL_WORDS.has(text)) return 'c-control';
  if (/^[A-Za-z_]\w*$/.test(text) && /^\s*\(/.test(source.slice(end, end + 40))) return 'c-function';
  return '';
}

// Highlight plain C text into a fragment (strings, numbers, comments, keywords, calls).
export function highlightText(text) {
  const fragment = document.createDocumentFragment();
  let plain = '', atLineStart = true, inDirective = false;
  const flush = () => {if (plain) {fragment.append(document.createTextNode(plain)); plain = '';}};
  const add = (value, cls) => {if (!cls) {plain += value; return;} flush(); const s = document.createElement('span'); s.className = cls; s.textContent = value; fragment.append(s);};
  TOKEN.lastIndex = 0;
  let m;
  while (TOKEN.lastIndex < text.length && (m = TOKEN.exec(text))) {
    const [all, comment, str, num, ident, space, other] = m;
    if (space !== undefined) {
      add(all);
      if (all.includes('\n')) {atLineStart = true; if (!/\\\s*$/.test(text.slice(0, m.index))) inDirective = false;}
      continue;
    }
    if (comment) add(all, 'c-comment');
    else if (str) add(all, 'c-string');
    else if (num) add(all, 'c-number');
    else if (ident) {
      const next = text.slice(TOKEN.lastIndex).match(/^\s*(.)/)?.[1];
      add(all, inDirective && /^(include|define|undef|if|ifdef|ifndef|elif|else|endif|line|error|pragma)$/.test(all) && fragment.lastChild?.textContent?.endsWith('#') ? 'c-pre'
        : TYPE_WORDS.has(all) ? 'c-type' : CONTROL_WORDS.has(all) ? 'c-control' : next === '(' ? 'c-function' : '');
    } else if (other === '#' && atLineStart) {inDirective = true; add(all, 'c-pre');}
    else if (other === '<' && inDirective && /#\s*include\s*$/.test(text.slice(0, m.index))) {
      const close = text.indexOf('>', TOKEN.lastIndex);
      if (close >= 0) {add(text.slice(m.index, close + 1), 'c-string'); TOKEN.lastIndex = close + 1;} else add(all);
    } else add(all);
    atLineStart = false;
  }
  flush();
  return fragment;
}

// Editable C pane: a transparent textarea over a highlighted copy, with line numbers.
export function enhanceEditor(textarea) {
  const wrap = textarea.closest('.editor');
  const layer = wrap.querySelector('.editor-highlight'), gutter = wrap.querySelector('.gutter');
  const paint = () => {
    const value = textarea.value;
    layer.replaceChildren(highlightText(value), document.createTextNode('\n'));
    const lines = value.split('\n').length;
    if (gutter.childElementCount !== lines) gutter.textContent = Array.from({length: lines}, (_, i) => i + 1).join('\n');
    sync();
  };
  const sync = () => {layer.style.transform = `translate(${-textarea.scrollLeft}px, ${-textarea.scrollTop}px)`; gutter.style.transform = `translateY(${-textarea.scrollTop}px)`;};
  textarea.addEventListener('input', paint);
  textarea.addEventListener('scroll', sync);
  new ResizeObserver(sync).observe(textarea);
  paint();
  return paint;
}

export function copyButton(button, getText) {
  button.addEventListener('click', async () => {
    const original = button.textContent;
    try {await navigator.clipboard.writeText(getText()); button.textContent = 'コピーしました';}
    catch {button.textContent = 'コピーできません';}
    setTimeout(() => {button.textContent = original;}, 1500);
  });
}

// Close an open menu when the user picks an item or clicks elsewhere.
export function menus() {
  const all = [...document.querySelectorAll('details.menu')];
  document.addEventListener('click', e => {for (const d of all) if (d.open && !d.contains(e.target)) d.open = false;});
  for (const d of all) d.addEventListener('click', e => {if (e.target.closest('.menu-list button')) d.open = false;});
  document.addEventListener('keydown', e => {if (e.key === 'Escape') for (const d of all) d.open = false;});
}

// ---- スマホ：C と 支位 をタブで切り替えて全画面で表示する（表示だけ） ----
export function tabs() {
  const main = document.querySelector('main'), bar = document.getElementById('tabs');
  const select = name => {
    main.dataset.tab = name;
    for (const b of bar.querySelectorAll('button')) b.setAttribute('aria-selected', String(b.dataset.tab === name));
    window.scrollTo({top: 0});
  };
  bar.addEventListener('click', e => {const b = e.target.closest('button[data-tab]'); if (b) select(b.dataset.tab);});
  // A finished translation switches to the 支位 tab.
  new MutationObserver(() => {
    if (document.getElementById('output').childNodes.length && main.dataset.tab === 'c') select('shi');
  }).observe(document.getElementById('output'), {childList: true});
  select('c');
}

// ---- 支位側の行番号：各行に、元になったCの行番号を表示する（表示だけ） ----
// A newline in the output is a source newline when its segment reproduces the same
// number of newlines as the source it covers (raw text, ordinary replacements).
// Newlines added by declaration splitting or inserted guides have no source newline,
// so those lines get no number. Returns null unless every C line is numbered exactly
// once and in order; the caller then shows no numbers rather than wrong ones.
export function lineStarts(view) {
  const source = view.source, starts = new Map([[0, 1]]);
  let at = 0, line = 1;
  for (const seg of view.segments) {
    const text = seg.text;
    const valid = Number.isInteger(seg.start) && Number.isInteger(seg.end) && seg.end >= seg.start;
    if (!valid) return null;
    const covered = source.slice(seg.start, seg.end);
    const inserted = seg.operation === 'split' || seg.kind === 'annotation' || seg.start === seg.end;
    const sourceBreaks = (covered.match(/\n/g) ?? []).length, outputBreaks = (text.match(/\n/g) ?? []).length;
    const reproduces = !inserted && sourceBreaks === outputBreaks;
    for (let i = 0; i < text.length; i++) {
      if (text[i] !== '\n') continue;
      if (reproduces) {line++; starts.set(at + i + 1, line);}
    }
    at += text.length;
  }
  const total = source.split('\n').length;
  const numbers = [...starts.values()];
  if (numbers.length !== total || numbers.some((n, i) => n !== i + 1)) return null;
  return starts;
}

// Put an empty marker at the start of each numbered output line; the number is drawn
// by CSS, so copying the 支位 text never includes line numbers.
export function numberOutput(container, view) {
  const starts = view.key?.endsWith(':expanded') ? null : lineStarts(view);
  container.classList.toggle('numbered', !!starts);
  if (!starts) return;
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  const nodes = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) nodes.push(n);
  const ordered = [...starts].sort((a, b) => a[0] - b[0]);
  let offset = 0, k = 0;
  for (const node of nodes) {
    const length = node.data.length, here = [];
    while (k < ordered.length && ordered[k][0] < offset + length) {const [pos, n] = ordered[k++]; if (pos >= offset) here.push([pos - offset, n]);}
    // Split from the end so earlier offsets stay valid.
    for (const [rel, n] of here.sort((a, b) => b[0] - a[0])) {
      const rest = rel ? node.splitText(rel) : node;
      const mark = document.createElement('span');
      mark.className = 'ln'; mark.dataset.n = n; mark.setAttribute('aria-hidden', 'true');
      rest.parentNode.insertBefore(mark, rest);
    }
    offset += length;
  }
  // A last empty line (source ends with a newline) has no text node: add its marker.
  const last = ordered.find(([pos]) => pos === offset);
  if (last) {const mark = document.createElement('span'); mark.className = 'ln'; mark.dataset.n = last[1]; mark.setAttribute('aria-hidden', 'true'); container.append(mark);}
}

// A split declaration is one segment such as ";\nｾｲｽｳ ": keep the punctuation plain
// and colour the copied type words like the original type specifiers.
export function colourSplit(span, segment, view) {
  if (segment.operation !== 'split' || !segment.ranges?.[1]) return;
  const m = segment.text.match(/^([^\S\n]*;?\s*)([\s\S]*?)(\s*)$/);
  if (!m || !m[2]) return;
  const words = document.createElement('span');
  words.className = classify(view.source, segment.ranges[1].start, segment.ranges[1].end) || 'c-type';
  words.textContent = m[2];
  span.className = 'lexeme';
  span.replaceChildren(document.createTextNode(m[1]), words, document.createTextNode(m[3]));
}
