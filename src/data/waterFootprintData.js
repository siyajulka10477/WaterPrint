/**
 * WaterPrint Centralized Water Footprint Dataset & Conversion Helpers
 * 
 * Sources & References:
 * - Mekonnen, M.M. and Hoekstra, A.Y. (2011) "The green, blue and grey water footprint of crops and derived crop products",
 *   Hydrology and Earth System Sciences, 15(5): 1577-1600.
 * - Mekonnen, M.M. and Hoekstra, A.Y. (2012) "A Global Assessment of the Water Footprint of Farm Animal Products",
 *   Ecosystems, 15(3): 401-415.
 * - Water Footprint Network (WFN) Product Gallery & WaterStat Database.
 * - UNESCO-IHE Institute for Water Education.
 * 
 * Note: All values represent global weighted averages and are approximate estimates.
 * Actual footprints vary by region, agricultural efficiency, climate, and supply chains.
 */

export const FOOD_DATABASE = [
  {
    id: 'rice',
    name: 'Rice',
    category: 'Grains & Cereals',
    icon: '🌾',
    defaultUnit: 'g',
    unitLabel: 'grams (g)',
    // 2,497 Litres per kg -> 2.497 Litres per gram
    factorPerGram: 2.497,
    factorPerKg: 2497,
    defaultAmount: 150,
    quickSuggestions: [
      { label: 'Small bowl (100g)', amount: 100 },
      { label: 'Average bowl (150g)', amount: 150 },
      { label: 'Large portion (250g)', amount: 250 },
    ],
    description: 'Paddy rice requires significant flood irrigation, contributing to high virtual water intensity.',
    waterBreakdown: { green: 68, blue: 21, grey: 11 },
  },
  {
    id: 'wheat',
    name: 'Wheat / Bread / Flour',
    category: 'Grains & Cereals',
    icon: '🍞',
    defaultUnit: 'g',
    unitLabel: 'grams (g)',
    // 1,827 Litres per kg -> 1.827 Litres per gram (~55L per slice of bread / 30g)
    factorPerGram: 1.827,
    factorPerKg: 1827,
    defaultAmount: 120,
    quickSuggestions: [
      { label: '2 Slices Bread (~60g)', amount: 60 },
      { label: 'Bowl of Pasta / Roti (~120g)', amount: 120 },
      { label: 'Heavy Wheat Meal (~200g)', amount: 200 },
    ],
    description: 'Wheat is predominantly rain-fed (green water) but requires processing for flour and bakery products.',
    waterBreakdown: { green: 70, blue: 19, grey: 11 },
  },
  {
    id: 'milk',
    name: 'Cow Milk',
    category: 'Dairy & Beverages',
    icon: '🥛',
    defaultUnit: 'L',
    unitLabel: 'litres (L)',
    // 1,020 Litres per Litre
    factorPerLitre: 1020,
    factorPerMl: 1.020,
    defaultAmount: 0.25,
    quickSuggestions: [
      { label: '1 Glass (0.25 L)', amount: 0.25 },
      { label: '2 Glasses (0.50 L)', amount: 0.50 },
      { label: '1 Litre carton (1.0 L)', amount: 1.0 },
    ],
    description: 'Dairy cows require extensive water for feed cultivation (grass, soy, alfalfa) and farm cooling.',
    waterBreakdown: { green: 85, blue: 8, grey: 7 },
  },
  {
    id: 'tea',
    name: 'Tea',
    category: 'Dairy & Beverages',
    icon: '🍵',
    defaultUnit: 'cups',
    unitLabel: 'cups (250ml)',
    // ~27 Litres per standard cup (brewed with ~3g dried tea leaves @ 9,000 L/kg)
    factorPerCup: 27,
    defaultAmount: 2,
    quickSuggestions: [
      { label: '1 cup', amount: 1 },
      { label: '2 cups', amount: 2 },
      { label: '4 cups', amount: 4 },
    ],
    description: 'Cultivation and drying of tea leaves accounts for virtually all of the ~27 L needed per cup.',
    waterBreakdown: { green: 82, blue: 7, grey: 11 },
  },
  {
    id: 'coffee',
    name: 'Coffee',
    category: 'Dairy & Beverages',
    icon: '☕',
    defaultUnit: 'cups',
    unitLabel: 'cups (125-150ml)',
    // ~140 Litres per cup (~7g roasted coffee beans @ 18,900 L/kg)
    factorPerCup: 140,
    defaultAmount: 1,
    quickSuggestions: [
      { label: '1 cup (140 L)', amount: 1 },
      { label: '2 cups (280 L)', amount: 2 },
      { label: '3 cups (420 L)', amount: 3 },
    ],
    description: 'Coffee cherries require intensive washing, processing, and growing conditions (~140L per single cup).',
    waterBreakdown: { green: 96, blue: 1, grey: 3 },
  },
  {
    id: 'vegetables',
    name: 'Vegetables (Mixed)',
    category: 'Produce',
    icon: '🥦',
    defaultUnit: 'g',
    unitLabel: 'grams (g)',
    // Average 322 Litres per kg -> 0.322 Litres per gram
    factorPerGram: 0.322,
    factorPerKg: 322,
    defaultAmount: 200,
    quickSuggestions: [
      { label: 'Light salad (100g)', amount: 100 },
      { label: 'Standard portion (200g)', amount: 200 },
      { label: 'Large vegetable portion (400g)', amount: 400 },
    ],
    description: 'Vegetables have one of the lowest water footprints per kilogram among food groups.',
    waterBreakdown: { green: 60, blue: 25, grey: 15 },
  },
  {
    id: 'chicken',
    name: 'Chicken (Poultry)',
    category: 'Meat & Protein',
    icon: '🍗',
    defaultUnit: 'g',
    unitLabel: 'grams (g)',
    // 4,325 Litres per kg -> 4.325 Litres per gram
    factorPerGram: 4.325,
    factorPerKg: 4325,
    defaultAmount: 150,
    quickSuggestions: [
      { label: 'Small breast / piece (100g)', amount: 100 },
      { label: 'Medium serving (150g)', amount: 150 },
      { label: 'Large serving (300g)', amount: 300 },
    ],
    description: 'Broiler chickens consume feed concentrates (cereals and oilseeds) representing 98% of footprint.',
    waterBreakdown: { green: 82, blue: 7, grey: 11 },
  },
  {
    id: 'beef',
    name: 'Beef (Bovine Meat)',
    category: 'Meat & Protein',
    icon: '🥩',
    defaultUnit: 'g',
    unitLabel: 'grams (g)',
    // 15,415 Litres per kg -> 15.415 Litres per gram
    factorPerGram: 15.415,
    factorPerKg: 15415,
    defaultAmount: 0,
    quickSuggestions: [
      { label: 'Small patty (100g)', amount: 100 },
      { label: 'Steak serving (200g)', amount: 200 },
      { label: 'Large steak (350g)', amount: 350 },
    ],
    description: 'Cattle take roughly 3 years to reach slaughter weight, consuming huge quantities of fodder and grains.',
    waterBreakdown: { green: 93, blue: 4, grey: 3 },
  },
  {
    id: 'eggs',
    name: 'Eggs',
    category: 'Meat & Protein',
    icon: '🥚',
    defaultUnit: 'units',
    unitLabel: 'eggs',
    // ~200 Litres per egg (approx 60g @ 3,300 L/kg)
    factorPerUnit: 200,
    defaultAmount: 1,
    quickSuggestions: [
      { label: '1 egg', amount: 1 },
      { label: '2 eggs', amount: 2 },
      { label: '3 eggs', amount: 3 },
    ],
    description: 'Layer hens require high-protein grains and cereal-based feed rations.',
    waterBreakdown: { green: 79, blue: 7, grey: 14 },
  },
  {
    id: 'cheese',
    name: 'Cheese',
    category: 'Dairy & Beverages',
    icon: '🧀',
    defaultUnit: 'g',
    unitLabel: 'grams (g)',
    // 5,060 Litres per kg -> 5.06 Litres per gram (approx 10L milk per 1kg cheese)
    factorPerGram: 5.060,
    factorPerKg: 5060,
    defaultAmount: 30,
    quickSuggestions: [
      { label: '1 slice (~20g)', amount: 20 },
      { label: 'Serving (~40g)', amount: 40 },
      { label: 'Cheese portion (~100g)', amount: 100 },
    ],
    description: 'Cheese is concentrated milk, needing about 10 litres of fresh milk for 1 kg of hard cheese.',
    waterBreakdown: { green: 85, blue: 8, grey: 7 },
  },
  {
    id: 'fruits',
    name: 'Fruits (Apples / Bananas / Citrus)',
    category: 'Produce',
    icon: '🍎',
    defaultUnit: 'g',
    unitLabel: 'grams (g)',
    // Average ~822 Litres per kg -> 0.822 Litres per gram (~125 L per apple)
    factorPerGram: 0.822,
    factorPerKg: 822,
    defaultAmount: 150,
    quickSuggestions: [
      { label: '1 Apple / Banana (~120g)', amount: 120 },
      { label: 'Fruit Salad (~250g)', amount: 250 },
      { label: 'Multiple Fruits (~400g)', amount: 400 },
    ],
    description: 'Orchards require sustained soil moisture, with apples using ~125 L and bananas ~160 L each.',
    waterBreakdown: { green: 68, blue: 16, grey: 16 },
  },
  {
    id: 'chocolate',
    name: 'Chocolate',
    category: 'Snacks & Sweets',
    icon: '🍫',
    defaultUnit: 'g',
    unitLabel: 'grams (g)',
    // 17,196 Litres per kg -> 17.196 Litres per gram
    factorPerGram: 17.196,
    factorPerKg: 17196,
    defaultAmount: 0,
    quickSuggestions: [
      { label: '2 Small squares (~15g)', amount: 15 },
      { label: 'Chocolate bar (~50g)', amount: 50 },
      { label: 'Large bar (~100g)', amount: 100 },
    ],
    description: 'Cocoa beans require intensive tropical cultivation and long fermentation drying processes.',
    waterBreakdown: { green: 98, blue: 1, grey: 1 },
  },
];

export const PRODUCTS_DATABASE = [
  {
    id: 'tshirt',
    name: 'Cotton T-shirt',
    category: 'Apparel',
    icon: '👕',
    unitLabel: 'items purchased / amortized',
    // 2,495 Litres per T-shirt (approx 250g cotton)
    factorPerUnit: 2495,
    defaultDailyProrated: 0, // Users can specify monthly/annual purchases or daily active usage
    description: 'Cotton is a water-intensive crop requiring extensive irrigation and chemical dyeing/washing.',
    lifespanYears: 2,
    waterBreakdown: { green: 54, blue: 33, grey: 13 },
  },
  {
    id: 'jeans',
    name: 'Denim Jeans',
    category: 'Apparel',
    icon: '👖',
    unitLabel: 'items purchased / amortized',
    // ~8,000 Litres per pair of jeans (approx 800g cotton + intensive denim washing & finishing)
    factorPerUnit: 8000,
    defaultDailyProrated: 0,
    description: 'Growing raw cotton, wet processing, denim bleaching, and stonewashing consume ~8,000 L of water.',
    lifespanYears: 3,
    waterBreakdown: { green: 50, blue: 35, grey: 15 },
  },
  {
    id: 'shoes',
    name: 'Pair of Shoes',
    category: 'Footwear',
    icon: '👟',
    unitLabel: 'pairs purchased / amortized',
    // ~8,000 Litres (synthetic ~4,000-8,000 L, leather ~13,700 L; average benchmark ~8,000 L)
    factorPerUnit: 8000,
    defaultDailyProrated: 0,
    description: 'Leather tanning and polymer synthetic sole manufacturing involve high chemical wash stages.',
    lifespanYears: 2,
    waterBreakdown: { green: 65, blue: 20, grey: 15 },
  },
  {
    id: 'paper',
    name: 'A4 Paper (Sheet)',
    category: 'Office & Stationery',
    icon: '📄',
    unitLabel: 'sheets',
    // ~10 Litres per sheet
    factorPerUnit: 10,
    defaultDailyProrated: 2,
    description: 'Wood pulp harvesting, chemical digestion, and bleaching require about 10 Litres per standard A4 sheet.',
    lifespanYears: 0.1,
    waterBreakdown: { green: 70, blue: 15, grey: 15 },
  },
  {
    id: 'smartphone',
    name: 'Smartphone',
    category: 'Electronics',
    icon: '📱',
    unitLabel: 'devices purchased / amortized',
    // ~12,760 Litres (embedded in silicon wafer fabrication, rare-earth mining, and microchip rinsing)
    factorPerUnit: 12760,
    defaultDailyProrated: 0,
    description: 'Semiconductor ultra-pure water (UPW) rinsing and mineral mining create an extensive water trail.',
    lifespanYears: 3,
    waterBreakdown: { green: 10, blue: 60, grey: 30 },
  },
];

export const DIRECT_WATER_CONFIG = {
  shower: {
    id: 'shower',
    name: 'Shower',
    icon: '🚿',
    defaultCount: 1,
    defaultLitresPerUnit: 65, // Standard 8-minute shower with standard shower head (~8 L/min)
    unitLabel: 'showers/day',
    litresLabel: 'litres/shower',
    presets: [
      { label: 'Quick Navy Shower (4 min)', litres: 35 },
      { label: 'Standard Shower (8 min)', litres: 65 },
      { label: 'Long / Power Shower (12+ min)', litres: 110 },
    ],
    tip: 'Shortening your shower by just 2 minutes saves approximately 16–20 litres of direct water.',
  },
  laundry: {
    id: 'laundry',
    name: 'Washing Clothes',
    icon: '🧺',
    defaultCyclesPerWeek: 3,
    defaultLitresPerCycle: 60, // Modern front loader: ~50-60L; Top loader: ~100-120L
    cyclesLabel: 'cycles/week',
    litresLabel: 'litres/cycle',
    presets: [
      { label: 'High-Efficiency Front Loader', litres: 50 },
      { label: 'Standard Washing Machine', litres: 65 },
      { label: 'Traditional Top Loader', litres: 110 },
    ],
    tip: 'Running only full loads of laundry maximizes cycle water efficiency.',
  },
  household: {
    id: 'household',
    name: 'General Household & Taps',
    icon: '🚰',
    defaultLitresPerDay: 85, // Toilets (3-5 flushes @ 6-9L = 30-45L), handwashing/teeth (15L), cooking & drinking (10L), dishwashing (25L)
    unitLabel: 'litres/day',
    presets: [
      { label: 'Water-Conscious / Low Flow (45 L)', litres: 45 },
      { label: 'Average Household Tap Usage (85 L)', litres: 85 },
      { label: 'High Tap Usage / Hand Dishes (140 L)', litres: 140 },
    ],
    tip: 'Turning off the tap while brushing teeth or soaping dishes saves up to 12 litres per minute.',
  },
};

/**
 * Predefined Scenarios for quick 1-click demonstration & testing
 */
export const PRESET_PROFILES = [
  {
    id: 'average',
    name: 'Typical Urban Student',
    tagline: 'Balanced mixed diet, moderate product purchasing, daily standard shower',
    badge: 'Standard Baseline',
    food: {
      rice: 150,      // 150g = 374.55 L
      wheat: 120,     // 120g = 219.24 L
      milk: 0.25,     // 0.25L = 255 L
      tea: 1,         // 1 cup = 27 L
      coffee: 1,      // 1 cup = 140 L
      vegetables: 200,// 200g = 64.4 L
      chicken: 150,   // 150g = 648.75 L
      beef: 0,        // 0g = 0 L
      eggs: 1,        // 1 egg = 200 L
      cheese: 30,     // 30g = 151.8 L
      fruits: 150,    // 150g = 123.3 L
      chocolate: 20,  // 20g = 343.92 L
    },
    productsMode: 'annual_amortized', // or direct daily
    products: {
      tshirt: 4,      // 4 per year = ~27.3 L/day
      jeans: 2,       // 2 per year = ~43.8 L/day
      shoes: 1,       // 1 pair per year = ~21.9 L/day
      paper: 2,       // 2 sheets/day = 20 L/day
      smartphone: 0.33, // 1 every 3 yrs = ~11.7 L/day
    },
    direct: {
      showerCount: 1,
      showerLitres: 65,
      laundryCyclesWeekly: 3,
      laundryLitres: 60,
      householdLitres: 85,
    },
  },
  {
    id: 'meat_heavy',
    name: 'High-Meat & Coffee Lover',
    tagline: 'High beef & chicken intake, multiple coffees, new fashion enthusiast',
    badge: 'High Footprint',
    food: {
      rice: 200,
      wheat: 150,
      milk: 0.5,
      tea: 0,
      coffee: 3,
      vegetables: 100,
      chicken: 200,
      beef: 150, // 150g * 15.415 = 2,312.25 L
      eggs: 2,
      cheese: 60,
      fruits: 100,
      chocolate: 50,
    },
    productsMode: 'annual_amortized',
    products: {
      tshirt: 8,
      jeans: 4,
      shoes: 3,
      paper: 5,
      smartphone: 0.5,
    },
    direct: {
      showerCount: 2,
      showerLitres: 90,
      laundryCyclesWeekly: 5,
      laundryLitres: 80,
      householdLitres: 120,
    },
  },
  {
    id: 'plant_saver',
    name: 'Plant-Forward Eco Champion',
    tagline: 'Plant-centric diet, mindful consumption, water-saving shower habits',
    badge: 'Low Footprint',
    food: {
      rice: 120,
      wheat: 150,
      milk: 0,
      tea: 2,
      coffee: 1,
      vegetables: 350,
      chicken: 0,
      beef: 0,
      eggs: 0,
      cheese: 0,
      fruits: 300,
      chocolate: 10,
    },
    productsMode: 'annual_amortized',
    products: {
      tshirt: 2,
      jeans: 1,
      shoes: 0.5,
      paper: 1,
      smartphone: 0.25,
    },
    direct: {
      showerCount: 1,
      showerLitres: 40,
      laundryCyclesWeekly: 2,
      laundryLitres: 50,
      householdLitres: 50,
    },
  },
];

/**
 * Global Benchmarks for contextual comparison
 */
export const GLOBAL_BENCHMARKS = {
  globalAverageDailyLitres: 3800, // Water Footprint Network global average per capita (~1,385 m3/year = ~3,795 L/day)
  usaAverageDailyLitres: 7800,    // US average per capita (~2,842 m3/year = ~7,786 L/day)
  europeAverageDailyLitres: 4400, // EU average per capita (~1,600 m3/year = ~4,380 L/day)
  indiaAverageDailyLitres: 3000,  // India average per capita (~1,089 m3/year = ~2,983 L/day)
  chinaAverageDailyLitres: 2900,  // China average per capita (~1,071 m3/year = ~2,934 L/day)
  directWaterPercentGlobalAvg: 4, // Only ~3.8% to 5% of personal water use is direct tap water! 95%+ is virtual!
};

/**
 * Helper to calculate Food Item Virtual Water Footprint in Litres
 */
export function calculateFoodItemWater(item, amount) {
  if (!amount || amount <= 0) return 0;
  
  if (item.factorPerGram) {
    return amount * item.factorPerGram;
  }
  if (item.factorPerLitre) {
    return amount * item.factorPerLitre;
  }
  if (item.factorPerCup) {
    return amount * item.factorPerCup;
  }
  if (item.factorPerUnit) {
    return amount * item.factorPerUnit;
  }
  return 0;
}

/**
 * Helper to calculate Product Item Virtual Water Footprint in Litres
 * Support both daily direct items or annual amortized items (annual / 365)
 */
export function calculateProductItemWater(item, amount, isAnnual = true) {
  if (!amount || amount <= 0) return 0;
  const totalWater = amount * item.factorPerUnit;
  return isAnnual ? totalWater / 365 : totalWater;
}

/**
 * Helper to calculate Direct Water Usage in Litres per Day
 */
export function calculateDirectWater(directState) {
  const showerDaily = (Number(directState.showerCount) || 0) * (Number(directState.showerLitres) || 0);
  const laundryDaily = ((Number(directState.laundryCyclesWeekly) || 0) * (Number(directState.laundryLitres) || 0)) / 7;
  const householdDaily = Number(directState.householdLitres) || 0;

  return {
    shower: Math.round(showerDaily * 10) / 10,
    laundry: Math.round(laundryDaily * 10) / 10,
    household: Math.round(householdDaily * 10) / 10,
    total: Math.round((showerDaily + laundryDaily + householdDaily) * 10) / 10,
  };
}

/**
 * Helper to format numbers with commas and fixed decimals
 */
export function formatLitres(val, decimals = 0) {
  if (val === null || val === undefined || isNaN(val)) return '0 L';
  const rounded = Number(val).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${rounded} L`;
}

export function formatNumber(val, decimals = 0) {
  if (val === null || val === undefined || isNaN(val)) return '0';
  return Number(val).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
