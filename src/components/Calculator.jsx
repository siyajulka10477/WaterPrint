import React, { useState } from 'react';
import { 
  Utensils, 
  ShoppingBag, 
  Droplet, 
  RotateCcw, 
  Sparkles, 
  HelpCircle, 
  Check, 
  ArrowDown, 
  ChevronRight,
  Info,
  Sliders,
  Plus,
  Trash2
} from 'lucide-react';
import { 
  FOOD_DATABASE, 
  PRODUCTS_DATABASE, 
  DIRECT_WATER_CONFIG, 
  PRESET_PROFILES, 
  calculateFoodItemWater, 
  calculateProductItemWater, 
  calculateDirectWater, 
  formatLitres, 
  formatNumber 
} from '../data/waterFootprintData';

export default function Calculator({
  foodState,
  setFoodState,
  productsState,
  setProductsState,
  productsMode,
  setProductsMode,
  directState,
  setDirectState,
  onCalculate,
  onReset,
}) {
  const [activeTab, setActiveTab] = useState('food');
  const [selectedPreset, setSelectedPreset] = useState(null);

  // Calculate live subtotals for real-time responsiveness
  const foodSubtotal = FOOD_DATABASE.reduce((sum, item) => {
    return sum + calculateFoodItemWater(item, foodState[item.id]);
  }, 0);

  const isAnnual = productsMode === 'annual_amortized';
  const productsSubtotal = PRODUCTS_DATABASE.reduce((sum, item) => {
    return sum + calculateProductItemWater(item, productsState[item.id], isAnnual);
  }, 0);

  const directCalc = calculateDirectWater(directState);
  const directSubtotal = directCalc.total;
  const liveTotal = Math.round(foodSubtotal + productsSubtotal + directSubtotal);

  // Handle Input Changes with strict non-negative validation
  const handleFoodChange = (id, value) => {
    const num = value === '' ? '' : Math.max(0, parseFloat(value) || 0);
    setFoodState((prev) => ({ ...prev, [id]: num }));
    setSelectedPreset(null);
  };

  const handleProductChange = (id, value) => {
    const num = value === '' ? '' : Math.max(0, parseFloat(value) || 0);
    setProductsState((prev) => ({ ...prev, [id]: num }));
    setSelectedPreset(null);
  };

  const handleDirectChange = (field, value) => {
    const num = value === '' ? '' : Math.max(0, parseFloat(value) || 0);
    setDirectState((prev) => ({ ...prev, [field]: num }));
    setSelectedPreset(null);
  };

  // Load preset scenario
  const applyPreset = (preset) => {
    setFoodState(preset.food);
    setProductsState(preset.products);
    setProductsMode(preset.productsMode || 'annual_amortized');
    setDirectState(preset.direct);
    setSelectedPreset(preset.id);
  };

  return (
    <section id="calculator" className="py-16 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/70 border border-cyan-200 text-cyan-800 text-xs font-semibold mb-3">
            <Sliders className="w-3.5 h-3.5 text-cyan-700" />
            Interactive Footprint Modeler
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Daily Water Footprint Calculator
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Enter your daily diet, consumer items, and direct household water habits. Calculations are generated instantly using academic water footprint factors.
          </p>
        </div>

        {/* Preset Scenarios Selector Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider">
                Quick Demo Presets (1-Click Load)
              </span>
            </div>
            <span className="text-xs text-slate-500">
              Select a profile or customize any field below
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PRESET_PROFILES.map((preset) => {
              const isSelected = selectedPreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-cyan-50/80 border-cyan-400 ring-2 ring-cyan-400/20 shadow-xs'
                      : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-slate-900">{preset.name}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        preset.id === 'meat_heavy'
                          ? 'bg-rose-100 text-rose-700'
                          : preset.id === 'plant_saver'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {preset.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-snug line-clamp-2">{preset.tagline}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Calculator Main Tabs Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('food')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'food'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>1. Food (Virtual Water)</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'food' ? 'bg-cyan-700/80 text-cyan-100' : 'bg-slate-100 text-slate-600'}`}>
              {formatLitres(foodSubtotal)}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>2. Products (Virtual Water)</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'products' ? 'bg-cyan-700/80 text-cyan-100' : 'bg-slate-100 text-slate-600'}`}>
              {formatLitres(productsSubtotal)}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('direct')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'direct'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Droplet className="w-4 h-4" />
            <span>3. Direct Water Usage</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'direct' ? 'bg-cyan-700/80 text-cyan-100' : 'bg-slate-100 text-slate-600'}`}>
              {formatLitres(directSubtotal)}
            </span>
          </button>
        </div>

        {/* Tab 1: Food Section */}
        {activeTab === 'food' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>🥗 Daily Food Intake</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Virtual water required for crop irrigation, livestock feed, and food processing.
                </p>
              </div>
              <div className="px-4 py-2 bg-cyan-50 rounded-2xl border border-cyan-100 flex items-center gap-2">
                <span className="text-xs font-semibold text-cyan-800">Food Subtotal:</span>
                <span className="text-base font-extrabold text-cyan-900">{formatLitres(foodSubtotal)}/day</span>
              </div>
            </div>

            {/* Food Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {FOOD_DATABASE.map((item) => {
                const currentVal = foodState[item.id] !== undefined ? foodState[item.id] : '';
                const calculatedL = calculateFoodItemWater(item, currentVal);

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-50/60 border border-slate-200/80 hover:border-cyan-300 hover:bg-cyan-50/20 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl" role="img" aria-label={item.name}>
                            {item.icon}
                          </span>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                            <div className="text-[11px] text-slate-400">{item.category}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-extrabold text-cyan-800">
                            {formatLitres(calculatedL)}
                          </div>
                          <div className="text-[10px] text-slate-400">virtual water</div>
                        </div>
                      </div>

                      {/* Input field with unit label */}
                      <div className="relative mt-2">
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={currentVal}
                          onChange={(e) => handleFoodChange(item.id, e.target.value)}
                          placeholder="0"
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all pr-24"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 pointer-events-none">
                          {item.unitLabel}
                        </span>
                      </div>

                      {/* Quick preset chips */}
                      {item.quickSuggestions && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.quickSuggestions.map((sug, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => handleFoodChange(item.id, sug.amount)}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-slate-600 hover:bg-cyan-50 hover:text-cyan-800 hover:border-cyan-200 transition-colors"
                            >
                              {sug.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200/50 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="truncate" title={item.description}>
                        Factor: ~{item.factorPerKg ? `${formatNumber(item.factorPerKg)} L/kg` : item.factorPerLitre ? `${formatNumber(item.factorPerLitre)} L/L` : `${item.factorPerCup || item.factorPerUnit} L/unit`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Products Section */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>🛍️ Manufactured Products & Apparel</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Embedded virtual water used for raw crop cultivation, chemical processing, dyeing, and manufacturing.
                </p>
              </div>

              {/* Mode Switcher: Annual Purchases vs Direct Instant Count */}
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setProductsMode('annual_amortized')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isAnnual ? 'bg-white text-cyan-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Spreads the water footprint of your annual purchases across 365 daily days"
                >
                  Annual Purchases (Prorated/Day)
                </button>
                <button
                  onClick={() => setProductsMode('direct_item')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    !isAnnual ? 'bg-white text-cyan-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Calculates full footprint of items consumed/purchased today"
                >
                  Direct Item Count
                </button>
              </div>
            </div>

            <div className="mb-4 p-3.5 bg-blue-50/60 rounded-2xl border border-blue-100 flex items-start gap-2.5 text-xs text-blue-900">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Methodology Note:</span>{' '}
                {isAnnual
                  ? 'In Annual Mode, enter how many of each item you buy in a typical year. The calculator divides by 365 to reflect your daily average virtual water footprint.'
                  : 'In Direct Count Mode, enter the exact number of items purchased or consumed today.'}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PRODUCTS_DATABASE.map((item) => {
                const currentVal = productsState[item.id] !== undefined ? productsState[item.id] : '';
                const calculatedL = calculateProductItemWater(item, currentVal, isAnnual);

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-50/60 border border-slate-200/80 hover:border-cyan-300 hover:bg-cyan-50/20 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl" role="img" aria-label={item.name}>
                            {item.icon}
                          </span>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                            <div className="text-[11px] text-slate-400">{item.category}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-extrabold text-cyan-800">
                            {formatLitres(calculatedL)}/day
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {formatNumber(item.factorPerUnit)} L / item
                          </div>
                        </div>
                      </div>

                      {/* Input field */}
                      <div className="relative mt-2">
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={currentVal}
                          onChange={(e) => handleProductChange(item.id, e.target.value)}
                          placeholder="0"
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all pr-24"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 pointer-events-none">
                          {isAnnual ? 'items / year' : 'items today'}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200/50 text-[11px] text-slate-500">
                      <p className="line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Direct Water Usage Section */}
        {activeTab === 'direct' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>🚿 Direct Household Water Consumption</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Direct water consumed through showers, laundry cycles, and household taps.
                </p>
              </div>
              <div className="px-4 py-2 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-2">
                <span className="text-xs font-semibold text-blue-800">Direct Subtotal:</span>
                <span className="text-base font-extrabold text-blue-900">{formatLitres(directSubtotal)}/day</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 1. Shower */}
              <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/90 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-2xl">🚿</span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">Showering</h4>
                      <span className="text-xs text-cyan-700 font-semibold">
                        {formatLitres((directState.showerCount || 0) * (directState.showerLitres || 0))}/day
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-600 mb-1 block">
                        Number of Showers per Day
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={directState.showerCount !== undefined ? directState.showerCount : ''}
                        onChange={(e) => handleDirectChange('showerCount', e.target.value)}
                        placeholder="1"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-600 mb-1 block">
                        Average Litres per Shower
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={directState.showerLitres !== undefined ? directState.showerLitres : ''}
                        onChange={(e) => handleDirectChange('showerLitres', e.target.value)}
                        placeholder="65"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>

                    {/* Presets */}
                    <div className="pt-2">
                      <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase">Quick Presets:</span>
                      <div className="flex flex-col gap-1">
                        {DIRECT_WATER_CONFIG.shower.presets.map((p, pIdx) => (
                          <button
                            key={pIdx}
                            onClick={() => handleDirectChange('showerLitres', p.litres)}
                            className="text-left text-[11px] px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:border-cyan-300 hover:text-cyan-800 transition-colors"
                          >
                            {p.label} ({p.litres} L)
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Laundry */}
              <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/90 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-2xl">🧺</span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">Washing Clothes</h4>
                      <span className="text-xs text-cyan-700 font-semibold">
                        {formatLitres(directCalc.laundry)}/day
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-600 mb-1 block">
                        Washing Cycles per Week
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={directState.laundryCyclesWeekly !== undefined ? directState.laundryCyclesWeekly : ''}
                        onChange={(e) => handleDirectChange('laundryCyclesWeekly', e.target.value)}
                        placeholder="3"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-600 mb-1 block">
                        Average Litres per Cycle
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={directState.laundryLitres !== undefined ? directState.laundryLitres : ''}
                        onChange={(e) => handleDirectChange('laundryLitres', e.target.value)}
                        placeholder="60"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>

                    {/* Presets */}
                    <div className="pt-2">
                      <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase">Machine Type:</span>
                      <div className="flex flex-col gap-1">
                        {DIRECT_WATER_CONFIG.laundry.presets.map((p, pIdx) => (
                          <button
                            key={pIdx}
                            onClick={() => handleDirectChange('laundryLitres', p.litres)}
                            className="text-left text-[11px] px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:border-cyan-300 hover:text-cyan-800 transition-colors"
                          >
                            {p.label} ({p.litres} L)
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Household */}
              <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/90 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-2xl">🚰</span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">Household & Taps</h4>
                      <span className="text-xs text-cyan-700 font-semibold">
                        {formatLitres(directCalc.household)}/day
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-600 mb-1 block">
                        Toilets, Cooking & Tap Usage (Litres/Day)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={directState.householdLitres !== undefined ? directState.householdLitres : ''}
                        onChange={(e) => handleDirectChange('householdLitres', e.target.value)}
                        placeholder="85"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>

                    {/* Presets */}
                    <div className="pt-2">
                      <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase">Habit Benchmarks:</span>
                      <div className="flex flex-col gap-1">
                        {DIRECT_WATER_CONFIG.household.presets.map((p, pIdx) => (
                          <button
                            key={pIdx}
                            onClick={() => handleDirectChange('householdLitres', p.litres)}
                            className="text-left text-[11px] px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:border-cyan-300 hover:text-cyan-800 transition-colors"
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Total Calculation Display Card */}
        <div className="mt-8 bg-gradient-to-r from-slate-900 via-cyan-950 to-blue-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 border border-cyan-800/40">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Live Total Calculation
            </div>
            <div className="text-sm text-slate-300">
              Food ({formatLitres(foodSubtotal)}) + Products ({formatLitres(productsSubtotal)}) + Direct ({formatLitres(directSubtotal)})
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 flex items-center justify-center lg:justify-start gap-2">
              <span>{formatNumber(liveTotal)} Litres / day</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onReset}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer border border-white/10"
              title="Reset all inputs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Calculator</span>
            </button>

            <button
              onClick={onCalculate}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold text-sm sm:text-base shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-102 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Calculate & View Dashboard</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
