export const common = {
  appName: 'Aahaar',
  tagline: 'Scan. Crave. Order.',
  landing: {
    login: 'Login',
    enterKitchen: 'Enter your Kitchen',
    kitchenShort: 'My Kitchen',
    progressLabel: 'Reading progress',
    skipToPricing: 'Pricing',
    footer: 'Aahaar — dine-in ordering, without the app',

    hero: {
      eyebrow: 'Aahaar',
      titleTop: 'Your guest scans.',
      titleAccent: 'Your kitchen just knows.',
      tag: 'No app. No login. No commission.',
      ghostOne: 'SCAN',
      ghostTwo: 'ORDER',
    },

    marqueeTop: ['SCAN', 'ORDER', 'SERVED', 'NO APP', 'NO COMMISSION'],
    marqueeBottom: ['90-DAY TRIAL', 'NO CARD NEEDED', 'SWITCHED ON BY HAND'],

    stats: {
      eyebrow: 'By the numbers',
      titleTop: 'Built for real restaurants,',
      titleBottom: 'not demo screens.',
      ghost: 'NUMBERS',
      outlets: 'Outlets live',
      speed: 'Avg order to kitchen',
      commission: 'Commission saved',
      taps: 'Taps to place an order',
    },

    howto: {
      eyebrow: 'How it works',
      titleTop: 'From scan to served',
      titleBottom: 'in five moves',
      ghost: 'HOW',
      qr: {
        title: 'Stick a QR on the table',
        body: 'We send you printed codes. Peel, stick, done. Each table gets its own code linked to your menu.',
      },
      scan: {
        title: 'Guest scans with their camera',
        body: 'No app to install. The phone camera opens your full menu with photos, prices and spice levels instantly.',
      },
      pick: {
        title: 'They pick, add notes, order',
        body: 'Half portions, extra gravy, less spice — every note lands on the kitchen ticket, exactly as typed.',
      },
      kitchen: {
        title: 'Kitchen screen lights up',
        body: "A new ticket appears with a sound alert. One tap to accept, one tap when it's ready for the floor.",
      },
      pay: {
        title: 'Guest pays by UPI at the table',
        body: 'No waiting for the bill. No chasing the waiter. The table turns faster and you keep every rupee.',
      },
    },

    beats: {
      scan: {
        titleTop: 'One QR on the table.',
        body: 'Point the phone camera. The whole menu opens — no download, no waiting.',
      },
      browse: {
        titleTop: 'Search, filter,',
        titleBottom: 'pick your plate.',
        body: 'Veg or non-veg. Mild or fiery. Photos of every dish, so nobody guesses.',
      },
      round: {
        titleTop: 'Order again,',
        titleBottom: 'same ticket.',
        body: 'Want more papad? Add a round without starting a whole new order.',
      },
    },

    gallery: {
      eyebrow: 'The menu, as guests see it',
      title: 'Every dish, photographed',
      ghost: 'MENU',
      swipe: '← swipe →',
      tikka: { name: 'Paneer Tikka', price: '₹280', tag: 'Mild · Veg' },
      biryani: { name: 'Chicken Biryani', price: '₹340', tag: 'Spicy · Non-veg' },
      salad: { name: 'Garden Salad', price: '₹180', tag: 'Fresh · Veg' },
      palak: { name: 'Palak Paneer', price: '₹260', tag: 'Mild · Veg' },
      dosa: { name: 'Masala Dosa', price: '₹160', tag: 'Medium · Veg' },
      thali: { name: 'Thali Platter', price: '₹320', tag: 'Full meal · Veg' },
    },

    guest: {
      eyebrow: 'For the guest',
      title: 'Everything, in their pocket',
      ghost: 'GUEST',
      liveTable: {
        title: 'Live table',
        body: 'Table & venue shown live the moment the QR opens',
      },
      spice: { title: 'Spice levels', body: 'Set spice level on every dish — mild to fiery' },
      cart: { title: 'Smart cart', body: 'A cart that never hides — see everything before you send' },
      upi: { title: 'UPI at table', body: 'Pay by UPI at the table — no bill waiting' },
      waiter: {
        title: 'Call waiter',
        body: 'Call the waiter with one tap, no shouting across the hall',
      },
      portion: { title: 'Half or full', body: 'Half or full portions, your choice on every dish' },
      notes: {
        title: 'Table notes',
        body: 'Notes for the whole table — less spice, extra gravy, all of it',
      },
      rate: { title: 'Rate the meal', body: 'Rate the meal after — helps the kitchen improve' },
    },

    kitchen: {
      eyebrow: 'For the kitchen',
      titleTop: 'The order lands',
      titleBottom: 'before the guest looks up.',
      ghost: 'KOT',
      ticketHead: 'Order · Table 6',
      ticketTotal: 'Total',
      ticketStamp: 'NEW',
      ticketNote: 'Note: less spicy',
      items: {
        tikka: { label: '1 × Paneer Tikka', price: '₹280' },
        naan: { label: '1 × Butter Naan', price: '₹60' },
        lassi: { label: '2 × Sweet Lassi', price: '₹160' },
      },
      totalValue: '₹500',
      flowLabel: 'New, then preparing, then ready',
    },

    floor: {
      eyebrow: 'Never miss a ticket',
      title: 'The floor stays ahead',
      ghost: 'FAST',
      sound: { title: 'Sound alerts', body: 'Sound alert on every new order — never miss a ticket' },
      background: {
        title: 'Background alerts',
        body: 'Alerts even with the tab closed or screen off',
      },
      filter: { title: 'Filter tickets', body: 'Filter by table, dish or guest in one tap' },
      flow: { title: 'One-tap flow', body: 'One tap: Accept → Ready → Done' },
      offline: {
        title: 'Offline catch-up',
        body: 'Catches up automatically if wifi drops mid-service',
      },
    },

    bento: {
      eyebrow: 'Built for every shift',
      titleTop: 'Small details that',
      titleBottom: 'add up to a smooth floor',
      ghost: 'MORE',
      rounds: {
        title: 'Round-the-clock orders',
        body: 'Guests can add a second round to the same ticket without starting over. The kitchen sees it arrive instantly.',
      },
      chat: {
        title: 'Table-side notes',
        body: 'Guests type notes, the kitchen reads them on the ticket. No middle-person, no missed instructions.',
      },
      outlets: {
        title: 'Multi-outlet ready',
        body: 'One login, many outlets. Switch between branches without logging out or losing your place.',
      },
      timer: {
        title: 'Live prep timer',
        body: 'See how long each ticket has been open. The floor knows exactly when to expect the next plate.',
      },
      insights: {
        title: 'Dish insights',
        body: 'See which dishes sell, which sit, and which need a price tweak — all from your owner dashboard.',
      },
      qr: {
        title: 'QR print pack',
        body: 'Print a fresh QR for every table. Laminate, stick, replace — as many as you need, no extra charge.',
      },
    },

    owner: {
      eyebrow: 'For the owner',
      title: 'Run the whole floor',
      ghost: 'OWNER',
      excel: { title: 'Excel import', body: 'Upload your whole menu from Excel in minutes' },
      offers: {
        title: 'Offers & combos',
        body: 'Percent, flat & combo offers — set them in seconds',
      },
      roles: {
        title: 'Staff roles',
        body: 'Owner, manager, kitchen roles — each sees only what they need',
      },
      qr: { title: 'QR per table', body: 'Print QR for every table — as many as you need' },
      outlets: { title: 'Multi-outlet', body: 'One login, many outlets — switch branches instantly' },
      soldOut: { title: 'Sold-out toggle', body: 'Mark a dish sold out in one tap — menu updates live' },
      draft: { title: 'Draft mode', body: 'Draft menu changes in private, publish when ready' },
    },

    money: {
      eyebrow: 'The number that matters',
      titleTop: 'Delivery apps take a cut.',
      titleBottom: "Your table doesn't.",
      ghost: 'SAVE',
      keepValue: '100%',
      keepLabel: 'You keep',
      cutValue: '~22%',
      cutLabel: 'App commission',
    },

    journey: {
      eyebrow: 'The guest journey',
      titleTop: 'From seat to served,',
      titleBottom: 'without a single app install',
      ghost: 'PATH',
      sit: {
        title: 'Guest sits down',
        body: 'A QR code sits on the table. No app, no login, no download — just a phone camera.',
      },
      open: {
        title: 'Menu opens instantly',
        body: 'The full menu loads with photos, prices, spice levels and notes. Faster than a waiter can walk over.',
      },
      land: {
        title: 'Order lands in the kitchen',
        body: 'A ticket appears on the kitchen screen with a sound alert. The kitchen taps accept and starts cooking.',
      },
      pay: {
        title: 'Guest pays by UPI',
        body: 'No bill waiting, no card machine. The table turns faster and you keep every rupee of the sale.',
      },
    },

    ticker: {
      eyebrow: 'The feeling in every order',
      titleTop: 'One long sentence,',
      titleBottom: 'read as you scroll',
      lede: 'Keep scrolling — the words move sideways, like a ticker tape.',
      ghost: 'ONE SENTENCE',
      hint: 'keep scrolling →',
      one: 'At every table,',
      two: 'the guest simply',
      three: 'Scans',
      four: 'and the kitchen',
      five: 'Already Knows',
      six: 'before they even',
      seven: 'Look Up',
    },

    quotes: {
      eyebrow: 'From real kitchens',
      titleTop: 'What restaurants say',
      titleBottom: 'after the first week',
      ghost: 'WORDS',
      stars: '★★★★★',
      rajesh: {
        text: "Our table turnover went up by a third. Guests love that they don't have to wait for someone to take their order.",
        name: 'Rajesh Kumar',
        role: 'Owner · Spice Route',
        initial: 'R',
      },
      priya: {
        text: 'The kitchen screen is the best part. We stopped missing tickets in the dinner rush. The sound alert is a lifesaver.',
        name: 'Priya Sharma',
        role: 'Manager · Curry House',
        initial: 'P',
      },
      amit: {
        text: "We saved enough on delivery commissions in one month to pay for a whole year of Aahaar. That's the honest truth.",
        name: 'Amit Patel',
        role: 'Owner · Thali Junction',
        initial: 'A',
      },
      sunita: {
        text: 'Guests scan, order, pay. My staff actually has time to be hospitable instead of running around taking orders.',
        name: 'Sunita Reddy',
        role: 'Owner · Dosa Den',
        initial: 'S',
      },
    },

    pricing: {
      eyebrow: 'Pick a plan',
      titleTop: 'Priced like a thali,',
      titleBottom: 'not a subscription trap.',
      ghost: 'FAIR',
      perMonth: '/ month',
      basic: {
        name: 'Basic',
        ribbon: '90-day trial',
        price: '₹750',
        limit: 'Up to 10 tables',
        features: [
          'QR ordering & live kitchen screen',
          'UPI at the table',
          'Percent & flat offers',
          'Installable staff app',
        ],
      },
      pro: {
        name: 'Pro',
        ribbon: '15-day trial',
        price: '₹1,500',
        limit: 'Unlimited tables',
        features: [
          'Everything in Basic',
          'Combo, BOGO & happy hour',
          'Dish performance insights',
          'Commission-saved counter',
          'Priority support',
        ],
      },
    },

    faq: {
      eyebrow: 'Questions, answered',
      title: 'Before you ask',
      ghost: 'FAQ',
      app: {
        q: 'Do my guests need to install an app?',
        a: 'No. Guests scan the QR with their phone camera and the menu opens in the browser. No download, no account, no login. It just works.',
      },
      wifi: {
        q: 'What happens if the wifi drops mid-service?',
        a: 'The kitchen screen keeps showing the tickets it already received. Once the connection returns, any orders placed during the outage sync automatically. Nothing is lost.',
      },
      upload: {
        q: 'Can I upload my existing menu?',
        a: 'Yes. Export your menu to Excel, upload it, and we map the columns for you. Most outlets are live within an evening.',
      },
      cut: {
        q: 'Do you take a cut of each order?',
        a: 'Never. You pay a flat monthly fee. Every rupee a guest pays goes to you — no commission, no hidden percentage, no surprise.',
      },
      setup: {
        q: 'How long does setup take?',
        a: 'Our team switches you on by hand. From uploading your menu to printing your first QR, most restaurants are live in under a day.',
      },
      outlets: {
        q: 'Can I run multiple outlets on one account?',
        a: 'Yes. One login covers every outlet. Switch between branches from the dashboard without logging out or losing your place.',
      },
    },

    cta: {
      eyebrow: 'Ready when you are',
      titleTop: 'Put a QR on your table.',
      titleBottom: 'See the first order land.',
      sub: 'Free trial. No card needed. Our team switches you on by hand.',
      button: 'Start free trial →',
      kitchen: 'Enter your Kitchen →',
      ghost: 'GO',
    },
  },
  actions: {
    add: 'Add',
    viewCart: 'View Cart',
    back: 'Back',
    close: 'Close',
    retry: 'Try Again',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    confirm: 'Confirm',
    choose: 'Choose',
    continue: 'Continue',
    placeOrder: 'Place Order',
    addToOrder: 'Add to order',
    search: 'Search dishes',
    voiceSearch: 'Voice search',
    voiceListening: 'Listening… tap the mic to stop',
    voiceDenied: 'Allow microphone access to search by voice.',
    voiceUnavailable: 'Voice search does not work in this browser. Try Chrome or Safari, or type instead.',
    increase: 'Increase quantity',
    decrease: 'Decrease quantity',
    remove: 'Remove',
    download: 'Download',
    loading: 'Working…',
  },
  states: {
    loading: 'Loading food…',
    empty: 'Nothing here yet.',
    error: 'Something went wrong.',
    notFound: 'This restaurant could not be found.',
  },
  labels: {
    veg: 'Veg',
    nonVeg: 'Non-veg',
    vegan: 'Vegan',
    spice: 'Spice',
    stars: '{{count}} stars',
    total: 'Total',
    subtotal: 'Subtotal',
    tax: 'Tax',
    items_one: '{{count}} item',
    items_other: '{{count}} items',
    table: 'Table',
    room: 'Room',
    guests_one: '{{count}} guest',
    guests_other: '{{count}} guests',
  },
  install: {
    title: 'Save Aahaar on your phone',
    body: 'Add it to your home screen. The kitchen and menu open in one tap, and order alerts can ring even when the tab is closed.',
    iosHint: 'Tap Share, then Add to Home Screen. Open Aahaar from the icon so alerts work on iPhone.',
    add: 'Add to home',
    later: 'Not now',
  },
  status: {
    PENDING: 'New',
    ACCEPTED: 'Preparing',
    PREPARING: 'Preparing',
    READY: 'Ready',
    SERVED: 'Ready',
    COMPLETED: 'Done',
    REJECTED: 'Rejected',
    CANCELLED: 'Cancelled',
  },
} as const
