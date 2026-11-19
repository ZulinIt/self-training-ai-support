// Step Navigation Flow
function navigateStep(delta) {
  const nextStep = AppState.step + delta;
  if (nextStep < 1 || nextStep > AppState.maxStep) return;

  playBeep(delta > 0 ? 980 : 540, 0.06);
  AppState.step = nextStep;
  renderStep();
}

function renderStep() {
  for (let i = 1; i <= AppState.maxStep; i++) {
    const pane = document.getElementById(`pane-step-${i}`);
    if (pane) {
      pane.classList.toggle('active', i === AppState.step);
    }
  }

  const segs = document.querySelectorAll('.step-seg');
  segs.forEach((seg, idx) => {
    if (idx < AppState.step) {
      seg.className = "step-seg h-full bg-primary-container rounded-sm shadow-[0_0_8px_rgba(255,204,0,0.8)]";
    } else {
      seg.className = "step-seg h-full bg-surface-container-highest/60 rounded-sm";
    }
  });

  const phaseLabels = [
    "PHASE 01 // STEP 1 OF 5",
    "PHASE 02 // STEP 2 OF 5",
    "PHASE 03 // STEP 3 OF 5",
    "PHASE 04 // STEP 4 OF 5",
    "PHASE 05 // NEURAL SYNTHESIS"
  ];
  const percentages = ["20%", "40%", "60%", "80%", "100%"];

  document.getElementById('header-phase-label').textContent = phaseLabels[AppState.step - 1];
  document.getElementById('header-percent-label').textContent = `[${percentages[AppState.step - 1]}]`;

  const backBtn = document.getElementById('btn-nav-back');
  backBtn.disabled = AppState.step === 1;

  const ctaLabel = document.getElementById('cta-label');
  const ctaIcon = document.getElementById('cta-icon');
  const footerTip = document.getElementById('footer-tip');

  if (AppState.step === 1) {
    ctaLabel.textContent = "NEXT: PHYSICAL PARAMETERS";
    ctaIcon.textContent = "arrow_forward";
    footerTip.textContent = "TRANSMITTING ENCRYPTED TELEMETRY TO SOVEREIGN CORE";
  } else if (AppState.step === 2) {
    ctaLabel.textContent = "PROCEED: HEALTH TELEMETRY";
    ctaIcon.textContent = "arrow_forward";
    footerTip.textContent = "CALCULATING GRAVITATIONAL MASS AND VO2 METABOLICS";
  } else if (AppState.step === 3) {
    ctaLabel.textContent = "PROCEED: COMBAT GOALS";
    ctaIcon.textContent = "arrow_forward";
    footerTip.textContent = "RECALIBRATES DUNGEON WORKOUT LOAD IN REAL-TIME";
  } else if (AppState.step === 4) {
    ctaLabel.textContent = "INITIALIZE NEURAL SYNTHESIS";
    ctaIcon.textContent = "auto_awesome";
    footerTip.textContent = `${AppState.archetype} // ${AppState.weeklyDays} DAYS // ${Array.from(AppState.selectedMuscles).join(' + ')}`;
  } else if (AppState.step === 5) {
    ctaLabel.textContent = "HUNTER PROTOCOL SYNCHRONIZED";
    ctaIcon.textContent = "done_all";
    footerTip.textContent = "AUTHORIZED BY SOVEREIGN SYSTEM DISPATCH";
    triggerSynthesisSequence();
  }

  if (AppState.step === 2) updateBiometrics();
}

