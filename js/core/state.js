// System Master State
const AppState = {
  step: 1,
  maxStep: 5,
  soundEnabled: true,
  audioCtx: null,

  // Step 1: Vessel
  gender: 'MALE',
  curveCode: 'M-01',
  age: 24,

  // Step 2: Metrics
  heightCm: 182,
  isCm: true,
  weightKg: 78.4,
  isKg: true,
  goal: 'BULK',
  adaptation: 'STABLE',

  // Step 3: Health & Bio-restrictions
  restrictions: new Set(['lower_back']),
  dietaryFlags: new Set(['lactose']),

  // Step 4: Archetype & Targets
  archetype: 'TITAN',
  archetypeTier: 'S-TIER',
  selectedMuscles: new Set(['CHEST', 'DELTS']),
  weeklyDays: 4,

  // Computed Results
  computed: {
    totalKcal: 2780,
    protein: 180,
    carbs: 310,
    fats: 72
  }
};
