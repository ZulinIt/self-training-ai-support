// Step 4: Combat Archetype, Targets, Quota
function selectClass(btn, name, sub, advisory, tier) {
  playBeep(780, 0.05);
  AppState.archetype = name;
  AppState.archetypeTier = tier;

  document.querySelectorAll('.class-card').forEach(c => {
    c.className = "class-card bg-surface-container-low/60 border border-outline-variant/40 rounded p-1.5 flex flex-col justify-between text-left hover:border-primary-container/50 transition-colors";
    c.querySelector('.name').className = "font-headline text-[12px] font-bold text-on-surface tracking-tight leading-none name";
    const tag = c.querySelector('.status-tag');
    tag.className = "font-hud text-[8px] text-outline font-semibold status-tag";
    tag.textContent = "A-TIER";
    const icon = c.querySelector('.status-icon');
    icon.className = "material-symbols-outlined text-outline text-[13px] status-icon";
    icon.textContent = "radio_button_unchecked";
  });

  btn.className = "class-card relative bg-surface-container-low/95 border-2 border-primary-container rounded p-1.5 flex flex-col justify-between text-left shadow-[0_0_16px_rgba(255,204,0,0.25)]";
  btn.querySelector('.name').className = "font-headline text-[12px] font-bold text-primary-container tracking-tight leading-none name";
  const activeTag = btn.querySelector('.status-tag');
  activeTag.className = "font-hud text-[8px] text-primary-container font-bold px-1 bg-primary-container/20 rounded status-tag";
  activeTag.textContent = "ACTIVE";
  const activeIcon = btn.querySelector('.status-icon');
  activeIcon.className = "material-symbols-outlined text-primary-container text-[13px] status-icon";
  activeIcon.textContent = "check_circle";

  document.getElementById('sovereign-advisory-text').innerHTML = `<strong class="text-primary-container font-hud text-[10px]">SOVEREIGN ADVISORY:</strong> ${name} resonance ${advisory}`;
  document.getElementById('archetype-tier-rank').textContent = tier;
}

function toggleMuscleNode(btn) {
  const muscle = btn.getAttribute('data-muscle');
  const isSelected = AppState.selectedMuscles.has(muscle);

  if (isSelected) {
    if (AppState.selectedMuscles.size <= 1) return;
    playBeep(520, 0.03);
    AppState.selectedMuscles.delete(muscle);
    btn.className = "muscle-node bg-surface-container-low/70 border border-outline-variant/30 rounded px-2 py-1 flex items-center justify-between text-left hover:border-primary-container/40";
    btn.querySelector('.title').className = "font-headline text-[11px] font-medium text-on-surface leading-none title truncate";
    btn.querySelector('.sub').className = "font-hud text-[8px] text-outline truncate sub";
    const icon = btn.querySelector('.icon');
    icon.className = "material-symbols-outlined text-outline text-[14px] shrink-0 icon";
    icon.textContent = "check_box_outline_blank";
  } else {
    if (AppState.selectedMuscles.size >= 4) {
      playBeep(320, 0.08, 'sawtooth');
      return;
    }
    playBeep(880, 0.04);
    AppState.selectedMuscles.add(muscle);
    btn.className = "muscle-node bg-surface-container-high/90 border-2 border-primary-container rounded px-2 py-1 flex items-center justify-between shadow-[0_0_10px_rgba(255,204,0,0.2)] text-left";
    btn.querySelector('.title').className = "font-headline text-[11px] font-bold text-primary-container leading-none title";
    btn.querySelector('.sub').className = "font-hud text-[8px] text-on-surface-variant truncate sub";
    const icon = btn.querySelector('.icon');
    icon.className = "material-symbols-outlined text-primary-container text-[14px] shrink-0 icon";
    icon.textContent = "check_box";
  }

  document.getElementById('muscle-counter').textContent = `${AppState.selectedMuscles.size} / 4 SELECTED`;
}

function setQuota(btn, days) {
  playBeep(720, 0.04);
  AppState.weeklyDays = days;
  document.querySelectorAll('.quota-pill').forEach(q => {
    q.className = "quota-pill bg-surface-container-low/70 border border-outline-variant/30 rounded py-1 px-1 flex flex-col items-center justify-center text-center";
    q.querySelector('.font-headline').className = "font-headline text-[11px] font-bold text-on-surface leading-none";
  });
  btn.className = "quota-pill relative bg-surface-container-high border-2 border-primary-container rounded py-1 px-1 flex flex-col items-center justify-center shadow-[0_0_12px_rgba(255,204,0,0.25)] text-center";
  btn.querySelector('.font-headline').className = "font-headline text-[11px] font-bold text-primary-container leading-none pt-0.5";
}

