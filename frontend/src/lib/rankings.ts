export const growthRanks = [
  {
    name: "Seedling",
    image: "/assets/feedback-rankings/seedling.webp",
    explanation: "You are beginning to recognize moments where a supportive response can make a difference.",
  },
  {
    name: "Sprout",
    image: "/assets/feedback-rankings/sprout.webp",
    explanation: "You are starting to turn recognition into a clear and supportive response.",
  },
  {
    name: "Sapling",
    image: "/assets/feedback-rankings/sapling.webp",
    explanation: "You are building steady intervention skills while considering safety and choice.",
  },
  {
    name: "Young Tree",
    image: "/assets/feedback-rankings/young-tree.webp",
    explanation: "You respond with growing confidence, care, and practical judgment.",
  },
  {
    name: "Mighty Oak",
    image: "/assets/feedback-rankings/mighty-oak.webp",
    explanation: "You demonstrated clear, supportive action while keeping safety and choice at the center.",
  },
] as const;

export type GrowthRank = (typeof growthRanks)[number];

export function growthRankForScore(score: number): GrowthRank {
  const safeScore = Number.isFinite(score) ? Math.max(0, Math.min(9, Math.round(score))) : 0;
  return growthRanks[Math.min(growthRanks.length - 1, Math.floor(safeScore / 2))];
}
