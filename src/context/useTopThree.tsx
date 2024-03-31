import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GetInfluencer } from "@/services";
import { calculateTopInfluencers } from "@/hooks/calculateTopThreeInfluencers";
import { GetAllPosts } from "@/services";

interface AverageRate {
  name: string;
  averageRate: number;
}

interface InfluencerContextType {
  topThree: AverageRate[];
  isLoading: boolean;
}

const TopThreeContext = createContext<InfluencerContextType | undefined>(
  undefined
);

interface InfluencerProviderProps {
  children: ReactNode;
}

export const TopThreeProvider: React.FC<InfluencerProviderProps> = ({
  children,
}) => {
  const { data: infData, isLoading: isInfLoading } = useQuery({
    queryKey: ["infData"],
    queryFn: GetInfluencer,
  });

  const { data: postData, isLoading: isPostLoading } = useQuery({
    queryKey: ["postData"],
    queryFn: GetAllPosts,
  });

  const [topThree, setTopThree] = useState<AverageRate[]>([]);

  useEffect(() => {
    if (!isInfLoading && !isPostLoading && infData?.data && postData?.data) {
      const topThree = calculateTopInfluencers(infData?.data, postData?.data);
      setTopThree(topThree);
    }
  }, [infData, postData, isInfLoading, isPostLoading]);

  return (
    <TopThreeContext.Provider
      value={{ topThree, isLoading: isInfLoading || isPostLoading }}
    >
      {children}
    </TopThreeContext.Provider>
  );
};

export const useInfluencers = (): InfluencerContextType => {
  const context = useContext(TopThreeContext);
  if (context === undefined) {
    throw new Error("useInfluencers must be used within an InfluencerProvider");
  }
  return context;
};
