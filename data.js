/* ============================================================
   КОНТЕНТ ЗАСТОСУНКУ — редагуй цей файл, програмувати не треба.
   Дані по мовах: window.MOUNTAIN_DATA = { uk: {...}, en: {...} }.
   Щоб додати ще мову — додай ще один блок з таким самим набором полів.
   ВАЖЛИВО: структура (порядок категорій і пунктів) у всіх мовах має
   збігатися — стан чек-листа зберігається за позицією, не за текстом.
   Після зміни підвищ версію кешу в sw.js.

   У текстах безпеки/статей **двома зірочками** позначається жирний фрагмент.
   ============================================================ */
window.MOUNTAIN_DATA = {
  /* ============================ УКРАЇНСЬКА ============================ */
  uk: {
    /* ---------- РЯДКИ ІНТЕРФЕЙСУ ---------- */
    ui: {
      docTitle: "У гори — чек-лист і поради для походу",
      htmlLang: "uk",
      brand: "У гори",
      eyebrow: "Похід у гори · Що з собою брати?",
      tagline:
        "Збери рюкзак правильно, переглянь, який має бути стаф, маршрути й головне про безпеку.",
      day1: "1 день",
      day1sub: "радіалка / без ночівлі",
      day2: "2 дні",
      day2sub: "з ночівлею в наметі",
      seasonLabel: "❄️ Зимове спорядження",
      seasonOff: "вимкнено · тепла пора",
      seasonOn: "увімкнено · холодна пора",
      packed: "Зібрано",
      doneAll: "🎒 Рюкзак зібраний — гарного походу!",
      doneMust: "✅ Необхідне зібрано — рюкзак буде легким!",
      doneOpt: "✅ Усе опційне відмічено!",
      reset: "Скинути",
      filterLabel: "Фільтр",
      filterAll: "Усі",
      filterMust: "Необхідне",
      filterOpt: "Опційне",
      hidePackedLabel: "Сховати зібране",
      hidePackedHint: "показувати лише ще не зібране",
      withoutPacked: "без зібраного",
      optBadge: "опц.",
      catDone: "✓ зібрано",
      hiddenPrefix: "Сховано: ",
      hiddenOpt: "опційних",
      hiddenMust: "необхідних",
      hiddenPacked: "зібраних",
      emptyFilter: "У цьому фільтрі немає речей. Спробуй **«Усі»**.",
      emptyAllPacked: "🎒 Усе зібрано в цьому списку!",
      stuffTitle: "Як виглядає спорядження",
      stuffLead:
        "Не «гарна кофта», а правильна річ. Головне — матеріал, а не вигляд.",
      threeLayer:
        "**Правило трьох шарів.** Базовий шар відводить вологу від тіла (термуха). Утеплювальний — тримає тепло (фліска, пуховик). Захисний — рятує від вітру й дощу (мембрана). Разом вони працюють краще, ніж одна товста куртка.",
      adviceTitle: "Поради",
      adviceLead:
        "Відео та статті — переглянь завчасно, у горах часто немає зв'язку.",
      subVideos: "Відео",
      subArticles: "Статті",
      youtube: "Дивитися на YouTube →",
      routesTitle: "Сервіси",
      routesLead: "Додатки та сервіси для маршрутів, трекінгу й погоди.",
      subFindRoutes: "Де шукати й планувати",
      safetyTitle: "Безпека",
      navGear: "Рюкзак",
      navStuff: "Стаф",
      navAdvice: "Поради",
      navRoutes: "Сервіси",
      navSafety: "Безпека",
      exportLabel: "Експорт",
      resetConfirm: "Зняти всі позначки для цього списку?",
      noData:
        "Не вдалося завантажити контент (data.js). Переконайся, що файл data.js лежить поряд з index.html.",
    },

    /* ---------- ВІДЕО (потрібен лише id після watch?v=) ---------- */
    videos: [
      {
        id: "4Y_1A5dYG5E",
        title: "Тришарова концепція одягу",
        desc: "Як працює система з трьох шарів і чому це важливо в горах.",
      },
      {
        id: "LuEPtvK46sE",
        title: "Як відрегулювати та запакувати рюкзак",
        desc: "Регулювання лямок і розподіл ваги — щоб не боліли плечі й спина.",
      },
    ],

    /* ---------- СТАТТІ ---------- */
    articles: [
      {
        title: "Що робити, якщо вкусила змія",
        intro: "Що потрібно зробити негайно:",
        steps: [
          {
            t: "Обмежте рухи.",
            d: "Паніка та активні рухи (наприклад, спроби бігти за допомогою) прискорюють кровообіг, через що отрута швидше розповсюджується тілом. Постраждалого потрібно покласти або зручно посадити.",
          },
          {
            t: "Викличте допомогу.",
            d: "Одразу телефонуйте рятувальникам (112) або швидкій допомозі (103). Повідомте свої координати та стан постраждалого. Якщо зв'язку немає, відправте за допомогою когось із групи.",
          },
          {
            t: "Звільніть уражену ділянку.",
            d: "Негайно зніміть каблучки, годинники, браслети, взуття та тісний одяг поблизу місця укусу, оскільки кінцівка почне швидко набрякати.",
          },
          {
            t: "Знерухомте уражену кінцівку.",
            d: "Вона має бути нерухомою. За можливості тримайте її трохи нижче рівня серця, щоб уповільнити поширення отрути. Можна накласти легку шину, але не перетягуйте кінцівку — активні рухи прискорюють розповсюдження отрути по організму.",
          },
          {
            t: "Обробіть рану.",
            d: "Обережно промийте місце укусу чистою водою або протріть вологою серветкою. Накладіть чисту, не тугу (стерильну, якщо є) пов'язку. Не перетягувати.",
          },
          {
            t: "Пийте багато рідини.",
            d: "Давайте постраждалому пити багато чистої води невеликими порціями. Це допоможе зменшити концентрацію отрути в організмі.",
          },
          {
            t: "Дайте протиалергічний препарат.",
            d: "(У разі потреби — або краще уникнути цього пункту.) Якщо в аптечці є антигістамінні засоби (наприклад, Супрастин, Лоратадин, Цетрин), дайте їх постраждалому, щоб зменшити ризик сильної алергічної реакції.",
          },
        ],
        warnIntro: "Чого категорично НЕ можна робити:",
        warnings: [
          {
            t: "НЕ накладайте джгут.",
            d: "Це найпоширеніша і найнебезпечніша помилка. Джгут не зупинить поширення отрути, але повністю перекриє кровопостачання тканин, що може призвести до некрозу (відмирання) та необхідності ампутації.",
          },
          {
            t: "НЕ висмоктуйте отруту.",
            d: "Ефективність цього методу не доведена, але є високий ризик занести інфекцію в рану або отруїтися самому, якщо в роті є мікроранки.",
          },
          {
            t: "НЕ розрізайте та не припікайте місце укусу.",
            d: "Це лише погіршить стан рани, спричинить додатковий біль та підвищить ризик зараження крові.",
          },
          {
            t: "НЕ вживайте алкоголь чи каву.",
            d: "Алкоголь пришвидшує кровообіг і посилює дію отрути, а кава створює додаткове навантаження на серце.",
          },
          {
            t: "НЕ прикладайте лід.",
            d: "Це може погіршити кровообіг у місці укусу і сприяти відмиранню тканин.",
          },
        ],
      },
    ],

    /* ---------- МАРШРУТИ (image — у images/routes/) ---------- */
    routes: [],

    /* ---------- ДЕ ШУКАТИ МАРШРУТИ (tag: трекінг / маршрути / погода) ---------- */
    routeApps: [
      {
        name: "OrganicMaps",
        url: "https://organicmaps.app/",
        tag: "трекінг",
        tagType: "track",
        desc: "Додаток на телефон для побудови та трекінгу маршруту.",
      },
      {
        name: "Mapy.com",
        url: "https://mapy.com/",
        tag: "трекінг",
        tagType: "track",
        desc: "Трекінг та побудова маршрутів. Сайт а також додаток на телефон.",
      },
      {
        name: "Маршрути Карпатами",
        url: "https://vpohid.com.ua/routes/",
        tag: "маршрути",
        tagType: "route",
        desc: "Український сервіс із маршрутами та описами походів.",
      },
      {
        name: "AllTrails",
        url: "https://www.alltrails.com/",
        tag: "маршрути",
        tagType: "route",
        desc: "Велика база маршрутів з картами, фото й відгуками.",
      },
      {
        name: "propohody.com",
        url: "https://propohody.com/",
        tag: "маршрути",
        tagType: "route",
        desc: "Описи маршрутів і корисні матеріали для походів.",
      },
      {
        name: "Meteoblue",
        url: "https://www.meteoblue.com/uk/weather/week/",
        tag: "погода",
        tagType: "weather",
        desc: "Прогноз погоди на тиждень — перевір перед виходом на маршрут.",
      },
    ],

    /* ---------- ЯК ВИГЛЯДАЄ СПОРЯДЖЕННЯ ---------- */
    gearExamples: [
      {
        item: "Базовий шар",
        layer: "1 · Базовий шар",
        wrong: "Бавовняна футболка — намокає від поту й холодить тіло.",
        right:
          "Термуха або синтетична футболка — відводить вологу й швидко сохне.",
      },
      {
        item: "Утеплення",
        layer: "2 · Утеплювальний шар",
        wrong: "Худі чи светр із бавовни — мокне й довго сохне.",
        right: "Фліска — гріє навіть вологою і майже нічого не важить.",
      },
      {
        item: "Захист від погоди",
        layer: "3 · Захисний шар",
        wrong: "Звичайна міська куртка або парасоля.",
        right: "Мембранна куртка — тримає вітер і дощ, але дихає.",
      },
      {
        item: "Штани",
        wrong: "Джинси — важкі, холодні й дуже довго сохнуть.",
        right: "Трекінгові швидкосохнучі штани (або термоштани під шорти).",
      },
      {
        item: "Взуття",
        wrong: "Кеди чи кросівки з гладкою підошвою.",
        right: "Трекінгові черевики/кросівки з протектором і фіксацією стопи.",
      },
      {
        item: "Шкарпетки",
        wrong: "Бавовняні — натирають і збирають вологу.",
        right: "Трекінгові (вовна/синтетика) — менше мозолів.",
      },
      {
        item: "Рюкзак",
        wrong: "Сумка через плече або рюкзак без поясного ременя.",
        right:
          "Туристичний рюкзак із поясним ременем — вага лягає на стегна, а не на плечі.",
      },
      {
        item: "Вода",
        wrong: "Носити пляшку в руці.",
        right:
          "Гідратор або пляшка в бічній кишені — руки вільні, п'єш частіше.",
      },
    ],

    /* ---------- ЧЕК-ЛИСТ СПОРЯДЖЕННЯ ----------
       Пункт: "Назва" або {n:"Назва", opt:true, desc:"..."}
       Категорія: {cat, items, must?, season?, note?} */
    gear: {
      1: [
        {
          cat: "Must have",
          must: true,
          items: ["Гроші", "Документи", "Квитки"],
        },
        {
          cat: "Основне",
          items: [
            "Рюкзак",
            { n: "Raincover", desc: "накидка від дощу на рюкзак" },
          ],
        },
        {
          cat: "Кухня",
          items: [
            "Інтегорована система",
            "Газовий балон",
            "Ложка",
            "Термос",
            "Пляшка 1 л",
          ],
        },
        {
          cat: "Техніка",
          items: [
            "Павербанк",
            "Зарядний дріт",
            { n: "Ліхтарик", opt: true, desc: "Якщо планується довгий похід" },
          ],
        },
        {
          cat: "Гігієна",
          items: [
            "Туалетний папір / сухі серветки",
            "Вологі серветки",
            "Сонцезахисний крем",
          ],
        },
        {
          cat: "Одяг",
          note: "Добре мати одяг, у якому їхати, і переодягнутись перед підйомом або після походу.",
          items: [
            { n: "Термуха / футболка", desc: "В якій будеш йти" },
            { n: "Фліска", desc: "Одягти коли стане прохолодно" },
            {
              n: "Мембранка / вітровка",
              desc: "Захиститись від вітру на вершині та легкого дощу",
            },
            { n: "Шкарпетки", desc: "В яких будеш йти" },

            { n: "Баф", opt: true },
            { n: "Штани / шорти", opt: true },
          ],
        },
        {
          cat: "Інше",
          items: [
            { n: "Ніж", opt: true },
            { n: "Окуляри", opt: true },
            { n: "Трекінгові палиці", opt: true },
            { n: "Стілець / піддупник", opt: true },
            { n: "Дощовик", opt: true },
          ],
        },
        {
          cat: "Харчування",
          items: ["Їдло — 1", "Батончики — 2", "Дріп-кава — 1", "Чай — 1"],
        },
        {
          cat: "Зима / весна / осінь",
          season: true,
          items: [
            "Гамаші",
            "Лижні штани",
            "Лижна куртка / мембрана",
            "Пуховик",
            "Кішки",
            "Снігоступи",
            "Рукавиці",
            "Шапка",
          ],
        },
      ],
      2: [
        {
          cat: "Must have",
          must: true,
          items: ["Гроші", "Документи", "Квитки"],
        },
        {
          cat: "Основне",
          items: [
            "Намет",
            "Футпрінт",
            "Рюкзак",
            { n: "Raincover", desc: "накидка від дощу на рюкзак" },
            "Спальник",
            "Каримат",
            { n: "Вкладиш для спальника", opt: true },
            { n: "Електричний насос для каримата", opt: true },
            { n: "Подушка", opt: true },
          ],
        },
        {
          cat: "Кухня",
          items: [
            "Інтегрована система",
            "Газовий балон",
            "Ложка",
            "Термос",
            "Пляшка 1 л",
            { n: "Пляшка для кухні 2–5 л", opt: true },
          ],
        },
        {
          cat: "Техніка",
          items: [
            "Павербанк",
            "Зарядний дріт",
            "Ліхтарик",
            { n: "Лампа для стоянки / гірлянда", opt: true },
          ],
        },
        {
          cat: "Гігієна",
          items: [
            "Туалетний папір",
            "Зубна щітка",
            "Зубна паста",
            "Зубна нитка",
            "Вологі серветки",
            "Сонцезахисний крем",
            { n: "Сухі серветки", opt: true },
            { n: "Дезік", opt: true },
            { n: "Рушник", opt: true },
            { n: "Мило", opt: true },
          ],
        },
        {
          cat: "Одяг",
          items: [
            { n: "Футболка — 1", desc: "на собі" },
            { n: "Термуха — 1", desc: "на ніч" },
            { n: "Шкарпетки — 2", desc: "на собі + наступний день" },
            { n: "Труси — 2", desc: "на собі + наступний день" },
            { n: "Шорти", desc: "на собі вдень" },
            { n: "Фліс кофта", desc: "на вечір" },
            { n: "Штани", desc: "на ніч" },
            { n: "Вітровка", desc: "на вечір" },
            { n: "Кепка", desc: "на собі" },
            { n: "Шльопанці", opt: true },
            { n: "Баф", opt: true },
            { n: "Підштаники", opt: true },
          ],
        },
        {
          cat: "Інше",
          items: [
            "Запальничка / сірники",
            "Пилка для дров",
            "Аптечка / ліки",
            { n: "Дощовик", opt: true },
            { n: "Ніж", opt: true },
            { n: "Трекінгові палиці", opt: true },
            { n: "Пакет для сміття", opt: true },
            { n: "Окуляри", opt: true },
            { n: "Стілець / Піддупник", opt: true },
            { n: "Сокира для дров", desc: "мала", opt: true },
            { n: "Гамак", opt: true },
            { n: "Колонка для музики", opt: true },
          ],
        },
        {
          cat: "Харчування",
          items: [
            "Їдло — 3",
            "Чай — 3",
            "Батончики",
            { n: "Дріп-кава — 1", opt: true },
            { n: "Маршмелоу / Марія / шоколадка", opt: true },
            { n: "Горішки", opt: true },
            { n: "Сардельки / курка", desc: "засмажити на вогні", opt: true },
          ],
        },
        {
          cat: "Зима / весна / осінь",
          season: true,
          items: [
            "Гамаші",
            "Лижні штани",
            "Лижна куртка / мембрана",
            "Пуховик",
            "Кішки",
            "Снігоступи",
            "Рукавиці",
            "Шапка",
            "Баф",
          ],
        },
      ],
    },

    /* ---------- БЕЗПЕКА ---------- */
    safety: {
      lead: "Найважливіше, що варто знати кожному в групі.",
      emergency: {
        title: "Екстрені номери",
        numbers: [
          { n: "112", who: "єдиний екстрений" },
          { n: "101", who: "ДСНС · рятувальники", alt: true },
        ],
        notes: [
          "Назви якомога точніше, **де ти є** (назва гори, стежки, орієнтири, координати з телефону).",
          "Бережи заряд: вимкни зайве, тримай телефон у теплі.",
        ],
      },
      cards: [
        {
          title: "Якщо загубився або відстав",
          items: [
            "**Зупинись і не панікуй.** Рухатися навмання — гірше, ніж лишитися на місці.",
            "Лишайся на стежці й на видному місці, дзвони лідеру або 112.",
            "Подавай сигнали: голосом, свистком, яскравим одягом.",
            "Не спускайся наосліп у незнайомий бік, особливо в тумані чи сутінках.",
          ],
        },
        {
          title: "Базова перша допомога",
          items: [
            "**Мозолі:** заклей пластиром одразу, щойно відчув тертя.",
            "**Переохолодження:** переодягнись у сухе, тепле пиття, рухайся.",
            "**Перегрів / сонце:** вода, тінь, головний убір, окуляри.",
            "**Розтягнення:** спокій, фіксація, не навантажуй.",
          ],
        },
        {
          title: "Правила групи",
          items: [
            "Не випереджай лідера й не відставай від замикаючого.",
            "Темп тримаємо за найслабшим — це не змагання.",
            "На розвилках чекаємо одне одного.",
            "Щось болить або тривожить — одразу кажи дорослому.",
          ],
        },
      ],
    },
  },

  /* ============================== ENGLISH ============================== */
  en: {
    ui: {
      docTitle: "In the mountains — hiking checklist & tips",
      htmlLang: "en",
      brand: "In the mountains",
      eyebrow: "Hiking in the mountains · What to pack",
      tagline:
        "Pack your bag right, see what proper gear looks like, routes, and the essentials of safety.",
      day1: "1 day",
      day1sub: "day hike / no overnight",
      day2: "2 days",
      day2sub: "overnight in a tent",
      seasonLabel: "❄️ Winter gear",
      seasonOff: "off · warm season",
      seasonOn: "on · cold season",
      packed: "Packed",
      doneAll: "🎒 Backpack packed — have a great hike!",
      doneMust: "✅ Essentials packed — your backpack will be light!",
      doneOpt: "✅ All optional items checked!",
      reset: "Reset",
      filterLabel: "Filter",
      filterAll: "All",
      filterMust: "Essential",
      filterOpt: "Optional",
      hidePackedLabel: "Hide packed",
      hidePackedHint: "show only what's not packed yet",
      withoutPacked: "without packed",
      optBadge: "opt.",
      catDone: "✓ packed",
      hiddenPrefix: "Hidden: ",
      hiddenOpt: "optional",
      hiddenMust: "essential",
      hiddenPacked: "packed",
      emptyFilter: "Nothing in this filter. Try **All**.",
      emptyAllPacked: "🎒 Everything in this list is packed!",
      stuffTitle: "What gear looks like",
      stuffLead:
        "Not a “nice hoodie”, but the right thing. What matters is the material, not the look.",
      threeLayer:
        "**The three-layer rule.** The base layer wicks moisture away from the body (thermal top). The mid layer keeps you warm (fleece, puffer). The shell protects from wind and rain (membrane). Together they work better than one thick jacket.",
      adviceTitle: "Advice",
      adviceLead:
        "Videos and articles — watch them ahead of time, there's often no signal in the mountains.",
      subVideos: "Videos",
      subArticles: "Articles",
      youtube: "Watch on YouTube →",
      routesTitle: "Services",
      routesLead: "Apps and services for routes, tracking and weather.",
      subFindRoutes: "Where to find & plan",
      safetyTitle: "Safety",
      navGear: "Backpack",
      navStuff: "Gear",
      navAdvice: "Advice",
      navRoutes: "Services",
      navSafety: "Safety",
      exportLabel: "Export",
      resetConfirm: "Clear all checks for this list?",
      noData:
        "Could not load content (data.js). Make sure data.js sits next to index.html.",
    },

    videos: [
      {
        id: "4Y_1A5dYG5E",
        title: "The three-layer clothing system",
        desc: "How the three-layer system works and why it matters in the mountains.",
      },
      {
        id: "LuEPtvK46sE",
        title: "How to adjust and pack a backpack",
        desc: "Adjusting the straps and distributing the weight — so your shoulders and back don't hurt.",
      },
    ],

    articles: [
      {
        title: "What to do if a snake bites you",
        intro: "What to do immediately:",
        steps: [
          {
            t: "Limit movement.",
            d: "Panic and activity (for example, trying to run for help) speed up blood flow, so the venom spreads through the body faster. The casualty should lie down or sit comfortably.",
          },
          {
            t: "Call for help.",
            d: "Call the rescue service (112) or an ambulance (103) right away. Give your coordinates and the casualty's condition. If there's no signal, send someone from the group for help.",
          },
          {
            t: "Free the affected area.",
            d: "Immediately remove rings, watches, bracelets, footwear and tight clothing near the bite, because the limb will start to swell quickly.",
          },
          {
            t: "Immobilize the affected limb.",
            d: "It must stay still. If possible, keep it slightly below heart level to slow the spread of venom. You can apply a light splint, but do not constrict the limb — activity speeds the venom through the body.",
          },
          {
            t: "Treat the wound.",
            d: "Gently rinse the bite with clean water or wipe it with a wet wipe. Apply a clean, loose (sterile, if available) dressing. Do not tie it tightly.",
          },
          {
            t: "Drink plenty of fluids.",
            d: "Give the casualty plenty of clean water in small sips. This helps reduce the concentration of venom in the body.",
          },
          {
            t: "Give an antihistamine.",
            d: "(If needed — or better to skip this step.) If the first-aid kit has antihistamines (for example, Suprastin, Loratadine, Cetrin), give them to the casualty to reduce the risk of a severe allergic reaction.",
          },
        ],
        warnIntro: "What you must NOT do:",
        warnings: [
          {
            t: "Do NOT apply a tourniquet.",
            d: "This is the most common and most dangerous mistake. A tourniquet won't stop the venom but will completely cut off blood supply to the tissue, which can lead to necrosis (tissue death) and the need for amputation.",
          },
          {
            t: "Do NOT suck out the venom.",
            d: "The effectiveness of this method is unproven, and there's a high risk of introducing infection into the wound or poisoning yourself if there are micro-cuts in your mouth.",
          },
          {
            t: "Do NOT cut or cauterize the bite.",
            d: "This only makes the wound worse, causes extra pain and raises the risk of blood infection.",
          },
          {
            t: "Do NOT consume alcohol or coffee.",
            d: "Alcohol speeds up blood flow and strengthens the venom's effect, and coffee puts extra strain on the heart.",
          },
          {
            t: "Do NOT apply ice.",
            d: "This can worsen blood flow at the bite and contribute to tissue death.",
          },
        ],
      },
    ],

    routes: [],

    routeApps: [
      {
        name: "OrganicMaps",
        url: "https://organicmaps.app/",
        tag: "tracking",
        tagType: "track",
        desc: "A phone app for building and tracking routes.",
      },
      {
        name: "Mapy.com",
        url: "https://mapy.com/",
        tag: "tracking",
        tagType: "track",
        desc: "Route tracking and planning. Website and phone app.",
      },
      {
        name: "Carpathian routes",
        url: "https://vpohid.com.ua/routes/",
        tag: "routes",
        tagType: "route",
        desc: "A Ukrainian service with routes and hike descriptions.",
      },
      {
        name: "AllTrails",
        url: "https://www.alltrails.com/",
        tag: "routes",
        tagType: "route",
        desc: "A large database of routes with maps, photos and reviews.",
      },
      {
        name: "propohody.com",
        url: "https://propohody.com/",
        tag: "routes",
        tagType: "route",
        desc: "Route descriptions and useful materials for hikes.",
      },
      {
        name: "Meteoblue",
        url: "https://www.meteoblue.com/en/weather/week/",
        tag: "weather",
        tagType: "weather",
        desc: "Weather forecast for the week — check before you set out.",
      },
    ],

    gearExamples: [
      {
        item: "Base layer",
        layer: "1 · Base layer",
        wrong: "A cotton T-shirt — gets wet from sweat and chills the body.",
        right:
          "A thermal or synthetic T-shirt — wicks moisture away and dries fast.",
      },
      {
        item: "Insulation",
        layer: "2 · Mid layer",
        wrong: "A cotton hoodie or sweater — gets wet and dries slowly.",
        right:
          "A fleece — keeps you warm even when damp and weighs almost nothing.",
      },
      {
        item: "Weather protection",
        layer: "3 · Shell layer",
        wrong: "An ordinary city jacket or an umbrella.",
        right: "A membrane jacket — blocks wind and rain but breathes.",
      },
      {
        item: "Trousers",
        wrong: "Jeans — heavy, cold and very slow to dry.",
        right:
          "Quick-dry trekking trousers (or thermal leggings under shorts).",
      },
      {
        item: "Footwear",
        wrong: "Sneakers or shoes with a smooth sole.",
        right: "Trekking boots/shoes with a grippy sole and ankle support.",
      },
      {
        item: "Socks",
        wrong: "Cotton ones — they chafe and hold moisture.",
        right: "Trekking socks (wool/synthetic) — fewer blisters.",
      },
      {
        item: "Backpack",
        wrong: "A shoulder bag or a backpack without a hip belt.",
        right:
          "A hiking backpack with a hip belt — the weight sits on your hips, not your shoulders.",
      },
      {
        item: "Water",
        wrong: "Carrying a bottle in your hand.",
        right:
          "A hydration bladder or a bottle in a side pocket — hands free, you drink more often.",
      },
    ],

    gear: {
      1: [
        {
          cat: "Must have",
          must: true,
          items: ["Money", "Documents", "Tickets"],
        },
        {
          cat: "Essentials",
          items: [
            "Backpack",
            { n: "Raincover", desc: "rain cover for the backpack" },
          ],
        },
        {
          cat: "Kitchen",
          items: ["Jetboil", "Gas canister", "Spoon", "Thermos", "1 L bottle"],
        },
        {
          cat: "Electronics",
          items: [
            "Power bank",
            "Charging cable",
            { n: "Flashlight", opt: true, desc: "If a long hike is planned" },
          ],
        },
        {
          cat: "Hygiene",
          items: ["Toilet paper / dry wipes", "Wet wipes", "Sunscreen"],
        },
        {
          cat: "Clothes",
          note: "Good to have clothes to travel in and to change before the climb.",
          items: [
            "Thermal top / T-shirt",
            "Fleece",
            "Membrane jacket",
            "Socks",
            { n: "Buff", opt: true },
            { n: "Trousers / shorts", opt: true },
          ],
        },
        {
          cat: "Other",
          items: [
            { n: "Knife", opt: true },
            { n: "Sunglasses", opt: true },
            { n: "Trekking poles", opt: true },
            { n: "Chair / sit pad", opt: true },
            { n: "Rain poncho", opt: true },
          ],
        },
        {
          cat: "Food",
          items: ["Meal — 1", "Bars — 2", "Drip coffee — 1", "Tea — 1"],
        },
        {
          cat: "Winter / spring / autumn",
          season: true,
          items: [
            "Gaiters",
            "Ski trousers",
            "Ski jacket / membrane",
            "Down jacket",
            "Crampons",
            "Snowshoes",
            "Gloves",
            "Hat",
          ],
        },
      ],
      2: [
        {
          cat: "Must have",
          must: true,
          items: ["Money", "Documents", "Tickets"],
        },
        {
          cat: "Essentials",
          items: [
            "Tent",
            "Footprint",
            "Backpack",
            { n: "Raincover", desc: "rain cover for the backpack" },
            "Sleeping bag",
            "Sleeping pad",
            { n: "Sleeping bag liner", opt: true },
            { n: "Electric pump for the pad", opt: true },
            { n: "Pillow", opt: true },
          ],
        },
        {
          cat: "Kitchen",
          items: [
            "Integrated stove system",
            "Gas canister",
            "Spoon",
            "Thermos",
            "1 L bottle",
            { n: "Kitchen bottle 2–5 L", opt: true },
          ],
        },
        {
          cat: "Electronics",
          items: [
            "Power bank",
            "Charging cable",
            "Flashlight",
            { n: "Camp lamp / string lights", opt: true },
          ],
        },
        {
          cat: "Hygiene",
          items: [
            "Toilet paper",
            "Toothbrush",
            "Toothpaste",
            "Dental floss",
            "Wet wipes",
            "Sunscreen",
            { n: "Dry wipes", opt: true },
            { n: "Deodorant", opt: true },
            { n: "Towel", opt: true },
            { n: "Soap", opt: true },
          ],
        },
        {
          cat: "Clothes",
          items: [
            { n: "T-shirt — 1", desc: "worn" },
            { n: "Thermal top — 1", desc: "for the night" },
            { n: "Socks — 2", desc: "worn + next day" },
            { n: "Underwear — 2", desc: "worn + next day" },
            { n: "Shorts", desc: "worn during the day" },
            { n: "Fleece jacket", desc: "for the evening" },
            { n: "Trousers", desc: "for the night" },
            { n: "Windbreaker", desc: "for the evening" },
            { n: "Cap", desc: "worn" },
            { n: "Flip-flops", opt: true },
            { n: "Buff", opt: true },
            { n: "Long johns", opt: true },
          ],
        },
        {
          cat: "Other",
          items: [
            "Lighter / matches",
            "Wood saw",
            "First-aid kit / meds",
            { n: "Rain poncho", opt: true },
            { n: "Knife", opt: true },
            { n: "Trekking poles", opt: true },
            { n: "Trash bag", opt: true },
            { n: "Sunglasses", opt: true },
            { n: "Chair / sit pad", opt: true },
            { n: "Wood hatchet", desc: "small", opt: true },
            { n: "Hammock", opt: true },
            { n: "Music speaker", opt: true },
          ],
        },
        {
          cat: "Food",
          items: [
            "Meals — 3",
            "Tea — 3",
            "Bars",
            { n: "Drip coffee — 1", opt: true },
            { n: "Marshmallows / biscuits / chocolate", opt: true },
            { n: "Nuts", opt: true },
            { n: "Sausages / chicken", desc: "to grill over fire", opt: true },
          ],
        },
        {
          cat: "Winter / spring / autumn",
          season: true,
          items: [
            "Gaiters",
            "Ski trousers",
            "Ski jacket / membrane",
            "Down jacket",
            "Crampons",
            "Snowshoes",
            "Gloves",
            "Hat",
            "Buff",
          ],
        },
      ],
    },

    safety: {
      lead: "The most important things everyone in the group should know.",
      emergency: {
        title: "Emergency numbers",
        numbers: [
          { n: "112", who: "single emergency line" },
          { n: "101", who: "rescue service", alt: true },
        ],
        notes: [
          "Say as precisely as you can **where you are** (mountain name, trail, landmarks, coordinates from your phone).",
          "Save battery: turn off what you don't need, keep the phone warm.",
        ],
      },
      cards: [
        {
          title: "If you get lost or fall behind",
          items: [
            "**Stop and don't panic.** Wandering randomly is worse than staying put.",
            "Stay on the trail and in an open spot, call the leader or 112.",
            "Signal: with your voice, a whistle, bright clothing.",
            "Don't head down blindly into unfamiliar terrain, especially in fog or at dusk.",
          ],
        },
        {
          title: "Basic first aid",
          items: [
            "**Blisters:** put a plaster on as soon as you feel rubbing.",
            "**Hypothermia:** change into dry clothes, warm drink, keep moving.",
            "**Overheating / sun:** water, shade, a hat, sunglasses.",
            "**Sprains:** rest, support, don't load it.",
          ],
        },
        {
          title: "Group rules",
          items: [
            "Don't get ahead of the leader or fall behind the sweep.",
            "We keep the pace of the slowest — it's not a race.",
            "We wait for each other at junctions.",
            "If something hurts or worries you — tell an adult right away.",
          ],
        },
      ],
    },
  },
};
