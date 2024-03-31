interface Influencer {
  id: number;
  name: string;
}

interface Performance {
  id: number;
  influencer_id: number;
  reach_rate: number;
  type: string;
  year: number;
}

interface AverageRate {
  name: string;
  averageRate: number;
}

export function calculateTopInfluencers(
  influencers: Influencer[],
  performances: Performance[]
): AverageRate[] {
  const averages: { [key: number]: { total: number; count: number } } = {};
  performances?.forEach((performance) => {
    if (!averages[performance.influencer_id]) {
      averages[performance.influencer_id] = { total: 0, count: 0 };
    }
    averages[performance.influencer_id].total += performance.reach_rate;
    averages[performance.influencer_id].count++;
  });

  const averageRates: AverageRate[] = influencers
    ?.filter((influencer) => averages[influencer.id])
    .map((influencer) => ({
      name: influencer.name,
      averageRate:
        averages[influencer.id].total / averages[influencer.id].count,
    }));

  return averageRates
    ?.sort((a, b) => b.averageRate - a.averageRate)
    .slice(0, 3);
}
