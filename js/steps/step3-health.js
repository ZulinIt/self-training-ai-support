// Step 3: Bio-Scan & Injury Matrix
function toggleAnatomy(btn) {
  playBeep(610, 0.04);
  const part = btn.getAttribute('data-part');
  const isSelected = AppState.restrictions.has(part);

  if (isSelected) {
    AppState.restrictions.delete(part);
    btn.className = "anatomy-btn h-9 px-2 rounded bg-surface-container-low/80 border border-outline-variant/40 flex items-center justify-between text-left";
    btn.innerHTML = `
      <div class="leading-none truncate">
        <span class="font-headline text-[12px] font-medium text-on-surface block truncate title">${btn.querySelector('.title').textContent}</span>
        <span class="font-hud text-[8px] text-outline uppercase block tracking-tight">KINETIC CHAIN</span>
      </div>
      <span class="material-symbols-outlined text-outline-variant text-[15px] shrink-0 ml-1 status-icon">check_circle</span>
    `;
  } else {
    AppState.restrictions.add(part);
    btn.className = "anatomy-btn h-9 px-2 rounded bg-surface-container/95 border border-primary-container shadow-[0_0_8px_rgba(255,204,0,0.25)] flex items-center justify-between text-left relative overflow-hidden";
    btn.innerHTML = `
      <div class="pl-1 leading-none truncate">
        <span class="font-headline text-[12px] font-semibold text-primary-container block truncate title">${btn.querySelector('.title').textContent}</span>
        <span class="font-hud text-[8px] text-outline uppercase block tracking-tight">RESTRICTION FLAGGED</span>
      </div>
      <div class="flex items-center gap-1 shrink-0 ml-1">
        <span class="px-1 rounded bg-primary-container/20 border border-primary-container text-primary-container font-hud text-[8px] font-bold uppercase">WARN</span>
        <span class="material-symbols-outlined text-primary-container text-[14px]">warning</span>
      </div>
    `;
  }
  updateSafetyOverrides();
}

function clearAnatomyRestrictions() {
  playBeep(880, 0.07);
  AppState.restrictions.clear();
  document.querySelectorAll('.anatomy-btn').forEach(btn => {
    btn.className = "anatomy-btn h-9 px-2 rounded bg-surface-container-low/80 border border-outline-variant/40 flex items-center justify-between text-left";
    const titleText = btn.querySelector('.title').textContent;
    btn.innerHTML = `
      <div class="leading-none truncate">
        <span class="font-headline text-[12px] font-medium text-on-surface block truncate title">${titleText}</span>
        <span class="font-hud text-[8px] text-outline uppercase block tracking-tight">OPTIMAL JOINT</span>
      </div>
      <span class="material-symbols-outlined text-outline-variant text-[15px] shrink-0 ml-1 status-icon">check_circle</span>
    `;
  });
  updateSafetyOverrides();
}

function toggleDietary(btn, isClearAll = false) {
  playBeep(620, 0.04);
  const cond = btn.getAttribute('data-cond');

  if (isClearAll) {
    AppState.dietaryFlags.clear();
    document.querySelectorAll('.diet-btn').forEach(b => {
      b.className = "diet-btn h-8 px-2 rounded border border-outline-variant/40 bg-surface-container-low/80 flex items-center justify-between text-left transition-colors";
      b.querySelector('span').className = "font-body text-[11px] text-on-surface truncate";
      b.querySelector('.diet-box').className = "diet-box w-3.5 h-3.5 rounded border border-outline/70 shrink-0 ml-1 flex items-center justify-center";
      b.querySelector('.diet-box').innerHTML = "";
    });
    btn.className = "diet-btn h-8 px-2 rounded border border-primary-container/90 bg-surface-container-high/90 flex items-center justify-between text-left shadow-[0_0_8px_rgba(255,204,0,0.15)] transition-all";
    btn.querySelector('span').className = "font-body text-[11px] text-primary font-medium truncate";
    btn.querySelector('.diet-box').className = "diet-box w-3.5 h-3.5 rounded bg-primary-container text-surface-container-lowest shrink-0 ml-1 flex items-center justify-center font-bold text-[10px]";
    btn.querySelector('.diet-box').innerHTML = "✓";
    return;
  }

  const clearBtn = document.querySelector('[data-cond="cleared"]');
  if (clearBtn) {
    clearBtn.className = "diet-btn h-8 px-2 rounded border border-outline-variant/40 bg-surface-container-low/80 flex items-center justify-between text-left transition-colors";
    clearBtn.querySelector('span').className = "font-body text-[11px] text-on-surface-variant truncate";
    clearBtn.querySelector('.diet-box').className = "diet-box w-3.5 h-3.5 rounded border border-outline/70 shrink-0 ml-1 flex items-center justify-center";
    clearBtn.querySelector('.diet-box').innerHTML = "";
  }

  if (AppState.dietaryFlags.has(cond)) {
    AppState.dietaryFlags.delete(cond);
    btn.className = "diet-btn h-8 px-2 rounded border border-outline-variant/40 bg-surface-container-low/80 flex items-center justify-between text-left transition-colors";
    btn.querySelector('span').className = "font-body text-[11px] text-on-surface truncate";
    btn.querySelector('.diet-box').className = "diet-box w-3.5 h-3.5 rounded border border-outline/70 shrink-0 ml-1 flex items-center justify-center";
    btn.querySelector('.diet-box').innerHTML = "";
  } else {
    AppState.dietaryFlags.add(cond);
    btn.className = "diet-btn h-8 px-2 rounded border border-primary-container/90 bg-surface-container-high/90 flex items-center justify-between text-left shadow-[0_0_8px_rgba(255,204,0,0.15)] transition-all";
    btn.querySelector('span').className = "font-body text-[11px] text-primary font-medium truncate";
    btn.querySelector('.diet-box').className = "diet-box w-3.5 h-3.5 rounded bg-primary-container text-surface-container-lowest shrink-0 ml-1 flex items-center justify-center font-bold text-[10px]";
    btn.querySelector('.diet-box').innerHTML = "✓";
  }
}

function updateSafetyOverrides() {
  const count = AppState.restrictions.size;
  document.getElementById('restrictions-counter').textContent = `[${count} RESTRICTION${count === 1 ? '' : 'S'} LOGGED]`;

  const overrideLabel = document.getElementById('override-text-label');
  if (AppState.restrictions.has('lower_back')) {
    overrideLabel.innerHTML = '<strong class="text-primary-container">Barbell Squats</strong> replaced by <strong class="text-primary-container">Belt / Hack Squats</strong> (Lumbar Protection).';
  } else if (AppState.restrictions.has('knees')) {
    overrideLabel.innerHTML = '<strong class="text-primary-container">Heavy Leg Press</strong> replaced by <strong class="text-primary-container">Spanish Squats &amp; Glute Drives</strong> (Patellar Offload).';
  } else if (AppState.restrictions.has('shoulders')) {
    overrideLabel.innerHTML = '<strong class="text-primary-container">Barbell Overhead Press</strong> replaced by <strong class="text-primary-container">Neutral Landmine Press</strong> (Cuff Shield).';
  } else if (AppState.restrictions.has('wrists')) {
    overrideLabel.innerHTML = '<strong class="text-primary-container">Straight Bar Curls</strong> swapped to <strong class="text-primary-container">EZ-Bar &amp; Neutral Grip Hooks</strong>.';
  } else if (AppState.restrictions.has('neck')) {
    overrideLabel.innerHTML = '<strong class="text-primary-container">High Bar Compression</strong> swapped to <strong class="text-primary-container">Chest-Supported Rows</strong>.';
  } else {
    overrideLabel.innerHTML = '<strong class="text-primary-container">Zero Critical Flags:</strong> Hunter authorized for full axial compound load.';
  }
}

