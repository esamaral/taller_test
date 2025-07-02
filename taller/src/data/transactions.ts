export const transactions = [
    ...Array.from({ length: 95 }, (_, i) => {
    const day = Math.floor(Math.random() * 31) + 1;
    return {
      id: (i + 6).toString(),
      date: `2025-05-${day}`,
      description: `Auto-generated transaction #${i + 6}`,
      amount: Number(((i % 2 === 0 ? 1 : -1) * (Math.random() * 500 + 50)).toFixed(2)),
    };
  }),
];