
export interface MenuItem {
  id: string;
  name: string;
  isEnabled: boolean;
  category: string;
}

export interface RecommendationResult {
  menuName: string;
  reason: string;
  tip: string;
}
