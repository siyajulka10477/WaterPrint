import React from 'react';
import { ArrowRight, Droplets, Sparkles, Eye, Waves, ShieldCheck, HelpCircle } from 'lucide-react';

export default function Hero({ onStartCalculation, onExploreConcepts }) {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-sky-50/80 via-white to-slate-50">
      {/* Background Decorative Gradients & Water Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none opacity-40">
        <div className="absolute -top-12 left-1/4 w-96 h-96 bg-cyan-300/40 rounded-full blur-3xl mix-blend-multiply animate-float"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl mix-blend-multiply"></div>
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100/70 border border-cyan-200 text-cyan-800 text-xs sm:text-sm font-semibold mb-6 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
            Academic-Standard Environmental Analysis Tool
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
            How much water does your{' '}
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
              lifestyle really use?
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-8 max-w-2xl mx-auto">
            Discover the hidden water behind the food you eat, the products you use, and the water you consume every day.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={onStartCalculation}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-700 text-white font-semibold text-base shadow-lg shadow-cyan-600/25 hover:shadow-cyan-600/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span>Calculate My Water Footprint</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreConcepts}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white text-slate-700 font-semibold text-base border border-slate-200 hover:border-cyan-300 hover:bg-slate-50/80 shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <HelpCircle className="w-5 h-5 text-cyan-600" />
              <span>Direct vs Virtual Water</span>
            </button>
          </div>

          {/* Quick Real-World Teasers / Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-xs hover:border-cyan-300 transition-colors">
              <div className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-1.5">
                ☕ 140 L
              </div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">1 Single Cup of Coffee</div>
            </div>

            <div className="p-3.5 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-xs hover:border-cyan-300 transition-colors">
              <div className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-1.5">
                👕 2,495 L
              </div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">1 Cotton T-Shirt</div>
            </div>

            <div className="p-3.5 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-xs hover:border-cyan-300 transition-colors">
              <div className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-1.5">
                🥩 15,415 L
              </div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">1 Kilogram of Beef</div>
            </div>

            <div className="p-3.5 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-xs hover:border-cyan-300 transition-colors">
              <div className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-1.5">
                💧 3,800 L
              </div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Global Daily Avg / Person</div>
            </div>
          </div>
        </div>

        {/* Visual Iceberg Concept Card */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2 text-cyan-700 text-xs font-bold uppercase tracking-wider">
                <Waves className="w-4 h-4" />
                The Water Iceberg Reality
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Visible Tap Water is only 4% of your total footprint.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                Most people believe saving water is only about turning off the tap or taking shorter showers. In reality, over <span className="font-semibold text-slate-800">95% of personal water use is "Virtual Water"</span> embedded within our agricultural diet and manufactured consumer goods.
              </p>
            </div>

            {/* Visual ratio bar */}
            <div className="w-full md:w-72 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-cyan-700 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-600"></span> Virtual Water (96%)
                </span>
                <span className="text-blue-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span> Direct (4%)
                </span>
              </div>
              <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden flex">
                <div className="h-full bg-gradient-to-r from-cyan-600 to-teal-500 w-[96%] transition-all" title="Virtual Water ~96%"></div>
                <div className="h-full bg-blue-400 w-[4%] transition-all" title="Direct Water ~4%"></div>
              </div>
              <div className="mt-2 text-[11px] text-slate-400 text-center">
                Average global household ratio (Water Footprint Network)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
