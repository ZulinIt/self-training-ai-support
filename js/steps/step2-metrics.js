// Step 2: Physical Metrics Logic
function setHeightUnit(toCm) {
  if (AppState.isCm === toCm) return;
  playBeep(650, 0.04);
  AppState.isCm = toCm;
  const btnCm = document.getElementById('btn-height-cm');
  const btnFt = document.getElementById('btn-height-ft');
  const unitLabel = document.getElementById('height-unit-label');
  const slider = document.getElementById('height-slider');

  if (AppState.isCm) {
    btnCm.className = "font-hud text-[10px] px-2 py-0.5 rounded bg-primary-container text-surface-container-lowest font-bold shadow-[0_0_6px_rgba(255,204,0,0.4)]";
    btnFt.className = "font-hud text-[10px] px-2 py-0.5 text-outline hover:text-on-surface transition-colors font-medium";
    unitLabel.textContent = "CM";
    slider.min = 140; slider.max = 220; slider.value = Math.round(AppState.heightCm);
  } else {
    btnFt.className = "font-hud text-[10px] px-2 py-0.5 rounded bg-primary-container text-surface-container-lowest font-bold shadow-[0_0_6px_rgba(255,204,0,0.4)]";
    btnCm.className = "font-hud text-[10px] px-2 py-0.5 text-outline hover:text-on-surface transition-colors font-medium";
    unitLabel.textContent = "";
    const totalInches = Math.round(AppState.heightCm / 2.54);
    slider.min = 55; slider.max = 86; slider.value = totalInches;
  }
  renderHeight();
  updateBiometrics();
}

function adjustHeight(delta) {
  playBeep(600, 0.03);
  const slider = document.getElementById('height-slider');
  if (AppState.isCm) {
    AppState.heightCm = Math.max(140, Math.min(220, AppState.heightCm + delta));
    slider.value = AppState.heightCm;
  } else {
    let totalInches = Math.round(AppState.heightCm / 2.54) + delta;
    totalInches = Math.max(55, Math.min(86, totalInches));
    AppState.heightCm = Math.round(totalInches * 2.54);
    slider.value = totalInches;
  }
  renderHeight();
  updateBiometrics();
}

function onHeightSliderChange(val) {
  if (AppState.isCm) {
    AppState.heightCm = Number(val);
  } else {
    AppState.heightCm = Math.round(Number(val) * 2.54);
  }
  renderHeight();
  updateBiometrics();
}

function renderHeight() {
  const readout = document.getElementById('height-readout');
  const mid = document.getElementById('slider-h-mid');
  if (AppState.isCm) {
    readout.textContent = AppState.heightCm;
    mid.textContent = AppState.heightCm;
  } else {
    const totalInches = Math.round(AppState.heightCm / 2.54);
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;
    readout.textContent = `${feet}'${inches}"`;
    mid.textContent = `${feet}'${inches}"`;
  }
}

function setWeightUnit(toKg) {
  if (AppState.isKg === toKg) return;
  playBeep(650, 0.04);
  AppState.isKg = toKg;
  const btnKg = document.getElementById('btn-weight-kg');
  const btnLbs = document.getElementById('btn-weight-lbs');
  const unitLabel = document.getElementById('weight-unit-label');

  if (AppState.isKg) {
    btnKg.className = "font-hud text-[10px] px-2 py-0.5 rounded bg-primary-container text-surface-container-lowest font-bold shadow-[0_0_6px_rgba(255,204,0,0.4)]";
    btnLbs.className = "font-hud text-[10px] px-2 py-0.5 text-outline hover:text-on-surface transition-colors font-medium";
    unitLabel.textContent = "KG";
  } else {
    btnLbs.className = "font-hud text-[10px] px-2 py-0.5 rounded bg-primary-container text-surface-container-lowest font-bold shadow-[0_0_6px_rgba(255,204,0,0.4)]";
    btnKg.className = "font-hud text-[10px] px-2 py-0.5 text-outline hover:text-on-surface transition-colors font-medium";
    unitLabel.textContent = "LBS";
  }
  renderWeight();
  updateBiometrics();
}

function adjustWeight(delta) {
  playBeep(560, 0.03);
  if (AppState.isKg) {
    AppState.weightKg = parseFloat((Math.max(40, Math.min(200, AppState.weightKg + delta))).toFixed(1));
  } else {
    let currentLbs = AppState.weightKg * 2.20462;
    currentLbs = Math.max(88, Math.min(440, currentLbs + delta));
    AppState.weightKg = parseFloat((currentLbs / 2.20462).toFixed(1));
  }
  renderWeight();
  updateBiometrics();
}

function renderWeight() {
  const readout = document.getElementById('weight-readout');
  if (AppState.isKg) {
    readout.textContent = AppState.weightKg.toFixed(1);
  } else {
    readout.textContent = (AppState.weightKg * 2.20462).toFixed(1);
  }
}

function setGoal(btn, goal) {
  playBeep(720, 0.04);
  AppState.goal = goal;
  document.querySelectorAll('.goal-pill').forEach(b => {
    b.className = "goal-pill font-hud text-[9px] px-2 py-1 rounded text-outline hover:text-on-surface transition-all font-semibold";
  });
  btn.className = "goal-pill font-hud text-[9px] px-2 py-1 rounded bg-primary-container text-surface-container-lowest font-bold shadow-[0_0_6px_rgba(255,204,0,0.4)]";

  const velocityLabel = document.getElementById('target-velocity-label');
  if (goal === 'CUT') velocityLabel.textContent = "TARGET VELOCITY: -0.45 KG/WK";
  else if (goal === 'MAINTAIN') velocityLabel.textContent = "TARGET VELOCITY: RECOMP EQUILIBRIUM";
  else velocityLabel.textContent = "TARGET VELOCITY: +0.35 KG/WK";

  updateBiometrics();
}

function setAdaptation(btn, type) {
  playBeep(700, 0.04);
  AppState.adaptation = type;
  document.querySelectorAll('.adapt-btn').forEach(b => {
    b.className = "adapt-btn flex flex-col items-center justify-center p-1.5 rounded bg-surface-container-low border border-outline-variant/40 text-center transition-all";
    b.querySelector('.font-hud').className = "font-hud text-[9px] font-semibold text-on-surface";
  });
  btn.className = "adapt-btn flex flex-col items-center justify-center p-1.5 rounded bg-surface-container-high border border-primary-container text-center shadow-[0_0_8px_rgba(255,204,0,0.25)] transition-all";
  btn.querySelector('.font-hud').className = "font-hud text-[9px] font-bold text-primary-container";
  updateBiometrics();
}

function updateBiometrics() {
  let bmr = (10 * AppState.weightKg) + (6.25 * AppState.heightCm) - (5 * AppState.age);
  if (AppState.gender === 'MALE') bmr += 5;
  else if (AppState.gender === 'FEMALE') baseKcal = bmr - 161;
  else bmr -= 78;

  if (AppState.adaptation === 'FAST') bmr -= 80;
  if (AppState.adaptation === 'HARDGAINER') bmr += 140;

  const heightMeters = AppState.heightCm / 100;
  const bmi = (AppState.weightKg / (heightMeters * heightMeters)).toFixed(1);

  document.getElementById('bmr-chip').textContent = `BMR: ${Math.round(bmr).toLocaleString()} KCAL`;
  document.getElementById('bmi-chip').textContent = `BMI ${bmi}`;

  const classChip = document.getElementById('athletic-class-chip');
  if (bmi < 18.5) classChip.textContent = "HYPO-FRAME";
  else if (bmi < 24.9) classChip.textContent = "ATHLETIC CLASS";
  else if (bmi < 29.9) classChip.textContent = "HEAVY TITAN";
  else classChip.textContent = "COLOSSAL CLASS";
}

