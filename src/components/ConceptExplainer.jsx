import React, { useState } from 'react';
import { 
  Droplet, 
  Layers, 
  HelpCircle, 
  CheckCircle2, 
  Info, 
  Sparkles, 
  CloudRain, 
  Waves, 
  Filter,
  ArrowRight
} from 'lucide-react';

export default function ConceptExplainer({ onGoToCalculator }) {
  const [activeTab, setActiveTab] = useState('comparison');

  return (
    <section id="concepts" className="py-16 md:py-24 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold mb-3">
            <Info className="w-3.5 h-3.5 text-cyan-600" />
            Educational Primer
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Understanding Virtual Water vs. Direct Water
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Water is hidden in everything we buy, wear, and eat. Learn how researchers define and measure personal water footprints.
          </p>

          {/* Sub-tab navigation */}
          <div className="flex justify-center mt-6">
            <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
              <button
                onClick={() => setActiveTab('comparison')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'comparison'
                    ? 'bg-white text-cyan-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Direct vs. Virtual Water
              </button>
              <button
                onClick={() => setActiveTab('colors')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'colors'
                    ? 'bg-white text-cyan-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                The 3 Colors of Water (Green, Blue, Grey)
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Direct vs Virtual Water Comparison */}
        {activeTab === 'comparison' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Card 1: Direct Water */}
            <div className="bg-gradient-to-b from-blue-50/50 to-white rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-5 shadow-md shadow-blue-500/20">
                  <Droplet className="w-6 h-6 fill-white" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">The Visible ~4%</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-3">Direct Water Usage</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Water that flows straight out of a tap or pipe in your home or residence for immediate human use.
                </p>

                <div className="space-y-3 bg-white p-4 rounded-2xl border border-blue-100/80 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">🚿</span>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Showers & Baths</div>
                      <div className="text-xs text-slate-500">~60–100 litres per standard shower</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg">🧺</span>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Laundry & Clothes Washing</div>
                      <div className="text-xs text-slate-500">~50–110 litres per washing cycle</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg">🚰</span>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Toilets & Faucets</div>
                      <div className="text-xs text-slate-500">~6–9 litres per flush; ~10–25 L dishwashing</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-100/50 rounded-xl text-xs text-blue-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Easily measurable using residential utility water meters.</span>
              </div>
            </div>

            {/* Card 2: Virtual Water */}
            <div className="bg-gradient-to-b from-cyan-50/50 to-white rounded-3xl p-6 sm:p-8 border border-cyan-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-l from-cyan-600 to-teal-600 text-white text-[11px] font-bold rounded-bl-2xl uppercase tracking-wider">
                Key Focus
              </div>

              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-600 text-white flex items-center justify-center mb-5 shadow-md shadow-cyan-500/20">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">The Hidden ~96%</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-3">Virtual Water (Embedded)</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  The cumulative volume of freshwater used to grow crops, raise livestock, manufacture goods, and process energy throughout the entire supply chain.
                </p>

                <div className="space-y-3 bg-white p-4 rounded-2xl border border-cyan-100/80 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">🥩</span>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Food & Agriculture</div>
                      <div className="text-xs text-slate-500">1 kg Beef = 15,415 L; 1 kg Rice = 2,497 L</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg">☕</span>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Beverages</div>
                      <div className="text-xs text-slate-500">1 Cup Coffee = 140 L; 1 Litre Milk = 1,020 L</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg">👖</span>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Apparel & Consumer Goods</div>
                      <div className="text-xs text-slate-500">1 Pair Jeans = 8,000 L; 1 T-Shirt = 2,495 L</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-cyan-100/60 rounded-xl text-xs text-cyan-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-700 shrink-0" />
                <span>Coined by Prof. Tony Allan in 1993 to quantify international trade water dependency.</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: The Three Colors of Water */}
        {activeTab === 'colors' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Green Water */}
            <div className="bg-emerald-50/50 rounded-3xl p-6 border border-emerald-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-sm">
                  <CloudRain className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">Rainwater in Soil</div>
                <h4 className="text-xl font-bold text-slate-900 mt-0.5 mb-2">Green Water</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Water from precipitation that is stored in the root zone of the soil and evaporated, transpired, or incorporated by plants.
                </p>
                <div className="p-3 bg-white rounded-xl border border-emerald-100 text-xs text-slate-600 space-y-1">
                  <div className="font-semibold text-emerald-800">Typical Examples:</div>
                  <div>• Rain-fed wheat, cocoa, and pasture grass</div>
                  <div>• Rainwater for forest timber growth</div>
                </div>
              </div>
              <div className="mt-4 text-[11px] font-medium text-emerald-800 bg-emerald-100/60 px-3 py-1.5 rounded-lg text-center">
                Natural & Non-extractive
              </div>
            </div>

            {/* Blue Water */}
            <div className="bg-sky-50/50 rounded-3xl p-6 border border-sky-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center mb-4 shadow-sm">
                  <Waves className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-sky-700">Surface & Groundwater</div>
                <h4 className="text-xl font-bold text-slate-900 mt-0.5 mb-2">Blue Water</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Water sourced from surface water bodies (rivers, lakes, reservoirs) or aquifers (groundwater) used for irrigation and industry.
                </p>
                <div className="p-3 bg-white rounded-xl border border-sky-100 text-xs text-slate-600 space-y-1">
                  <div className="font-semibold text-sky-800">Typical Examples:</div>
                  <div>• Canal & tube-well irrigation for paddy rice</div>
                  <div>• Municipal tap water supply and showers</div>
                </div>
              </div>
              <div className="mt-4 text-[11px] font-medium text-sky-800 bg-sky-100/60 px-3 py-1.5 rounded-lg text-center">
                Competes with local ecosystems
              </div>
            </div>

            {/* Grey Water */}
            <div className="bg-slate-100/70 rounded-3xl p-6 border border-slate-300/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-600 text-white flex items-center justify-center mb-4 shadow-sm">
                  <Filter className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">Pollution Dilution</div>
                <h4 className="text-xl font-bold text-slate-900 mt-0.5 mb-2">Grey Water</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  The volume of freshwater required to assimilate and dilute pollutants to maintain ambient water quality standards.
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                  <div className="font-semibold text-slate-800">Typical Examples:</div>
                  <div>• Fertilizer/pesticide runoff from agriculture</div>
                  <div>• Chemical dye effluents in textile finishing</div>
                </div>
              </div>
              <div className="mt-4 text-[11px] font-medium text-slate-800 bg-slate-200/80 px-3 py-1.5 rounded-lg text-center">
                Indicator of chemical pollution load
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA to calculator */}
        <div className="mt-12 text-center">
          <button
            onClick={onGoToCalculator}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors cursor-pointer shadow-md"
          >
            <span>Ready to calculate your lifestyle's footprint?</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>
    </section>
  );
}
