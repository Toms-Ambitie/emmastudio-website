/**
 * Central timing config for the payoff animation.
 * All values in seconds — tweak here to adjust the pace.
 */
export const TIMING = {
  firstWordDelay: 0.9,  // pause before the first word appears
  wordDuration:   0.65, // how long each word takes to fade in
  wordStep:       0.44, // gap between consecutive words
  breathPause:    1.4,  // extra pause between "werk." and "Emma"
} as const;
