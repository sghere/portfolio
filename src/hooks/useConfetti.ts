import confetti from 'canvas-confetti';

export function useConfetti() {
  const triggerDownloadConfetti = () => {
    // Immediate confetti burst for resume download
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#6366f1', '#10b981', '#ffffff'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#06b6d4', '#a855f7'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#f43f5e', '#f59e0b'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const triggerCompletionConfetti = () => {
    // Grand celebration burst when user reaches 100% scroll
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: ReturnType<typeof setInterval> = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#6366f1', '#10b981', '#38bdf8', '#f43f5e'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#a855f7', '#f59e0b', '#10b981', '#6366f1'],
      });
    }, 250);
  };

  return { triggerDownloadConfetti, triggerCompletionConfetti };
}
