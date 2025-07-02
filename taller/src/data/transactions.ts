import { generateRandomText } from "../helpers/textGenerator";
export const transactions = [
    ...Array.from({ length: 95 }, (_, i) => {
    const day = Math.floor(Math.random() * 28) + 1;
    return {
      id: (i + 6).toString(),
      date: `2025-07-${day}`,
      description: generateRandomText(1, 3).replace(/\n/g, ' ').slice(0, 50) + '...',
      amount: Number(((i % 2 === 0 ? 1 : -1) * (Math.random() * 500 + 50)).toFixed(2)),
    };
  }),
];