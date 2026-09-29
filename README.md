# 💧 WaterPrint — Virtual Water & Personal Water Footprint Calculator

> **"How much water does your lifestyle really use?"**  
> An academic, modern, and interactive web application designed to help users quantify and understand their direct and virtual daily water footprint.

[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.x-22c55e)](https://recharts.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🌟 Overview & Objectives

While most people believe water conservation is only about turning off the faucet or taking shorter showers, **over 95% of an individual's water footprint is "Virtual Water"** — the invisible freshwater embedded in the production of food, beverages, and manufactured consumer goods.

**WaterPrint** was developed as a college-level environmental studies and informatics project to bring scientific water accounting to everyday consumers with transparent formulas and peer-reviewed benchmarks.

---

## ✨ Core Features

### 1. 🎓 Educational Primer & Water Concepts
* **Direct vs. Virtual Water Visualizer:** Illustrates the "Water Iceberg" — showing why municipal tap water represents only ~4% of personal water consumption.
* **The 3 Colors of Water:**
  * 🌿 **Green Water:** Rainwater stored in soil moisture consumed by crops.
  * 💧 **Blue Water:** Surface and groundwater extracted for irrigation and industry.
  * ⚙️ **Grey Water:** Freshwater needed to assimilate and dilute pollutant loads.

### 2. 🧮 Daily Water Footprint Calculator
* **Food Items (Virtual Water):**
  * Rice, Wheat / Bread, Cow Milk, Tea, Coffee, Mixed Vegetables, Chicken, Beef, Eggs, Cheese, Fruits, and Chocolate.
  * Granular inputs in grams, kilograms, litres, or cups with instant portion suggestions.
* **Manufactured Products (Virtual Water):**
  * Cotton T-shirts, Denim Jeans, Footwear/Shoes, A4 Paper, and Smartphones.
  * Amortization mode to distribute annual purchases across 365 daily equivalents or compute direct counts.
* **Direct Water Usage:**
  * Shower duration and flow rates with preset benchmarks.
  * Weekly laundry cycles and appliance efficiency ratings.
  * Household taps, toilet flushes, and kitchen water consumption.
* **1-Click Demo Profiles:**
  * *Typical Urban Student* (Standard baseline)
  * *High-Meat & Coffee Lover* (High footprint)
  * *Plant-Forward Eco Champion* (Low footprint)

### 3. 📊 Personal Water Footprint Dashboard
* **Prominent Main Statistic:** Daily footprint in Litres/day, annualized totals ($\text{L/year}$ and $\text{m}^3\text{/year}$), and comparison against the global average ($3,800\text{ L/day}$).
* **Equivalency Indicators:** Translates abstract litres into bathtubs ($150\text{L}$), $500\text{ml}$ bottles, and human survival drinking days ($2.5\text{L/day}$).
* **Summary Cards:** Total Water Footprint, Virtual Water, Direct Water, and Largest Single Contributor.
* **Interactive Data Visualizations:**
  * **Donut Chart:** Percentage breakdown across Food, Products, and Direct usage.
  * **Ranked Horizontal Bar Chart:** Top individual water-consuming items.
* **Actionable Recommendations:** Dynamically tailored tips to reduce high-impact water habits.
* **Line-Item Breakdown Table:** Complete tabular accounting with exact litres and percentage share.
* **Print / PDF Report:** Clean print styling for assignments and project reporting.

### 4. 📚 Academic Sources & Methodology
* **Theoretical Heritage:** Grounded in the foundational research of **Prof. John Anthony Allan** (1993 Stockholm Water Prize Laureate) and **Prof. Arjen Y. Hoekstra** (Water Footprint Network / University of Twente).
* **Transparent Mathematical Pipeline:** Documented step-by-step formulas for all calculations.
* **Searchable Factor Table:** Search and filter all embedded factors directly in the app.

---

## 📐 Calculation Logic & Formulas

$$\text{Item Virtual Water} = \text{Quantity} \times \text{Water Footprint per Unit}$$

$$\text{Total Virtual Water} = \sum \text{Food Water} + \sum \text{Product Water}$$

$$\text{Total Direct Water} = \text{Shower Water} + \text{Laundry Water} + \text{Household Taps}$$

$$\text{Total Water Footprint} = \text{Total Virtual Water} + \text{Total Direct Water}$$

---

## 🔬 Peer-Reviewed Data Sources

1. **Mekonnen, M.M. and Hoekstra, A.Y. (2011)**  
   *"The green, blue and grey water footprint of crops and derived crop products"*, *Hydrology and Earth System Sciences*, 15(5): 1577–1600.
2. **Mekonnen, M.M. and Hoekstra, A.Y. (2012)**  
   *"A Global Assessment of the Water Footprint of Farm Animal Products"*, *Ecosystems*, 15(3): 401–415.
3. **Water Footprint Network (WFN)**  
   *Product Gallery & WaterStat Database*, University of Twente and UNESCO-IHE Institute for Water Education.

> *Note: Footprint values represent global production-weighted averages. Real-world values vary based on local climates, soil conditions, and irrigation efficiencies.*

---

## 🛠️ Technology Stack

* **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Visualizations:** [Recharts](https://recharts.org/)
* **Micro-interactions:** Canvas Confetti

---

## 🚀 Getting Started Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/siyajulka10477/WaterPrint.git
   cd WaterPrint
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173/`.

### Production Build
To create an optimized production bundle:
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
WaterPrint/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Sticky navigation & mobile drawer
│   │   ├── Hero.jsx             # Hero section with Water Iceberg preview
│   │   ├── ConceptExplainer.jsx # Educational direct vs. virtual & 3 colors
│   │   ├── Calculator.jsx       # Interactive multi-tab input modeler
│   │   ├── Dashboard.jsx        # Data visualization & analytics reports
│   │   ├── Methodology.jsx      # Scientific references & searchable dataset
│   │   └── Footer.jsx           # Academic credits & quick links
│   ├── data/
│   │   └── waterFootprintData.js # Centralized dataset, factors & benchmarks
│   ├── App.jsx                  # Main application state & smooth scrolling
│   ├── index.css                # Tailwind CSS v4 & custom animations
│   └── main.jsx                 # React root entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 📄 License & Academic Note

This project is built for educational and environmental sustainability demonstration. Distributed under the MIT License.
