import React, { useState } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  Calculator, 
  FileText, 
  AlertTriangle, 
  Search, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { FOOD_DATABASE, PRODUCTS_DATABASE, formatNumber } from '../data/waterFootprintData';

export default function Methodology() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const combinedItems = [
    ...FOOD_DATABASE.map(f => ({
      ...f,
      type: 'Food',
      factorDisplay: f.factorPerKg 
        ? `${formatNumber(f.factorPerKg)} L / kg (${f.factorPerGram} L/g)`
        : f.factorPerLitre
        ? `${formatNumber(f.factorPerLitre)} L / litre`
        : `${f.factorPerCup || f.factorPerUnit} L / unit`
    })),
    ...PRODUCTS_DATABASE.map(p => ({
      ...p,
      type: 'Products',
      factorDisplay: `${formatNumber(p.factorPerUnit)} L / item`
    }))
  ];

  const filteredItems = combinedItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCategory === 'all' || item.type.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <section id="methodology" className="py-16 md:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
            Academic Rigor & Scientific Foundations
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Sources & Methodology
          </h2>
          <p className="mt-3 text-base text-slate-600">
            A transparent overview of the mathematical formulation, definitions, data sources, and academic references powering the WaterPrint model.
          </p>
        </div>

        {/* 1. Core Concepts & Definitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span>🌾 What is Virtual Water?</span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              The concept of <strong className="text-slate-800">Virtual Water</strong> was introduced in 1993 by <strong>Professor John Anthony Allan</strong> (King's College London and SOAS, 2008 Stockholm Water Prize Laureate). It defines the total volume of freshwater consumed, evaporated, or polluted in the step-by-step production of agricultural commodities and manufactured goods.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span>💧 What is a Water Footprint?</span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Developed in 2002 by <strong>Prof. Arjen Y. Hoekstra</strong> (University of Twente / Water Footprint Network), the <strong className="text-slate-800">Water Footprint</strong> is an indicator of freshwater appropriation that measures both direct water use by a consumer or producer, as well as the indirect virtual water footprint along the entire supply chain.
            </p>
          </div>
        </div>

        {/* 2. Mathematical Calculation Formulas */}
        <div className="bg-gradient-to-br from-slate-900 to-cyan-950 text-white rounded-3xl p-6 sm:p-8 mb-12 shadow-lg border border-cyan-800/50">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-4 h-4" />
            Mathematical Logic & Calculation Pipeline
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-6">How Calculations are Performed</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="font-bold text-cyan-300 mb-1">Step 1: Item Footprint</div>
              <div className="p-2.5 bg-black/30 rounded-xl font-mono text-[11px] text-cyan-200 mb-2">
                Water Footprint = Quantity × Water Footprint per Unit
              </div>
              <p className="text-slate-300 text-xs">
                Each food portion or product quantity is multiplied by its global average virtual water coefficient.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="font-bold text-cyan-300 mb-1">Step 2: Total Virtual Water</div>
              <div className="p-2.5 bg-black/30 rounded-xl font-mono text-[11px] text-cyan-200 mb-2">
                Total Virtual Water = Food Water + Product Water
              </div>
              <p className="text-slate-300 text-xs">
                Aggregates the total embedded water across all dietary items and amortized durable consumer goods.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="font-bold text-cyan-300 mb-1">Step 3: Total Water Footprint</div>
              <div className="p-2.5 bg-black/30 rounded-xl font-mono text-[11px] text-cyan-200 mb-2">
                Total Footprint = Total Virtual Water + Direct Water
              </div>
              <p className="text-slate-300 text-xs">
                Direct municipal water from showering, clothes washing, and household faucets is summed with virtual water.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Academic Sources & Citations */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-700" />
            Primary Peer-Reviewed Sources & Datasets
          </h3>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-cyan-700">Crops & Crop Products Dataset</div>
                <div className="text-sm font-semibold text-slate-900">
                  Mekonnen, M.M. and Hoekstra, A.Y. (2011)
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  <em>"The green, blue and grey water footprint of crops and derived crop products"</em>, Hydrology and Earth System Sciences, 15(5): 1577–1600.
                </p>
              </div>
              <span className="text-[11px] px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg shrink-0 font-mono">
                UNESCO-IHE
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-cyan-700">Farm Animal Products Dataset</div>
                <div className="text-sm font-semibold text-slate-900">
                  Mekonnen, M.M. and Hoekstra, A.Y. (2012)
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  <em>"A Global Assessment of the Water Footprint of Farm Animal Products"</em>, Ecosystems, 15(3): 401–415.
                </p>
              </div>
              <span className="text-[11px] px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg shrink-0 font-mono">
                Springer
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-cyan-700">Standard Product Gallery & WaterStat</div>
                <div className="text-sm font-semibold text-slate-900">
                  Water Footprint Network (WFN)
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Global Water Assessment Database, University of Twente and WFN Research Partners.
                </p>
              </div>
              <span className="text-[11px] px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg shrink-0 font-mono">
                WFN Database
              </span>
            </div>
          </div>
        </div>

        {/* 4. Disclaimer Note on Approximate Estimates */}
        <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-900 flex items-start gap-3 text-xs sm:text-sm mb-12">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Estimation Disclaimer:</span>{' '}
            All water footprint metrics presented in this application are <strong>approximate estimates</strong> based on global production-weighted averages. Real-world water intensity fluctuates significantly based on geographic origin, local climatic conditions (rainfall vs arid regions), agricultural irrigation technology (drip vs flood irrigation), and local supply chain logistics.
          </div>
        </div>

        {/* 5. Interactive Dataset Lookup Table */}
        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/90">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Embedded Dataset Reference Table</h3>
              <p className="text-xs text-slate-500">Explore all factors used in the calculator.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search item or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-48 sm:w-56"
                />
              </div>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="food">Food Items</option>
                <option value="products">Consumer Products</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200/80">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Item Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Standard Footprint Factor</th>
                  <th className="py-3 px-4">Water Type Breakdown (Green / Blue / Grey)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-500">{item.category}</td>
                    <td className="py-2.5 px-4 font-semibold text-cyan-800 font-mono">
                      {item.factorDisplay}
                    </td>
                    <td className="py-2.5 px-4">
                      {item.waterBreakdown ? (
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="text-emerald-700 font-medium">🌿 {item.waterBreakdown.green}%</span>
                          <span className="text-sky-700 font-medium">💧 {item.waterBreakdown.blue}%</span>
                          <span className="text-slate-600 font-medium">⚙️ {item.waterBreakdown.grey}%</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[10px]">Standard WFN factor</span>
                      )}
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
