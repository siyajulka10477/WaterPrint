import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ConceptExplainer from './components/ConceptExplainer';
import Calculator from './components/Calculator';
import Dashboard from './components/Dashboard';
import Methodology from './components/Methodology';
import Footer from './components/Footer';
import confetti from 'canvas-confetti';

const INITIAL_FOOD_STATE = {
  rice: 150,
  wheat: 120,
  milk: 0.25,
  tea: 1,
  coffee: 1,
  vegetables: 200,
  chicken: 150,
  beef: 0,
  eggs: 1,
  cheese: 30,
  fruits: 150,
  chocolate: 0,
};

const INITIAL_PRODUCTS_STATE = {
  tshirt: 4,
  jeans: 2,
  shoes: 1,
  paper: 2,
  smartphone: 0.33,
};

const INITIAL_DIRECT_STATE = {
  showerCount: 1,
  showerLitres: 65,
  laundryCyclesWeekly: 3,
  laundryLitres: 60,
  householdLitres: 85,
};

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [hasCalculated, setHasCalculated] = useState(true); // default true so dashboard is immediately visible or interactive

  const [foodState, setFoodState] = useState(INITIAL_FOOD_STATE);
  const [productsState, setProductsState] = useState(INITIAL_PRODUCTS_STATE);
  const [productsMode, setProductsMode] = useState('annual_amortized');
  const [directState, setDirectState] = useState(INITIAL_DIRECT_STATE);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCalculate = () => {
    setHasCalculated(true);
    // Trigger celebratory subtle water-colored confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#0284c7', '#06b6d4', '#14b8a6', '#38bdf8'],
    });

    // Smooth scroll to Dashboard section
    setTimeout(() => {
      scrollToSection('dashboard');
    }, 100);
  };

  const handleReset = () => {
    setFoodState({
      rice: '',
      wheat: '',
      milk: '',
      tea: '',
      coffee: '',
      vegetables: '',
      chicken: '',
      beef: '',
      eggs: '',
      cheese: '',
      fruits: '',
      chocolate: '',
    });
    setProductsState({
      tshirt: '',
      jeans: '',
      shoes: '',
      paper: '',
      smartphone: '',
    });
    setDirectState({
      showerCount: 0,
      showerLitres: 65,
      laundryCyclesWeekly: 0,
      laundryLitres: 60,
      householdLitres: 0,
    });
    setHasCalculated(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onReset={handleReset}
        hasCalculated={hasCalculated}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <div id="hero">
          <Hero
            onStartCalculation={() => scrollToSection('calculator')}
            onExploreConcepts={() => scrollToSection('concepts')}
          />
        </div>

        {/* Concept Explainer Section (Direct vs Virtual Water) */}
        <ConceptExplainer
          onGoToCalculator={() => scrollToSection('calculator')}
        />

        {/* Interactive Calculator Section */}
        <Calculator
          foodState={foodState}
          setFoodState={setFoodState}
          productsState={productsState}
          setProductsState={setProductsState}
          productsMode={productsMode}
          setProductsMode={setProductsMode}
          directState={directState}
          setDirectState={setDirectState}
          onCalculate={handleCalculate}
          onReset={handleReset}
        />

        {/* Results / Dashboard Section */}
        {hasCalculated && (
          <Dashboard
            foodState={foodState}
            productsState={productsState}
            productsMode={productsMode}
            directState={directState}
            onModifyInputs={() => scrollToSection('calculator')}
            onReset={handleReset}
          />
        )}

        {/* Sources & Methodology Section */}
        <Methodology />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
