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
