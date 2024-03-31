import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { calculateTopInfluencers } from "@/hooks/calculateTopThreeInfluencers";

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

interface InfluencerContextType {
  topThree: AverageRate[];
  isLoading: boolean;
}

// Context'in oluşturulması ve başlangıç değerinin tanımlanması
const TopThreeContext = createContext<InfluencerContextType | undefined>(
  undefined
);

// Provider Component'i
interface InfluencerProviderProps {
  children: ReactNode;
}

export const TopThreeProvider: React.FC<InfluencerProviderProps> = ({
  children,
}) => {
  const GetInfluencer = async (): Promise<any> => {
    return await axios.get("api/influencer/get");
  };

  const GetPosts = async (): Promise<any> => {
    return await axios.get("api/post/get-all");
  };

  const { data: infData, isLoading: isInfLoading } = useQuery({
    queryKey: ["infData"],
    queryFn: GetInfluencer,
  });

  const { data: postData, isLoading: isPostLoading } = useQuery({
    queryKey: ["postData"],
    queryFn: GetPosts,
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

// Custom hook
export const useInfluencers = (): InfluencerContextType => {
  const context = useContext(TopThreeContext);
  if (context === undefined) {
    throw new Error("useInfluencers must be used within an InfluencerProvider");
  }
  return context;
};
