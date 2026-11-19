function recalibrate() {
  playBeep(440, 0.08);
  AppState.step = 1;
  renderStep();
}

function saveHunterCard() {
  playBeep(920, 0.1);
  const btn = document.getElementById('save-btn-label');
  const original = btn.textContent;
  btn.textContent = "EXPORTED TO STORAGE!";
  setTimeout(() => {
    btn.textContent = original;
  }, 2000);
}

// Initialize application on document ready
document.addEventListener('DOMContentLoaded', () => {
  renderStep();
  updateBiometrics();
  updateSafetyOverrides();
});
