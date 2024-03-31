type ContentData = {
  year: number;
  count: number;
  total_reach_rate: number;
  average_reach_rate: number;
};

type DataInput = {
  [key: string]: ContentData[];
};

type AnalysisResponse = {
  message: string;
  type: string;
}[];

export function feedbackCalculator(data: DataInput): AnalysisResponse {
  let responses: AnalysisResponse = [];
  let totalPreviousReach = 0;
  let totalCurrentReach = 0;
  let totalEntries = 0;

  Object.keys(data).forEach((key) => {
    const contents = data[key];
    if (contents.length > 1) {
      const previous = contents[contents.length - 2];
      const current = contents[contents.length - 1];
      const reachChange =
        ((current.average_reach_rate - previous.average_reach_rate) /
          previous.average_reach_rate) *
        100;
      totalPreviousReach += previous.total_reach_rate;
      totalCurrentReach += current.total_reach_rate;
      totalEntries++;

      responses.push({
        message: `${key} Reach Rate is ${
          reachChange >= 0 ? "up" : "down"
        } by ${Math.abs(reachChange).toFixed(1)}%`,
        type: reachChange > 0 ? "great" : reachChange < 0 ? "improve" : "same",
      });
    }
  });

  if (totalEntries > 0) {
    const totalReachRateChange =
      ((totalCurrentReach - totalPreviousReach) / totalPreviousReach) * 100;
    responses.push({
      message: `React rate in total increased by ${totalReachRateChange.toFixed(
        1
      )}%`,
      type:
        totalReachRateChange > 0
          ? "great"
          : totalReachRateChange < 0
          ? "improve"
          : "same",
    });
  }

  return responses;
}
