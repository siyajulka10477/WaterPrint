import React from 'react';
import { Droplets, Heart, GraduationCap } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Project Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-sm">
                <Droplets className="w-4 h-4 fill-cyan-100" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">WaterPrint</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              A modern academic web application dedicated to visualizing <strong>Virtual Water</strong> footprints and promoting sustainable resource consciousness across direct and indirect consumption patterns.
            </p>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium">
              <GraduationCap className="w-4 h-4" />
              <span>College Environmental Studies & Informatics Project</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('concepts')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Direct vs Virtual Water
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calculator')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Footprint Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('methodology')}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Academic Sources & Formulas
                </button>
              </li>
            </ul>
          </div>

          {/* Scientific Citations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Data Citations</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              Based on empirical research by <strong>Prof. A.Y. Hoekstra</strong> and <strong>Dr. M.M. Mekonnen</strong> (Water Footprint Network / UNESCO-IHE).
            </p>
            <div className="text-[11px] text-slate-500">
              Values represent global production-weighted averages.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} WaterPrint — Personal & Virtual Water Footprint Platform.
          </div>
          <div className="flex items-center gap-1">
            <span>Built for Environmental Sustainability Education</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
