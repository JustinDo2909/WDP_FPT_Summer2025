export interface TooltipProps {
  active?: boolean;
  payload?: {
    payload: {
      name: string;
      revenue: number;
      hasData: boolean;
    };
  }[];
  label?: string;
}

export interface StatisticsSectionProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}
