export const localizedText = {
  title: { en: "Metric Calculator", ru: "Калькулятор метрик" },
  subtitle: {
      en: "Calculates ROI, ROAS, CPM, CPC and other key metrics to control advertising efficiency and optimize budget.",
      ru: "Мгновенно рассчитывайте ROI, ROAS, CPM и CPA, чтобы контролировать эффективность рекламы и оптимизировать бюджет."
  },
  enterData: { en: "Enter your data", ru: "Введите ваши показатели" },
  reset: { en: "Reset", ru: "Сбросить" },
  inputs: {
      cost: { en: "Cost (Ad Spend)", ru: "Расход" },
      impressions: { en: "Impressions", ru: "Просмотры" },
      clicks: { en: "Clicks", ru: "Клики" },
      income: { en: "Income (Revenue)", ru: "Доход" },
      leads: { en: "Leads (Conversions)", ru: "Заявки" },
      sales: { en: "Sales", ru: "Продажи" },
  },
  metrics: {
      roi: { en: "Return on Investment", ru: "Возврат инвестиций" },
      roas: { en: "Return on Ad Spend", ru: "Окупаемость рекламы" },
      profit: { en: "Net Profit", ru: "Чистая прибыль" },
      cpm: { en: "Cost Per Mille (1000 views)", ru: "Цена за 1000 показов" },
      cpc: { en: "Cost Per Click", ru: "Цена клика" },
      cpa: { en: "Cost Per Action", ru: "Цена действия" },
      ctr: { en: "Click-Through Rate", ru: "Кликабельность" },
      ctc: { en: "Click to Conversion", ru: "Клики в действия" },
      ctb: { en: "Click to Buy", ru: "Действия в покупки" },
      apv: { en: "Average Purchase Value", ru: "Средний чек покупки" },
      apc: { en: "Average Profit Contribution", ru: "Средняя прибыль с продажи" },
  },
  seoIntro: {
    title: {
      ru: "Калькулятор метрик арбитражника",
      en: "Affiliate Metric Calculator"
    },
    p1: {
      ru: "Калькулятор метрик арбитражника — это удобный онлайн-инструмент для расчета ключевых показателей эффективности рекламных кампаний. Он помогает быстро оценить прибыльность трафика, эффективность рекламных расходов и качество воронки на любом этапе — от показа объявления до целевого действия.",
      en: "The affiliate metric calculator is a convenient online tool for calculating key performance indicators of ad campaigns. It helps quickly assess traffic profitability, ad spend efficiency, and funnel quality at any stage—from ad impression to target action."
    },
    p2: {
      ru: "Инструмент подходит для арбитражников, медиабайеров, вебмастеров и команд, работающих с CPA-офферами, iGaming, нутрой, e-commerce и другими вертикалями.",
      en: "The tool is ideal for affiliates, media buyers, webmasters, and teams working with CPA offers, iGaming, Nutra, e-commerce, and other verticals."
    },
    listIntro: {
      ru: "Используя калькулятор метрик, вы сможете:",
      en: "Using the metric calculator, you will be able to:"
    },
    list: {
      ru: [
        "определить, работает ли кампания в плюс",
        "сравнить источники трафика по эффективности",
        "найти слабые места в воронке",
        "принять решение о масштабировании или остановке кампании"
      ],
      en: [
        "determine if a campaign is profitable",
        "compare traffic sources by efficiency",
        "find weak spots in your funnel",
        "make decisions on scaling or stopping a campaign"
      ]
    }
  },
  metricDetails: {
    profit: {
      desc: {
        ru: "Чистая прибыль рекламной кампании после вычета всех расходов.",
        en: "Net profit of the ad campaign after deducting all expenses."
      },
      calc: { ru: "Profit = Доход – Расходы", en: "Profit = Income – Cost" },
      where: {
        ru: "доход — в партнерской сети или трекере\nрасходы — в рекламном кабинете источника трафика",
        en: "income — in the affiliate network or tracker\ncost — in the ad network dashboard"
      },
      affects: {
        ru: "Profit — ключевой показатель итогового результата. Именно он показывает, зарабатываете вы или теряете деньги.",
        en: "Profit is the key indicator of the final result. It shows whether you are making or losing money."
      },
      improve: {
        ru: "Низкий Profit или убыток → расходы превышают доход.\nЧто делать: снизить CPC, улучшить CR, протестировать другой оффер или ГЕО.\n\nВысокий Profit → кампания приносит стабильную чистую прибыль.\nЧто делать: масштабировать бюджет, расширять аудитории, подключать новые источники трафика.",
        en: "Low Profit or loss → expenses exceed income.\nWhat to do: lower CPC, improve CR, test another offer or GEO.\n\nHigh Profit → campaign brings stable net profit.\nWhat to do: scale budget, expand audiences, connect new traffic sources."
      }
    },
    roi: {
      desc: {
        ru: "Процент возврата инвестиций. Показывает, насколько прибыльна кампания относительно вложенных средств.",
        en: "Return on Investment. Shows how profitable the campaign is relative to the invested funds."
      },
      calc: { ru: "ROI = (Profit / Расходы) × 100%", en: "ROI = (Profit / Cost) × 100%" },
      where: {
        ru: "Считается на основе данных по доходу и расходам в трекере или вручную через калькулятор.",
        en: "Calculated based on income and cost data in the tracker or manually via a calculator."
      },
      affects: {
        ru: "ROI используется для оценки общей эффективности кампании и принятия решений о масштабировании.",
        en: "ROI is used to evaluate the overall efficiency of the campaign and make scaling decisions."
      },
      improve: {
        ru: "Низкий или отрицательный ROI → вложения не окупаются.\nЧто делать: уменьшить CPA, оптимизировать креативы, повысить конверсию лендинга.\n\nВысокий ROI → кампания эффективно использует бюджет.\nЧто делать: аккуратно увеличивать объем трафика, контролируя стабильность показателя.",
        en: "Low or negative ROI → investments do not pay off.\nWhat to do: reduce CPA, optimize creatives, increase landing page conversion.\n\nHigh ROI → the campaign uses the budget effectively.\nWhat to do: carefully increase traffic volume while controlling indicator stability."
      }
    },
    roas: {
      desc: {
        ru: "Сколько дохода приносит каждая вложенная в рекламу денежная единица.",
        en: "How much revenue is generated for every unit of currency spent on advertising."
      },
      calc: { ru: "ROAS = Доход / Расходы × 100%", en: "ROAS = Income / Cost × 100%" },
      where: { ru: "В рекламной аналитике и трекерах, где доступны данные по выручке.", en: "In advertising analytics and trackers where revenue data is available." },
      affects: { ru: "Позволяет понять, насколько эффективно расходуется рекламный бюджет, без учета дополнительных затрат.", en: "Helps understand how effectively the ad budget is spent, without accounting for additional costs." },
      improve: {
        ru: "Низкий ROAS → реклама приносит мало дохода относительно затрат.\nЧто делать: увеличить средний чек (APV), протестировать более дорогой оффер, повысить CR.\n\nВысокий ROAS → рекламный бюджет работает эффективно.\nЧто делать: масштабировать связку и удерживать стабильный CPA.",
        en: "Low ROAS → ads bring little revenue relative to costs.\nWhat to do: increase average order value (APV), test a more expensive offer, improve CR.\n\nHigh ROAS → the ad budget works effectively.\nWhat to do: scale the funnel and maintain a stable CPA."
      }
    },
    cpm: {
      desc: { ru: "Стоимость 1000 показов рекламного объявления.", en: "Cost of 1000 ad impressions." },
      calc: { ru: "CPM = (Расходы / Показы) × 1000", en: "CPM = (Cost / Impressions) × 1000" },
      where: { ru: "В рекламных сетях и DSP, где доступна статистика по показам.", en: "In ad networks and DSPs where impression statistics are available." },
      affects: { ru: "Используется для оценки стоимости охвата и сравнения источников трафика между собой.", en: "Used to evaluate the cost of reach and compare traffic sources." },
      improve: {
        ru: "Высокий CPM → дорогой охват, высокая конкуренция в аукционе.\nЧто делать: расширить аудиторию, протестировать другие ГЕО, изменить время показа.\n\nНизкий CPM → дешевые показы.\nЧто делать: проверить качество трафика и его конверсию, чтобы избежать нецелевых показов.",
        en: "High CPM → expensive reach, high auction competition.\nWhat to do: expand the audience, test other GEOs, change display times.\n\nLow CPM → cheap impressions.\nWhat to do: check traffic quality and conversion to avoid untargeted impressions."
      }
    },
    cpc: {
      desc: { ru: "Средняя стоимость одного клика по рекламе.", en: "Average cost of one click on an ad." },
      calc: { ru: "CPC = Расходы / Клики", en: "CPC = Cost / Clicks" },
      where: { ru: "В рекламных кабинетах источников трафика.", en: "In the ad network dashboard." },
      affects: { ru: "Помогает оценить цену входящего трафика и эффективность ставок.", en: "Helps evaluate the price of incoming traffic and bid efficiency." },
      improve: {
        ru: "Высокий CPC → клики дорогие, аудитория может быть слишком узкой или креатив неудачный.\nЧто делать: протестировать новые креативы, изменить таргетинг, оптимизировать ставки.\n\nНизкий CPC → клики дешевые, это хорошо для тестирования и масштабирования.\nЧто делать: увеличить объем трафика, если сохраняется стабильный CR.",
        en: "High CPC → clicks are expensive, the audience might be too narrow, or the creative is poor.\nWhat to do: test new creatives, change targeting, optimize bids.\n\nLow CPC → clicks are cheap, which is good for testing and scaling.\nWhat to do: increase traffic volume if CR remains stable."
      }
    },
    cpa: {
      desc: { ru: "Стоимость одного целевого действия (регистрация, депозит, покупка).", en: "Cost of one target action (registration, deposit, purchase)." },
      calc: { ru: "CPA = Расходы / Количество действий", en: "CPA = Cost / Number of Actions" },
      where: { ru: "В трекере или партнерской сети по подтвержденным конверсиям.", en: "In the tracker or affiliate network based on confirmed conversions." },
      affects: { ru: "Одна из ключевых метрик в CPA-маркетинге. Используется для оценки окупаемости оффера.", en: "One of the key metrics in CPA marketing. Used to evaluate offer payback." },
      improve: {
        ru: "Высокий CPA → действие обходится слишком дорого, маржа снижается.\nЧто делать: улучшить связку креатив + лендинг, протестировать другой оффер, убрать неэффективные площадки.\n\nНизкий CPA → действия привлекаются по выгодной цене.\nЧто делать: масштабировать источник и увеличить бюджет.",
        en: "High CPA → the action is too expensive, margin decreases.\nWhat to do: improve the creative + landing page funnel, test another offer, remove inefficient placements.\n\nLow CPA → actions are acquired at a favorable price.\nWhat to do: scale the source and increase the budget."
      }
    },
    ctr: {
      desc: { ru: "Показатель кликабельности рекламы — процент кликов от общего числа показов.", en: "Ad click-through rate — the percentage of clicks from total impressions." },
      calc: { ru: "CTR = (Клики / Показы) × 100%", en: "CTR = (Clicks / Impressions) × 100%" },
      where: { ru: "В статистике рекламного источника.", en: "In the ad source statistics." },
      affects: { ru: "Отражает качество креатива и релевантность аудитории. Высокий CTR снижает стоимость трафика.", en: "Reflects the quality of the creative and audience relevance. A high CTR lowers traffic costs." },
      improve: {
        ru: "Низкий CTR → реклама не привлекает внимание аудитории.\nЧто делать: обновить креативы, изменить заголовок, добавить триггеры или оффер в объявление.\n\nВысокий CTR → реклама вызывает интерес.\nЧто делать: проверить, сохраняется ли высокая конверсия после клика.",
        en: "Low CTR → the ad does not attract audience attention.\nWhat to do: update creatives, change the headline, add triggers or clarify the offer in the ad.\n\nHigh CTR → the ad generates interest.\nWhat to do: check if high conversion is maintained after the click."
      }
    },
    ctc: {
      desc: { ru: "Процент кликов, ставших целевым действием.", en: "Percentage of clicks that turned into a target action." },
      calc: { ru: "CTC = (Конверсии / Клики) × 100%", en: "CTC = (Conversions / Clicks) × 100%" },
      where: { ru: "В трекере или аналитике партнерской сети.", en: "In the tracker or affiliate network analytics." },
      affects: { ru: "Помогает оценить эффективность связки креатив + лендинг + оффер.", en: "Helps evaluate the efficiency of the creative + landing + offer funnel." },
      improve: {
        ru: "Низкий CTC → пользователи кликают, но не совершают действие.\nЧто делать: улучшить лендинг, ускорить загрузку страницы, упростить форму регистрации.\n\nВысокий CTC → трафик качественный и оффер релевантный.\nЧто делать: увеличить объем трафика и протестировать повышение ставок.",
        en: "Low CTC → users click but don't perform the action.\nWhat to do: improve the landing page, speed up page load times, simplify the registration form.\n\nHigh CTC → traffic is high-quality and the offer is relevant.\nWhat to do: increase traffic volume and test bid increments."
      }
    },
    ctb: {
      desc: { ru: "Процент целевых действий, ставших лидом или покупкой.", en: "Percentage of target actions that became a lead or purchase." },
      calc: { ru: "CTB = (Покупки / Клики) × 100%", en: "CTB = (Purchases / Clicks) × 100%" },
      where: { ru: "В статистике оффера или партнерской сети.", en: "In the offer or affiliate network statistics." },
      affects: { ru: "Показывает качество платежеспособной аудитории и эффективность монетизации.", en: "Shows the quality of paying audiences and monetization efficiency." },
      improve: {
        ru: "Низкий CTB → пользователи доходят до оффера, но не оплачивают.\nЧто делать: проверить платежные методы, улучшить доверие к бренду, добавить бонус или акцию.\n\nВысокий CTB → аудитория платежеспособная.\nЧто делать: масштабировать связку и тестировать апселлы.",
        en: "Low CTB → users reach the offer but don't pay.\nWhat to do: check payment methods, improve brand trust, add a bonus or promotion.\n\nHigh CTB → the audience is solvent.\nWhat to do: scale the funnel and test upsells."
      }
    },
    apv: {
      desc: { ru: "Средняя сумма дохода, которую приносит одна покупка или депозит.", en: "Average revenue generated by a single purchase or deposit." },
      calc: { ru: "APV = Общий доход / Количество покупок", en: "APV = Total Income / Number of Purchases" },
      where: { ru: "Общий доход и количество покупок — в партнерской сети; при необходимости — в трекере.", en: "Total income and number of purchases — in the affiliate network; if needed — in the tracker." },
      affects: { ru: "APV напрямую влияет на прибыльность кампании и потенциал масштабирования. Чем выше средний чек, тем больше доход можно получить даже при одинаковом объеме трафика и CPA.", en: "APV directly affects campaign profitability and scaling potential. The higher the average order value, the more revenue you can make with the same traffic volume and CPA." },
      improve: {
        ru: "Низкий APV → пользователи покупают на небольшие суммы.\nЧто делать: добавить апселлы, бонусы за больший депозит, пакетные предложения.\n\nВысокий APV → средний чек высокий, доход растет быстрее.\nЧто делать: удерживать аудиторию, внедрять программы лояльности.",
        en: "Low APV → users make small purchases.\nWhat to do: add upsells, bonuses for larger deposits, bundle offers.\n\nHigh APV → average order value is high, revenue grows faster.\nWhat to do: retain the audience, implement loyalty programs."
      }
    },
    apc: {
      desc: { ru: "Средняя прибыль с одного клика.", en: "Average profit per click." },
      calc: { ru: "APC = Profit / Клики", en: "APC = Profit / Clicks" },
      where: { ru: "Рассчитывается в трекере или через калькулятор метрик.", en: "Calculated in the tracker or via a metric calculator." },
      affects: { ru: "Используется для оценки потенциала масштабирования рекламной кампании.", en: "Used to evaluate the scaling potential of an ad campaign." },
      improve: {
        ru: "Низкий APC → клик не приносит достаточной прибыли.\nЧто делать: снизить CPC или увеличить CR и APV.\n\nВысокий APC → каждый клик приносит ощутимую прибыль.\nЧто делать: масштабировать кампанию и подключать новые источники трафика.",
        en: "Low APC → a click does not bring enough profit.\nWhat to do: lower CPC or increase CR and APV.\n\nHigh APC → every click brings tangible profit.\nWhat to do: scale the campaign and connect new traffic sources."
      }
    }
  },
  faq: {
    title: { ru: "FAQ — Часто задаваемые вопросы по метрикам", en: "FAQ — Frequently Asked Questions about Metrics" },
    items: [
      {
        q: { ru: "Что важнее — ROI или Profit?", en: "What's more important — ROI or Profit?" },
        a: {
          ru: "Profit показывает абсолютную прибыль, а ROI — относительную эффективность вложений. Для масштабирования важны оба показателя.",
          en: "Profit shows absolute earnings, while ROI shows relative investment efficiency. Both are crucial for scaling."
        }
      },
      {
        q: { ru: "Какие метрики нужно считать в первую очередь?", en: "Which metrics should be calculated first?" },
        a: {
          ru: "Минимальный набор — Profit, ROI, CPA, CTR и CPC. Остальные метрики помогают глубже анализировать воронку.",
          en: "The minimum set is Profit, ROI, CPA, CTR, and CPC. The rest help analyze the funnel in more depth."
        }
      },
      {
        q: { ru: "Почему высокий CTR не гарантирует прибыль?", en: "Why doesn't a high CTR guarantee profit?" },
        a: {
          ru: "CTR отражает кликабельность, но не качество трафика. Без хорошего CTC и CTB кампания может быть убыточной.",
          en: "CTR reflects clickability, not traffic quality. Without good CTC and CTB, a campaign can still be unprofitable."
        }
      },
      {
        q: { ru: "Как понять, что кампанию пора масштабировать?", en: "How to know it's time to scale a campaign?" },
        a: {
          ru: "Если ROI стабильно положительный, APC выше стоимости клика, а CPA ниже выплаты по офферу.",
          en: "If ROI is consistently positive, APC is higher than CPC, and CPA is lower than the offer payout."
        }
      },
      {
        q: { ru: "Можно ли использовать калькулятор без трекера?", en: "Can I use the calculator without a tracker?" },
        a: {
          ru: "Да, достаточно вручную ввести расходы, клики и конверсии, но трекер дает более точные данные.",
          en: "Yes, you can manually enter cost, clicks, and conversions, but a tracker provides more accurate data."
        }
      }
    ]
  }
}
