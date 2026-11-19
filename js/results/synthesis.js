// ================= STEP 5: SYNTHESIS & TAB SWITCHER =================
function triggerSynthesisSequence() {
  const loadingView = document.getElementById('synthesis-loading-view');
  const cardView = document.getElementById('hunter-card-view');
  const progressBar = document.getElementById('synthesis-progress-bar');
  const statusText = document.getElementById('synthesis-status-text');

  loadingView.classList.remove('hidden');
  cardView.classList.add('hidden');
  cardView.classList.remove('flex');

  let progress = 20;
  progressBar.style.width = `${progress}%`;

  const phases = [
    "PARSING ANATOMICAL RESTRICTION NODES...",
    "SYNTHESIZING TAILORED COMBAT SPLIT & VOLUME...",
    "CONFIGURING METABOLIC RATION MATRIX...",
    "AUTHENTICATING SOVEREIGN HUNTER KEY..."
  ];

  let phaseIdx = 0;
  const interval = setInterval(() => {
    progress += 26;
    if (progress > 100) progress = 100;
    progressBar.style.width = `${progress}%`;
    statusText.textContent = phases[phaseIdx] || "INITIALIZATION COMPLETE";
    phaseIdx++;
    playBeep(440 + (progress * 4), 0.05);

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        playBeep(1040, 0.15, 'triangle');
        loadingView.classList.add('hidden');
        cardView.classList.remove('hidden');
        cardView.classList.add('flex');
        populateHunterCard();
        generateCombatWorkouts();
        generateRationPlan();
        switchResultTab('license');
      }, 350);
    }
  }, 320);
}

function switchResultTab(tabName) {
  playBeep(700, 0.04);
  const tabs = ['license', 'workout', 'diet'];
  tabs.forEach(t => {
    const btn = document.getElementById(`btn-tab-${t}`);
    const content = document.getElementById(`tab-content-${t}`);
    if (t === tabName) {
      btn.className = "result-tab-btn py-1 px-1 rounded font-bold transition-all bg-primary-container text-surface-container-lowest shadow-[0_0_8px_rgba(255,204,0,0.3)]";
      content.classList.remove('hidden');
      content.classList.add('flex');
    } else {
      btn.className = "result-tab-btn py-1 px-1 rounded text-outline hover:text-on-surface transition-all font-medium";
      content.classList.add('hidden');
      content.classList.remove('flex');
    }
  });
}

// Populate Tab 1: Core License & Macros
function populateHunterCard() {
  const randomId = Math.floor(1000 + Math.random() * 9000);
  document.getElementById('card-hunter-id').textContent = `ID: HNTR-${randomId}`;

  document.getElementById('final-archetype').textContent = AppState.archetype;
  document.getElementById('final-rank-tag').textContent = `RANK ${AppState.archetypeTier.replace('-TIER', '')}`;
  document.getElementById('final-vessel-meta').textContent = `${AppState.gender} // ${AppState.age} YRS // ${AppState.weightKg} KG`;

  // Harris-Benedict / Mifflin-St Jeor Formula
  let baseKcal = (10 * AppState.weightKg) + (6.25 * AppState.heightCm) - (5 * AppState.age);
  if (AppState.gender === 'MALE') baseKcal += 5;
  else if (AppState.gender === 'FEMALE') baseKcal -= 161;
  else baseKcal -= 78;

  if (AppState.adaptation === 'FAST') baseKcal -= 80;
  if (AppState.adaptation === 'HARDGAINER') baseKcal += 140;

  const mult = 1.2 + (AppState.weeklyDays * 0.075);
  let totalKcal = baseKcal * mult;

  if (AppState.goal === 'BULK') totalKcal += 350;
  else if (AppState.goal === 'CUT') totalKcal -= 450;

  const proteinG = Math.round(AppState.weightKg * 2.2);
  const fatG = Math.round((totalKcal * 0.25) / 9);
  const carbG = Math.round((totalKcal - (proteinG * 4) - (fatG * 9)) / 4);

  AppState.computed.totalKcal = Math.round(totalKcal);
  AppState.computed.protein = proteinG;
  AppState.computed.carbs = carbG;
  AppState.computed.fats = fatG;

  document.getElementById('final-kcal').textContent = AppState.computed.totalKcal.toLocaleString();
  document.getElementById('final-protein').textContent = `${proteinG}g`;
  document.getElementById('final-carbs').textContent = `${carbG}g`;
  document.getElementById('final-fats').textContent = `${fatG}g`;

  const targetList = Array.from(AppState.selectedMuscles).join(' + ');
  document.getElementById('final-targets').textContent = targetList;
  document.getElementById('final-frequency').textContent = `${AppState.weeklyDays} SESSIONS / WEEK`;

  if (AppState.restrictions.size > 0) {
    const first = Array.from(AppState.restrictions)[0].replace('_', ' ').toUpperCase();
    document.getElementById('final-guard').textContent = `${first} SAFEGUARD`;
  } else {
    document.getElementById('final-guard').textContent = 'UNRESTRICTED HEAVY LOAD';
  }

  document.getElementById('final-deployment-summary').textContent = 
    `${AppState.archetype} protocol calibrated for ${AppState.goal} velocity. Priority emphasis configured on ${targetList} across ${AppState.weeklyDays} weekly combat dungeons.`;
}

