import React from 'react';
import { 
  Droplets, 
  Layers, 
  Droplet, 
  Award, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight, 
  Share2, 
  Printer, 
  RotateCcw,
  Sparkles,
  Bath,
  Coffee,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { 
  FOOD_DATABASE, 
  PRODUCTS_DATABASE, 
  GLOBAL_BENCHMARKS, 
  calculateFoodItemWater, 
  calculateProductItemWater, 
  calculateDirectWater, 
  formatLitres, 
  formatNumber 
} from '../data/waterFootprintData';

export default function Dashboard({
  foodState,
  productsState,
  productsMode,
  directState,
  onModifyInputs,
  onReset
}) {
  // 1. Calculate Food Items
  const foodItemsCalculated = FOOD_DATABASE.map((item) => {
    const litres = calculateFoodItemWater(item, foodState[item.id]);
    return {
      id: item.id,
      name: item.name,
      icon: item.icon,
      category: 'Food',
      litres: Math.round(litres * 10) / 10,
      breakdown: item.waterBreakdown,
    };
  }).filter((i) => i.litres > 0);

  const totalFoodWater = foodItemsCalculated.reduce((acc, i) => acc + i.litres, 0);

  // 2. Calculate Products Items
  const isAnnual = productsMode === 'annual_amortized';
  const productItemsCalculated = PRODUCTS_DATABASE.map((item) => {
    const litres = calculateProductItemWater(item, productsState[item.id], isAnnual);
    return {
      id: item.id,
      name: item.name,
      icon: item.icon,
      category: 'Products',
      litres: Math.round(litres * 10) / 10,
      breakdown: item.waterBreakdown,
    };
  }).filter((i) => i.litres > 0);

  const totalProductsWater = productItemsCalculated.reduce((acc, i) => acc + i.litres, 0);

  // 3. Calculate Direct Water
  const directCalc = calculateDirectWater(directState);
  const directItems = [
    { id: 'shower', name: 'Showers', icon: '🚿', category: 'Direct Usage', litres: directCalc.shower },
    { id: 'laundry', name: 'Laundry', icon: '🧺', category: 'Direct Usage', litres: directCalc.laundry },
    { id: 'household', name: 'Household Taps', icon: '🚰', category: 'Direct Usage', litres: directCalc.household },
  ].filter((i) => i.litres > 0);

  const totalDirectWater = directCalc.total;

  // 4. Totals & High-Level Breakdown
  const totalVirtualWater = Math.round((totalFoodWater + totalProductsWater) * 10) / 10;
  const totalWaterFootprint = Math.round((totalVirtualWater + totalDirectWater) * 10) / 10;

  // All individual items combined for ranking
  const allItems = [...foodItemsCalculated, ...productItemsCalculated, ...directItems].sort(
    (a, b) => b.litres - a.litres
  );

  const largestContributor = allItems.length > 0 ? allItems[0] : { name: 'None', litres: 0, icon: '💧' };
  const largestContributorPercent = totalWaterFootprint > 0 
    ? Math.round((largestContributor.litres / totalWaterFootprint) * 100) 
    : 0;

  // Category percentages
  const foodPercent = totalWaterFootprint > 0 ? Math.round((totalFoodWater / totalWaterFootprint) * 100) : 0;
  const productsPercent = totalWaterFootprint > 0 ? Math.round((totalProductsWater / totalWaterFootprint) * 100) : 0;
  const directPercent = totalWaterFootprint > 0 ? Math.max(0, 100 - foodPercent - productsPercent) : 0;

  const categoryChartData = [
    { name: 'Food (Virtual)', value: Math.round(totalFoodWater), percent: foodPercent, color: '#0284c7' },
    { name: 'Products (Virtual)', value: Math.round(totalProductsWater), percent: productsPercent, color: '#0d9488' },
    { name: 'Direct Usage', value: Math.round(totalDirectWater), percent: directPercent, color: '#6366f1' },
  ].filter(d => d.value > 0);

  // Top Items for Bar Chart (Top 6)
  const barChartData = allItems.slice(0, 7).map((item) => ({
    name: `${item.icon || ''} ${item.name}`,
    litres: Math.round(item.litres),
    category: item.category,
  }));

  // Context Comparison vs Global Average
  const globalBenchmark = GLOBAL_BENCHMARKS.globalAverageDailyLitres; // 3,800 L
  const diffFromGlobal = Math.round(((totalWaterFootprint - globalBenchmark) / globalBenchmark) * 100);
  const isBelowAverage = totalWaterFootprint <= globalBenchmark;

  // Real-world Equivalencies
  const bathtubsCount = Math.round(totalWaterFootprint / 150); // 1 bathtub ~150 L
  const bottlesCount = Math.round(totalWaterFootprint / 0.5); // 500ml bottles
  const humanDrinkingDays = Math.round(totalWaterFootprint / 2.5); // ~2.5 L/day drinking

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="dashboard" className="py-16 md:py-24 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/70 border border-cyan-200 text-cyan-800 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-700" />
              Calculated Personal Footprint Report
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Personal Water Footprint Dashboard
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Detailed breakdown of your direct and virtual water consumption profile.
            </p>
          </div>

          <div className="flex items-center gap-2.5 no-print">
            <button
              onClick={onModifyInputs}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Modify Inputs</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* 1. Main Statistic Hero Highlight */}
        <div className="bg-gradient-to-br from-blue-900 via-cyan-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden mb-8 border border-cyan-700/30">
          {/* Background water ripple graphics */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-cyan-300 text-xs sm:text-sm font-bold tracking-wider uppercase">
                <Droplets className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                <span>Your Daily Water Footprint</span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white">
                  {formatNumber(totalWaterFootprint)}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-cyan-300">Litres / day</span>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Annual equivalent: <span className="font-bold text-white">{formatNumber(Math.round(totalWaterFootprint * 365))} L/year</span> (~{Math.round((totalWaterFootprint * 365) / 1000)} m³ of water annually).
              </p>

              {/* Benchmark comparison badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm">
                {isBelowAverage ? (
                  <>
                    <TrendingDown className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300 font-semibold">
                      {Math.abs(diffFromGlobal)}% below
                    </span>{' '}
                    <span>the global average per capita (~3,800 L/day)</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-300 font-semibold">
                      +{diffFromGlobal}% above
                    </span>{' '}
                    <span>the global average per capita (~3,800 L/day)</span>
                  </>
                )}
              </div>
            </div>

            {/* Quick Context & Equivalency */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3 bg-white/5 p-4 sm:p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="p-3 bg-white/5 rounded-xl">
                <div className="flex items-center gap-1.5 text-cyan-300 text-xs mb-1">
                  <Bath className="w-3.5 h-3.5" />
                  <span>Bathtubs</span>
                </div>
                <div className="text-xl font-bold text-white">~{formatNumber(bathtubsCount)}</div>
                <div className="text-[10px] text-slate-400">full tubs (150L each)</div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl">
                <div className="flex items-center gap-1.5 text-cyan-300 text-xs mb-1">
                  <Droplet className="w-3.5 h-3.5" />
                  <span>Bottles</span>
                </div>
                <div className="text-xl font-bold text-white">~{formatNumber(bottlesCount)}</div>
                <div className="text-[10px] text-slate-400">500ml water bottles</div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl col-span-2">
                <div className="flex items-center gap-1.5 text-cyan-300 text-xs mb-1">
                  <Coffee className="w-3.5 h-3.5" />
                  <span>Drinking Days</span>
                </div>
                <div className="text-lg font-bold text-white">
                  Equal to ~{formatNumber(humanDrinkingDays)} days
                </div>
                <div className="text-[10px] text-slate-400">
                  of essential human survival drinking water (~2.5L/day)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Four Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card 1: Total Footprint */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-cyan-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">💧 Total Footprint</span>
              <span className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center text-sm">
                100%
              </span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 mb-1">
              {formatLitres(totalWaterFootprint)}
            </div>
            <p className="text-xs text-slate-500">Virtual + Direct Combined</p>
          </div>

          {/* Card 2: Virtual Water */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-cyan-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">🌊 Virtual Water</span>
              <span className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-700 font-bold flex items-center justify-center text-xs">
                {totalWaterFootprint > 0 ? Math.round((totalVirtualWater / totalWaterFootprint) * 100) : 0}%
              </span>
            </div>
            <div className="text-2xl font-extrabold text-cyan-800 mb-1">
              {formatLitres(totalVirtualWater)}
            </div>
            <p className="text-xs text-slate-500">Food & Products Supply Chain</p>
          </div>

          {/* Card 3: Direct Water */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-indigo-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">🚿 Direct Water</span>
              <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center text-xs">
                {directPercent}%
              </span>
            </div>
            <div className="text-2xl font-extrabold text-indigo-800 mb-1">
              {formatLitres(totalDirectWater)}
            </div>
            <p className="text-xs text-slate-500">Showers, Laundry & Taps</p>
          </div>

          {/* Card 4: Largest Contributor */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-amber-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">📌 Largest Contributor</span>
              <span className="text-xl">{largestContributor.icon || '📌'}</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900 truncate mb-1" title={largestContributor.name}>
              {largestContributor.name}
            </div>
            <p className="text-xs text-slate-500">
              {formatLitres(largestContributor.litres)} ({largestContributorPercent}% of total)
            </p>
          </div>
        </div>

        {/* 3. Interactive Charts Section: Donut (Category) & Bar Chart (Items) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Left Chart: Category Breakdown Donut */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">Category Breakdown</h3>
                <span className="text-xs text-slate-400">Share of total footprint</span>
              </div>

              <div className="h-64 w-full flex items-center justify-center">
                {categoryChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={95}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {categoryChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        formatter={(val, name) => [`${formatNumber(val)} L (${Math.round((val / totalWaterFootprint) * 100)}%)`, name]}
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-slate-400 text-sm">No active inputs entered</div>
                )}
              </div>
            </div>

            {/* Custom Legend */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium text-slate-700">
                  <span className="w-3 h-3 rounded-full bg-cyan-600"></span>
                  Food (Virtual)
                </span>
                <span className="font-bold text-slate-900">
                  {formatLitres(totalFoodWater)} ({foodPercent}%)
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium text-slate-700">
                  <span className="w-3 h-3 rounded-full bg-teal-600"></span>
                  Products (Virtual)
                </span>
                <span className="font-bold text-slate-900">
                  {formatLitres(totalProductsWater)} ({productsPercent}%)
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium text-slate-700">
                  <span className="w-3 h-3 rounded-full bg-indigo-600"></span>
                  Direct Water Usage
                </span>
                <span className="font-bold text-slate-900">
                  {formatLitres(totalDirectWater)} ({directPercent}%)
                </span>
              </div>
            </div>
          </div>

          {/* Right Chart: Top Contributing Items Bar Chart */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">Top Water Consuming Items</h3>
                <span className="text-xs text-slate-400">Ranked by daily litres</span>
              </div>

              <div className="h-64 w-full">
                {barChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={barChartData}
                      layout="vertical"
                      margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                      <XAxis type="number" tickFormatter={(v) => `${v}L`} stroke="#94a3b8" fontSize={11} />
                      <YAxis dataKey="name" type="category" width={110} stroke="#64748b" fontSize={11} />
                      <RechartsTooltip
                        formatter={(val) => [`${formatNumber(val)} Litres/day`, 'Water Footprint']}
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
                      />
                      <Bar dataKey="litres" fill="#0284c7" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                    Enter items in the calculator above to see your ranked bar chart
                  </div>
                )}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-500 flex items-center justify-between mt-4">
              <span>* Reflects highest daily impact contributors from your food and lifestyle.</span>
            </div>
          </div>
        </div>

        {/* 4. Personalized Recommendations Card */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl p-6 sm:p-8 border border-emerald-200/80 shadow-xs">
          <div className="flex items-center gap-2.5 mb-4 text-emerald-900">
            <Lightbulb className="w-5 h-5 text-emerald-600" />
            <h3 className="text-xl font-bold">Personalized Actionable Reduction Tips</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 bg-white/80 rounded-2xl border border-emerald-100 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                Food & Diet Switch
              </div>
              <div className="text-sm font-semibold text-slate-900 mb-1">
                Swap 1 Red Meat meal weekly
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Replacing 200g of beef with chicken, lentils, or beans saves approximately <span className="font-bold text-emerald-700">~2,200 to 2,800 litres</span> in a single meal.
              </p>
            </div>

            <div className="p-4 bg-white/80 rounded-2xl border border-emerald-100 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-teal-800 mb-1">
                Mindful Consumerism
              </div>
              <div className="text-sm font-semibold text-slate-900 mb-1">
                Extend Garment Life by 9 Months
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Extending the active life of jeans and cotton clothing by just 9 months reduces their annual water footprint by <span className="font-bold text-teal-700">~20–30%</span>.
              </p>
            </div>

            <div className="p-4 bg-white/80 rounded-2xl border border-emerald-100 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-800 mb-1">
                Direct Water Savings
              </div>
              <div className="text-sm font-semibold text-slate-900 mb-1">
                Install Aerators & 5-Min Showers
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                A simple aerator or trimming 3 minutes off your daily shower conserves <span className="font-bold text-cyan-700">~25 litres of direct water every single day</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Item Breakdown Table */}
        <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Complete Input Line Items</h3>
            <span className="text-xs text-slate-400">{allItems.length} active items recorded</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-2">Item</th>
                  <th className="py-3 px-2">Category</th>
                  <th className="py-3 px-2 text-right">Daily Water (L)</th>
                  <th className="py-3 px-2 text-right">% of Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {allItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-2 font-medium text-slate-900 flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </td>
                    <td className="py-2.5 px-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.category === 'Food'
                          ? 'bg-blue-50 text-blue-700'
                          : item.category === 'Products'
                          ? 'bg-teal-50 text-teal-700'
                          : 'bg-indigo-50 text-indigo-700'
                      }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-right font-extrabold text-slate-900">
                      {formatNumber(item.litres)} L
                    </td>
                    <td className="py-2.5 px-2 text-right text-slate-500 font-semibold">
                      {totalWaterFootprint > 0 ? ((item.litres / totalWaterFootprint) * 100).toFixed(1) : 0}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
