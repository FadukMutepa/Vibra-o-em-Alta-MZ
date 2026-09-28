// Lightweight Web Audio engine for instant music previews without downloading heavy MP3s
class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTrackId: string | null = null;
  private intervalId: number | null = null;
  private onStateChangeCallback: ((trackId: string | null, playing: boolean) => void) | null = null;

  public setListener(cb: (trackId: string | null, playing: boolean) => void) {
    this.onStateChangeCallback = cb;
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playPreview(trackId: string, style: 'marrabenta' | 'pandza' | 'kizomba' | 'afrohouse') {
    if (this.currentTrackId === trackId && this.isPlaying) {
      this.stop();
      return;
    }

    this.stop();
    this.initCtx();
    if (!this.ctx) return;

    this.isPlaying = true;
    this.currentTrackId = trackId;
    if (this.onStateChangeCallback) {
      this.onStateChangeCallback(trackId, true);
    }

    const bpm = style === 'pandza' ? 124 : style === 'marrabenta' ? 116 : style === 'afrohouse' ? 122 : 98;
    const stepDuration = 60 / bpm / 2; // eighth notes
    let step = 0;

    // Chords and melody patterns
    const patterns = {
      marrabenta: [
        [261.63, 329.63, 392.00], // C
        [329.63, 392.00, 523.25], 
        [349.23, 440.00, 523.25], // F
        [392.00, 493.88, 587.33], // G
      ],
      pandza: [
        [174.61, 261.63], // F bass punch
        [220.00, 329.63], // A
        [196.00, 293.66], // G
        [164.81, 246.94], // E
      ],
      kizomba: [
        [130.81, 196.00, 246.94], // C mellow
        [110.00, 164.81, 220.00], // Am
        [146.83, 220.00, 261.63], // Dm
        [98.00, 146.83, 196.00],  // G
      ],
      afrohouse: [
        [110.00, 164.81], // Am
        [110.00, 220.00],
        [130.81, 196.00], // C
        [98.00, 146.83],  // G
      ]
    };

    const selectedPattern = patterns[style] || patterns.marrabenta;

    this.intervalId = window.setInterval(() => {
      if (!this.ctx || !this.isPlaying) return;
      const now = this.ctx.currentTime;
      const chordIdx = Math.floor(step / 4) % selectedPattern.length;
      const chord = selectedPattern[chordIdx];

      // Play bass/kick beat
      if (step % 2 === 0) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = style === 'pandza' ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(style === 'pandza' ? 120 : 80, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.15);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      }

      // Play melodic note
      const noteFreq = chord[step % chord.length];
      const noteOsc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      noteOsc.type = style === 'marrabenta' ? 'triangle' : 'sine';
      noteOsc.frequency.setValueAtTime(noteFreq, now);

      noteGain.gain.setValueAtTime(0.12, now);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + (stepDuration * 0.9));

      noteOsc.connect(noteGain);
      noteGain.connect(this.ctx.destination);
      noteOsc.start(now);
      noteOsc.stop(now + stepDuration);

      step = (step + 1) % 16;
    }, stepDuration * 1000);
  }

  public stop() {
    this.isPlaying = false;
    this.currentTrackId = null;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.onStateChangeCallback) {
      this.onStateChangeCallback(null, false);
    }
  }

  public getCurrentTrack(): { trackId: string | null; isPlaying: boolean } {
    return { trackId: this.currentTrackId, isPlaying: this.isPlaying };
  }
}

export const audioEngine = new AudioEngine();
