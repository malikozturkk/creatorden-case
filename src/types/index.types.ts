import { UseFormReturn } from "react-hook-form";

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

export interface BreadcrumbProps {
  items: BreadCrumbsItemProps[];
}

export type BreadCrumbsItemProps = {
  icon?: React.ReactNode;
  text: string;
  url?: string;
  target?: "_blank" | "_self";
};

export interface DataItem {
  count: number;
  total_reach_rate: number;
  year: number;
}

export interface CardData {
  [key: string]: DataItem[];
}

export interface BaseAlertProps {
  message: string;
  severity: "error" | "warning" | "info" | "success";
}

export interface AlertProps extends BaseAlertProps {
  id: number;
}

export interface AlertComponentProps extends AlertProps {
  removeAlert: (id: number) => void;
}

export interface AlertsContainerProps {
  alerts: AlertProps[];
  removeAlert: (id: number) => void;
}

export interface ErrorTextProps {
  message: string;
}

export interface FormProps {
  formMethods: UseFormReturn<{
    influencerName: string;
    year: string;
    type: string;
    reachRate: number;
  }>;
  rate: number;
  setRate: React.Dispatch<React.SetStateAction<number>>;
}

export interface AlertContextType {
  addAlert: (alert: BaseAlertProps) => void;
}

export interface DataItemWithChange {
  year: number;
  count: number;
  total_reach_rate: number;
  percentage_rate: number;
  highest: boolean;
  change?: string | null;
}

export interface YearlySummary {
  year: number;
  count: number;
  total_reach_rate: number;
}

export interface PureDataItem {
  id: number;
  influencer_id: number;
  reach_rate: number;
  type: "STORY" | "REELS" | "STATIC";
  year: number;
}

export interface CardProps {
  data: PureDataItem[];
  id: number;
}

export interface Influencer {
  id: number;
  name: string;
}
