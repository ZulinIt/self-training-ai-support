// Step 1: Vessel Logic
function selectVessel(btn, gender, curve) {
  playBeep(750, 0.05);
  AppState.gender = gender;
  AppState.curveCode = curve;

  document.querySelectorAll('.vessel-archetype').forEach(el => {
    el.className = 'vessel-archetype text-left rounded bg-surface-container-low/70 border border-outline-variant/40 hover:border-primary-container/40 p-2 transition-all flex flex-col justify-between h-[74px]';
    el.querySelector('.material-symbols-outlined').className = 'material-symbols-outlined text-on-surface-variant text-[20px]';
    el.querySelector('.font-headline').className = 'font-headline text-xs font-semibold text-on-surface block leading-tight';
    const badge = el.querySelector('.badge');
    badge.className = 'badge text-[8px] font-hud text-outline px-1 rounded';
    badge.textContent = 'STBY';
  });

  btn.className = 'vessel-archetype text-left rounded bg-surface-container/95 border-2 border-primary-container p-2 hud-glow transition-all flex flex-col justify-between h-[74px]';
  btn.querySelector('.material-symbols-outlined').className = 'material-symbols-outlined text-primary-container text-[20px]';
  btn.querySelector('.font-headline').className = 'font-headline text-xs font-bold text-primary block leading-tight';
  const activeBadge = btn.querySelector('.badge');
  activeBadge.className = 'badge text-[8px] font-hud text-primary-container font-bold px-1 bg-surface-container-lowest/80 rounded border border-primary-container/60';
  activeBadge.textContent = 'SYNC';
}

function adjustAge(delta) {
  playBeep(520 + (AppState.age * 5), 0.03);
  AppState.age = Math.max(16, Math.min(85, AppState.age + delta));
  document.getElementById('age-display').textContent = AppState.age;
  updateAgeClass();
}

function setAgeBracket(btn, targetAge) {
  playBeep(820, 0.05);
  document.querySelectorAll('.bracket-chip').forEach(b => {
    b.className = 'bracket-chip py-1 px-1 rounded bg-surface-container-high text-on-surface hover:text-primary font-hud text-[11px] text-center border border-outline-variant/40 transition-all active:scale-95';
  });
  btn.className = 'bracket-chip py-1 px-1 rounded bg-primary-container text-surface-container-lowest font-hud text-[11px] font-bold text-center border border-primary-container shadow-[0_0_8px_rgba(255,204,0,0.4)] transition-all active:scale-95';
  AppState.age = targetAge;
  document.getElementById('age-display').textContent = AppState.age;
  updateAgeClass();
}

function updateAgeClass() {
  const badge = document.getElementById('metabolic-class-badge');
  if (AppState.age <= 28) badge.textContent = "CLASS: PRIME";
  else if (AppState.age <= 42) badge.textContent = "CLASS: OPTIMAL";
  else badge.textContent = "CLASS: RESILIENT";
}

