export interface TypeCropStructure {
  _id: string;
  totalArea: number;
  totalFarmsCount: number;
  cropId: string;
  cropName: string;
  percentage: number;
  color?: string;
}

export interface TypeTodayInsights {
  logsCreatedToday: number;
  inactiveFarmsCount: number;
  activeFarmsCount: number;
}

export interface TypeOwnerStatistics {
  totalSubAccounts: number;
  totalFarms: number;
  totalArea: {
    value: number;
    unit: string;
  };
  cropStructure: TypeCropStructure[];
  activeRate: number;
  todayInsights?: TypeTodayInsights;
}

export interface TypeOwnerStatisticsResponse {
  success: boolean;
  data: TypeOwnerStatistics;
}

// Recent Activity Log (for UpcomingTaskCard)
export interface TypeRecentActivityLog {
  id: string;
  type: string;
  message: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  farm: {
    id: string;
    name: string;
    avatar: string;
  };
  created_at: string;
}

export interface TypeRecentActivityLogsResponse {
  success: boolean;
  data: TypeRecentActivityLog[];
}
