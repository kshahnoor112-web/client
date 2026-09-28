export interface StudentRegistration {
  name: string;
  studentClass: string;
  phone: string;
}

export interface FoodOption {
  id: string;
  name: string;
  description: string;
  image: string;
  emoji: string;
  badge?: string;
}

export interface PriceOption {
  id: string;
  label: string;
  sublabel: string;
  color: string;
}

export interface ComboOption {
  id: string;
  title: string;
  tagline: string;
  items: string[];
  image: string;
  popular?: boolean;
}

export interface StudentSubmission {
  id: string;
  tokenNumber: string;
  name: string;
  studentClass: string;
  phone: string;
  wantedFoodItem: string;
  idealPrice: string;
  favoriteCombo: string;
  timestamp: string;
  isWinner?: boolean;
}

export interface CanteenConfig {
  canteenName: string;
  managerWhatsApp: string;
  managerEmail: string;
  prizesCount: number;
  drawDay: string;
}
