// Tactical Web Audio Synthesizer
function playBeep(frequency = 880, duration = 0.08, type = 'sine') {
  if (!AppState.soundEnabled) return;
  try {
    if (!AppState.audioCtx) {
      AppState.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (AppState.audioCtx.state === 'suspended') {
      AppState.audioCtx.resume();
    }
    const osc = AppState.audioCtx.createOscillator();
    const gain = AppState.audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, AppState.audioCtx.currentTime);
    gain.gain.setValueAtTime(0.08, AppState.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, AppState.audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(AppState.audioCtx.destination);
    osc.start();
    osc.stop(AppState.audioCtx.currentTime + duration);
  } catch (e) {
    console.warn('Audio not authorized or supported', e);
  }
}

function toggleAudio() {
  AppState.soundEnabled = !AppState.soundEnabled;
  const icon = document.getElementById('sound-icon');
  const label = document.getElementById('sound-label');
  if (AppState.soundEnabled) {
    icon.textContent = 'volume_up';
    label.textContent = 'AUDIO: ON';
    playBeep(640, 0.05);
  } else {
    icon.textContent = 'volume_off';
    label.textContent = 'AUDIO: OFF';
  }
}
