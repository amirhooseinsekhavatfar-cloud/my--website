// ══════════════════════════════════════════════
//  DATA: پرسش و پاسخ‌های تخصصی (برق، مهندسی کنترل، هوشمندسازی خانه)
//  FAQ: Electrical / Control Engineering / Home Automation
//  فقط همین فایل رو برای اضافه یا ویرایش این سوالات تغییر بده.
//  Edit ONLY this file to add/change these Q&A topics.
//
//  هر آیتم:
//  - tags: کلمات کلیدی که چت‌بات برای تشخیص این سوال باهاشون مچ می‌گیره
//  - answerFa / answerEn: پاسخی که به کاربر نمایش داده می‌شه
// ══════════════════════════════════════════════
window.SiteData = window.SiteData || {};
window.SiteData.faq = [

  {
    tags: ['جریان مستقیم', 'جریان متناوب', 'dc', 'ac', 'تفاوت جریان', 'direct current', 'alternating current'],
    category: 'electrical',
    questionFa: 'فرق جریان مستقیم و متناوب؟',
    questionEn: "AC vs DC — what's the difference?",
    answerFa: 'جریان مستقیم (DC) همیشه در یک جهت حرکت می‌کنه و مقدارش ثابته (مثل باتری)، اما جریان متناوب (AC) جهت و اندازه‌اش به‌صورت متناوب (معمولاً سینوسی) تغییر می‌کنه — همون برقی که از پریز خونه می‌گیریم. AC برای انتقال برق روی مسافت‌های طولانی مقرون‌به‌صرفه‌تره، ولی خیلی از قطعات الکترونیکی و PLCها با DC (معمولاً 24 ولت) کار می‌کنن.',
    answerEn: 'Direct current (DC) flows in one direction with a constant value (like a battery), while alternating current (AC) periodically reverses direction and magnitude (usually sinusoidal) — that\'s what comes out of a home outlet. AC is more efficient for long-distance power transmission, while most electronics and PLCs run on DC (commonly 24V).'
  },

  {
    tags: ['ولتاژ برق خانگی', 'ولتاژ استاندارد', 'ولتاژ ایران', 'household voltage', '220', '110', 'home voltage', 'iran voltage'],
    category: 'electrical',
    questionFa: 'ولتاژ برق خانگی ایران چقدره؟',
    questionEn: "Home voltage in Iran?",
    answerFa: 'ولتاژ استاندارد برق خانگی در ایران ۲۲۰ ولت (تک‌فاز، ۵۰ هرتز) هست، در حالی که در آمریکا معمولاً ۱۱۰-۱۲۰ ولته. برای مصارف صنعتی سه‌فاز، ولتاژ خط معمولاً ۳۸۰ ولت (بین دو فاز) هست.',
    answerEn: 'Standard household voltage in Iran is 220V single-phase at 50Hz, while in the US it\'s typically 110-120V. For three-phase industrial use, line voltage is commonly 380V (between two phases).'
  },

  {
    tags: ['کنتاکتور', 'contactor'],
    category: 'control',
    questionFa: 'کنتاکتور چیست؟',
    questionEn: "What's a contactor?",
    answerFa: 'کنتاکتور یه کلید الکترومکانیکی هست که با یه سیم‌پیچ کنترل می‌شه و برای قطع و وصل مدارهای قدرت (مثل موتورها) استفاده می‌شه. برخلاف رله که برای بارهای کوچیک‌تره، کنتاکتور برای جریان‌های بالاتر طراحی شده و معمولاً همراه با بی‌متال (رله حرارتی) برای محافظت از موتور در تابلوهای فرمان به کار می‌ره.',
    answerEn: 'A contactor is an electromechanical switch controlled by a coil, used to switch power circuits (like motors) on and off. Unlike a relay which handles smaller loads, a contactor is built for higher currents and is typically paired with a thermal overload relay to protect motors in control panels.'
  },

  {
    tags: ['رله چیست', 'رله', 'relay'],
    category: 'control',
    questionFa: 'رله چیست؟',
    questionEn: "What's a relay?",
    answerFa: 'رله یه کلید الکترومکانیکی (یا حالت‌جامد) هست که با یه سیگنال کنترلی کم‌توان (مثلاً خروجی PLC یا میکروکنترلر)، یه مدار جداگانه با ولتاژ/جریان بالاتر رو قطع و وصل می‌کنه. کاربرد اصلیش ایزوله کردن مدار کنترل از مدار قدرت و کلید زدن بارهایی هست که مستقیم به خروجی PLC یا ESP32 وصل نمی‌شن.',
    answerEn: 'A relay is an electromechanical (or solid-state) switch that uses a low-power control signal (like a PLC or microcontroller output) to switch a separate, higher-voltage/current circuit. Its main job is isolating the control circuit from the power circuit and switching loads that can\'t connect directly to a PLC or ESP32 output.'
  },

  {
    tags: ['plc چیست', 'plc', 'پی ال سی'],
    category: 'plc',
    questionFa: 'PLC چیست؟',
    questionEn: "What's a PLC?",
    answerFa: 'PLC (کنترل‌کننده منطقی قابل‌برنامه‌ریزی) یه کامپیوتر صنعتی مقاوم هست که برای اتوماسیون فرآیندهای صنعتی (خط تولید، تابلو برق، ماشین‌آلات) استفاده می‌شه. با زبان‌هایی مثل Ladder، FBD یا SCL برنامه‌ریزی می‌شه، ورودی‌هایی مثل سنسور و شستی می‌گیره و خروجی‌هایی مثل موتور، شیر برقی و چراغ رو کنترل می‌کنه.',
    answerEn: 'A PLC (Programmable Logic Controller) is a ruggedized industrial computer used to automate industrial processes (production lines, control panels, machinery). It\'s programmed in languages like Ladder, FBD, or SCL, reads inputs like sensors and pushbuttons, and drives outputs like motors, solenoid valves, and lights.'
  },

  {
    tags: ['تفاوت plc میکروکنترلر', 'plc با میکروکنترلر', 'plc vs microcontroller', 'فرق plc'],
    category: 'plc',
    questionFa: 'فرق PLC و میکروکنترلر؟',
    questionEn: "PLC vs microcontroller?",
    answerFa: 'PLC برای محیط صنعتی طراحی شده: مقاوم در برابر نویز، دما و ارتعاش، قابل‌اعتماد و معمولاً گرون‌تره. میکروکنترلر (مثل ESP32 یا Arduino) ارزون‌تر، انعطاف‌پذیرتر و برای پروژه‌های کوچیک‌تر یا IoT مناسب‌تره، ولی معمولاً مقاومت صنعتی PLC رو نداره. خیلی وقت‌ها این دو با هم ترکیب می‌شن؛ مثلاً PLC کنترل اصلی رو انجام می‌ده و ESP32 داده‌ها رو به فضای ابری می‌فرسته.',
    answerEn: 'A PLC is built for industrial environments: noise, temperature, and vibration resistant, highly reliable, and usually more expensive. A microcontroller (like ESP32 or Arduino) is cheaper, more flexible, and better suited to smaller or IoT projects, but usually lacks a PLC\'s industrial ruggedness. Often the two are combined — a PLC handles the core control while an ESP32 sends data to the cloud.'
  },

  {
    tags: ['سنسور صنعتی', 'انواع سنسور', 'sensor', 'sensors', 'types of sensors', 'industrial sensors'],
    category: 'control',
    questionFa: 'انواع سنسور صنعتی؟',
    questionEn: "Types of industrial sensors?",
    answerFa: 'سنسورهای صنعتی رایج شامل سنسورهای مجاورتی (القایی/خازنی) برای تشخیص فلز یا هر جسمی، سنسور نوری (فوتوالکتریک) برای تشخیص حضور قطعه، سنسور دما (مثل PT100 یا ترموکوپل)، سنسور فشار، و اینکودر برای اندازه‌گیری سرعت و موقعیت موتور می‌شن. انتخاب سنسور مناسب به نوع جسم، محیط و دقت موردنیاز بستگی داره.',
    answerEn: 'Common industrial sensors include proximity sensors (inductive/capacitive) for detecting metal or any object, photoelectric sensors for detecting a part\'s presence, temperature sensors (like PT100 or thermocouples), pressure sensors, and encoders for measuring motor speed and position. Choosing the right sensor depends on the target object, environment, and required accuracy.'
  },

  {
    tags: ['اکچویتور', 'عملگر', 'actuator'],
    category: 'control',
    questionFa: 'اکچویتور (عملگر) چیست؟',
    questionEn: "What's an actuator?",
    answerFa: 'اکچویتور (عملگر) قطعه‌ای هست که سیگنال کنترلی رو به حرکت یا عمل فیزیکی تبدیل می‌کنه؛ مثل موتورهای الکتریکی، شیربرقی (سولنوئید ولو)، سیلندرهای پنوماتیک/هیدرولیک و سروو موتورها. در یه سیستم کنترل، سنسور اطلاعات رو جمع می‌کنه، کنترلر (مثل PLC) تصمیم می‌گیره و اکچویتور اون تصمیم رو اجرا می‌کنه.',
    answerEn: 'An actuator converts a control signal into physical motion or action — examples include electric motors, solenoid valves, pneumatic/hydraulic cylinders, and servo motors. In a control system, a sensor gathers information, a controller (like a PLC) makes the decision, and the actuator executes it.'
  },

  {
    tags: ['مدار فرمان مدار قدرت', 'فرق مدار قدرت', 'control circuit power circuit'],
    category: 'control',
    questionFa: 'فرق مدار فرمان و قدرت؟',
    questionEn: "Control circuit vs power circuit?",
    answerFa: 'مدار قدرت جریان اصلی رو مستقیم به بار (مثلاً موتور) می‌رسونه و معمولاً ولتاژ/جریان بالاتری داره. مدار فرمان (کنترل) با ولتاژ پایین‌تر، وضعیت کنتاکتورها و رله‌ها رو کنترل می‌کنه — یعنی تصمیم می‌گیره کِی مدار قدرت وصل یا قطع بشه. جدا کردن این دو مدار هم ایمنی رو بالا می‌بره و هم طراحی و عیب‌یابی تابلو برق رو ساده‌تر می‌کنه.',
    answerEn: 'The power circuit delivers the main current directly to the load (like a motor) and usually operates at higher voltage/current. The control circuit, at lower voltage, manages the state of contactors and relays — deciding when the power circuit switches on or off. Separating the two improves safety and makes control-panel design and troubleshooting much easier.'
  },

  {
    tags: ['تابلو برق صنعتی', 'تابلو فرمان', 'control panel', 'electrical panel'],
    category: 'control',
    questionFa: 'تابلو برق صنعتی چیست؟',
    questionEn: "What's a control panel?",
    answerFa: 'تابلو برق صنعتی محفظه‌ای هست که تجهیزات کنترل و قدرت (کلید اصلی، کنتاکتورها، رله‌ها، PLC، ترمینال‌ها و بریکرها) داخلش نصب می‌شن تا یه ماشین یا خط تولید رو کنترل کنن. طراحی خوب تابلو شامل جداسازی مدار قدرت و فرمان، سیم‌کشی مرتب و شماره‌گذاری‌شده، و رعایت استانداردهای ایمنی مثل درجه حفاظت IP هست.',
    answerEn: 'An industrial control panel is an enclosure that houses control and power equipment (main switch, contactors, relays, PLC, terminals, breakers) to control a machine or production line. A good panel design separates power and control wiring, uses neat and labeled cabling, and follows safety standards like IP protection ratings.'
  },

  {
    tags: ['خانه هوشمند چیست', 'هوشمندسازی خانه', 'اتوماسیون خانگی', 'smart home', 'home automation'],
    category: 'smarthome',
    questionFa: 'خانه هوشمند چیست؟',
    questionEn: "What's a smart home?",
    answerFa: 'خانه هوشمند یعنی کنترل و اتوماسیون وسایل خونه (روشنایی، پرده، گرمایش/سرمایش، امنیت و پریزها) از طریق شبکه، معمولاً با موبایل، صدا یا سناریوهای خودکار (مثل روشن‌شدن خودکار چراغ‌ها هنگام غروب). هدف اصلیش راحتی، صرفه‌جویی در انرژی و افزایش امنیته.',
    answerEn: 'A smart home means controlling and automating household devices (lighting, curtains, heating/cooling, security, outlets) over a network, typically via phone, voice, or automatic scenarios (like lights turning on automatically at sunset). The main goals are convenience, energy savings, and improved security.'
  },

  {
    tags: ['پروتکل خانه هوشمند', 'zigbee', 'z-wave', 'zwave', 'knx', 'پروتکل های اتوماسیون خانگی', 'smart home protocols', 'home automation protocols'],
    category: 'smarthome',
    questionFa: 'پروتکل‌های خانه هوشمند؟',
    questionEn: "Smart home protocols?",
    answerFa: 'رایج‌ترین پروتکل‌های هوشمندسازی خونه شامل Wi-Fi (ساده ولی مصرف انرژی بالاتر)، Zigbee و Z-Wave (کم‌مصرف، مش‌شبکه، مناسب سنسور و کلید بی‌سیم)، و KNX (استاندارد سیم‌کشی‌شده و حرفه‌ای برای ساختمان‌های بزرگ) می‌شن. برای ارتباط بین PLC و سیستم‌های صنعتی هم معمولاً از Modbus یا Profinet استفاده می‌شه.',
    answerEn: 'The most common home-automation protocols are Wi-Fi (simple but higher power use), Zigbee and Z-Wave (low-power mesh networks, great for wireless sensors and switches), and KNX (a professional wired standard for larger buildings). For communication between PLCs and industrial systems, Modbus or Profinet are typically used instead.'
  },

  {
    tags: ['esp32 خانه هوشمند', 'esp32 اتوماسیون', 'esp32 smart home', 'esp32 automation'],
    category: 'smarthome',
    questionFa: 'نقش ESP32 در خانه هوشمند؟',
    questionEn: "ESP32 in smart homes?",
    answerFa: 'ESP32 یه میکروکنترلر ارزون و پرقدرت با وای‌فای و بلوتوث داخلیه که خیلی برای پروژه‌های خانه هوشمند و IoT محبوبه؛ می‌شه باهاش سنسور دما/رطوبت خوند، رله برای کنترل چراغ و پریز زد، و داده‌ها رو به یه اپلیکیشن موبایل یا سرور فرستاد. امیرحسین چند تا دستگاه IoT مبتنی بر ESP32 ساخته که از همین رویکرد استفاده می‌کنن.',
    answerEn: 'The ESP32 is a cheap, powerful microcontroller with built-in Wi-Fi and Bluetooth, very popular for smart-home and IoT projects — you can read temperature/humidity sensors, drive relays to control lights and outlets, and send data to a mobile app or server. Amir has built several ESP32-based IoT devices using this exact approach.'
  },

  {
    tags: ['مزایای خانه هوشمند', 'فایده هوشمندسازی', 'benefits of smart home'],
    category: 'smarthome',
    questionFa: 'مزایای هوشمندسازی خانه؟',
    questionEn: "Benefits of a smart home?",
    answerFa: 'مهم‌ترین مزایای خانه هوشمند شامل صرفه‌جویی در مصرف انرژی (مثل خاموش‌شدن خودکار وسایل بلااستفاده)، افزایش امنیت (دوربین، قفل هوشمند، سنسور نفوذ)، راحتی و کنترل از راه دور، و امکان ساخت سناریوهای خودکار متناسب با سبک زندگی هر خانواده می‌شه.',
    answerEn: 'The main benefits of a smart home include energy savings (like automatically turning off unused devices), improved security (cameras, smart locks, intrusion sensors), remote control and convenience, and the ability to build automatic scenarios tailored to a household\'s lifestyle.'
  },

  {
    tags: ['کنترل pid', 'pid چیست', 'pid controller'],
    category: 'plc',
    questionFa: 'کنترل PID چیست؟',
    questionEn: "What's PID control?",
    answerFa: 'کنترل‌کننده PID (تناسبی-انتگرالی-مشتقی) یکی از پرکاربردترین روش‌های کنترل صنعتیه که خطای بین مقدار مطلوب و مقدار واقعی رو اندازه می‌گیره و با ترکیب سه جمله تناسبی، انتگرالی و مشتقی، خروجی کنترل‌کننده رو تنظیم می‌کنه تا سیستم (مثلاً دما یا سرعت موتور) سریع و پایدار به مقدار هدف برسه.',
    answerEn: 'A PID (Proportional-Integral-Derivative) controller is one of the most widely used industrial control methods. It measures the error between the desired and actual value, and combines proportional, integral, and derivative terms to adjust the controller output so a system (like temperature or motor speed) reaches its target quickly and stably.'
  },

  {
    tags: ['scada چیست', 'scada', 'اسکادا'],
    category: 'plc',
    questionFa: 'SCADA چیست؟',
    questionEn: "What's SCADA?",
    answerFa: 'SCADA (کنترل نظارتی و جمع‌آوری داده) یه سیستم نرم‌افزاری هست که برای نظارت و کنترل از راه دور روی تجهیزات و فرآیندهای صنعتی (مثل خطوط تولید یا شبکه توزیع برق) استفاده می‌شه؛ داده‌ها رو از PLCها و سنسورها جمع می‌کنه، روی صفحه (HMI) نمایش می‌ده و امکان کنترل و ثبت تاریخچه رو فراهم می‌کنه.',
    answerEn: 'SCADA (Supervisory Control and Data Acquisition) is a software system used to remotely monitor and control industrial equipment and processes (like production lines or power distribution networks). It collects data from PLCs and sensors, displays it on an HMI screen, and enables control and historical logging.'
  },

  {
    tags: ['modbus', 'مدباس', 'profinet', 'profibus', 'پروتکل صنعتی', 'industrial protocol'],
    category: 'plc',
    questionFa: 'مدباس (Modbus) چیست؟',
    questionEn: "What's Modbus?",
    answerFa: 'Modbus یه پروتکل ارتباطی صنعتی ساده و قدیمی ولی خیلی پرکاربرده که روی سریال (RTU) یا اترنت (TCP) کار می‌کنه. Profinet و Profibus هم پروتکل‌های صنعتی زیمنس هستن که برای ارتباط سریع و real-time بین PLC، درایوها و سنسورها/اکچویتورها در خطوط تولید استفاده می‌شن.',
    answerEn: 'Modbus is a simple, old but extremely widely used industrial communication protocol that runs over serial (RTU) or Ethernet (TCP). Profinet and Profibus are Siemens industrial protocols used for fast, real-time communication between PLCs, drives, and sensors/actuators on production lines.'
  },

  {
    tags: ['ترانسفورماتور', 'ترانس', 'transformer'],
    category: 'electrical',
    questionFa: 'ترانسفورماتور چیست؟',
    questionEn: "What's a transformer?",
    answerFa: 'ترانسفورماتور وسیله‌ای هست که ولتاژ برق متناوب (AC) رو بالا یا پایین می‌بره، بدون تغییر فرکانس، و از پدیده القای الکترومغناطیسی بین دو سیم‌پیچ (اولیه و ثانویه) استفاده می‌کنه. در صنعت برای رسوندن برق فشارقوی به ولتاژ قابل‌استفاده (مثلاً ۲۲۰ یا ۳۸۰ ولت)، و در تابلوهای فرمان برای تامین ولتاژ پایین (مثل ۲۴ ولت) کاربرد داره.',
    answerEn: 'A transformer steps AC voltage up or down without changing its frequency, using electromagnetic induction between two windings (primary and secondary). In industry it steps high-voltage transmission power down to usable levels (like 220V or 380V), and in control panels it\'s often used to supply low control voltages like 24V.'
  },

  {
    tags: ['فیوز', 'کلید مینیاتوری', 'mcb', 'fuse', 'breaker', 'محافظت اضافه بار', 'overload'],
    category: 'electrical',
    questionFa: 'فرق فیوز و کلید مینیاتوری؟',
    questionEn: "Fuse vs MCB?",
    answerFa: 'فیوز و کلید مینیاتوری (MCB) هر دو مدار رو در برابر جریان اضافی (اتصال کوتاه یا اضافه‌بار) محافظت می‌کنن. فیوز یه‌بارمصرفه و بعد از عملکرد باید تعویض بشه، ولی MCB یه کلید مکانیکی هست که می‌شه بعد از قطع‌شدن دوباره وصلش کرد. در تابلوهای صنعتی، بی‌متال (رله حرارتی) هم برای محافظت اختصاصی موتورها در برابر اضافه‌بار استفاده می‌شه.',
    answerEn: 'Fuses and miniature circuit breakers (MCBs) both protect a circuit from excess current (short circuits or overloads). A fuse is single-use and must be replaced after it blows, while an MCB is a mechanical switch that can simply be reset after tripping. In industrial panels, thermal overload relays are also used specifically to protect motors from overload.'
  },

  {
    tags: ['ارت', 'اتصال زمین', 'سیم زمین', 'grounding', 'earthing', 'ground wire'],
    category: 'electrical',
    questionFa: 'ارت (اتصال زمین) چیست؟',
    questionEn: "What's grounding?",
    answerFa: 'ارت (اتصال زمین) یعنی وصل‌کردن بدنه فلزی تجهیزات برقی به زمین، تا در صورت نشتی جریان یا خرابی عایق، جریان خطرناک به‌جای عبور از بدن انسان، مسیر امن به زمین رو طی کنه و کلید محافظ جان (RCD) یا فیوز عمل کنه. ارت درست یکی از پایه‌ای‌ترین اصول ایمنی برق هست، هم تو خونه و هم تو تابلوهای صنعتی.',
    answerEn: 'Grounding (earthing) means connecting the metal body of electrical equipment to earth so that, in case of leakage current or insulation failure, dangerous current flows safely to ground instead of through a person\'s body, tripping a residual-current device (RCD) or fuse. Proper grounding is one of the most fundamental electrical safety principles, both at home and in industrial panels.'
  },

  {
    tags: ['ضریب توان', 'توان راکتیو', 'توان اکتیو', 'power factor', 'reactive power'],
    category: 'electrical',
    questionFa: 'ضریب توان چیست؟',
    questionEn: "What's power factor?",
    answerFa: 'توان اکتیو (مفید) کاریه که واقعاً انجام می‌شه (مثل چرخوندن موتور یا روشن‌کردن لامپ)، در حالی که توان راکتیو صرف ایجاد میدان مغناطیسی/الکتریکی در قطعاتی مثل موتور و ترانسفورماتور می‌شه و مستقیم کاری انجام نمی‌ده. ضریب توان نسبت توان اکتیو به توان کل (اکتیو+راکتیو) هست؛ هرچی بهش نزدیک‌تر به ۱ باشه، مصرف برق کارآمدتره و معمولاً با خازن‌های اصلاح ضریب توان بهبود داده می‌شه.',
    answerEn: 'Active (real) power does actual work — like turning a motor or lighting a lamp — while reactive power is used to build the magnetic/electric field in components like motors and transformers and doesn\'t do useful work directly. Power factor is the ratio of active power to total power (active + reactive); the closer it is to 1, the more efficient the power usage, and it\'s typically improved using power-factor correction capacitors.'
  },

  {
    tags: ['اینورتر موتور', 'درایو موتور', 'vfd', 'variable frequency drive', 'motor drive'],
    category: 'control',
    questionFa: 'اینورتر موتور (VFD) چیست؟',
    questionEn: "What's a motor VFD?",
    answerFa: 'اینورتر یا درایو موتور (VFD) دستگاهیه که با تغییر فرکانس و ولتاژ برق ورودی به موتور، سرعت چرخش موتورهای الکتریکی (معمولاً آسنکرون) رو کنترل می‌کنه. به‌جای روشن/خاموش‌کردن ساده موتور، VFD اجازه می‌ده سرعت به‌صورت نرم و دقیق تنظیم بشه که هم در مصرف انرژی صرفه‌جویی می‌کنه و هم فشار مکانیکی روی موتور و تجهیزات رو کم می‌کنه.',
    answerEn: 'A variable frequency drive (VFD) controls the rotational speed of an electric motor (typically induction motors) by varying the frequency and voltage of the power fed to it. Instead of simply switching the motor on/off, a VFD allows smooth, precise speed control, which saves energy and reduces mechanical stress on the motor and connected equipment.'
  },

  {
    tags: ['hmi چیست', 'hmi', 'human machine interface'],
    category: 'plc',
    questionFa: 'HMI چیست؟',
    questionEn: "What's an HMI?",
    answerFa: 'HMI (رابط انسان-ماشین) یه صفحه‌نمایش لمسی یا نرم‌افزاره که اپراتور باهاش وضعیت یه ماشین یا خط تولید رو می‌بینه و می‌تونه دستور بده (مثلاً شروع/توقف، تنظیم پارامترها). HMI معمولاً از طریق پروتکل‌هایی مثل Modbus یا Profinet با PLC در ارتباطه، و بخش قابل‌مشاهده‌ی سیستم‌های SCADA هم معمولاً همین HMIهاست.',
    answerEn: 'An HMI (Human-Machine Interface) is a touchscreen or software panel that lets an operator see the status of a machine or production line and issue commands (like start/stop or adjusting parameters). An HMI typically communicates with a PLC over protocols like Modbus or Profinet, and it\'s usually the visible part of a SCADA system.'
  },

  {
    tags: ['ترموکوپل', 'pt100', 'رطوبت سنج صنعتی', 'thermocouple', 'rtd temperature sensor'],
    category: 'control',
    questionFa: 'فرق ترموکوپل و PT100؟',
    questionEn: "Thermocouple vs PT100?",
    answerFa: 'ترموکوپل و PT100 دو نوع رایج سنسور دما در صنعت هستن. ترموکوپل از اختلاف ولتاژ بین دو فلز مختلف در دماهای متفاوت استفاده می‌کنه، ارزون‌تره و بازه دمایی خیلی وسیع‌تری رو پوشش می‌ده. PT100 (نوع RTD) از تغییر مقاومت یه سیم پلاتینی با دما استفاده می‌کنه، دقت و پایداری بیشتری داره ولی گرون‌تر و محدودتره؛ برای اندازه‌گیری‌های دقیق صنعتی معمولاً PT100 ترجیح داده می‌شه.',
    answerEn: 'Thermocouples and PT100 sensors are the two most common industrial temperature sensors. A thermocouple uses the voltage difference between two different metals at different temperatures — it\'s cheaper and covers a much wider temperature range. A PT100 (an RTD type) uses the change in resistance of a platinum wire with temperature — it\'s more accurate and stable but pricier and more limited in range; PT100 is usually preferred for precise industrial measurements.'
  },

  {
    tags: ['لدر لاجیک', 'برنامه نویسی پلک', 'ladder logic', 'ladder diagram', 'plc programming languages'],
    category: 'plc',
    questionFa: 'Ladder Logic چیست؟',
    questionEn: "What's ladder logic?",
    answerFa: 'Ladder Logic (نردبانی) رایج‌ترین زبان برنامه‌نویسی PLC هست که شبیه مدارهای رله‌ای فرمان طراحی شده و برای برق‌کارها و تکنسین‌ها خوندنش راحته. غیر از Ladder، PLCها معمولاً از FBD (بلوک‌های تابعی)، SCL/ST (شبیه زبان‌های برنامه‌نویسی متنی) و SFC (برای فرآیندهای مرحله‌ای) هم پشتیبانی می‌کنن؛ انتخاب زبان بیشتر به نوع پروژه و سلیقه برنامه‌نویس بستگی داره.',
    answerEn: 'Ladder Logic is the most common PLC programming language, designed to resemble relay control circuits, making it easy to read for electricians and technicians. Besides Ladder, PLCs typically also support FBD (Function Block Diagram), SCL/ST (text-based, similar to conventional programming languages), and SFC (for sequential step-based processes); the choice mostly depends on the project type and the programmer\'s preference.'
  },

  {
    tags: ['درجه حفاظت', 'ip65', 'ip rating', 'ingress protection'],
    category: 'control',
    questionFa: 'درجه حفاظت IP چیست؟',
    questionEn: "What's an IP rating?",
    answerFa: 'درجه حفاظت IP (مثل IP65 یا IP67) نشون می‌ده یه تجهیز صنعتی چقدر در برابر نفوذ گرد و غبار و آب مقاومه. عدد اول (۰ تا ۶) مقاومت در برابر جامدات/گرد و غبار رو نشون می‌ده و عدد دوم (۰ تا ۹) مقاومت در برابر آب رو؛ مثلاً IP65 یعنی کاملاً ضدگرد و غبار و مقاوم در برابر پاشش آب. انتخاب درجه حفاظت مناسب برای تابلو برق و سنسورها به محیط نصب (مثل کارخونه، فضای باز یا محیط مرطوب) بستگی داره.',
    answerEn: 'The IP (Ingress Protection) rating, like IP65 or IP67, shows how well industrial equipment resists dust and water ingress. The first digit (0-6) indicates protection against solids/dust and the second (0-9) against water; for example, IP65 means fully dust-tight and resistant to water jets. Choosing the right IP rating for a control panel or sensors depends on the installation environment (like a factory, outdoors, or a humid area).'
  },

  {
    tags: ['سیم کشی شده یا بی سیم خانه هوشمند', 'wired vs wireless smart home', 'سیستم هوشمند سیمی'],
    category: 'smarthome',
    questionFa: 'خانه هوشمند سیمی یا بی‌سیم؟',
    questionEn: "Wired or wireless smart home?",
    answerFa: 'سیستم‌های خانه هوشمند سیم‌کشی‌شده (مثل KNX) قابلیت اطمینان و سرعت بالاتری دارن و نویزپذیر نیستن، ولی نصبشون توی ساختمون‌های ساخته‌شده سخت و پرهزینه‌ست. سیستم‌های بی‌سیم (Wi-Fi، Zigbee، Z-Wave) نصبشون خیلی راحت‌تره و برای بازسازی خونه‌های قدیمی مناسب‌ترن، ولی ممکنه به تداخل سیگنال یا محدودیت باتری حساس باشن. خیلی از پروژه‌های خانه هوشمند امروزی ترکیبی از هر دو رو به کار می‌برن.',
    answerEn: 'Wired smart-home systems (like KNX) offer higher reliability and speed and aren\'t prone to interference, but installing them in existing buildings is difficult and costly. Wireless systems (Wi-Fi, Zigbee, Z-Wave) are much easier to install and better suited to retrofitting older homes, but can be sensitive to signal interference or battery limitations. Many modern smart-home projects use a mix of both.'
  },

  {
    tags: ['گوگل هوم', 'الکسا', 'دستیار صوتی', 'google home', 'alexa', 'voice assistant'],
    category: 'smarthome',
    questionFa: 'دستیارهای صوتی (گوگل هوم)؟',
    questionEn: "Voice assistants (Google Home)?",
    answerFa: 'دستیارهای صوتی مثل Google Home و Amazon Alexa به‌عنوان یه لایه کنترلی روی سیستم‌های خانه هوشمند عمل می‌کنن؛ یعنی به‌جای اپلیکیشن، کاربر می‌تونه با دستور صوتی چراغ‌ها، پریزها یا ترموستات رو کنترل کنه. این دستیارها معمولاً از طریق پل‌های اینترنتی (مثل هاب‌های Zigbee یا سرویس‌های ابری) به دستگاه‌های هوشمند وصل می‌شن و می‌تونن با سناریوهای خودکار (Routines) هم ترکیب بشن.',
    answerEn: 'Voice assistants like Google Home and Amazon Alexa act as a control layer on top of smart-home systems — instead of using an app, the user can control lights, outlets, or thermostats with a voice command. These assistants typically connect to smart devices through internet bridges (like Zigbee hubs or cloud services) and can be combined with automated routines/scenarios.'
  },

  {
    tags: ['ترموستات هوشمند', 'کنترل هوشمند دما', 'smart thermostat', 'smart hvac'],
    category: 'smarthome',
    questionFa: 'ترموستات هوشمند چیست؟',
    questionEn: "What's a smart thermostat?",
    answerFa: 'ترموستات هوشمند دمای خونه رو با توجه به برنامه زمانی، حضور افراد یا حتی پیش‌بینی هوا به‌صورت خودکار تنظیم می‌کنه تا هم راحتی حفظ بشه و هم مصرف انرژی گرمایش/سرمایش کم بشه. خیلی از این ترموستات‌ها از سنسور دما و رطوبت و اتصال Wi-Fi استفاده می‌کنن و می‌شه از راه دور هم باهاشون کار کرد؛ این نوع کنترل هوشمند در واقع نسخه خانگی همون منطق کنترل حلقه‌بسته‌ایه که تو صنعت (مثل PID) استفاده می‌شه.',
    answerEn: 'A smart thermostat automatically adjusts a home\'s temperature based on a schedule, occupancy, or even weather forecasts, to maintain comfort while reducing heating/cooling energy use. Many of these thermostats use temperature and humidity sensors with Wi-Fi connectivity and can be controlled remotely; this kind of smart control is essentially a home version of the same closed-loop control logic (like PID) used in industry.'
  },

  {
    tags: ['قانون اهم', 'رابطه ولتاژ جریان مقاومت', 'ohm law', "ohm's law"],
    category: 'electrical',
    questionFa: 'قانون اهم چیست؟',
    questionEn: "What's Ohm's law?",
    answerFa: 'قانون اهم رابطهٔ ساده و پایه‌ای بین ولتاژ، جریان و مقاومت رو نشون می‌ده: V = I × R؛ یعنی ولتاژ برابره با جریان ضرب در مقاومت. با این فرمول می‌شه هر کدوم از این سه مقدار رو از روی دوتای دیگه حساب کرد، و پایهٔ خیلی از محاسبات ساده مدارهای برقی و الکترونیکیه.',
    answerEn: "Ohm's law describes the basic relationship between voltage, current, and resistance: V = I × R (voltage equals current times resistance). Using this formula, any one of the three values can be calculated from the other two, and it underlies most basic electrical and electronic circuit calculations."
  },

  {
    tags: ['قوانین کیرشهف', 'قانون جریان کیرشهف', 'قانون ولتاژ کیرشهف', 'kirchhoff', 'kcl', 'kvl', 'kirchhoff laws', 'kirchhoffs law'],
    category: 'electrical',
    questionFa: 'قوانین کیرشهف چیه؟',
    questionEn: "What are Kirchhoff's laws?",
    answerFa: 'قوانین کیرشهف دو قانون پایه برای تحلیل مدارهای الکتریکی هستن. قانون جریان (KCL) می‌گه مجموع جریان‌های ورودی به یه گره برابره با مجموع جریان‌های خروجی از اون گره. قانون ولتاژ (KVL) می‌گه مجموع افت ولتاژ در یه حلقهٔ بسته از مدار برابر با صفره. این دو قانون پایهٔ تحلیل مدارهای پیچیده‌تر از قانون اهم هستن.',
    answerEn: "Kirchhoff's laws are two fundamental rules for analyzing electrical circuits. The Current Law (KCL) states that the sum of currents entering a node equals the sum of currents leaving it. The Voltage Law (KVL) states that the sum of voltage drops around any closed loop in a circuit equals zero. Together they form the basis for analyzing circuits more complex than simple Ohm's law calculations."
  },

  {
    tags: ['سیستم سه فاز', 'برق سه فاز', 'three phase', 'three-phase system'],
    category: 'electrical',
    questionFa: 'برق سه‌فاز چیه و چه فرقی با تک‌فاز داره؟',
    questionEn: "What's three-phase power and how is it different from single-phase?",
    answerFa: 'برق سه‌فاز از سه ولتاژ متناوب با اختلاف فاز ۱۲۰ درجه نسبت به هم تشکیل شده، در حالی که برق تک‌فاز فقط یه موج ولتاژه (مثل برق خونه). برق سه‌فاز برای انتقال توان بیشتر با هدر رفت کمتر مناسب‌تره و اکثر موتورهای صنعتی و تجهیزات پرمصرف کارخونه‌ها با سه‌فاز کار می‌کنن، چون هم توان بیشتری می‌دن و هم چرخش نرم‌تری تولید می‌کنن.',
    answerEn: "Three-phase power consists of three alternating voltages, each 120 degrees out of phase with the others, while single-phase power is just one voltage waveform (like household power). Three-phase is better suited for delivering more power with less loss, and most industrial motors and heavy factory equipment run on three-phase because it delivers more power and produces smoother rotation."
  },

  {
    tags: ['کلید محافظ جان', 'rcd', 'residual current device', 'کلید جان پناه'],
    category: 'electrical',
    questionFa: 'کلید محافظ جان (RCD) چیه؟',
    questionEn: "What's an RCD (residual-current device)?",
    answerFa: 'کلید محافظ جان (RCD) یه وسیلهٔ ایمنی هست که جریان ورودی و خروجی یه مدار رو مقایسه می‌کنه؛ اگه یه مقدار جریان نشتی پیدا کنه (مثلاً به‌خاطر برق‌گرفتگی یا اتصالی به بدنه)، خیلی سریع (در حد میلی‌ثانیه) مدار رو قطع می‌کنه تا از برق‌گرفتگی جدی جلوگیری بشه. برخلاف MCB که در برابر اضافه‌بار و اتصال کوتاه محافظت می‌کنه، RCD مخصوص محافظت جانی در برابر نشتی جریانه.',
    answerEn: "An RCD (residual-current device) is a safety device that compares the current entering and leaving a circuit; if it detects a leakage current (say, from electric shock or a fault to the body of an appliance), it trips the circuit within milliseconds to prevent serious electric shock. Unlike an MCB, which protects against overloads and short circuits, an RCD specifically protects against dangerous current leakage."
  },

  {
    tags: ['mccb', 'mcb', 'کلید اتوماتیک فشار قوی', 'molded case circuit breaker'],
    category: 'electrical',
    questionFa: 'MCCB چیه و چه فرقی با MCB داره؟',
    questionEn: "What's an MCCB and how does it differ from an MCB?",
    answerFa: 'MCCB یه کلید اتوماتیک قدرتمندتر از MCB هست که برای جریان‌های بالاتر (معمولاً بالای ۱۰۰ آمپر) طراحی شده و در تابلوهای برق اصلی و صنعتی استفاده می‌شه. برخلاف MCB که ظرفیت جریانش ثابته، خیلی از MCCBها قابل تنظیم هستن (می‌شه حد قطع جریان رو تغییر داد) و معمولاً قابلیت قطع اتصال کوتاه‌های بزرگ‌تری رو هم دارن.',
    answerEn: "An MCCB (molded case circuit breaker) is a more powerful automatic switch than an MCB, designed for higher currents (typically above 100A) and used in main and industrial distribution panels. Unlike an MCB, which has a fixed current rating, many MCCBs are adjustable (the trip threshold can be changed), and they usually have a higher short-circuit breaking capacity too."
  },

  {
    tags: ['افت ولتاژ', 'سایز کابل', 'سایزینگ کابل', 'voltage drop', 'cable sizing'],
    category: 'electrical',
    questionFa: 'افت ولتاژ و سایزبندی کابل یعنی چی؟',
    questionEn: "What are voltage drop and cable sizing?",
    answerFa: 'وقتی جریان از یه کابل عبور می‌کنه، به‌خاطر مقاومت خود کابل، مقداری از ولتاژ در طول مسیر از دست می‌ره؛ به این افت ولتاژ می‌گن، و هر چی کابل بلندتر یا نازک‌تر باشه، افت ولتاژ بیشتره. سایزبندی کابل یعنی انتخاب سطح مقطع مناسب سیم بر اساس جریان موردنیاز و طول مسیر، تا هم افت ولتاژ در حد قابل‌قبول بمونه و هم کابل داغ نکنه.',
    answerEn: "When current flows through a cable, some voltage is lost along the way due to the cable's own resistance — this is called voltage drop, and it increases with longer or thinner cables. Cable sizing means choosing the right wire cross-section based on the required current and cable length, so voltage drop stays within an acceptable limit and the cable doesn't overheat."
  },

  {
    tags: ['کنترل حلقه باز', 'کنترل حلقه بسته', 'open loop', 'closed loop control'],
    category: 'control',
    questionFa: 'فرق کنترل حلقه‌باز و حلقه‌بسته چیه؟',
    questionEn: "What's the difference between open-loop and closed-loop control?",
    answerFa: 'در کنترل حلقه‌باز، خروجی سیستم هیچ تاثیری روی ورودی کنترل‌کننده نداره؛ مثلاً یه توستر که فقط بر اساس زمان کار می‌کنه، بدون اینکه دمای واقعی نون رو بسنجه. در کنترل حلقه‌بسته، خروجی واقعی سیستم اندازه‌گیری و با مقدار مطلوب مقایسه می‌شه و کنترلر بر اساس این خطا، ورودی رو تنظیم می‌کنه (مثل ترموستات یا کنترل PID)؛ این روش دقیق‌تر و مقاوم‌تر در برابر اختلال‌هاست.',
    answerEn: "In open-loop control, the system's output has no effect on the controller's input — like a toaster that runs purely on a timer, without measuring the bread's actual temperature. In closed-loop control, the system's actual output is measured and compared to the desired value, and the controller adjusts the input based on that error (like a thermostat or PID control); this approach is more accurate and more resistant to disturbances."
  },

  {
    tags: ['فیدبک کنترل', 'بازخورد', 'feedback control system'],
    category: 'control',
    questionFa: 'فیدبک (بازخورد) در سیستم کنترل یعنی چی؟',
    questionEn: "What's feedback in a control system?",
    answerFa: 'فیدبک یعنی اندازه‌گیری خروجی واقعی یه سیستم و برگردوندنش به ورودی کنترلر، تا کنترلر بتونه خطای بین مقدار مطلوب و مقدار واقعی رو ببینه و بر اساسش تصمیم بگیره. همین فیدبک هست که کنترل حلقه‌بسته رو ممکن می‌کنه؛ بدون فیدبک، سیستم نمی‌تونه بفهمه که آیا به هدفش رسیده یا نه.',
    answerEn: "Feedback means measuring a system's actual output and feeding it back into the controller's input, so the controller can see the error between the desired and actual values and act on it. Feedback is what makes closed-loop control possible; without it, a system has no way of knowing whether it has reached its target."
  },

  {
    tags: ['تابع تبدیل', 'transfer function'],
    category: 'control',
    questionFa: 'تابع تبدیل (Transfer Function) چیست؟',
    questionEn: "What's a transfer function?",
    answerFa: 'تابع تبدیل یه رابطهٔ ریاضی هست که نسبت خروجی یه سیستم رو به ورودیش، معمولاً در حوزهٔ فرکانس (با استفاده از تبدیل لاپلاس)، نشون می‌ده. مهندسان کنترل از تابع تبدیل برای تحلیل رفتار سیستم (مثل سرعت پاسخ یا پایداری) و طراحی کنترلر مناسب (مثل تنظیم پارامترهای PID) استفاده می‌کنن.',
    answerEn: "A transfer function is a mathematical relationship that describes the ratio of a system's output to its input, typically in the frequency domain (using the Laplace transform). Control engineers use transfer functions to analyze a system's behavior (like response speed or stability) and to design appropriate controllers (such as tuning PID parameters)."
  },

  {
    tags: ['opc ua', 'opc unified architecture'],
    category: 'plc',
    questionFa: 'OPC UA چیست؟',
    questionEn: "What's OPC UA?",
    answerFa: 'OPC UA (معماری یکپارچهٔ OPC) یه استاندارد ارتباطی صنعتی مدرن هست که برای تبادل امن و مستقل از پلتفرم داده بین PLCها، SCADA، نرم‌افزارهای کارخونه و حتی سیستم‌های ابری طراحی شده. برخلاف پروتکل‌های قدیمی‌تر مثل Modbus، OPC UA امنیت، مدل‌سازی داده استاندارد و قابلیت اتصال به شبکه‌های IT معمولی رو هم پشتیبانی می‌کنه، برای همین یکی از پایه‌های اصلی صنعت ۴.۰ محسوب می‌شه.',
    answerEn: "OPC UA (OPC Unified Architecture) is a modern industrial communication standard designed for secure, platform-independent data exchange between PLCs, SCADA systems, factory software, and even cloud systems. Unlike older protocols like Modbus, OPC UA supports built-in security, standardized data modeling, and easy connection to regular IT networks, which is why it's considered one of the core building blocks of Industry 4.0."
  },

  {
    tags: ['mqtt', 'پروتکل ام کیو تی تی'],
    category: 'plc',
    questionFa: 'MQTT چیست؟',
    questionEn: "What's MQTT?",
    answerFa: 'MQTT یه پروتکل سبک و کم‌مصرف پیام‌رسانی هست که بر اساس مدل publish/subscribe کار می‌کنه: دستگاه‌ها پیام‌ها رو روی «موضوع»های مشخص منتشر می‌کنن و بقیهٔ دستگاه‌ها می‌تونن روی همون موضوع مشترک بشن و پیام رو دریافت کنن. به‌خاطر سبک بودن و مصرف پایین پهنای باند، MQTT خیلی محبوب پروژه‌های IoT و خانه هوشمند (مثل ارتباط ESP32 با سرور) هست.',
    answerEn: "MQTT is a lightweight, low-bandwidth messaging protocol based on a publish/subscribe model: devices publish messages to specific 'topics,' and other devices can subscribe to those topics to receive the messages. Because it's lightweight and bandwidth-efficient, MQTT is very popular in IoT and smart-home projects, like communication between an ESP32 and a server."
  },

  {
    tags: ['ethernet ip', 'اترنت آی پی'],
    category: 'plc',
    questionFa: 'Ethernet/IP چیست؟',
    questionEn: "What's Ethernet/IP?",
    answerFa: 'Ethernet/IP یه پروتکل ارتباطی صنعتیه که پروتکل CIP (پروتکل مشترک صنعتی) رو روی زیرساخت اترنت معمولی پیاده‌سازی می‌کنه. این پروتکل که بیشتر در تجهیزات آلن-بردلی (Rockwell) رایجه، ارتباط سریع بین PLC، درایوها و دستگاه‌های میدانی رو با استفاده از همون کابل‌کشی و سوییچ‌های استاندارد شبکه ممکن می‌کنه.',
    answerEn: "Ethernet/IP is an industrial communication protocol that implements CIP (Common Industrial Protocol) over standard Ethernet infrastructure. Common especially in Allen-Bradley (Rockwell) equipment, it enables fast communication between PLCs, drives, and field devices using the same standard network cabling and switches."
  },

  {
    tags: ['dcs چیست', 'سیستم کنترل توزیع شده', 'dcs', 'distributed control system', 'plc'],
    category: 'plc',
    questionFa: 'DCS چیست و چه فرقی با PLC داره؟',
    questionEn: "What's a DCS and how does it differ from a PLC?",
    answerFa: 'DCS (سیستم کنترل توزیع‌شده) برای کنترل فرآیندهای بزرگ و پیوسته (مثل پالایشگاه یا نیروگاه) طراحی شده که در اون کنترلرهای متعدد در نقاط مختلف کارخونه توزیع شدن ولی همه از یه سیستم مدیریت مرکزی و یکپارچه استفاده می‌کنن. برخلاف PLC که بیشتر برای کنترل ماشین‌ها و خطوط تولید مجزا مناسبه، DCS برای فرآیندهای پیچیده و به‌هم‌وابسته با هزاران نقطه کنترل بهینه‌ست.',
    answerEn: "A DCS (Distributed Control System) is designed for large, continuous processes (like a refinery or power plant), where multiple controllers are physically distributed across the plant but all operate under one unified, central management system. Unlike a PLC, which is better suited to controlling individual machines or production lines, a DCS is optimized for complex, interdependent processes with thousands of control points."
  },

  {
    tags: ['تایمر پی ال سی', 'کانتر پی ال سی', 'plc timer', 'plc counter'],
    category: 'plc',
    questionFa: 'تایمر و کانتر در PLC چطور کار می‌کنن؟',
    questionEn: "How do timers and counters work in a PLC?",
    answerFa: 'تایمر در PLC برای ایجاد تاخیر زمانی استفاده می‌شه؛ مثلاً روشن‌کردن یه چراغ ۵ ثانیه بعد از فعال‌شدن یه ورودی. کانتر هم تعداد وقوع یه رویداد (مثل تعداد دفعاتی که یه سنسور فعال شده) رو می‌شماره، مثلاً برای شمارش قطعات روی نوار نقاله. هر دو از پرکاربردترین ابزارهای برنامه‌نویسی Ladder برای کنترل توالی و زمان‌بندی فرآیندها هستن.',
    answerEn: "A timer in a PLC is used to create a time delay — for example, turning on a light 5 seconds after an input becomes active. A counter tallies how many times an event occurs (like how many times a sensor has triggered), for instance counting parts on a conveyor belt. Both are among the most commonly used Ladder programming tools for controlling sequencing and timing in a process."
  },

  {
    tags: ['سیگنال آنالوگ دیجیتال', 'ورودی خروجی آنالوگ', 'analog signal', 'digital signal plc'],
    category: 'plc',
    questionFa: 'فرق سیگنال آنالوگ و دیجیتال در PLC چیه؟',
    questionEn: "What's the difference between analog and digital signals in a PLC?",
    answerFa: 'سیگنال دیجیتال فقط دو حالت داره (روشن/خاموش یا صفر و یک)، مثل وضعیت یه شستی یا رله. سیگنال آنالوگ می‌تونه هر مقداری بین یه بازه رو بگیره (مثلاً ۰ تا ۱۰ ولت یا ۴ تا ۲۰ میلی‌آمپر) و برای اندازه‌گیری مقادیر پیوسته مثل دما، فشار یا سرعت استفاده می‌شه. PLCها معمولاً هم ورودی/خروجی دیجیتال دارن و هم آنالوگ، بسته به نوع سنسور و اکچویتوری که بهشون وصل می‌شه.',
    answerEn: "A digital signal only has two states (on/off, or 0 and 1), like the status of a pushbutton or relay. An analog signal can take any value within a range (like 0-10V or 4-20mA) and is used to measure continuous values like temperature, pressure, or speed. PLCs typically have both digital and analog inputs/outputs, depending on the type of sensor or actuator connected to them."
  },

  {
    tags: ['سروو موتور', 'servo motor'],
    category: 'motors',
    questionFa: 'سروو موتور چیست؟',
    questionEn: "What's a servo motor?",
    answerFa: 'سروو موتور یه موتور الکتریکیه که همراه با یه سیستم فیدبک (معمولاً اینکودر) کار می‌کنه، تا موقعیت، سرعت یا گشتاور خروجی به‌طور دقیق کنترل بشه. به‌خاطر همین دقت بالا، سروو موتورها در کاربردهایی مثل بازوهای رباتیک، دستگاه‌های CNC و خطوط تولید دقیق که نیاز به کنترل موقعیت خیلی دقیق دارن، پرکاربردن.',
    answerEn: "A servo motor is an electric motor paired with a feedback system (usually an encoder) so its output position, speed, or torque can be precisely controlled. Because of this high accuracy, servo motors are widely used in applications like robotic arms, CNC machines, and precision production lines that require very accurate position control."
  },

  {
    tags: ['استپر موتور', 'موتور پله ای', 'stepper motor'],
    category: 'motors',
    questionFa: 'استپر موتور (موتور پله‌ای) چیست؟',
    questionEn: "What's a stepper motor?",
    answerFa: 'استپر موتور موتوریه که به‌جای چرخش پیوسته، در قدم‌های مشخص (مثلاً ۱.۸ درجه در هر قدم) می‌چرخه؛ با شمردن تعداد قدم‌ها می‌شه موقعیت موتور رو بدون نیاز به سنسور فیدبک، با دقت خوبی تخمین زد. استپر موتورها ساده‌تر و ارزون‌تر از سروو موتورها هستن و در پرینترهای سه‌بعدی، دستگاه‌های CNC کوچیک و پروژه‌های رباتیک آماتور خیلی رایجن.',
    answerEn: "A stepper motor rotates in fixed increments (like 1.8 degrees per step) instead of continuous rotation; by counting the number of steps, the motor's position can be estimated fairly accurately without a feedback sensor. Stepper motors are simpler and cheaper than servo motors, and are very common in 3D printers, small CNC machines, and hobbyist robotics projects."
  },

  {
    tags: ['فرق سروو استپر', 'servo vs stepper', 'سروو موتور استپر موتور', 'servo motor stepper motor'],
    category: 'motors',
    questionFa: 'فرق سروو موتور و استپر موتور چیه؟',
    questionEn: "What's the difference between a servo and a stepper motor?",
    answerFa: 'سروو موتور از فیدبک (اینکودر) برای کنترل دقیق و پیوستهٔ موقعیت و سرعت استفاده می‌کنه، گشتاور و سرعت بالاتری داره ولی گرون‌تر و پیچیده‌تره. استپر موتور بدون فیدبک و با شمارش پالس کار می‌کنه، ساده‌تر و ارزون‌تره ولی در سرعت‌های بالا ممکنه «قدم جا بندازه» و دقتش کم بشه. برای دقت بالا و بار سنگین سروو، و برای پروژه‌های ساده‌تر و کم‌هزینه‌تر استپر انتخاب مناسب‌تریه.',
    answerEn: "A servo motor uses feedback (an encoder) for precise, continuous control of position and speed, offering higher torque and speed but at higher cost and complexity. A stepper motor operates without feedback, by counting pulses — simpler and cheaper, but it can 'lose steps' at high speeds, reducing accuracy. Servos are the better choice for high precision and heavy loads, while steppers suit simpler, lower-cost projects."
  },

  {
    tags: ['ایمنی صنعتی', 'قفل و برچسب', 'lockout tagout', 'loto', 'industrial safety'],
    category: 'safety',
    questionFa: 'قفل و برچسب (Lockout-Tagout) در ایمنی صنعتی چیست؟',
    questionEn: "What's Lockout-Tagout (LOTO) in industrial safety?",
    answerFa: 'قفل و برچسب (LOTO) یه روش ایمنی استاندارد صنعتیه که قبل از تعمیر یا سرویس یه ماشین، منبع انرژی (برق، هوای فشرده، هیدرولیک و ...) قفل می‌شه و یه برچسب هشدار روش نصب می‌شه، تا از روشن‌شدن ناگهانی دستگاه و آسیب به تکنسین جلوگیری بشه. رعایت LOTO یکی از پایه‌ای‌ترین قوانین ایمنی در نگهداری و تعمیرات تجهیزات صنعتیه.',
    answerEn: "Lockout-Tagout (LOTO) is a standard industrial safety procedure where, before repairing or servicing a machine, its energy source (electrical, compressed air, hydraulic, etc.) is locked out and a warning tag is attached, to prevent the equipment from suddenly powering on and injuring a technician. Following LOTO is one of the most fundamental safety rules in industrial maintenance and repair."
  },

  {
    tags: ['استاپ اضطراری', 'کلید توقف اضطراری', 'emergency stop', 'e-stop'],
    category: 'safety',
    questionFa: 'استاپ اضطراری (Emergency Stop) چیست؟',
    questionEn: "What's an emergency stop (E-Stop)?",
    answerFa: 'استاپ اضطراری یه کلید قرمز (معمولاً روی زمینهٔ زرد) هست که در هر لحظه، بدون توجه به وضعیت برنامه، می‌تونه فوراً یه ماشین یا خط تولید رو متوقف کنه تا جون افراد یا تجهیزات در شرایط خطرناک حفظ بشه. مدار استاپ اضطراری معمولاً مستقل از منطق PLC و با رله‌های ایمنی طراحی می‌شه، تا حتی در صورت خرابی نرم‌افزار PLC هم قابل‌اعتماد باقی بمونه.',
    answerEn: "An emergency stop (E-Stop) is a red button (usually on a yellow background) that can instantly halt a machine or production line at any moment, regardless of the program's state, to protect people or equipment in a dangerous situation. The E-Stop circuit is typically designed independently of the PLC logic, using dedicated safety relays, so it remains reliable even if the PLC's software fails."
  },

  {
    tags: ['رله ایمنی', 'safety relay'],
    category: 'safety',
    questionFa: 'رله ایمنی (Safety Relay) چیست؟',
    questionEn: "What's a safety relay?",
    answerFa: 'رله ایمنی یه قطعهٔ سخت‌افزاری مستقل هست که برای اجرای توابع ایمنی حیاتی (مثل مدار استاپ اضطراری یا حفاظ‌های ایمنی درب) طراحی شده و برخلاف رله‌های معمولی، دارای طراحی افزونه (redundant) و قابلیت تشخیص خطای داخلیه، تا حتی اگه یه بخشش خراب بشه، سیستم همچنان در حالت ایمن باقی بمونه.',
    answerEn: "A safety relay is an independent hardware component designed to perform critical safety functions (like an emergency-stop circuit or door-guard interlocks). Unlike a regular relay, it has a redundant design and internal fault-detection capability, so that even if one part fails, the system still remains in a safe state."
  },

  {
    tags: ['هوم اسیستنت', 'home assistant'],
    category: 'iot',
    questionFa: 'Home Assistant چیست؟',
    questionEn: "What's Home Assistant?",
    answerFa: 'Home Assistant یه پلتفرم متن‌باز و رایگان برای هوشمندسازی خانه‌ست که می‌شه روی یه کامپیوتر کوچیک (مثل Raspberry Pi) نصبش کرد و صدها نوع دستگاه هوشمند (از پروتکل‌های مختلف مثل Zigbee, Z-Wave, Wi-Fi) رو زیر یه داشبورد واحد و بدون نیاز به اینترنت یا سرویس ابری مدیریت کرد؛ برخلاف خیلی از سیستم‌های برند خاص، کنترل کامل داده‌ها دست خود کاربر می‌مونه.',
    answerEn: "Home Assistant is a free, open-source home-automation platform that can be installed on a small computer (like a Raspberry Pi) to manage hundreds of smart device types (across different protocols like Zigbee, Z-Wave, Wi-Fi) under a single dashboard, without needing internet access or a cloud service; unlike many brand-specific systems, the user keeps full control of their data."
  },

  {
    tags: ['آردوینو', 'arduino'],
    category: 'iot',
    questionFa: 'آردوینو (Arduino) چیست؟',
    questionEn: "What's Arduino?",
    answerFa: 'آردوینو یه پلتفرم متن‌باز سخت‌افزار و نرم‌افزاره که شامل یه برد میکروکنترلر ساده و یه محیط برنامه‌نویسی آسونه، و برای پروژه‌های آموزشی، الکترونیک آماتور و پروتوتایپ‌سازی سریع خیلی محبوبه. برخلاف ESP32 که وای‌فای و بلوتوث داخلی داره، خیلی از بردهای پایه‌ی آردوینو (مثل Uno) اتصال بی‌سیم ندارن و بیشتر برای کنترل ساده سنسور و اکچویتور مناسبن.',
    answerEn: "Arduino is an open-source hardware and software platform that includes a simple microcontroller board and an easy-to-use programming environment, very popular for educational projects, hobby electronics, and rapid prototyping. Unlike the ESP32, which has built-in Wi-Fi and Bluetooth, many basic Arduino boards (like the Uno) have no wireless connectivity and are best suited to simple sensor and actuator control."
  },

  {
    tags: ['رزبری پای', 'raspberry pi'],
    category: 'iot',
    questionFa: 'رزبری‌پای (Raspberry Pi) چیست؟',
    questionEn: "What's a Raspberry Pi?",
    answerFa: 'رزبری‌پای یه کامپیوتر کوچیک و کم‌مصرف (به اندازهٔ یه کارت اعتباری) هست که یه سیستم‌عامل کامل (معمولاً لینوکس) روش اجرا می‌شه؛ برخلاف آردوینو یا ESP32 که میکروکنترلرن، رزبری‌پای یه کامپیوتر واقعیه و می‌شه روش کارهایی مثل اجرای Home Assistant، سرور وب یا پردازش تصویر رو انجام داد. توی خیلی از پروژه‌های IoT، رزبری‌پای به‌عنوان «مغز مرکزی» و ESP32/آردوینو به‌عنوان گره‌های حسگر کوچیک کنارش استفاده می‌شن.',
    answerEn: "A Raspberry Pi is a small, low-power computer (about the size of a credit card) that runs a full operating system (usually Linux); unlike Arduino or ESP32, which are microcontrollers, the Raspberry Pi is an actual computer capable of tasks like running Home Assistant, hosting a web server, or doing image processing. In many IoT projects, the Raspberry Pi serves as the 'central brain,' with ESP32/Arduino boards acting as small sensor nodes alongside it."
  }

];
