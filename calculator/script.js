/* ========================================================
   ⚙️ الإعدادات العامة
   ======================================================== */
const CONFIG = {
  // إذا أردت وضع شعارك، تأكد أن اسمه logo.png وارفعه في مجلد images
  logoUrl: 'images/logo.png', 
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
  document.getElementById('
