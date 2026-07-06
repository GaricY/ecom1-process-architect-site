(function () {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const progressBar = $("#progressBar");
  const navToggle = $("#navToggle");
  const navList = $("#navList");
  const navLinks = $$("[data-nav]");
  const sections = $$("main section[id]");
  const screenTabs = $$("[data-screen-src]");
  const screenImage = $("#screenImage");
  const screenCaption = $("#screenCaption");
  const lineButtons = $$("[data-line]");
  const lineDetail = $("#lineDetail");
  const langButtons = $$("[data-lang]");

  const lineDetails = {
    ru: {
      "1": {
        label: "Строка 1",
        title: "Makita drill kit: exact match",
        body: "Описание и свойства совпали с каталогом. В филиале on_hand=1 и reserved=1, поэтому available_today=0 и short_qty=9."
      },
      "2": {
        label: "Строка 2",
        title: "Einhell mower body: exact match",
        body: "Competitor code не используется как SKU. Агент сопоставил строку по описанию и свойствам, затем посчитал нулевую доступность на сегодня."
      },
      "3": {
        label: "Строка 3",
        title: "Einhell mower kit 2x4.0Ah: exact match",
        body: "Вторая похожая mower-строка не склеивается с предыдущей: это другой комплект, поэтому она идет отдельной строкой отчета."
      },
      "4": {
        label: "Строка 4",
        title: "3M safety glasses: property_mismatch",
        body: "В OCR указано protection_type=face, а в каталоге для найденного товара eye. Policy запрещает подстановку похожего товара, поэтому строка идет в отчет без SKU и с нулевым fulfillable quantity."
      },
      "5": {
        label: "Строка 5",
        title: "Bosch dust-control bundle: exact match",
        body: "Товар найден точно. На сегодня доступно 2 штуки, запрос был на 7, поэтому fulfillable_qty=2 и short_qty=5."
      },
      "6": {
        label: "Строка 6",
        title: "DeWalt circular saw: exact match",
        body: "Описание и свойства совпали, но same-day stock отсутствует. Строка остается exact, а причина в отчете - insufficient same-day stock."
      }
    },
    en: {
      "1": {
        label: "Line 1",
        title: "Makita drill kit: exact match",
        body: "Description and properties match the catalog. The branch has on_hand=1 and reserved=1, so available_today=0 and short_qty=9."
      },
      "2": {
        label: "Line 2",
        title: "Einhell mower body: exact match",
        body: "The competitor code is not treated as a SKU. The agent matches by description and properties, then computes zero same-day availability."
      },
      "3": {
        label: "Line 3",
        title: "Einhell mower kit 2x4.0Ah: exact match",
        body: "The second mower line is not merged with the previous one: it is a different kit, so it remains a separate report row."
      },
      "4": {
        label: "Line 4",
        title: "3M safety glasses: property_mismatch",
        body: "The OCR says protection_type=face, while the matched catalog product has eye. Policy forbids substituting a similar item, so the report leaves SKU blank and sets fulfillable quantity to zero."
      },
      "5": {
        label: "Line 5",
        title: "Bosch dust-control bundle: exact match",
        body: "The product is matched exactly. The branch can fulfill 2 units today out of the requested 7, so fulfillable_qty=2 and short_qty=5."
      },
      "6": {
        label: "Line 6",
        title: "DeWalt circular saw: exact match",
        body: "Description and properties match, but same-day stock is unavailable. The row remains exact and the report reason is insufficient same-day stock."
      }
    }
  };

  const COPY = {
    ru: {
      meta: {
        title: "Process Architect - агент для BitGN ECOM1",
        description: "Русский лендинг Process Architect: агент для BitGN ECOM1, который ведет операционный мануал как версионируемую карту бизнес-процессов."
      },
      skip: "К содержанию",
      navAria: "Разделы страницы",
      navToggle: "Разделы",
      nav: {
        contest: "Конкурс",
        examples: "Задачи",
        results: "Результаты",
        ocr: "Разбор задачи",
        process: "Process Architect",
        attention: "Сигнал",
        "pa-fix": "Эволюция",
        architecture: "Устройство"
      },
      hero: {
        eyebrow: "BitGN ECOM1 / business process execution",
        lede: "BitGN ECOM1 — это симуляция операционной системы e-commerce бизнеса. Система автоматизирует back-office процессы магазина. Вместо монолитного промпта — карта бизнес-процессов, которая версионируется как код.",
        resultAria: "Ключевые результаты",
        resultSpans: ["Accuracy", "Ultimate", "Score", "Postmortem"],
        resultStrong: ["11-е место", "15-е место", "73.2/100", "93.5/100"],
        resultSmall: ["Hall of Fame", "Hall of Fame", "официальный слепой PROD", "после работы над ошибками и одного раунда эволюции"]
      },
      contest: {
        eyebrow: "Соревнование",
        title: "Что такое BitGN ECOM1",
        p1: `<a href="https://bitgn.com/challenge/ecom">BitGN Agent Challenge</a> - серия соревнований, где автономные агенты решают задачи внутри детерминированных симуляций реального бизнеса. Выпуск ECOM1 посвящен операционной системе интернет-магазина: агент ищет товары, проверяет остатки, собирает корзины, проводит checkout, восстанавливает 3DS-платежи, разбирает возвраты и прикладывает ссылки-доказательства.`,
        p2: `Среда устроена как Unix-подобная система. На верхнем уровне изолированы: <code>/AGENTS.md</code> (локальные правила), <code>/docs</code> (политики бизнеса), <code>/proc</code> (состояние магазина) и <code>/bin</code> (разрешенные утилиты). Агент должен вывести доменное знание из этого живого мира.`,
        system: [
          "Локальные правила запуска и точный формат финального ответа.",
          "Политики: безопасность, скидки, возвраты, 3DS, crosslist.",
          "Состояние бизнеса: товары, магазины, корзины, платежи, сотрудники.",
          "Разрешенные утилиты, которыми агент действует и проверяет факты.",
          "Оцениваются outcome, message, refs и фактические изменения состояния."
        ],
        pipelineAria: "Как оценивается задача BitGN",
        pipelineTitles: ["Задача", "Действия агента", "Финальный ответ", "Score"],
        pipelineTexts: [
          "Пользователь просит выполнить операцию магазина или создать артефакт.",
          "Агент читает правила, политики и записи бизнеса, затем действует через инструменты.",
          `<code>outcome</code>, текст ответа и <code>refs</code> на доказательства.`,
          "Грейдер проверяет наблюдаемый результат: состояние, формат и ссылки."
        ],
        runMode: [
          "На DEV виден score, поэтому можно читать трейсы и эволюционировать процессы.",
          "В зачете PROD заранее не виден, а во время прогона нет task-level feedback."
        ]
      },
      examples: {
        eyebrow: "Примеры задач",
        title: "Запросы выглядят как обычная работа магазина",
        p: "Запросы поступают в естественном виде: с нечеткими названиями, исключениями, чужими кодами и скрытыми требованиями к формату ответа. Агент должен следовать правилам, которые разбросаны по инструкциям, политикам и данным бизнеса.",
        labels: ["Наличие товара", "Скан заявки -> отчет"],
        cards: [
          `В одной фразе: нечёткое название товара, исключение, нечёткое название филиала и порог количества. Ответ: <code>OUTCOME_OK</code>, <code>FALSE(2)</code> и refs на магазин, товар и policy.`,
          "На входе зашумленный OCR чужой заявки. На выходе готовый TSV: сопоставленные SKU, остатки, причины дефицита и refs. Этот пример разбирается ниже как работа агента под капотом."
        ]
      },
      results: {
        eyebrow: "Результаты",
        title: "Официальный зачет и postmortem",
        p1: "Официальный слепой PROD принес 11-е место (Accuracy). Подход с картой процессов доказал свою состоятельность, однако оценку снизили досадные ошибки реализации: один логический баг (стоивший 5-7 баллов), слишком глубоко спрятанный контроль prompt injections и шероховатости в сборке финального ответа (refs).",
        p2: "Postmortem-запуски демонстрируют, на что архитектура способна без этих недочетов. Исправление ошибок и чистая адаптация к PROD дали результат близкий к призёрам. А запуск всего одного раунда PA-эволюции — возможности, которой не было в слепом окне, — вывел систему на уровень 93.5/100.",
        cardSpans: ["Hall of Fame", "Postmortem DEV", "Адаптация к PROD", "Postmortem PROD eval"],
        cardTexts: [
          "Официальный слепой PROD: Accuracy 11-е, Ultimate 15-е.",
          "Рефакторинг и работа над ошибками в DEV.",
          "Если бы в коде не было ошибок.",
          "Один раунд эволюции."
        ],
        screenAria: "Скриншоты результатов",
        screens: {
          accuracy: {
            label: "Accuracy",
            alt: "Hall of Fame Accuracy: Process Architect на 11-м месте с 73.2/100",
            caption: "Официальный Accuracy Hall of Fame: 11-е место, 73.2/100."
          },
          ultimate: {
            label: "Ultimate",
            alt: "Hall of Fame Ultimate: Process Architect на 15-м месте",
            caption: "Официальный Ultimate Hall of Fame: 15-е место."
          },
          dev: {
            label: "DEV",
            alt: "Postmortem DEV: 54.8 из 55",
            caption: "Postmortem DEV: почти полный проход после исправлений."
          },
          prod: {
            label: "PROD",
            alt: "Postmortem PROD: 0.81 на 100 задач",
            caption: "Postmortem PROD: проверка адаптации на PROD-среде."
          },
          prodEval: {
            label: "PROD eval",
            alt: "Postmortem PROD eval: 93.5/100",
            caption: "Postmortem PROD eval: один раунд эволюции поднял результат выше 90."
          }
        }
      },
      ocr: {
        eyebrow: "Работа агента под капотом",
        title: "Как агент разбирает скан заявки и создает отчет",
        p: "Современный агент способен выполнять полноценный back-office процесс в живой бизнес-системе. На входе — зашумленный скан чужой заявки (competitor codes), на выходе — готовый TSV-отчет с расчетом дефицита на основе политик.",
        meta: ["задача t076", "business_process: purchase_request_crosslist", "score: 1.0", "duration: 245 sec"],
        target: "PowerTools target branch:",
        memo: "Memo: competitor codes are not PowerTools SKUs.",
        stepTitles: ["Read", "Resolve branch", "Match products", "Write artifact"],
        stepTexts: [
          `Открывает OCR и <code>/docs/purchase-request-crosslist.md</code>.`,
          `Находит <code>/proc/locations/Innsbruck/store-innsbruck-ost.json</code>, <code>is_open=true</code>.`,
          "Не принимает competitor codes за SKU, сверяет описание и каждое свойство.",
          `<span>Считает </span><code>available_today = max(on_hand - reserved, 0)</code><span> и пишет TSV.</span>`
        ],
        lineSmall: [
          "avail 0 / short 9",
          "avail 0 / short 2",
          "avail 0 / short 7",
          "face в OCR, eye в каталоге",
          "avail 2 / short 5",
          "avail 0 / short 9"
        ]
      },
      process: {
        eyebrow: "Зачем нужен Process Architect",
        title: "Если агент уже умеет работать, его процессы нужно поддерживать",
        p: "Если агент уже умеет делать операционную работу, возникает проблема поддержки: как обновлять инструкции, когда схемы БД, форматы и бизнес-правила меняются? Решение — декомпозиция. Инструкции разбиты на immutable-версии процессов (process units), а Process Architect анализирует провалы и выпускает новые версии.",
        texts: [
          `Версионированные инструкции: <code>checkout</code>, <code>returns</code>, <code>3DS</code>, <code>refs</code>, <code>submission_terminal</code>.`,
          "Выбирает нужные версии под задачу и прикладывает attention, если политика или инструмент изменились.",
          "Решает задачу по отрендеренному мануалу и текущим данным бизнеса.",
          "Анализирует провалы и изменения правил, пишет новые immutable-версии процессов."
        ]
      },
      refresh: {
        title: "Процессы догоняют изменившуюся среду",
        p: "Это тяжелая миграция, которую запускают при радикальном изменении среды: например, перед переносом из DEV-песочницы в слепое PROD-окно. Process Architect сравнивает текущие инструкции с новой средой: какие документы появились, какие файлы переехали, какие утилиты исчезли или сменили контракт. PA работает не с общим changelog, а с подсвеченными diff-фрагментами рядом с теми process units, которых они касаются.",
        cardTitles: ["Что изменилось в среде", "Resolver связывает diff с картой процессов", "Так родился процесс для OCR-задачи"],
        linkLabels: ["new domain", "basket lifecycle", "returns", "terminal protocol"],
        routingText: "Не затронутые юниты остаются без текстового патча: меняются только dependency hashes, чтобы resolver не считал их устаревшими.",
        stripLabels: ["routing rebuilt", "schema moved", "no content change"],
        stripTexts: [
          "Добавил новые маршруты: availability/inventory, dispatch planning и purchase-request crosslist.",
          `Переехал с <code>/proc/baskets</code> на <code>/proc/carts</code> и убрал SQL из процесса.`,
          `Текст процесса не менялся: PA только пере-привязал dependency hash к обновленному <code>/AGENTS.md</code>.`
        ]
      },
      attention: {
        title: "Политика изменилась - агент получает сигнал",
        p: `Attention - легкая подстройка на лету, без пересборки всего мануала. Оркестратор сверяет текущие файлы с базлайном по sha256-хэшам, а Resolver собирает точный dependency-aware diff для затронутого процесса. Если <code>/docs/payments/3ds.md</code> меняет лимит попыток с 2 на 3, Executor видит Heads-up прямо внутри <code>payments_3ds_recovery</code> и действует по актуальной policy.`,
        excerptLabel: "Фрагмент процесса payments_3ds_recovery.md",
        alertTitle: "Heads-up внутри процесса",
        alertText: "Этот процесс мог устареть: файлы, против которых он был написан, изменились. Если текст процесса расходится с актуальной policy, агент доверяет актуальной policy.",
        excerptText: "Ниже идут обычные проверки 3DS recovery, но лимит попыток уже берется из обновленного документа.",
        trace: "Перед вызовом инструмента восстановления агент проходит gate trace: проверяет право пользователя, состояние корзины, состояние платежа, новый лимит попыток и только потом делает mutating action.",
        final: "В успешной задаче t083 финальный ответ уже использовал обновленное правило: \"1 of 3 attempts used\". Score: 1.0."
      },
      paFix: {
        title: "Маленький patch в правильном слое",
        p: `PA-fix - это эволюция после ответа грейдера: когда уже есть score, сообщение об ошибке и лог действий агента, Process Architect ищет владеющий слой и выпускает новую immutable-версию процесса. В одной задаче агент должен был ответить yes/no в формате, заданном текущими правилами запуска. Он вернул старый токен <code>TRUE(1)</code>, а грейдер ждал <code>ja</code>. Проблема была не ошибкой нейросети, а архитектурной недоработкой: правила финальной отправки просочились в routing index. Маршрутизатор <code>bp_index</code> захардкодил старый токен ответа, в то время как форматированием должен управлять только терминал отправки, читающий актуальный <code>/AGENTS.md</code>.`,
        spans: ["Что сломалось", "Диагноз", "Владелец"],
        titles: ["Answer should be \"ja\"", "terminal_protocol leak into bp_index", "submission_terminal"],
        texts: [
          `Эмитнулся <code>TRUE(1)</code>. Это не частный немецкий случай: любой yes/no token должен читаться из live <code>/AGENTS.md</code>.`,
          `<code>bp_index</code> должен выбирать процесс и outcome, а не хранить literal финального ответа.`,
          "Формат финального ответа принадлежит terminal-юниту, который читает актуальные правила перед отправкой."
        ],
        layer: ["источник live token", "форматирует финальный message", "маршрутизирует к процессу и outcome"]
      },
      architecture: {
        eyebrow: "Как устроено внутри",
        title: "Процессы можно поддерживать как код",
        p: "В проекте нет набора хардкодов под конкретные задачи. Есть короткие инструкции для классов операций, механизм выбора нужных инструкций под задачу и отдельный агент, который выпускает новые версии, когда правила или поведение оказываются неверными.",
        texts: [
          "Небольшая инструкция для одного класса операций: checkout, возвраты, 3DS, refs, формат ответа.",
          "Выбирает, какие инструкции нужны для конкретной задачи, и прикладывает предупреждения об изменившихся политиках.",
          "Решает задачу по выбранному мануалу: читает файлы, вызывает инструменты, проверяет состояние после действия.",
          "Разбирает провалы и изменения среды, затем выпускает новую immutable-версию инструкции с diff и rationale."
        ],
        stripTitle: "Обновление среды",
        stripText: `Когда меняются политики, утилиты или схема данных, resolver сначала подсвечивает это исполнителю, а Process Architect затем обновляет затронутые инструкции. Фикс не переписывает историю: появляется новая папка <code>vNNNN/</code> с manifest, diff, rationale и rollback.`
      },
      footer: {
        name: "Игорь Ласийчук",
        bio: "15 лет внедрения Dynamics AX (Axapta) в компаниях различных отраслей: разработчик, архитектор. Последнее время - Java Tech-lead.",
        aria: "Ссылки",
        links: ["BitGN ECOM1", "GitHub / README_RU", "Описание архитектуры", "LinkedIn"],
        hrefs: [
          "https://bitgn.com/challenge/ecom",
          "https://github.com/GaricY/ecom1-process-architect/blob/postmortem-prod/README_RU.md",
          "https://github.com/GaricY/ecom1-process-architect/blob/postmortem-prod/ARCHITECTURE_RU.md",
          "https://www.linkedin.com/in/igor-lasiychuk/"
        ]
      }
    },
    en: {
      meta: {
        title: "Process Architect - BitGN ECOM1",
        description: "Process Architect landing page for BitGN ECOM1: business-process execution with a versioned process map instead of a monolithic prompt."
      },
      skip: "Skip to content",
      navAria: "Page sections",
      navToggle: "Sections",
      nav: {
        contest: "Challenge",
        examples: "Tasks",
        results: "Results",
        ocr: "Task walkthrough",
        process: "Process Architect",
        attention: "Signal",
        "pa-fix": "Evolution",
        architecture: "Architecture"
      },
      hero: {
        eyebrow: "BitGN ECOM1 / business process execution",
        lede: "BitGN ECOM1 is a simulated operating system for an e-commerce business. It automates the store's back-office processes. Instead of relying on a monolithic prompt, it uses a business-process map versioned as code.",
        resultAria: "Key results",
        resultSpans: ["Accuracy", "Ultimate", "Score", "Postmortem"],
        resultStrong: ["11th place", "15th place", "73.2/100", "93.5/100"],
        resultSmall: ["Hall of Fame", "Hall of Fame", "official blind PROD run", "after bug fixes and one evolution round"]
      },
      contest: {
        eyebrow: "Competition",
        title: "What BitGN ECOM1 Is",
        p1: `<a href="https://bitgn.com/challenge/ecom">The BitGN Agent Challenge</a> is a series of competitions where autonomous agents solve tasks within deterministic simulations of real-world businesses. The ECOM1 challenge focuses on the operating system of an online store: the agent searches for products, checks inventory levels, assembles shopping carts, processes checkout, recovers 3DS payments, handles returns, and provides refs as evidence.`,
        p2: `The environment is structured as a Unix-like system. The top-level directories are isolated: <code>/AGENTS.md</code> for local rules, <code>/docs</code> for business policies, <code>/proc</code> for store state, and <code>/bin</code> for allowed utilities. The agent must extract domain knowledge directly from this live environment.`,
        system: [
          "Local run rules and the exact final answer format.",
          "Policies: security, discounts, returns, 3DS, crosslist.",
          "Business state: products, stores, baskets, payments, staff.",
          "Allowed utilities the agent uses to act and verify facts.",
          "The grader checks outcome, message, refs, and actual state changes."
        ],
        pipelineAria: "How a BitGN task is scored",
        pipelineTitles: ["Task", "Agent actions", "Final response", "Score"],
        pipelineTexts: [
          "The user requests a store operation or the creation of an artifact.",
          "The agent reads the rules, policies, and business records, then executes actions using the provided tools.",
          `The response includes the <code>outcome</code>, message, and evidence <code>refs</code>.`,
          "The grader verifies the observable result: final state, format, and references."
        ],
        runMode: [
          "In DEV, the score is visible, allowing traces to be inspected and processes to evolve.",
          "In blind PROD, the score is hidden, and there is no task-level feedback during the run."
        ]
      },
      examples: {
        eyebrow: "Task examples",
        title: "Requests Mimic Real Store Operations",
        p: "Requests arrive in natural language, complete with fuzzy product names, exceptions, competitor codes, and implicit formatting requirements. The agent must strictly follow rules scattered across instructions, policies, and business data.",
        labels: ["Product availability", "Scan -> report"],
        cards: [
          `A single phrase contains a fuzzy product name, an exception, a fuzzy branch name, and a quantity threshold. The expected output is <code>OUTCOME_OK</code>, <code>FALSE(2)</code>, along with refs to the store, product, and policy.`,
          "Input: noisy OCR text from a competitor purchase request. Output: a ready-to-use TSV crosslist report with matched SKUs, inventory levels, shortage reasons, and refs. This example is detailed below as a walkthrough of the agent's execution."
        ]
      },
      results: {
        eyebrow: "Results",
        title: "Official Score and Postmortem",
        p1: "The official blind PROD run secured 11th place in Accuracy. The process-map approach proved viable, but the final score was impacted by a few implementation flaws: a logic bug costing roughly 5-7 points, prompt-injection controls buried too deep, and edge cases in final output assembly around refs.",
        p2: "Postmortem evaluations show what the architecture can do without those defects. Fixing the bugs and cleanly adapting to the PROD environment yielded 80.8/100. Running one evolution round, a feature unavailable during the blind window, pushed the system to 93.5/100.",
        cardSpans: ["Hall of Fame", "Postmortem DEV", "PROD adaptation", "Postmortem PROD eval"],
        cardTexts: [
          "Official blind PROD: Accuracy 11th, Ultimate 15th.",
          "Refactoring and bug fixing in DEV.",
          "If the code had no bugs.",
          "One evolution round."
        ],
        screenAria: "Result screenshots",
        screens: {
          accuracy: {
            label: "Accuracy",
            alt: "Hall of Fame Accuracy: Process Architect in 11th place with 73.2/100",
            caption: "Official Accuracy Hall of Fame: 11th place, 73.2/100."
          },
          ultimate: {
            label: "Ultimate",
            alt: "Hall of Fame Ultimate: Process Architect in 15th place",
            caption: "Official Ultimate Hall of Fame: 15th place."
          },
          dev: {
            label: "DEV",
            alt: "Postmortem DEV: 54.8 out of 55",
            caption: "Postmortem DEV: almost a full pass after fixes."
          },
          prod: {
            label: "PROD",
            alt: "Postmortem PROD: 0.81 across 100 tasks",
            caption: "Postmortem PROD: adaptation check against the PROD environment."
          },
          prodEval: {
            label: "PROD eval",
            alt: "Postmortem PROD eval: 93.5/100",
            caption: "Postmortem PROD eval: one evolution round pushed the result above 90."
          }
        }
      },
      ocr: {
        eyebrow: "Agent work under the hood",
        title: "How the Agent Parses an Order Scan and Generates a Report",
        p: "A modern agent can execute an end-to-end back-office process within a live business system. It takes a noisy scan of a third-party request with competitor codes as input, and outputs a ready-to-use TSV report that calculates inventory shortages based on internal policies.",
        meta: ["task t076", "business_process: purchase_request_crosslist", "score: 1.0", "duration: 245 sec"],
        target: "PowerTools target branch:",
        memo: "Memo: competitor codes are not PowerTools SKUs.",
        stepTitles: ["Read", "Resolve branch", "Match products", "Write artifact"],
        stepTexts: [
          `Opens the OCR file and <code>/docs/purchase-request-crosslist.md</code>.`,
          `Locates <code>/proc/locations/Innsbruck/store-innsbruck-ost.json</code> and checks that <code>is_open=true</code>.`,
          "Distinguishes competitor codes from internal SKUs by cross-referencing descriptions and specific attributes.",
          `Calculates <code>available_today = max(on_hand - reserved, 0)</code> and writes the TSV file.`
        ],
        lineSmall: [
          "avail 0 / short 9",
          "avail 0 / short 2",
          "avail 0 / short 7",
          "face in OCR, eye in catalog",
          "avail 2 / short 5",
          "avail 0 / short 9"
        ]
      },
      process: {
        eyebrow: "Why Process Architect",
        title: "If the Agent Can Do the Work, Its Processes Need Maintenance",
        p: "Once the agent can perform operational work, a maintenance problem appears: how do you update instructions when database schemas, formats, and business rules change? The answer is decomposition. Instructions are split into immutable process-unit versions, and Process Architect analyzes failures and publishes new versions.",
        texts: [
          `Versioned instructions: <code>checkout</code>, <code>returns</code>, <code>3DS</code>, <code>refs</code>, <code>submission_terminal</code>.`,
          "Selects the required versions for the task and attaches an Attention note when a policy or tool has changed.",
          "Solves the task from the rendered manual and current business data.",
          "Analyzes failures and rule changes, then writes new immutable process versions."
        ]
      },
      refresh: {
        title: "Processes Catch Up with a Changed Environment",
        p: "This is the heavier path for major environment changes, for example moving from the DEV sandbox into the blind PROD window. Process Architect compares current instructions with the new environment: which documents appeared, which files moved, which utilities disappeared or changed their interface. PA does not work from a generic changelog; it receives highlighted diff fragments next to the affected process units.",
        cardTitles: ["What changed in the environment", "Resolver links diffs to the process map", "How the OCR process was born"],
        linkLabels: ["new domain", "basket lifecycle", "returns", "terminal protocol"],
        routingText: "Unaffected units keep their text unchanged: only dependency hashes change so the resolver does not treat them as stale.",
        stripLabels: ["routing rebuilt", "schema moved", "no content change"],
        stripTexts: [
          "Added new routes: availability/inventory, dispatch planning, and purchase-request crosslist.",
          `Moved from <code>/proc/baskets</code> to <code>/proc/carts</code> and removed SQL from the process.`,
          `The process text did not change: PA only updated the dependency hash for the refreshed <code>/AGENTS.md</code>.`
        ]
      },
      attention: {
        title: "Policy Changed: the Agent Gets a Signal",
        p: `Attention is a lightweight runtime adjustment, without rebuilding the whole manual. The orchestrator compares current files with the baseline using SHA-256 hashes, and the Resolver builds a precise dependency-aware diff for the affected process. If <code>/docs/payments/3ds.md</code> changes the attempt limit from 2 to 3, the Executor sees a Heads-up directly inside <code>payments_3ds_recovery</code> and follows the current policy.`,
        excerptLabel: "Excerpt from payments_3ds_recovery.md",
        alertTitle: "Heads-up inside the process",
        alertText: "This process may be stale: the files it depends on have changed. If the process text conflicts with the current policy, the agent follows the current policy.",
        excerptText: "The normal 3DS recovery checks continue below, but the attempt limit now comes from the updated document.",
        trace: "Before calling the recovery tool, the agent runs through the gate checks: user entitlement, basket state, payment state, updated attempt limit, then the state-changing action.",
        final: "In successful task t083, the final answer already used the updated rule: \"1 of 3 attempts used\". Score: 1.0."
      },
      paFix: {
        title: "A Small Patch in the Right Layer",
        p: `PA-fix is an evolution step after grader feedback: once there is a score, an error message, and the agent action log, Process Architect finds the owning layer and publishes a new immutable process version. In one task the agent had to answer yes/no in the format required by the current run rules. It returned the old token <code>TRUE(1)</code>, while the grader expected <code>ja</code>. The issue was not a model error but an architectural defect: final-submission rules had leaked into the routing index. The <code>bp_index</code> router had hardcoded an old answer token, while only the submission terminal should own formatting by reading the current <code>/AGENTS.md</code>.`,
        spans: ["What broke", "Diagnosis", "Owner"],
        titles: ["Answer should be \"ja\"", "terminal protocol leaked into bp_index", "submission_terminal"],
        texts: [
          `The agent emitted <code>TRUE(1)</code>. This is not a one-off German locale case: any yes/no token must be read from the live <code>/AGENTS.md</code>.`,
          `<code>bp_index</code> should select the process and outcome, not store the literal final answer.`,
          "The final answer format belongs to the terminal unit, which reads the current rules before submission."
        ],
        layer: ["source of the live token", "formats the final message", "routes to process and outcome"]
      },
      architecture: {
        eyebrow: "How it works inside",
        title: "Processes Can Be Maintained Like Code",
        p: "The project is not a bundle of hardcodes for specific tasks. It has short instructions for classes of operations, a mechanism for selecting the required instructions for a task, and a separate agent that publishes new versions when rules or behavior are wrong.",
        texts: [
          "A small instruction for one class of operations: checkout, returns, 3DS, refs, answer format.",
          "Selects which instructions are needed for a specific task and attaches warnings about changed policies.",
          "Solves the task from the selected manual: reads files, calls tools, verifies post-state.",
          "Analyzes failures and environment changes, then publishes a new immutable instruction version with diff and rationale."
        ],
        stripTitle: "Environment update",
        stripText: `When policies, utilities, or data schemas change, the resolver first highlights the change for the Executor, and Process Architect updates the affected instructions. A fix does not rewrite history: a new <code>vNNNN/</code> folder appears with manifest, diff, rationale, and rollback.`
      },
      footer: {
        name: "Igor Lasiychuk",
        bio: "15 years implementing Dynamics AX (Axapta) across industries as a developer and architect. Most recently: Java Tech Lead.",
        aria: "Links",
        links: ["BitGN ECOM1", "GitHub / README", "Architecture", "LinkedIn"],
        hrefs: [
          "https://bitgn.com/challenge/ecom",
          "https://github.com/GaricY/ecom1-process-architect/",
          "https://github.com/GaricY/ecom1-process-architect/blob/postmortem-prod/ARCHITECTURE.md",
          "https://www.linkedin.com/in/igor-lasiychuk/"
        ]
      }
    }
  };

  const screenOrder = ["accuracy", "ultimate", "dev", "prod", "prodEval"];
  let currentLang = "en";

  function updateProgress() {
    if (!progressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(1, scrollTop / maxScroll) : 0;
    progressBar.style.width = `${Math.round(progress * 100)}%`;
  }

  function updateActiveNav() {
    const headerOffset = 96;
    const scrollPosition = window.scrollY + headerOffset;
    let activeId = "";

    sections.forEach((section) => {
      if (section.offsetTop <= scrollPosition) {
        activeId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${activeId}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function updateChrome() {
    updateProgress();
    updateActiveNav();
  }

  function setText(selector, value, root = document) {
    const node = $(selector, root);
    if (node && value !== undefined) node.textContent = value;
  }

  function setHTML(selector, value, root = document) {
    const node = $(selector, root);
    if (node && value !== undefined) node.innerHTML = value;
  }

  function setAttr(selector, attr, value, root = document) {
    const node = $(selector, root);
    if (node && value !== undefined) node.setAttribute(attr, value);
  }

  function setTextList(selector, values) {
    $$(selector).forEach((node, index) => {
      if (values[index] !== undefined) node.textContent = values[index];
    });
  }

  function setHTMLList(selector, values) {
    $$(selector).forEach((node, index) => {
      if (values[index] !== undefined) node.innerHTML = values[index];
    });
  }

  function getInitialLang() {
    const params = new URLSearchParams(window.location.search);
    return params.get("lang") === "ru" ? "ru" : "en";
  }

  function activeLine() {
    const active = $(".line-chip.is-active");
    return active ? active.dataset.line : "4";
  }

  function updateScreenCopy(copy) {
    const screens = copy.results.screens;
    screenTabs.forEach((tab, index) => {
      const screen = screens[screenOrder[index]];
      if (!screen) return;
      tab.textContent = screen.label;
      tab.dataset.screenAlt = screen.alt;
      tab.dataset.screenCaption = screen.caption;
      if (tab.classList.contains("is-active") && screenImage && screenCaption) {
        screenImage.alt = screen.alt;
        screenCaption.textContent = screen.caption;
      }
    });
  }

  function updateLineCopy(copy) {
    $$(".line-chip small").forEach((node, index) => {
      if (copy.ocr.lineSmall[index] !== undefined) node.textContent = copy.ocr.lineSmall[index];
    });
    renderLineDetail(activeLine());
  }

  function applyCopy(lang) {
    const copy = COPY[lang] || COPY.en;
    currentLang = COPY[lang] ? lang : "en";

    document.documentElement.lang = currentLang;
    document.title = copy.meta.title;
    setAttr("meta[name='description']", "content", copy.meta.description);

    setText(".skip-link", copy.skip);
    setAttr(".site-nav", "aria-label", copy.navAria);
    setText("#navToggle > span:first-child", copy.navToggle);

    navLinks.forEach((link) => {
      const key = (link.getAttribute("href") || "").replace("#", "");
      if (copy.nav[key]) link.textContent = copy.nav[key];
    });

    setText(".hero .eyebrow", copy.hero.eyebrow);
    setText(".hero-lede", copy.hero.lede);
    setAttr(".result-strip", "aria-label", copy.hero.resultAria);
    setTextList(".result-pill span", copy.hero.resultSpans);
    setTextList(".result-pill strong", copy.hero.resultStrong);
    setTextList(".result-pill small", copy.hero.resultSmall);

    setText("#contest .eyebrow", copy.contest.eyebrow);
    setText("#contest-title", copy.contest.title);
    setHTML("#contest .section-head p:nth-of-type(2)", copy.contest.p1);
    setHTML("#contest .section-head p:nth-of-type(3)", copy.contest.p2);
    setTextList("#contest .system-card p", copy.contest.system);
    setAttr(".bitgn-pipeline", "aria-label", copy.contest.pipelineAria);
    setTextList(".bitgn-pipeline b", copy.contest.pipelineTitles);
    setHTMLList(".bitgn-pipeline p", copy.contest.pipelineTexts);
    setTextList(".run-mode p", copy.contest.runMode);

    setText("#examples .eyebrow", copy.examples.eyebrow);
    setText("#examples-title", copy.examples.title);
    setText("#examples .section-head p:nth-of-type(2)", copy.examples.p);
    setTextList("#examples .task-label", copy.examples.labels);
    setHTMLList("#examples .task-card p", copy.examples.cards);

    setText("#results .eyebrow", copy.results.eyebrow);
    setText("#results-title", copy.results.title);
    setText("#results .section-head p:nth-of-type(2)", copy.results.p1);
    setText("#results .section-head p:nth-of-type(3)", copy.results.p2);
    setTextList("#results .score-card span", copy.results.cardSpans);
    setTextList("#results .score-card p", copy.results.cardTexts);
    setAttr(".screen-tabs", "aria-label", copy.results.screenAria);
    updateScreenCopy(copy);

    setText("#ocr .eyebrow", copy.ocr.eyebrow);
    setText("#ocr-title", copy.ocr.title);
    setText("#ocr .section-head p:nth-of-type(2)", copy.ocr.p);
    setTextList(".trial-meta span", copy.ocr.meta);
    setHTML(".ocr-paper > p:first-of-type", `${copy.ocr.target} <mark>PowerTools Innsbruck Ost</mark>`);
    setText(".ocr-paper .memo", copy.ocr.memo);
    setTextList(".step-card b", copy.ocr.stepTitles);
    setHTMLList(".step-card p", copy.ocr.stepTexts);
    updateLineCopy(copy);

    setText("#process .eyebrow", copy.process.eyebrow);
    setText("#process-title", copy.process.title);
    setText("#process .section-head p:nth-of-type(2)", copy.process.p);
    setHTMLList(".process-map p", copy.process.texts);

    setText("#world-refresh-title", copy.refresh.title);
    setText("#world-refresh .section-head p:nth-of-type(2)", copy.refresh.p);
    setTextList(".refresh-card > b", copy.refresh.cardTitles);
    setTextList(".refresh-links em", copy.refresh.linkLabels);
    setText(".refresh-card:nth-child(2) > p", copy.refresh.routingText);
    setTextList(".refresh-strip span", copy.refresh.stripLabels);
    setHTMLList(".refresh-strip p", copy.refresh.stripTexts);

    setText("#attention-title", copy.attention.title);
    setHTML("#attention .section-head p:nth-of-type(2)", copy.attention.p);
    setText(".process-excerpt > span", copy.attention.excerptLabel);
    setText(".process-alert b", copy.attention.alertTitle);
    setText(".process-alert p", copy.attention.alertText);
    setText(".process-excerpt > p", copy.attention.excerptText);
    setText(".trace-label", copy.attention.trace);
    setText(".plain-callout", copy.attention.final);

    setText("#pa-fix-title", copy.paFix.title);
    setHTML("#pa-fix .section-head p:nth-of-type(2)", copy.paFix.p);
    setTextList(".failure-card span", copy.paFix.spans);
    setTextList(".failure-card b", copy.paFix.titles);
    setHTMLList(".failure-card p", copy.paFix.texts);
    setTextList(".layer-map span", copy.paFix.layer);

    setText("#architecture .eyebrow", copy.architecture.eyebrow);
    setText("#architecture-title", copy.architecture.title);
    setText("#architecture .section-head p:nth-of-type(2)", copy.architecture.p);
    setTextList(".architecture-grid p", copy.architecture.texts);
    setText(".ops-strip b", copy.architecture.stripTitle);
    setHTML(".ops-strip p", copy.architecture.stripText);

    setText(".site-footer b", copy.footer.name);
    setText(".site-footer p", copy.footer.bio);
    setAttr(".site-footer nav", "aria-label", copy.footer.aria);
    setTextList(".site-footer nav a", copy.footer.links);
    $$(".site-footer nav a").forEach((link, index) => {
      if (copy.footer.hrefs[index]) link.setAttribute("href", copy.footer.hrefs[index]);
    });

    langButtons.forEach((button) => {
      const isActive = button.dataset.lang === currentLang;
      button.classList.toggle("is-active", isActive);
      if (isActive) {
        button.setAttribute("aria-current", "true");
      } else {
        button.removeAttribute("aria-current");
      }
    });

    updateChrome();
  }

  function setLanguage(lang) {
    applyCopy(lang);
  }

  function closeNav() {
    if (!navList || !navToggle) return;
    navList.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  screenTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      if (!screenImage || !screenCaption) return;
      screenTabs.forEach((item) => {
        const isActive = item === tab;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      screenImage.src = tab.dataset.screenSrc;
      screenImage.alt = tab.dataset.screenAlt || "";
      screenCaption.textContent = tab.dataset.screenCaption || "";
    });
  });

  function renderLineDetail(line) {
    const detail = (lineDetails[currentLang] || lineDetails.en)[line];
    if (!detail || !lineDetail) return;
    lineDetail.innerHTML = `
      <span>${detail.label}</span>
      <b>${detail.title}</b>
      <p>${detail.body}</p>
    `;
  }

  lineButtons.forEach((button) => {
    button.addEventListener("click", () => {
      lineButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
      renderLineDetail(button.dataset.line);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.16 });

    $$("[data-reveal]").forEach((node) => revealObserver.observe(node));
  } else {
    $$("[data-reveal]").forEach((node) => node.classList.add("is-visible"));
  }

  setLanguage(getInitialLang());
  updateChrome();
  window.addEventListener("scroll", updateChrome, { passive: true });
  window.addEventListener("resize", updateChrome);
})();
