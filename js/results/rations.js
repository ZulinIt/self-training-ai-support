// Populate Tab 3: Dynamic Tailored Rations & Diet Blueprint
function generateRationPlan() {
  const container = document.getElementById('meal-plan-container');
  container.innerHTML = "";

  const totalKcal = AppState.computed.totalKcal;
  const isLactose = AppState.dietaryFlags.has('lactose');

  document.getElementById('diet-calorie-target').textContent = `${totalKcal.toLocaleString()} KCAL`;
  document.getElementById('diet-phase-tag').textContent = AppState.goal === 'BULK' ? 'LEAN BULK (+350)' : (AppState.goal === 'CUT' ? 'DEFICIT CUT (-450)' : 'MAINTENANCE');
  document.getElementById('diet-lactose-tag').textContent = isLactose ? 'LACTOSE-SAFE' : 'STANDARD MATRIX';

  const m1Kcal = Math.round(totalKcal * 0.25);
  const m2Kcal = Math.round(totalKcal * 0.32);
  const m3Kcal = Math.round(totalKcal * 0.18);
  const m4Kcal = Math.round(totalKcal * 0.25);

  const proteinShake = isLactose ? "Plant/Egg White Isolate (Almond Milk)" : "Whey Isolate Protein (Skim Milk)";
  const yogurtOpt = isLactose ? "Coconut / Lactose-Free Skyr" : "Greek Yogurt (0% Fat)";

  const meals = [
    {
      code: "RATION 01 // DAWN PROTOCOL (BREAKFAST)",
      kcal: m1Kcal,
      p: Math.round(AppState.computed.protein * 0.25),
      items: [
        `85g Rolled Oats with cinnamon & chia seeds`,
        `4 Egg Whites + 2 Whole Omega-3 Eggs`,
        `1 Banana (110g) & 50g Blueberries`,
        `Hydration: 500ml water + Electrolytes`
      ]
    },
    {
      code: "RATION 02 // MIDDAY COMBAT FUEL (LUNCH)",
      kcal: m2Kcal,
      p: Math.round(AppState.computed.protein * 0.35),
      items: [
        `200g Grilled Chicken Breast or 93/7 Lean Ground Beef`,
        `260g Steamed Jasmine Rice or Baked Sweet Potato`,
        `150g Steamed Broccoli & Zucchini with 10ml Olive Oil`,
        `Salt to taste (iodized for metabolic speed)`
      ]
    },
    {
      code: "RATION 03 // PRE/POST COMBAT NUTRITION",
      kcal: m3Kcal,
      p: Math.round(AppState.computed.protein * 0.15),
      items: [
        `1.5 Scoops ${proteinShake}`,
        `3 Rice Cakes with 15g Raw Honey / Banana slices`,
        `Digestive speed: ~45 mins prior to dungeon training`
      ]
    },
    {
      code: "RATION 04 // NOCTURNAL TISSUE REPAIR (DINNER)",
      kcal: m4Kcal,
      p: Math.round(AppState.computed.protein * 0.25),
      items: [
        `190g Wild Atlantic Salmon or Lean Flank Steak`,
        `220g Roasted Yukon Gold Potatoes or Quinoa`,
        `100g Asparagus / Mixed Greens + 40g Avocado`,
        `Dessert: 150g ${yogurtOpt}`
      ]
    }
  ];

  meals.forEach(m => {
    const box = document.createElement('div');
    box.className = "bg-surface-container-low/90 border border-outline-variant/40 rounded p-2 text-[10px]";

    const itemsList = m.items.map(it => `
      <div class="flex items-center gap-1.5 text-on-surface-variant font-body">
        <span class="material-symbols-outlined text-[11px] text-primary-container shrink-0">arrow_right</span>
        <span class="truncate">${it}</span>
      </div>
    `).join('');

    box.innerHTML = `
      <div class="flex items-center justify-between pb-1 mb-1 border-b border-outline-variant/25">
        <span class="font-hud text-[9px] font-bold text-primary-container uppercase">${m.code}</span>
        <span class="font-hud text-[8px] text-outline font-semibold">${m.kcal} KCAL | ${m.p}g PROTEIN</span>
      </div>
      <div class="space-y-0.5">
        ${itemsList}
      </div>
    `;
    container.appendChild(box);
  });

  if (isLactose) {
    document.getElementById('food-list-proteins').textContent = "Chicken Breast, 93/7 Beef, Egg Whites, Salmon, Beef/Plant Isolate (Dairy Free)";
  }
}
