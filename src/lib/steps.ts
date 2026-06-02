/** The calming step sequence the ritual walks through, ported from the prototype. */
export interface WindStep {
  title: string;
  sub: string;
}
export const STEPS: WindStep[] = [
  {
    title: 'Put the screens to bed.',
    sub: "Plug the phone in across the room. You won't need it tonight.",
  },
  { title: 'Lower the lights.', sub: 'Dim one lamp. Let your eyes start to soften.' },
  { title: 'A glass of water.', sub: 'Small kindness to tomorrow-you. Sip it slowly.' },
  {
    title: 'Loosen your shoulders.',
    sub: 'Roll them back, unclench your jaw, let the day fall off.',
  },
  { title: 'Three slow breaths.', sub: 'In through the nose, longer out. Follow the circle.' },
  { title: 'Goodnight.', sub: "You're ready. Climb in. Tomorrow can wait." },
];
