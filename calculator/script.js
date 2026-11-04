/* ========================================================
   ⚙️ الإعدادات العامة
   ======================================================== */
const CONFIG = {
  // إذا أردت وضع شعارك، تأكد أن اسمه logo.png وارفعه في مجلد images
  logoUrl: 'images/calculator.jpg', 
  title: 'آلة حاسبة علمية',
  storageKey: 'sci_calc_v3',
};

/* ========================================================
   🌍 الترجمة
   ======================================================== */
const I18N = {
  ar: {
    tab_calc:'الحاسبة', tab_convert:'التحويل', tab_graph:'الرسم', tab_settings:'الإعدادات',
    copy:'📋 نسخ', copied:'✓ تم', history:'📜 السجل', clear_all:'مسح الكل',
    history_empty:'لا توجد عمليات بعد', add_func:'+ إضافة دالة',
    graph_hint:'💡 استخدم x كمتغير. مثال: sin(x), x^2, 1/x, ln(x)',
    colors:'الألوان', primary_color:'اللون الرئيسي', success_color:'لون النتيجة',
    presets:'ألوان جاهزة', display:'العرض', language:'اللغة', theme:'المظهر',
    dark:'داكن', light:'فاتح', app:'التطبيق',
    pwa_ready:'التطبيق جاهز للتثبيت كتطبيق مستقل يعمل بدون إنترنت',
    install_app:'📲 تثبيت التطبيق', reset_data:'إعادة ضبط كل البيانات',
    reset_btn:'🗑️ إعادة ضبط', reset_confirm:'هل أنت متأكد من إعادة ضبط كل الإعدادات؟',
    copied_toast:'تم النسخ ✓',
    brand_sub:'احترافية • سريعة • آمنة',
    length:'الطول', weight:'الوزن', temp:'الحرارة', area:'المساحة', currency:'العملة',
    conv_note:'💡 أسعار العملات تقديرية وقد تتغير. راجع سعر الصرف الرسمي قبل الاستخدام المالي.',
    conv_note_other:'💡 التحويل دقيق 100% للوحدات الثابتة.',
    install_prompt:'📲 تثبيت التطبيق', installed:'تم التثبيت!'
  },
  en: {
    tab_calc:'Calculator', tab_convert:'Convert', tab_graph:'Graph', tab_settings:'Settings',
    copy:'📋 Copy', copied:'✓ Done', history:'📜 History', clear_all:'Clear All',
    history_empty:'No operations yet', add_func:'+ Add Function',
    graph_hint:'💡 Use x as variable. Ex: sin(x), x^2, 1/x, ln(x)',
    colors:'Colors', primary_color:'Primary Color', success_color:'Result Color',
    presets:'Presets', display:'Display', language:'Language', theme:'Theme',
    dark:'Dark', light:'Light', app:'App',
    pwa_ready:'App is ready to install as standalone offline app',
    install_app:'📲 Install App', reset_data:'Reset All Data',
    reset_btn:'🗑️ Reset', reset_confirm:'Are you sure you want to reset all settings?',
    copied_toast:'Copied ✓',
    brand_sub:'Professional • Fast • Safe',
    length:'Length', weight:'Weight', temp:'Temperature', area:'Area', currency:'Currency',
    conv_note:'💡 Currency rates are approximate. Check official rates before financial use.',
    conv_note_other:'💡 Conversion is 100% accurate for fixed units.',
    install_prompt:'📲 Install App', installed:'Installed!'
  }
};
let LANG = 'ar';
function t(key) { return (I18N[LANG] && I18N[LANG][key]) || I18N.ar[key] || key; }

(function applyBranding() {
  document.getElementById('brandTitle').textContent = CONFIG.title;
  if (CONFIG.logoUrl) {
    const img = document.getElementById('brandLogo');
    img.src = CONFIG.logoUrl;
    img.style.display = 'block';
    img.onerror = () => { 
      img.style.display = 'none'; 
      document.getElementById('brandFallback').style.display = 'flex';
    };
    document.getElementById('brandFallback').style.display = 'none';
  }
})();

/* ========================================================
   🧮 محرك التقييم الرياضي
   ======================================================== */
const SYM_TO_OP = { '×':'*', '÷':'/', '−':'-', '–':'-', '—':'-' };

function tokenize(src) {
  const out = []; let i = 0;
  const isDigit = c => c >= '0' && c <= '9';
  const isLetter = c => /[a-zA-Z]/.test(c);
  while (i < src.length) {
    const c = src[i];
    if (c === ' ' || c === '\t') { i++; continue; }
    if (c === 'π') { out.push({t:'name', v:'pi'}); i++; continue; }
    if (c === '√') { out.push({t:'name', v:'sqrt'}); i++; continue; }
    if (c === '∛') { out.push({t:'name', v:'cbrt'}); i++; continue; }
    if (SYM_TO_OP[c]) { out.push({t:'op', v:SYM_TO_OP[c]}); i++; continue; }
    if (isDigit(c) || (c === '.' && isDigit(src[i+1]))) {
      let n = '';
      while (i < src.length && (isDigit(src[i]) || src[i] === '.')) n += src[i++];
      out.push({t:'num', v:parseFloat(n)}); continue;
    }
    if (isLetter(c)) {
      let nm = '';
      while (i < src.length && isLetter(src[i])) nm += src[i++];
      out.push({t:'name', v:nm}); continue;
    }
    if ('+-*/^()!%'.includes(c)) { out.push({t:'op', v:c}); i++; continue; }
    throw new Error('Unknown symbol');
  }
  return out;
}

function parse(tokens) {
  let pos = 0;
  const peek = () => tokens[pos];
  const next = () => tokens[pos++];
  function addSub() {
    let L = mulDiv();
    while (peek() && peek().t==='op' && (peek().v==='+'||peek().v==='-')) {
      const op = next().v; L = {type:'bin', op, left:L, right:mulDiv()};
    }
    return L;
  }
  function mulDiv() {
    let L = unary();
    while (peek() && peek().t==='op' && (peek().v==='*'||peek().v==='/')) {
      const op = next().v; L = {type:'bin', op, left:L, right:unary()};
    }
    return L;
  }
  function unary() {
    if (peek() && peek().t==='op' && (peek().v==='-'||peek().v==='+')) {
      const op = next().v; const operand = unary();
      return op==='-' ? {type:'neg', operand} : operand;
    }
    return power();
  }
  function power() {
    let L = postfix();
    if (peek() && peek().t==='op' && peek().v==='^') {
      next(); L = {type:'bin', op:'^', left:L, right:unary()};
    }
    return L;
  }
  function postfix() {
    let n = primary();
    while (peek() && peek().t==='op') {
      if (peek().v==='!') { next(); n = {type:'fact', operand:n}; }
      else if (peek().v==='%') { next(); n = {type:'pct', operand:n}; }
      else break;
    }
    return n;
  }
  function primary() {
    const tok = peek();
    if (!tok) throw new Error('Incomplete');
    if (tok.t === 'num') { next(); return {type:'num', value:tok.v}; }
    if (tok.t === 'name') {
      next();
      if (peek() && peek().t==='op' && peek().v==='(') {
        next();
        const args = [];
        if (!(peek() && peek().t==='op' && peek().v===')')) {
          args.push(addSub());
          while (peek() && peek().t==='op' && peek().v===',') { next(); args.push(addSub()); }
        }
        if (!peek() || peek().v !== ')') throw new Error('Missing )');
        next();
        return {type:'call', name:tok.v, args};
      }
      return {type:'const', name:tok.v};
    }
    if (tok.t === 'op' && tok.v === '(') {
      next();
      const e = addSub();
      if (!peek() || peek().v !== ')') throw new Error('Missing )');
      next(); return e;
    }
    throw new Error('Unexpected');
  }
  if (!tokens.length) throw new Error('Empty');
  const ast = addSub();
  if (pos < tokens.length) throw new Error('Extra');
  return ast;
}

function factorial(n) {
  if (n < 0 || !Number.isInteger(n)) throw new Error('Invalid factorial');
  if (n > 170) throw new Error('Too large');
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function callFn(name, args, ctx) {
  const toRad = v => ctx.angleMode==='deg' ? v*Math.PI/180 : v;
  const fromRad = v => ctx.angleMode==='deg' ? v*180/Math.PI : v;
  switch (name) {
    case 'sin': return Math.sin(toRad(args[0]));
    case 'cos': return Math.cos(toRad(args[0]));
    case 'tan': return Math.tan(toRad(args[0]));
    case 'asin': return fromRad(Math.asin(args[0]));
    case 'acos': return fromRad(Math.acos(args[0]));
    case 'atan': return fromRad(Math.atan(args[0]));
    case 'sinh': return Math.sinh(args[0]);
    case 'cosh': return Math.cosh(args[0]);
    case 'tanh': return Math.tanh(args[0]);
    case 'ln': return Math.log(args[0]);
    case 'log': return Math.log10(args[0]);
    case 'exp': return Math.exp(args[0]);
    case 'sqrt': return Math.sqrt(args[0]);
    case 'cbrt': return Math.cbrt(args[0]);
    case 'abs': return Math.abs(args[0]);
    case 'nroot': return Math.sign(args[0]) * Math.pow(Math.abs(args[0]), 1/args[1]);
    case 'rand': return Math.random();
    case 'npr': return factorial(args[0]) / factorial(args[0]-args[1]);
    case 'ncr': return factorial(args[0]) / (factorial(args[1]) * factorial(args[0]-args[1]));
    default: throw new Error('Unknown fn');
  }
}

function evalNode(node, ctx) {
  switch (node.type) {
    case 'num': return node.value;
    case 'const':
      if (node.name === 'pi') return Math.PI;
      if (node.name === 'e') return Math.E;
      if (ctx.variables && node.name in ctx.variables) return ctx.variables[node.name];
      throw new Error('Unknown const');
    case 'neg': return -evalNode(node.operand, ctx);
    case 'bin': {
      const l = evalNode(node.left, ctx), r = evalNode(node.right, ctx);
      if (node.op==='+') return l + r;
      if (node.op==='-') return l - r;
      if (node.op==='*') return l * r;
      if (node.op==='/') { if (r===0) throw new Error('Div by 0'); return l / r; }
      if (node.op==='^') return Math.pow(l, r);
      break;
    }
    case 'fact': return factorial(evalNode(node.operand, ctx));
    case 'pct': return evalNode(node.operand, ctx) / 100;
    case 'call': return callFn(node.name, node.args.map(a => evalNode(a, ctx)), ctx);
  }
  throw new Error('Unknown node');
}

function evaluateExpression(expr, ctx) {
  if (!expr.trim()) throw new Error('Empty');
  return evalNode(parse(tokenize(expr)), ctx);
}

function formatNumber(n) {
  if (typeof n !== 'number' || isNaN(n)) return 'Error';
  if (!isFinite(n)) return n > 0 ? '∞' : '−∞';
  if (n === 0) return '0';
  const abs = Math.abs(n);
  if (Number.isInteger(n) && abs < 1e15) return n.toString();
  if (abs >= 1e15 || abs < 1e-9) return n.toExponential(9).replace(/\.?0+e/,'e').replace('e+','e');
  return n.toPrecision(12).replace(/\.?0+$/,'');
}

/* ========================================================
   💾 الحالة العامة
   ======================================================== */
const state = {
  expression:'', displayResult:'0', numericResult:null,
  justEvaluated:false, secondFn:false, angleMode:'deg',
  memory:0, hasMemory:false, lastAnswer:0, history:[],
  theme:'dark', accent:'#3b82f6', successColor:'#10b981', lang:'ar',
  graphFuncs: [], convCat:'length'
};

function saveState() {
  try {
    localStorage.setItem(CONFIG.storageKey, JSON.stringify({
      theme: state.theme, accent: state.accent, successColor: state.successColor,
      lang: state.lang, history: state.history, memory: state.memory,
      hasMemory: state.hasMemory, angleMode: state.angleMode,
      graphFuncs: state.graphFuncs, convCat: state.convCat
    }));
  } catch {}
}
function loadState() {
  try {
    const d = JSON.parse(localStorage.getItem(CONFIG.storageKey) || '{}');
    Object.assign(state, d);
    if (!Array.isArray(state.graphFuncs) || !state.graphFuncs.length) {
      state.graphFuncs = [{ expr:'sin(x)', color:'#3b82f6' }];
    }
  } catch {}
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  document.getElementById('themeBtn').textContent = state.theme === 'dark' ? '🌙' : '☀️';
  document.getElementById('set-theme').value = state.theme;
  saveState();
}
function applyColors() {
  document.documentElement.style.setProperty('--accent', state.accent);
  document.documentElement.style.setProperty('--success', state.successColor);
  document.getElementById('set-accent').value = state.accent;
  document.getElementById('set-success').value = state.successColor;
  document.querySelectorAll('#color-presets button').forEach(b => {
    b.classList.toggle('active', b.dataset.color === state.accent);
  });
  saveState();
}

function applyLang() {
  document.documentElement.lang = LANG;
  document.documentElement.dir = LANG === 'ar' ? 'rtl' : 'ltr';
  document.getElementById('langBtn').textContent = LANG === 'ar' ? 'EN' : 'ع';
  document.getElementById('set-lang').value = LANG;
  document.getElementById('brandSub').textContent = t('brand_sub');
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (key) el.textContent = t(key);
  });
  renderConvCats();
  renderHistory();
  renderConvNote();
  saveState();
}

/* ========================================================
   🧮 تطبيق الحاسبة
   ======================================================== */
const els = {
  expression: document.getElementById('expression'),
  result: document.getElementById('result'),
  ind2nd: document.getElementById('ind-2nd'),
  indAngle: document.getElementById('ind-angle'),
  indMem: document.getElementById('ind-mem'),
  grid: document.getElementById('grid'),
  historyList: document.getElementById('history-list'),
  copyBtn: document.getElementById('copyBtn'),
  toast: document.getElementById('toast'),
};

const BUTTONS = [
  { label:'2nd', action:'toggle-2nd', cls:'fn', id:'btn-2nd' },
  { label:'DEG', action:'toggle-angle', cls:'fn', id:'btn-angle' },
  { label:'π', insert:'π', cls:'fn' },
  { label:'e', insert:'e', cls:'fn' },
  { label:'⌫', action:'backspace', cls:'fn' },
  { label:'AC', action:'clear', cls:'clear' },
  { label:'sin', insert:'sin(', alt:{label:'sin⁻¹', insert:'asin('}, cls:'fn' },
  { label:'cos', insert:'cos(', alt:{label:'cos⁻¹', insert:'acos('}, cls:'fn' },
  { label:'tan', insert:'tan(', alt:{label:'tan⁻¹', insert:'atan('}, cls:'fn' },
  { label:'ln', insert:'ln(', alt:{label:'eˣ', insert:'exp('}, cls:'fn' },
  { label:'log', insert:'log(', alt:{label:'10ˣ', insert:'10^'}, cls:'fn' },
  { label:'√', insert:'√(', alt:{label:'∛', insert:'∛('}, cls:'fn' },
  { label:'x²', insert:'^2', alt:{label:'x³', insert:'^3'}, cls:'fn' },
  { label:'xʸ', insert:'^', alt:{label:'ʸ√x', insert:'nroot('}, cls:'fn' },
  { label:'1/x', insert:'1/(', alt:{label:'|x|', insert:'abs('}, cls:'fn' },
  { label:'x!', insert:'!', cls:'fn' },
  { label:'%', insert:'%', cls:'fn' },
  { label:'|x|', insert:'abs(', cls:'fn' },
  { label:'(', insert:'(', cls:'fn' },
  { label:')', insert:')', cls:'fn' },
  { label:'7', insert:'7', cls:'num' },
  { label:'8', insert:'8', cls:'num' },
  { label:'9', insert:'9', cls:'num' },
  { label:'÷', insert:'÷', cls:'op' },
  { label:'nPr', insert:'npr(', cls:'fn' },
  { label:'nCr', insert:'ncr(', cls:'fn' },
  { label:'4', insert:'4', cls:'num' },
  { label:'5', insert:'5', cls:'num' },
  { label:'6', insert:'6', cls:'num' },
  { label:'×', insert:'×', cls:'op' },
  { label:'rand', insert:'rand()', cls:'fn' },
  { label:'exp', insert:'exp(', cls:'fn' },
  { label:'1', insert:'1', cls:'num' },
  { label:'2', insert:'2', cls:'num' },
  { label:'3', insert:'3', cls:'num' },
  { label:'−', insert:'−', cls:'op' },
  { label:'ANS', action:'ans', cls:'fn' },
  { label:',', insert:',', cls:'fn' },
  { label:'0', insert:'0', cls:'num' },
  { label:'.', insert:'.', cls:'num' },
  { label:'+', insert:'+', cls:'op' },
  { label:'=', action:'equals', cls:'eq' },
];

function renderButtons() {
  els.grid.innerHTML = '';
  BUTTONS.forEach(def => {
    const btn = document.createElement('button');
    const active = state.secondFn && def.alt;
    btn.textContent = active ? def.alt.label : def.label;
    btn.className = def.cls || '';
    if (def.action) btn.dataset.action = def.action;
    else btn.dataset.insert = active ? def.alt.insert : def.insert;
    if (def.id) btn.id = def.id;
    if (def.action === 'toggle-2nd' && state.secondFn) btn.classList.add('active');
    if (def.action === 'toggle-angle') btn.textContent = state.angleMode === 'deg' ? 'DEG' : 'RAD';
    els.grid.appendChild(btn);
  });
}

function updateDisplay() {
  els.expression.innerHTML = '';
  const s = document.createElement('span'); s.textContent = state.expression;
  els.expression.appendChild(s);
  const c = document.createElement('span'); c.className = 'caret';
  els.expression.appendChild(c);
  els.result.textContent = state.displayResult;
  els.result.className = 'result';
  if (state.justEvaluated) els.result.classList.add('final');
  if (state.displayResult.includes('Error') || state.displayResult.includes('خطأ')) els.result.classList.add('error');
  els.ind2nd.classList.toggle('active', state.secondFn);
  els.indAngle.textContent = state.angleMode === 'deg' ? 'DEG' : 'RAD';
  els.indAngle.classList.add('active');
  els.indMem.classList.toggle('active', state.hasMemory);
}

function updatePreview() {
  if (state.justEvaluated) return;
  if (!state.expression.trim()) {
    state.displayResult = '0'; state.numericResult = null; return;
  }
  try {
    const v = evaluateExpression(state.expression, state);
    state.displayResult = formatNumber(v); state.numericResult = v;
  } catch {
    state.displayResult = ''; state.numericResult = null;
  }
}

const OPERATOR_START = /^[+\-−×÷^%!]/;
function insertText(text) {
  if (state.justEvaluated) {
    if (OPERATOR_START.test(text)) {
      state.expression = state.numericResult !== null ? formatNumber(state.numericResult) : '';
    } else state.expression = '';
    state.justEvaluated = false;
  }
  state.expression += text;
  updatePreview(); updateDisplay();
}
function backspace() {
  if (state.justEvaluated) state.justEvaluated = false;
  state.expression = state.expression.slice(0, -1);
  updatePreview(); updateDisplay();
}
function clearAll() {
  state.expression = ''; state.displayResult = '0';
  state.numericResult = null; state.justEvaluated = false;
  updateDisplay();
}
function doEquals() {
  if (!state.expression.trim()) return;
  try {
    const v = evaluateExpression(state.expression, state);
    state.displayResult = formatNumber(v); state.numericResult = v;
    state.lastAnswer = v; state.justEvaluated = true;
    addHistory(state.expression, state.displayResult);
  } catch (e) {
    state.displayResult = 'Error: ' + e.message;
    state.numericResult = null; state.justEvaluated = true;
  }
  updateDisplay(); saveState();
}
function addHistory(expr, result) {
  state.history.unshift({ expr, result });
  if (state.history.length > 50) state.history.pop();
  renderHistory(); saveState();
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function renderHistory() {
  if (!state.history.length) {
    els.historyList.innerHTML = `<div class="history-empty">${t('history_empty')}</div>`;
    return;
  }
  els.historyList.innerHTML = '';
  state.history.forEach(item => {
    const d = document.createElement('div'); d.className = 'history-item';
    d.innerHTML = `<div class="expr">${escapeHtml(item.expr)}</div><div class="res">= ${escapeHtml(item.result)}</div>`;
    d.addEventListener('click', () => {
      state.expression = item.expr;
      state.justEvaluated = false;
      updatePreview(); updateDisplay();
    });
    els.historyList.appendChild(d);
  });
}

let toastTimer;
function showToast(msg) {
  els.toast.textContent = msg;
  els.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove('show'), 1800);
}
async function copyResult() {
  const text = state.displayResult;
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    feedbackCopy();
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); feedbackCopy(); } catch {}
    document.body.removeChild(ta);
  }
}
function feedbackCopy() {
  els.copyBtn.classList.add('copied');
  els.copyBtn.textContent = t('copied');
  showToast(t('copied_toast'));
  setTimeout(() => {
    els.copyBtn.classList.remove('copied');
    els.copyBtn.textContent = t('copy');
  }, 1600);
}

function handleAction(action) {
  switch (action) {
    case 'toggle-2nd': state.secondFn = !state.secondFn; renderButtons(); updateDisplay(); break;
    case 'toggle-angle': state.angleMode = state.angleMode === 'deg' ? 'rad' : 'deg';
      renderButtons(); updatePreview(); updateDisplay(); saveState(); break;
    case 'backspace': backspace(); break;
    case 'clear': clearAll(); break;
    case 'equals': doEquals(); break;
    case 'ans': insertText(formatNumber(state.lastAnswer)); break;
    case 'mc': state.memory = 0; state.hasMemory = false; updateDisplay(); saveState(); break;
    case 'mr': if (state.hasMemory) insertText(formatNumber(state.memory)); break;
    case 'm-plus': state.memory += (state.numericResult ?? 0); state.hasMemory = true; updateDisplay(); saveState(); break;
    case 'm-minus': state.memory -= (state.numericResult ?? 0); state.hasMemory = true; updateDisplay(); saveState(); break;
    case 'ms': state.memory = (state.numericResult ?? 0); state.hasMemory = true; updateDisplay(); saveState(); break;
  }
}

els.grid.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.action) handleAction(b.dataset.action);
  else if (b.dataset.insert !== undefined) insertText(b.dataset.insert);
});
document.querySelector('.memory-row').addEventListener('click', e => {
  const b = e.target.closest('button'); if (b) handleAction(b.dataset.action);
});
document.getElementById('clear-history').addEventListener('click', () => {
  state.history = []; renderHistory(); saveState();
});
els.copyBtn.addEventListener('click', copyResult);

document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'SELECT')) return;
  if (!document.getElementById('tab-calc').classList.contains('active')) return;
  const k = e.key;
  const map = { '.':'.', '+':'+', '-':'−', '*':'×', '/':'÷', '^':'^', '(':'(', ')':')', '%':'%', '!':'!' };
  if (k >= '0' && k <= '9') { insertText(k); e.preventDefault(); }
  else if (map[k]) { insertText(map[k]); e.preventDefault(); }
  else if (k === 'Enter' || k === '=') { doEquals(); e.preventDefault(); }
  else if (k === 'Backspace') { backspace(); e.preventDefault(); }
  else if (k === 'Escape' || k === 'Delete') { clearAll(); e.preventDefault(); }
});

/* ========================================================
   📏 محول الوحدات
   ======================================================== */
const UNITS = {
  length: {
    units: { m:1, km:1000, cm:0.01, mm:0.001, mi:1609.344, yd:0.9144, ft:0.3048, in:0.0254 },
    order: ['m','km','cm','mm','mi','yd','ft','in']
  },
  weight: {
    units: { kg:1, g:0.001, mg:1e-6, t:1000, lb:0.45359237, oz:0.028349523125 },
    order: ['kg','g','mg','t','lb','oz']
  },
  temp: {
    special: true,
    order: ['C','F','K']
  },
  area: {
    units: { 'm²':1, 'km²':1e6, 'cm²':0.0001, 'mi²':2589988.11, 'yd²':0.83612736, 'ft²':0.09290304, 'ha':10000, 'acre':4046.8564224 },
    order: ['m²','km²','cm²','mi²','yd²','ft²','ha','acre']
  },
  currency: {
    units: {
      USD:1, SAR:3.75, AED:3.6725, EGP:48.5, EUR:0.92, GBP:0.79,
      YER:250, JOD:0.71, KWD:0.31, QAR:3.64, OMR:0.385, BHD:0.376,
      IQD:1310, LYD:4.85, TND:3.13, DZD:134, MAD:9.95, SDG:600,
      SYP:13000, LBP:89500, TRY:34.5, INR:84, PKR:278, CNY:7.25,
      JPY:155, KRW:1380, CAD:1.4, AUD:1.55, CHF:0.88, RUB:100
    },
    order: ['USD','SAR','AED','EGP','EUR','GBP','YER','JOD','KWD','QAR','OMR','BHD','IQD','LYD','TND','DZD','MAD','SDG','SYP','LBP','TRY','INR','PKR','CNY','JPY','KRW','CAD','AUD','CHF','RUB']
  }
};

const CATEGORIES = ['length','weight','temp','area','currency'];
const CAT_ICONS = { length:'📏', weight:'⚖️', temp:'🌡️', area:'📐', currency:'💵' };

function renderConvCats() {
  const container = document.getElementById('conv-cats');
  container.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = `${CAT_ICONS[cat]} ${t(cat)}`;
    btn.dataset.cat = cat;
    if (state.convCat === cat) btn.classList.add('active');
    btn.addEventListener('click', () => {
      state.convCat = cat;
      renderConvCats(); renderConvUnits(); convert();
      saveState();
    });
    container.appendChild(btn);
  });
}

function renderConvUnits() {
  const cat = state.convCat;
  const data = UNITS[cat];
  const fromSel = document.getElementById('conv-from-unit');
  const toSel = document.getElementById('conv-to-unit');
  const order = data.order;
  fromSel.innerHTML = ''; toSel.innerHTML = '';
  order.forEach(u => {
    fromSel.add(new Option(u, u));
    toSel.add(new Option(u, u));
  });
  fromSel.value = order[0];
  toSel.value = order[1] || order[0];
}

function convertTemperature(val, from, to) {
  let c;
  if (from === 'C') c = val;
  else if (from === 'F') c = (val - 32) * 5/9;
  else if (from === 'K') c = val - 273.15;
  if (to === 'C') return c;
  if (to === 'F') return c * 9/5 + 32;
  if (to === 'K') return c + 273.15;
  return NaN;
}

function convert() {
  const cat = state.convCat;
  const data = UNITS[cat];
  const fromV = parseFloat(document.getElementById('conv-from-value').value);
  const fromU = document.getElementById('conv-from-unit').value;
  const toU = document.getElementById('conv-to-unit').value;
  const out = document.getElementById('conv-to-value');
  if (isNaN(fromV)) { out.value = ''; return; }
  let result;
  if (data.special) {
    result = convertTemperature(fromV, fromU, toU);
  } else {
    result = fromV * data.units[fromU] / data.units[toU];
  }
  out.value = formatNumber(result);
}

function renderConvNote() {
  const note = document.getElementById('conv-note');
  if (!note) return;
  note.textContent = state.convCat === 'currency' ? t('conv_note') : t('conv_note_other');
}

document.getElementById('conv-from-value').addEventListener('input', convert);
document.getElementById('conv-from-unit').addEventListener('change', convert);
document.getElementById('conv-to-unit').addEventListener('change', convert);
document.getElementById('conv-swap').addEventListener('click', () => {
  const fromV = document.getElementById('conv-from-value');
  const toV = document.getElementById('conv-to-value');
  const fromU = document.getElementById('conv-from-unit');
  const toU = document.getElementById('conv-to-unit');
  [fromU.value, toU.value] = [toU.value, fromU.value];
  fromV.value = toV.value || 0;
  convert();
});

/* ========================================================
   📊 الرسم البياني
   ======================================================== */
const graph = {
  canvas: document.getElementById('graph-canvas'),
  ctx: null,
  xMin: -10, xMax: 10, yMin: -6, yMax: 6,
  panStart: null,
  init() {
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    this.canvas.addEventListener('wheel', e => this.onWheel(e), { passive: false });
    this.canvas.addEventListener('mousedown', e => this.onStart(e.clientX, e.clientY));
    window.addEventListener('mousemove', e => this.onMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', () => this.panStart = null);
    this.canvas.addEventListener('touchstart', e => {
      if (e.touches.length === 1) this.onStart(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    this.canvas.addEventListener('touchmove', e => {
      if (e.touches.length === 1) { this.onMove(e.touches[0].clientX, e.touches[0].clientY); e.preventDefault(); }
    }, { passive: false });
    this.canvas.addEventListener('touchend', () => this.panStart = null);
    window.addEventListener('resize', () => { this.resize(); this.draw(); });
  },
  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.W = rect.width; this.H = rect.height;
  },
  w2sX(x) { return (x - this.xMin) / (this.xMax - this.xMin) * this.W; },
  w2sY(y) { return this.H - (y - this.yMin) / (this.yMax - this.yMin) * this.H; },
  s2wX(px) { return this.xMin + px / this.W * (this.xMax - this.xMin); },
  s2wY(py) { return this.yMin + (this.H - py) / this.H * (this.yMax - this.yMin); },
  onStart(cx, cy) {
    const rect = this.canvas.getBoundingClientRect();
    this.panStart = { x: cx - rect.left, y: cy - rect.top, xMin: this.xMin, xMax: this.xMax, yMin: this.yMin, yMax: this.yMax };
  },
  onMove(cx, cy) {
    if (!this.panStart) return;
    const rect = this.canvas.getBoundingClientRect();
    const dx = (cx - rect.left) - this.panStart.x;
    const dy = (cy - rect.top) - this.panStart.y;
    const xRange = this.panStart.xMax - this.panStart.xMin;
    const yRange = this.panStart.yMax - this.panStart.yMin;
    this.xMin = this.panStart.xMin - dx / this.W * xRange;
    this.xMax = this.panStart.xMax - dx / this.W * xRange;
    this.yMin = this.panStart.yMin + dy / this.H * yRange;
    this.yMax = this.panStart.yMax + dy / this.H * yRange;
    this.draw();
  },
  onWheel(e) {
    e.preventDefault();
    const rect = this.canvas.getBoundingClientRect();
    const px = e.clientX - rect.left, py = e.clientY - rect.top;
    const wx = this.s2wX(px), wy = this.s2wY(py);
    const factor = e.deltaY > 0 ? 1.15 : 0.85;
    this.xMin = wx + (this.xMin - wx) * factor;
    this.xMax = wx + (this.xMax - wx) * factor;
    this.yMin = wy + (this.yMin - wy) * factor;
    this.yMax = wy + (this.yMax - wy) * factor;
    this.draw();
  },
  zoom(factor) {
    const cx = (this.xMin + this.xMax) / 2;
    const cy = (this.yMin + this.yMax) / 2;
    this.xMin = cx + (this.xMin - cx) * factor;
    this.xMax = cx + (this.xMax - cx) * factor;
    this.yMin = cy + (this.yMin - cy) * factor;
    this.yMax = cy + (this.yMax - cy) * factor;
    this.draw();
  },
  reset() {
    this.xMin = -10; this.xMax = 10; this.yMin = -6; this.yMax = 6;
    this.draw();
  },
  draw() {
    const ctx = this.ctx;
    const style = getComputedStyle(document.documentElement);
    const textColor = style.getPropertyValue('--text-dim').trim() || '#94a3b8';
    const bg = style.getPropertyValue('--display-bg').trim() || '#0b1220';
    const gridColor = style.getPropertyValue('--border').trim() || '#334155';

    ctx.clearRect(0, 0, this.W, this.H);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, this.W, this.H);

    const xRange = this.xMax - this.xMin;
    const yRange = this.yMax - this.yMin;
    const stepX = this.niceStep(xRange / 8);
    const stepY = this.niceStep(yRange / 6);

    ctx.strokeStyle = gridColor;
    ctx.globalAlpha = 0.4;
    ctx.lineWidth = 1;
    ctx.beginPath();
    const xStart = Math.ceil(this.xMin / stepX) * stepX;
    for (let x = xStart; x <= this.xMax; x += stepX) {
      const px = this.w2sX(x);
      ctx.moveTo(px, 0); ctx.lineTo(px, this.H);
    }
    const yStart = Math.ceil(this.yMin / stepY) * stepY;
    for (let y = yStart; y <= this.yMax; y += stepY) {
      const py = this.w2sY(y);
      ctx.moveTo(0, py); ctx.lineTo(this.W, py);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.strokeStyle = textColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    if (this.xMin <= 0 && this.xMax >= 0) {
      const px = this.w2sX(0);
      ctx.moveTo(px, 0); ctx.lineTo(px, this.H);
    }
    if (this.yMin <= 0 && this.yMax >= 0) {
      const py = this.w2sY(0);
      ctx.moveTo(0, py); ctx.lineTo(this.W, py);
    }
    ctx.stroke();

    ctx.fillStyle = textColor;
    ctx.font = '11px monospace';
    ctx.textAlign = 'center';
    for (let x = xStart; x <= this.xMax; x += stepX) {
      if (Math.abs(x) < 0.001) continue;
      const px = this.w2sX(x);
      const py = Math.min(Math.max(this.w2sY(0) + 14, 14), this.H - 4);
      ctx.fillText(this.fmtTick(x), px, py);
    }
    ctx.textAlign = 'right';
    for (let y = yStart; y <= this.yMax; y += stepY) {
      if (Math.abs(y) < 0.001) continue;
      const py = this.w2sY(y);
      const px = Math.min(Math.max(this.w2sX(0) - 6, 30), this.W - 4);
      ctx.fillText(this.fmtTick(y), px, py + 4);
    }

    state.graphFuncs.forEach(fn => this.plot(fn));
  },
  niceStep(rough) {
    const pow = Math.pow(10, Math.floor(Math.log10(rough)));
    const n = rough / pow;
    let step;
    if (n < 1.5) step = 1;
    else if (n < 3) step = 2;
    else if (n < 7) step = 5;
    else step = 10;
    return step * pow;
  },
  fmtTick(v) {
    if (Math.abs(v) >= 1e5 || (Math.abs(v) < 1e-3 && v !== 0)) return v.toExponential(1);
    return parseFloat(v.toFixed(4)).toString();
  },
  plot(fn) {
    const ctx = this.ctx;
    let ast;
    try { ast = parse(tokenize(fn.expr)); } catch { return; }
    ctx.strokeStyle = fn.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    let prevPy = null, started = false;
    const step = 1;
    const varCtx = { angleMode: 'rad', variables: { x: 0 } };
    for (let px = 0; px <= this.W; px += step) {
      const wx = this.s2wX(px);
      varCtx.variables.x = wx;
      let wy;
      try { wy = evalNode(ast, varCtx); } catch { wy = NaN; }
      if (!isFinite(wy) || isNaN(wy)) { prevPy = null; started = false; continue; }
      const py = this.w2sY(wy);
      if (!started || prevPy === null) { ctx.moveTo(px, py); started = true; }
      else if (Math.abs(py - prevPy) > this.H * 1.5) { ctx.moveTo(px, py); }
      else { ctx.lineTo(px, py); }
      prevPy = py;
    }
    ctx.stroke();
  }
};

function renderGraphFuncs() {
  const list = document.getElementById('func-list');
  list.innerHTML = '';
  state.graphFuncs.forEach((fn, i) => {
    const row = document.createElement('div');
    row.className = 'func-item';
    row.innerHTML = `
      <input type="color" value="${fn.color}" data-i="${i}">
      <input type="text" value="${escapeHtml(fn.expr)}" data-i="${i}" placeholder="sin(x)">
      <button class="remove-btn" data-i="${i}">×</button>
    `;
    list.appendChild(row);
  });
  list.querySelectorAll('input[type="color"]').forEach(inp => {
    inp.addEventListener('input', e => {
      state.graphFuncs[+e.target.dataset.i].color = e.target.value;
      graph.draw(); saveState();
    });
  });
  list.querySelectorAll('input[type="text"]').forEach(inp => {
    inp.addEventListener('input', e => {
      state.graphFuncs[+e.target.dataset.i].expr = e.target.value;
      graph.draw(); saveState();
    });
  });
  list.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.graphFuncs.splice(+btn.dataset.i, 1);
      renderGraphFuncs(); graph.draw(); saveState();
    });
  });
}

document.getElementById('add-func').addEventListener('click', () => {
  const colors = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#ec4899','#06b6d4'];
  state.graphFuncs.push({ expr: 'x', color: colors[state.graphFuncs.length % colors.length] });
  renderGraphFuncs(); graph.draw(); saveState();
});
document.getElementById('graph-zoom-in').addEventListener('click', () => graph.zoom(0.8));
document.getElementById('graph-zoom-out').addEventListener('click', () => graph.zoom(1.25));
document.getElementById('graph-reset').addEventListener('click', () => graph.reset());

/* ========================================================
   🎨 الإعدادات
   ======================================================== */
const PRESET_COLORS = ['#3b82f6','#8b5cf6','#10b981','#f59e0b','#ef4444','#ec4899','#06b6d4','#6366f1'];
function renderColorPresets() {
  const c = document.getElementById('color-presets');
  c.innerHTML = '';
  PRESET_COLORS.forEach(color => {
    const b = document.createElement('button');
    b.style.background = color; b.dataset.color = color;
    if (color === state.accent) b.classList.add('active');
    b.addEventListener('click', () => {
      state.accent = color;
      if (color === '#10b981') state.successColor = '#059669';
      applyColors();
    });
    c.appendChild(b);
  });
}
document.getElementById('set-accent').addEventListener('input', e => {
  state.accent = e.target.value; applyColors();
});
document.getElementById('set-success').addEventListener('input', e => {
  state.successColor = e.target.value; applyColors();
});
document.getElementById('set-lang').addEventListener('change', e => {
  LANG = e.target.value; state.lang = LANG; applyLang();
});
document.getElementById('set-theme').addEventListener('change', e => {
  state.theme = e.target.value; applyTheme();
});
document.getElementById('themeBtn').addEventListener('click', () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark'; applyTheme();
});
document.getElementById('langBtn').addEventListener('click', () => {
  LANG = LANG === 'ar' ? 'en' : 'ar'; state.lang = LANG; applyLang();
});
document.getElementById('reset-all').addEventListener('click', () => {
  if (confirm(t('reset_confirm'))) {
    localStorage.removeItem(CONFIG.storageKey);
    location.reload();
  }
});

/* ========================================================
   🔀 التبويبات
   ======================================================== */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const tabId = 'tab-' + btn.dataset.tab;
    document.getElementById(tabId).classList.add('active');
    if (btn.dataset.tab === 'graph') { graph.resize(); graph.draw(); }
  });
});

/* ========================================================
   📱 PWA — تثبيت التطبيق
   ======================================================== */
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('install-btn').classList.add('show');
});
document.getElementById('install-btn').addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  if (outcome === 'accepted') showToast(t('installed'));
  deferredPrompt = null;
  document.getElementById('install-btn').classList.remove('show');
});

(function buildManifest() {
  const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192">
    <rect width="192" height="192" rx="32" fill="${state.accent || '#3b82f6'}"/>
    <text x="96" y="130" font-size="110" text-anchor="middle" fill="white">🧮</text>
  </svg>`;
  const iconUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(iconSvg);
  const manifest = {
    name: CONFIG.title,
    short_name: 'Calculator',
    start_url: location.href,
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: state.accent || '#3b82f6',
    icons: [
      { src: iconUrl, sizes: '192x192', type: 'image/svg+xml', purpose: 'any maskable' },
      { src: iconUrl, sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable' }
    ]
  };
  const blob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
  document.getElementById('manifest-link').href = URL.createObjectURL(blob);
})();

/* ========================================================
   🚀 التشغيل
   ======================================================== */
loadState();
LANG = state.lang || 'ar';
document.documentElement.setAttribute('data-theme', state.theme);
applyTheme();
applyColors();
renderColorPresets();
applyLang();
renderButtons();
renderHistory();
updateDisplay();
renderConvCats();
renderConvUnits();
convert();
renderConvNote();
renderGraphFuncs();
graph.init();
graph.draw();
