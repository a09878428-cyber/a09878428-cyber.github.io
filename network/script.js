
const lessons = [
{
title:"مقدمة في شبكات الحاسوب",
level:1,
intro:"شبكة الحاسوب هي مجموعة من الأجهزة المتصلة مع بعضها لتبادل البيانات والموارد.",
topics:[
["تعريف الشبكة","هي اتصال جهازين أو أكثر باستخدام وسائل اتصال سلكية أو لاسلكية."],
["طريقة العمل","ترسل الأجهزة البيانات وتستقبلها وفق قواعد وبروتوكولات محددة."],
["مثال","اتصال هاتفك بالإنترنت عبر جهاز Wi-Fi."],
["الأهمية","مشاركة الملفات والطابعات والإنترنت وتسهيل التواصل."]
],
tip:"الشبكة تربط جهازين أو أكثر لتبادل البيانات.",
question:"ما المقصود بشبكة الحاسوب؟",
answers:["مجموعة أجهزة متصلة لتبادل البيانات","برنامج صور","معالج","طابعة"],
correct:0
},
{
title:"فوائد استخدام الشبكات",
level:1,
intro:"تساعد الشبكات على تسهيل العمل وتبادل المعلومات بين الأجهزة.",
topics:[
["مشاركة الملفات","إرسال الملفات واستقبالها بين الأجهزة."],
["مشاركة الطابعات","استخدام طابعة واحدة من عدة أجهزة."],
["مشاركة الإنترنت","اتصال عدة أجهزة بالإنترنت عبر راوتر واحد."],
["التواصل","إرسال الرسائل والاجتماعات ومشاركة المعلومات."]
],
tip:"الشبكات توفر الوقت والجهد والموارد.",
question:"أي مما يلي من فوائد الشبكات؟",
answers:["مشاركة الملفات والطابعات","إيقاف الأجهزة","منع الاتصال","حذف البيانات"],
correct:0
},
{
title:"أنواع الشبكات LAN وMAN وWAN",
level:1,
intro:"تصنف الشبكات حسب المساحة الجغرافية التي تغطيها.",
topics:[
["LAN","شبكة محلية تغطي المنزل أو المدرسة أو المكتب."],
["MAN","شبكة تربط عدة شبكات داخل مدينة."],
["WAN","شبكة واسعة تغطي دولاً ومناطق كبيرة."],
["مثال","الإنترنت مثال مشهور على الشبكات الواسعة."]
],
tip:"LAN محلية، MAN مدينة، WAN واسعة.",
question:"أي شبكة تستخدم عادة داخل المدرسة؟",
answers:["WAN","MAN","LAN","لا شيء مما سبق"],
correct:2
},
{
title:"مكونات شبكة الحاسوب",
level:1,
intro:"تتكون الشبكة من أجهزة ووسائط اتصال وبرامج وبروتوكولات.",
topics:[
["الأجهزة الطرفية","الحاسوب والهاتف والطابعة والخادم."],
["بطاقة الشبكة NIC","تسمح للجهاز بالاتصال بالشبكة."],
["أجهزة الربط","مثل Switch وRouter وAccess Point."],
["وسائط النقل","الكابلات والألياف الضوئية والاتصال اللاسلكي."]
],
tip:"تحتاج الشبكة إلى أجهزة ووسيلة اتصال وقواعد تنظيم.",
question:"ما وظيفة بطاقة NIC؟",
answers:["طباعة المستندات","ربط الجهاز بالشبكة","تبريد الجهاز","عرض الصور"],
correct:1
},
{
title:"وسائط نقل البيانات",
level:1,
intro:"وسائط النقل هي الطرق التي تنتقل من خلالها البيانات بين الأجهزة.",
topics:[
["الكابلات النحاسية","تنقل البيانات باستخدام إشارات كهربائية."],
["الألياف الضوئية","تنقل البيانات باستخدام الضوء."],
["Wi-Fi","ينقل البيانات لاسلكياً باستخدام موجات الراديو."],
["الاختيار","يعتمد على السرعة والمسافة والتكلفة."]
],
tip:"الألياف الضوئية تستخدم الضوء لنقل البيانات.",
question:"أي وسيط يستخدم الضوء؟",
answers:["النحاس","الألياف الضوئية","Bluetooth","USB"],
correct:1
},
{
title:"Client وServer",
level:1,
intro:"نموذج العميل والخادم يعتمد على طلب خدمة من جهاز وتقديمها بواسطة جهاز آخر.",
topics:[
["Client","الجهاز أو البرنامج الذي يطلب الخدمة."],
["Server","الجهاز أو البرنامج الذي يقدم الخدمة."],
["مثال","المتصفح يطلب صفحة من خادم الموقع."],
["أنواع الخوادم","خادم ويب وملفات وبريد وقواعد بيانات."]
],
tip:"Client يطلب، وServer يقدم.",
question:"من يقدم الخدمة؟",
answers:["Client","Server","الشاشة","لوحة المفاتيح"],
correct:1
},
{
title:"جهاز Router",
level:2,
intro:"الراوتر يربط بين شبكات مختلفة ويوجه البيانات إلى وجهتها.",
topics:[
["وظيفته","ربط الشبكة المحلية بالإنترنت أو بشبكات أخرى."],
["توجيه البيانات","يستخدم عناوين IP لاختيار المسار المناسب."],
["البوابة الافتراضية","Default Gateway هو عنوان الراوتر الذي تستخدمه الأجهزة للوصول إلى شبكات أخرى."],
["مثال","الراوتر المنزلي يربط أجهزة المنزل بالإنترنت."]
],
tip:"Router يربط الشبكات المختلفة.",
question:"ما الوظيفة الأساسية للراوتر؟",
answers:["توجيه البيانات بين الشبكات","طباعة الملفات","عرض الصور","تخزين الكهرباء"],
correct:0
},
{
title:"جهاز Switch",
level:2,
intro:"السويتش يربط الأجهزة داخل الشبكة المحلية LAN.",
topics:[
["وظيفته","ربط الحواسيب والطابعات والأجهزة."],
["عنوان MAC","يتعلم عناوين MAC للأجهزة المتصلة به."],
["المنافذ","تتصل الأجهزة بالسويتش عبر منافذ Ethernet."],
["مثال","ربط 20 حاسوباً في معمل واحد."]
],
tip:"Switch يستخدم عناوين MAC لتوجيه إطارات الشبكة.",
question:"أي عنوان يستخدمه Switch عادة؟",
answers:["MAC","اسم المستخدم","رقم الهاتف","البريد الإلكتروني"],
correct:0
},
{
title:"Hub وRepeater",
level:2,
intro:"جهازان تقليديان يستخدمان في توصيل الشبكات وتمديد الإشارات.",
topics:[
["Hub","يرسل البيانات إلى جميع المنافذ الأخرى تقريباً."],
["عيوب Hub","يسبب ازدحاماً ولا يوجه البيانات حسب MAC."],
["Repeater","يعيد توليد الإشارة للمساعدة على تمديد مسافة الاتصال."],
["الفرق","Hub يربط الأجهزة، وRepeater يعيد توليد الإشارة."]
],
tip:"Hub يوزع البيانات، وRepeater يعيد توليد الإشارة.",
question:"ما وظيفة Repeater؟",
answers:["تخزين الملفات","إعادة توليد الإشارة","طباعة المستندات","تعيين كلمات المرور"],
correct:1
},
{
title:"Access Point",
level:2,
intro:"نقطة الوصول تسمح للأجهزة اللاسلكية بالاتصال بالشبكة.",
topics:[
["الوظيفة","توفير اتصال Wi-Fi للهواتف والحواسيب."],
["SSID","اسم شبكة Wi-Fi الذي يظهر للمستخدم."],
["الحماية","يمكن استخدام WPA2 أو WPA3 لحماية الشبكة."],
["مثال","تركيب نقطة وصول في طابق ثانٍ لتوفير التغطية."]
],
tip:"Access Point يوفر الاتصال اللاسلكي.",
question:"ما وظيفة Access Point؟",
answers:["توفير Wi-Fi","طباعة الملفات","تبريد الحاسوب","حذف IP"],
correct:0
},

// نهاية الدروس 1 إلى 10
// سيأتي بعدها الجزء الثاني

{
title:"كابلات الشبكات RJ45 وUTP",
level:2,
intro:"تستخدم كابلات الشبكات لتوصيل الأجهزة ونقل البيانات.",
topics:[
["كابل UTP","كابل نحاسي يتكون من أزواج أسلاك مجدولة لتقليل التداخل."],
["موصل RJ45","موصل يستخدم عادة مع كابلات Ethernet."],
["T568A وT568B","ترتيبان معروفان لألوان الأسلاك داخل موصل الشبكة."],
["Straight-through","كابل يكون ترتيب الأسلاك فيه متماثلاً من الطرفين."],
["Crossover","كابل يكون ترتيب الأسلاك فيه مختلفاً بين الطرفين."]
],
tip:"احفظ UTP اسم الكابل وRJ45 اسم الموصل.",
question:"ما اسم الموصل المستخدم عادة مع كابل Ethernet؟",
answers:["USB","RJ45","HDMI","VGA"],
correct:1
},
{
title:"مفهوم IP Address",
level:3,
intro:"عنوان IP هو عنوان منطقي يستخدم للتعرف على واجهة الجهاز داخل الشبكة.",
topics:[
["تعريف IP","اختصار Internet Protocol، ويستخدم لتوجيه البيانات."],
["IPv4","عنوان يتكون من 32 بت ويكتب بأربع خانات مثل 192.168.1.10."],
["IPv6","عنوان يتكون من 128 بت ويوفر عدداً هائلاً من العناوين."],
["الاستخدام","يساعد على تحديد مصدر البيانات والوجهة."]
],
tip:"IPv4 يتكون من 32 بت.",
question:"كم عدد البتات في IPv4؟",
answers:["16","32","64","128"],
correct:1
},
{
title:"العناوين الخاصة والعامة",
level:3,
intro:"تنقسم عناوين IPv4 إلى عناوين خاصة وعناوين عامة.",
topics:[
["Private IP","عنوان يستخدم داخل الشبكات المحلية."],
["النطاق الأول","10.0.0.0 إلى 10.255.255.255."],
["النطاق الثاني","172.16.0.0 إلى 172.31.255.255."],
["النطاق الثالث","192.168.0.0 إلى 192.168.255.255."],
["Public IP","عنوان عام يمكن توجيه البيانات إليه عبر الإنترنت."]
],
tip:"192.168.1.1 مثال شائع على عنوان خاص.",
question:"أي عنوان مما يلي خاص؟",
answers:["8.8.8.8","192.168.1.5","1.1.1.1","200.10.5.1"],
correct:1
},
{
title:"Subnet Mask وSubnetting",
level:3,
intro:"يساعد قناع الشبكة على تحديد جزء الشبكة وجزء الجهاز في عنوان IP.",
topics:[
["Subnet Mask","قيمة تحدد أي أجزاء عنوان IP تمثل الشبكة وأيها تمثل الجهاز."],
["مثال","القناع 255.255.255.0 يكتب أيضاً /24."],
["Subnetting","تقسيم شبكة كبيرة إلى شبكات أصغر."],
["الفائدة","تنظيم الشبكة وتحسين إدارة العناوين وتقليل نطاق البث."]
],
tip:"القناع 255.255.255.0 شائع في شبكات المنازل الصغيرة.",
question:"ما وظيفة Subnet Mask؟",
answers:["تحديد جزء الشبكة والجهاز","تشفير الملفات","زيادة سرعة المعالج","حذف عنوان IP"],
correct:0
},
{
title:"MAC Address",
level:3,
intro:"عنوان MAC هو عنوان يستخدم للتعرف على واجهة الشبكة في الاتصال المحلي.",
topics:[
["تعريف MAC","عنوان مرتبط بواجهة الشبكة ويستخدم في طبقة ربط البيانات."],
["الشكل","يكتب غالباً على شكل ست مجموعات سداسية عشرية مثل 00:1A:2B:3C:4D:5E."],
["الاستخدام","تستخدمه أجهزة مثل Switch لتوصيل إطارات Ethernet داخل الشبكة المحلية."],
["الفرق عن IP","IP عنوان منطقي، أما MAC فيستخدم للتوصيل على الشبكة المحلية."]
],
tip:"IP منطقي، وMAC عنوان طبقة ربط البيانات.",
question:"أي جهاز يستخدم MAC لتوجيه إطارات Ethernet؟",
answers:["Switch","الشاشة","الطابعة فقط","السماعة"],
correct:0
},
{
title:"DHCP وDNS",
level:3,
intro:"خدمتان أساسيتان تسهلان استخدام الشبكات والإنترنت.",
topics:[
["DHCP","يوزع إعدادات الشبكة تلقائياً مثل عنوان IP وقناع الشبكة والبوابة."],
["DNS","يحول أسماء المواقع مثل example.com إلى عناوين IP."],
["الفائدة","يسهل DHCP إعداد الأجهزة، ويسهل DNS الوصول إلى المواقع بالأسماء."],
["مثال","عندما تتصل بالراوتر، قد يمنحك DHCP عنوان IP تلقائياً."]
],
tip:"DHCP يوزع عناوين IP، وDNS يترجم أسماء النطاقات.",
question:"ما وظيفة DNS؟",
answers:["توزيع عناوين IP","تحويل أسماء المواقع إلى IP","تشغيل الشاشة","توصيل الكابلات"],
correct:1
},
{
title:"نموذج OSI",
level:4,
intro:"نموذج OSI نموذج مرجعي يقسم عملية الاتصال الشبكي إلى سبع طبقات.",
topics:[
["الهدف","تسهيل فهم الاتصال بين الأجهزة وتحديد وظائف كل طبقة."],
["عدد الطبقات","يتكون من سبع طبقات."],
["الفائدة","يساعد في تصميم الشبكات وتحليل المشكلات."],
["الطبقات","Physical وData Link وNetwork وTransport وSession وPresentation وApplication."]
],
tip:"نموذج OSI يتكون من سبع طبقات.",
question:"كم عدد طبقات نموذج OSI؟",
answers:["4","5","6","7"],
correct:3
},
{
title:"طبقات OSI بالتفصيل",
level:4,
intro:"لكل طبقة في نموذج OSI وظيفة محددة تساعد على نقل البيانات.",
topics:[
["1 Physical","تنقل البتات عبر الوسط المادي مثل الكابلات والإشارات."],
["2 Data Link","تتعامل مع الإطارات وعناوين MAC."],
["3 Network","تتعامل مع عناوين IP والتوجيه."],
["4 Transport","تدير نقل البيانات باستخدام بروتوكولات مثل TCP وUDP."],
["5 و6 و7","Session تدير الجلسات، Presentation تنسق تمثيل البيانات، Application تقدم خدمات الشبكة للتطبيقات."]
],
tip:"تذكر أن IP في طبقة Network وMAC في طبقة Data Link.",
question:"في أي طبقة يعمل IP؟",
answers:["Physical","Data Link","Network","Application"],
correct:2
},
{
title:"نموذج TCP/IP",
level:4,
intro:"نموذج TCP/IP يشرح مجموعة البروتوكولات المستخدمة في الاتصال عبر الإنترنت.",
topics:[
["طبقة الوصول للشبكة","تتعامل مع الاتصال بالشبكة المحلية والوسيط."],
["طبقة الإنترنت","تتعامل مع IP وتوجيه الحزم."],
["طبقة النقل","تستخدم TCP أو UDP لنقل البيانات بين التطبيقات."],
["طبقة التطبيق","تضم بروتوكولات مثل HTTP وDNS وSMTP."],
["الفرق عن OSI","نموذج TCP/IP يستخدم عادة أربع طبقات، بينما OSI يتكون من سبع."]
],
tip:"TCP/IP هو أساس الاتصال المستخدم في الإنترنت.",
question:"أي بروتوكول يعمل في طبقة النقل؟",
answers:["TCP","HTTP","Ethernet","DNS"],
correct:0
},

// نهاية الدروس 11 إلى 20
// سيأتي بعدها الجزء الثالث

{
title:"التعرف على Cisco Packet Tracer",
level:5,
intro:"برنامج Cisco Packet Tracer يساعد على تصميم الشبكات وتجربتها افتراضياً قبل تنفيذها واقعياً.",
topics:[
["ما هو البرنامج؟","أداة تعليمية لمحاكاة شبكات الحاسوب."],
["الأجهزة","يوفر راوترات وسويتشات وحواسيب وخوادم."],
["التوصيل","يمكن سحب الأجهزة وتوصيلها بالكابلات المناسبة."],
["المحاكاة","يمكن اختبار إرسال البيانات ومتابعة انتقالها."]
],
tip:"ابدأ بتصميم شبكة صغيرة تحتوي على حاسوبين وسويتش.",
question:"ما وظيفة Packet Tracer؟",
answers:["تصميم ومحاكاة الشبكات","تحرير الصور","كتابة المستندات","تشغيل الألعاب"],
correct:0
},
{
title:"إنشاء شبكة LAN عملية",
level:5,
intro:"يمكن إنشاء شبكة محلية بسيطة بربط عدة حواسيب باستخدام Switch.",
topics:[
["الخطوة الأولى","افتح Packet Tracer وأضف حاسوبين وسويتش."],
["الخطوة الثانية","استخدم كابل Copper Straight-Through لتوصيل كل حاسوب بالسويتش."],
["الخطوة الثالثة","تأكد من أن منافذ الاتصال أصبحت نشطة."],
["الخطوة الرابعة","اختبر الاتصال بين الحاسوبين باستخدام Ping."]
],
tip:"لا تنسَ إعطاء كل حاسوب عنوان IP مناسباً قبل اختبار الاتصال.",
question:"ما الجهاز الذي يربط الحواسيب في شبكة LAN؟",
answers:["Switch","الشاشة","الماسح الضوئي","السماعة"],
correct:0
},
{
title:"إعداد عناوين IP للأجهزة",
level:5,
intro:"يجب إعداد عناوين IP مناسبة حتى تستطيع الأجهزة التواصل داخل الشبكة.",
topics:[
["الحاسوب الأول","يمكن ضبط عنوانه على 192.168.1.10."],
["الحاسوب الثاني","يمكن ضبط عنوانه على 192.168.1.11."],
["Subnet Mask","استخدم 255.255.255.0 لكلا الجهازين في هذا المثال."],
["اختبار الاتصال","استخدم الأمر ping 192.168.1.11 من الحاسوب الأول."]
],
tip:"يجب أن تكون العناوين ضمن الشبكة نفسها وألا تتكرر.",
question:"ما عنوان الحاسوب الثاني في المثال؟",
answers:["192.168.1.10","192.168.1.11","10.0.0.1","8.8.8.8"],
correct:1
},
{
title:"إعداد Router وربط شبكتين",
level:5,
intro:"يمكن استخدام الراوتر لربط شبكتين مختلفتين والسماح بتبادل البيانات بينهما.",
topics:[
["الشبكة الأولى","مثلاً 192.168.1.0/24."],
["الشبكة الثانية","مثلاً 192.168.2.0/24."],
["إعداد المنافذ","يجب إعطاء كل واجهة في الراوتر عنواناً مناسباً لشبكتها وتفعيلها."],
["التوجيه","يستخدم الراوتر جدول التوجيه لمعرفة الطريق إلى الشبكة الأخرى."],
["الاختبار","يمكن استخدام Ping للتحقق من وصول البيانات بين الشبكتين."]
],
tip:"كل شبكة تحتاج إلى عنوان شبكة مختلف، ويجب ضبط واجهات الراوتر بشكل صحيح.",
question:"ما الجهاز الذي يربط شبكتين مختلفتين؟",
answers:["Hub","Router","الطابعة","لوحة المفاتيح"],
correct:1
},
{
title:"مشاركة الملفات والطابعات",
level:5,
intro:"تسمح الشبكة للمستخدمين بمشاركة الملفات والطابعات بين الأجهزة وفق الصلاحيات المحددة.",
topics:[
["مشاركة الملفات","يمكن إنشاء مجلد مشترك والسماح لمستخدمين محددين بالوصول إليه."],
["الصلاحيات","يمكن تحديد من يستطيع القراءة أو التعديل أو الحذف."],
["مشاركة الطابعة","يمكن مشاركة طابعة متصلة بالشبكة ليستفيد منها أكثر من جهاز."],
["الأمان","يجب استخدام كلمات مرور وصلاحيات مناسبة لحماية الملفات."]
],
tip:"لا تمنح جميع المستخدمين صلاحية التعديل والحذف دون حاجة.",
question:"لماذا نستخدم صلاحيات المشاركة؟",
answers:["حماية وتنظيم الوصول","زيادة حجم الشاشة","تغيير لون الجهاز","إيقاف الإنترنت"],
correct:0
},
{
title:"أوامر Cisco IOS الأساسية",
level:6,
intro:"Cisco IOS هو نظام تشغيل تستخدمه أجهزة Cisco الشبكية، ويمكن إدارتها عبر أوامر CLI.",
topics:[
["enable","ينقلك إلى وضع EXEC ذي الصلاحيات الأعلى."],
["configure terminal","يدخلك إلى وضع الإعداد العام."],
["hostname","يستخدم لتغيير اسم الجهاز."],
["show running-config","يعرض الإعدادات الحالية المحفوظة في ذاكرة التشغيل."],
["copy running-config startup-config","يحفظ الإعدادات الحالية لتبقى بعد إعادة التشغيل."]
],
tip:"تدرّب على الأوامر داخل Packet Tracer قبل تطبيقها على جهاز حقيقي.",
question:"أي أمر يدخل وضع الإعداد العام؟",
answers:["enable","configure terminal","hostname","ping"],
correct:1
},
{
title:"VLAN",
level:6,
intro:"VLAN تقنية تسمح بتقسيم السويتش إلى شبكات محلية افتراضية منفصلة منطقياً.",
topics:[
["المفهوم","تقسم الأجهزة إلى مجموعات افتراضية حتى لو كانت متصلة بالسويتش نفسه."],
["الفائدة","تساعد على تنظيم الشبكة وتقليل نطاق البث وتحسين العزل."],
["مثال","يمكن إنشاء VLAN للطلاب وأخرى للموظفين."],
["الاتصال بين VLANs","يحتاج عادة إلى توجيه من خلال راوتر أو سويتش من الطبقة الثالثة."]
],
tip:"VLAN تقسم الشبكة منطقياً وليس بالضرورة باستخدام أجهزة منفصلة.",
question:"ما فائدة VLAN؟",
answers:["تقسيم الشبكة منطقياً","زيادة حجم القرص","إصلاح الشاشة","تغيير عنوان الموقع"],
correct:0
},
{
title:"أساسيات أمن الشبكات",
level:6,
intro:"أمن الشبكات هو حماية الأجهزة والبيانات والخدمات من الوصول غير المصرح به والهجمات.",
topics:[
["كلمات المرور","استخدم كلمات مرور قوية وفريدة."],
["التحديثات","حافظ على تحديث أنظمة التشغيل وأجهزة الشبكة."],
["التشفير","استخدم تقنيات التشفير لحماية البيانات أثناء انتقالها."],
["النسخ الاحتياطي","احتفظ بنسخ احتياطية من البيانات والإعدادات المهمة."],
["الصلاحيات","امنح المستخدمين أقل قدر من الصلاحيات اللازمة لعملهم."]
],
tip:"لا تشارك كلمة مرور الشبكة مع أشخاص غير موثوقين.",
question:"ما الإجراء الذي يساعد على حماية الشبكة؟",
answers:["كلمة مرور قوية","مشاركة كلمة المرور مع الجميع","إيقاف التحديثات","إلغاء الحماية"],
correct:0
},
{
title:"Firewall - جدار الحماية",
level:6,
intro:"جدار الحماية يراقب حركة مرور الشبكة ويسمح بها أو يمنعها وفق قواعد محددة.",
topics:[
["وظيفته","التحكم في الاتصالات الواردة والصادرة."],
["القواعد","يمكن السماح بنوع معين من الاتصال أو منعه."],
["الأنواع","قد يكون جدار حماية برمجياً أو جهازاً مخصصاً أو خدمة سحابية."],
["الفائدة","يساعد على تقليل الاتصالات غير المصرح بها."]
],
tip:"جدار الحماية جزء من الحماية وليس بديلاً عن جميع وسائل الأمن الأخرى.",
question:"ما وظيفة Firewall؟",
answers:["مراقبة وتصفية حركة الشبكة","زيادة سعة التخزين","تشغيل الشاشة","تغيير نظام الملفات"],
correct:0
},
{
title:"استكشاف أعطال الشبكات",
level:6,
intro:"استكشاف الأعطال هو عملية تحديد سبب مشكلة الاتصال وإصلاحها بطريقة منظمة.",
topics:[
["فحص الكابلات","تأكد من سلامة الكابل وتوصيله بالمنفذ الصحيح."],
["فحص IP","تأكد من أن الجهاز يمتلك عنوان IP وقناع شبكة صحيحين."],
["اختبار Ping","استخدم ping لاختبار إمكانية الوصول إلى جهاز آخر."],
["فحص الراوتر","تأكد من تشغيل الراوتر وواجهاته وإعداداته."],
["أوامر مفيدة","ipconfig في Windows يعرض إعدادات IP، وtracert يساعد على تتبع المسار."]
],
tip:"ابدأ بالفحص البسيط: الكابل، ثم IP، ثم البوابة، ثم الاتصال الخارجي.",
question:"أي أمر يستخدم لاختبار الاتصال بجهاز آخر؟",
answers:["ping","mkdir","copy","dir"],
correct:0
}
];

const levelNames = {
    1: "المستوى الأول: أساسيات الشبكات",
    2: "المستوى الثاني: أجهزة الشبكات",
    3: "المستوى الثالث: عناوين الشبكات",
    4: "المستوى الرابع: نماذج الاتصال",
    5: "المستوى الخامس: التطبيق العملي",
    6: "المستوى السادس: الإدارة والأمن"
};

/* إنشاء قائمة الدروس */

const lessonList = document.getElementById("lesson-list");
const lessonViewer = document.getElementById("lesson-viewer");

let currentLesson = 0;

function createLessonCards() {
    lessonList.innerHTML = "";

    for (let level = 1; level <= 6; level++) {
        const heading = document.createElement("h3");
        heading.className = "lesson-title";
        heading.textContent = levelNames[level];
        lessonList.appendChild(heading);

        const grid = document.createElement("div");
        grid.className = "lesson-grid";

        lessons.forEach((lesson, index) => {
            if (lesson.level !== level) return;

            const card = document.createElement("button");
            card.type = "button";
            card.className = "lesson-card";
            card.innerHTML =
                `<span class="lesson-number">الدرس ${index + 1}</span>
                 <strong>${lesson.title}</strong>
                 <span>ابدأ الدرس ←</span>`;

            card.addEventListener("click", () => openLesson(index));
            grid.appendChild(card);
        });

        lessonList.appendChild(grid);
    }
}

function openLesson(index) {
    currentLesson = index;
    lessonList.hidden = true;
    lessonViewer.hidden = false;
    renderLesson();
}

function renderLesson() {
    const lesson = lessons[currentLesson];

    document.getElementById("lesson-counter").textContent =
        `الدرس ${currentLesson + 1} من ${lessons.length}`;

    document.getElementById("lesson-level").textContent =
        levelNames[lesson.level];

    document.getElementById("lesson-heading").textContent =
        lesson.title;

    document.getElementById("lesson-intro").textContent =
        lesson.intro;

    const body = document.getElementById("lesson-body");
    body.innerHTML = "";

    lesson.topics.forEach(topic => {
        const article = document.createElement("div");
        article.className = "lesson-topic";

        const heading = document.createElement("h4");
        heading.textContent = topic[0];

        const paragraph = document.createElement("p");
        paragraph.textContent = topic[1];

        article.appendChild(heading);
        article.appendChild(paragraph);
        body.appendChild(article);
    });

    document.getElementById("lesson-tip").textContent =
        "💡 " + lesson.tip;

    document.getElementById("lesson-question-text").textContent =
        lesson.question;

    const answers = document.getElementById("lesson-answers");
    answers.innerHTML = "";

    document.getElementById("lesson-feedback").textContent = "";

    lesson.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "lesson-answer";
        button.textContent = answer;

        button.addEventListener("click", () => {
            const feedback = document.getElementById("lesson-feedback");

            if (answers.dataset.answered === "yes") return;

            answers.dataset.answered = "yes";

            if (index === lesson.correct) {
                button.classList.add("correct");
                feedback.textContent = "إجابة صحيحة! أحسنت 🎉";
            } else {
                button.classList.add("wrong");
                feedback.textContent =
                    "إجابة غير صحيحة. الإجابة الصحيحة: " +
                    lesson.answers[lesson.correct];
            }

            Array.from(answers.children).forEach((item, i) => {
                item.disabled = true;
                if (i === lesson.correct) {
                    item.classList.add("correct");
                }
            });
        });

        answers.appendChild(button);
    });

    answers.dataset.answered = "no";

    document.getElementById("previous-lesson").disabled =
        currentLesson === 0;

    document.getElementById("next-lesson").textContent =
        currentLesson === lessons.length - 1
            ? "إنهاء الدروس"
            : "الدرس التالي ←";
}

document.getElementById("back-lessons").addEventListener("click", () => {
    lessonViewer.hidden = true;
    lessonList.hidden = false;
});

document.getElementById("previous-lesson").addEventListener("click", () => {
    if (currentLesson > 0) {
        currentLesson--;
        renderLesson();
    }
});

document.getElementById("next-lesson").addEventListener("click", () => {
    if (currentLesson < lessons.length - 1) {
        currentLesson++;
        renderLesson();
    } else {
        lessonViewer.hidden = true;
        lessonList.hidden = false;
        alert("أحسنت! أكملت جميع دروس أكاديمية الشبكات 🎓");
    }
});

createLessonCards();

/* =========================================
   الاختبار العام
========================================= */

const questions = [
    {
        question: "ما الجهاز الذي يربط الشبكات المختلفة؟",
        answers: ["Switch", "Router", "Hub", "Repeater"],
        correct: 1
    },
    {
        question: "كم عدد طبقات OSI؟",
        answers: ["4", "5", "7", "8"],
        correct: 2
    },
    {
        question: "ما وظيفة DNS؟",
        answers: [
            "توزيع IP",
            "تحويل أسماء المواقع إلى IP",
            "توصيل الكابلات",
            "حماية الشاشة"
        ],
        correct: 1
    },
    {
        question: "أي عنوان يستخدمه Switch عادة؟",
        answers: ["IP", "MAC", "URL", "DNS"],
        correct: 1
    },
    {
        question: "ما وظيفة DHCP؟",
        answers: [
            "توزيع إعدادات IP تلقائياً",
            "عرض المواقع",
            "تشفير الصور",
            "تشغيل الطابعة"
        ],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;
let quizFinished = false;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("quiz-options");
const resultElement = document.getElementById("quiz-result");
const nextButton = document.getElementById("next-question");
const progressElement = document.getElementById("quiz-progress");

function showQuestion() {
    answered = false;
    quizFinished = false;

    const item = questions[currentQuestion];

    questionElement.textContent =
        `السؤال ${currentQuestion + 1}: ${item.question}`;

    optionsElement.innerHTML = "";
    resultElement.textContent = "";

    item.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "quiz-option";
        button.textContent = answer;

        button.addEventListener("click", () => {
            if (answered) return;

            answered = true;

            if (index === item.correct) {
                score++;
                button.classList.add("correct");
                resultElement.textContent = "إجابة صحيحة! أحسنت 🎉";
            } else {
                button.classList.add("wrong");
                resultElement.textContent =
                    "الإجابة الصحيحة: " + item.answers[item.correct];
            }

            Array.from(optionsElement.children).forEach((option, i) => {
                option.disabled = true;
                if (i === item.correct) {
                    option.classList.add("correct");
                }
            });
        });

        optionsElement.appendChild(button);
    });

    progressElement.textContent =
        `السؤال ${currentQuestion + 1} من ${questions.length}`;

    nextButton.textContent = "السؤال التالي";
    nextButton.disabled = false;
}

function showQuizResult() {
    quizFinished = true;

    questionElement.textContent = "انتهى الاختبار! 🏆";
    optionsElement.innerHTML = "";

    resultElement.textContent =
        `نتيجتك: ${score} من ${questions.length}`;

    progressElement.textContent = "اكتمل الاختبار";
    nextButton.textContent = "إعادة الاختبار";
}

nextButton.addEventListener("click", () => {
    if (quizFinished) {
        currentQuestion = 0;
        score = 0;
        showQuestion();
        return;
    }

    if (!answered) {
        resultElement.textContent = "اختر إجابة أولاً.";
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showQuizResult();
    }
});

showQuestion();

/* =========================================
   القائمة المتنقلة
========================================= */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}
