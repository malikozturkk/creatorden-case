export interface InfluencerData {
  id: number;
  influencer: string;
  year: number;
  type: string;
  reach_rate: number;
}

export interface ProcessedInfluencerData {
  [id: number]: {
    [year: number]: {
      [type: string]: {
        reach_rate: number;
        posts: number;
      };
    };
  };
}

export interface Feedbacks {
  [influencer: string]: {
    [year: number]: {
      [type: string]: string;
    };
  };
}
