/**
 * Audio Utility for SpeedCheck
 * Handles UI sound effects using Web Audio API (No external files needed)
 */

const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

function createOscillator(freq: number, type: OscillatorType = 'sine', duration: number = 0.1, volume: number = 0.1) {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  gain.gain.setValueAtTime(volume, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

export const playSound = {
  // Light 'click' sound for small interactions
  tick: () => createOscillator(800, 'sine', 0.05, 0.05),
  
  // Pleasant 'pop' sound for button clicks
  pop: () => {
    createOscillator(400, 'sine', 0.1, 0.1);
    setTimeout(() => createOscillator(600, 'sine', 0.1, 0.05), 50);
  },

  // 'Success' tune for test completion
  success: () => {
    const now = audioCtx.currentTime;
    const notes = [440, 554.37, 659.25, 880]; // A major arpeggio
    notes.forEach((freq, i) => {
      setTimeout(() => createOscillator(freq, 'sine', 0.4, 0.08), i * 100);
    });
  },

  // 'Theme' switch sound
  theme: () => {
    createOscillator(200, 'sine', 0.3, 0.1);
    setTimeout(() => createOscillator(400, 'sine', 0.3, 0.05), 100);
  },

  // Assistant 'hello' sound
  aria: () => {
    createOscillator(523.25, 'sine', 0.2, 0.05); // C5
    setTimeout(() => createOscillator(659.25, 'sine', 0.2, 0.05), 100); // E5
  }
};
