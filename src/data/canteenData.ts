import { FoodOption, PriceOption, ComboOption, CanteenConfig } from '../types/canteen';

export const CANTEEN_DEFAULT_CONFIG: CanteenConfig = {
  canteenName: 'School Campus Canteen',
  managerWhatsApp: '923440910083', // 03440910083 in international format
  managerEmail: 'canteen.manager@school.edu',
  prizesCount: 5,
  drawDay: 'Every Friday at 12:30 PM'
};

export const FOOD_OPTIONS: FoodOption[] = [
  {
    id: 'zinger',
    name: 'Crispy Zinger Burger',
    description: 'Crispy fried chicken fillet with creamy garlic mayo & fresh iceberg lettuce',
    emoji: '🍔',
    badge: 'Most Requested',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'pizza',
    name: 'Cheesy Pizza Slice',
    description: 'Oven-baked crust overloaded with mozzarella cheese & tender chicken chunks',
    emoji: '🍕',
    badge: 'Student Favorite',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'loaded-fries',
    name: 'Loaded Cheesy Fries',
    description: 'Golden crispy french fries smothered in melted cheddar cheese sauce & jalapenos',
    emoji: '🍟',
    badge: 'Super Crispy',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'shawarma',
    name: 'Spicy Shawarma Roll',
    description: 'Juicy roasted chicken wrapped in soft pita bread with special white sauce',
    emoji: '🌯',
    badge: 'Pocket Friendly',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'nuggets',
    name: 'Chicken Nuggets Basket',
    description: '6 pieces of golden crunchy chicken nuggets served with signature dip',
    emoji: '🍗',
    badge: 'Quick Bite',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'pasta',
    name: 'Creamy Alfredo Pasta',
    description: 'Penne pasta tossed in rich parmesan white sauce with grilled chicken bits',
    emoji: '🍝',
    badge: 'Chef Special',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281696?auto=format&fit=crop&q=80&w=600'
  }
];

export const PRICE_OPTIONS: PriceOption[] = [
  {
    id: 'p1',
    label: 'Rs. 150 – 200',
    sublabel: 'Super Pocket-Friendly (Pocket Money Saver)',
    color: 'from-amber-400 to-yellow-500'
  },
  {
    id: 'p2',
    label: 'Rs. 200 – 250',
    sublabel: 'Best Value Deal (Balanced Quantity & Taste)',
    color: 'from-emerald-400 to-teal-500'
  },
  {
    id: 'p3',
    label: 'Rs. 250 – 300',
    sublabel: 'Full Size Hearty Portion (Hungry Belly Meal)',
    color: 'from-blue-400 to-indigo-500'
  },
  {
    id: 'p4',
    label: 'Rs. 300+',
    sublabel: 'Mega Feast / Double Patty Gourmet',
    color: 'from-rose-400 to-red-500'
  }
];

export const COMBO_OPTIONS: ComboOption[] = [
  {
    id: 'combo-1',
    title: 'Combo #1: The Classic Zinger Deal',
    tagline: 'Crispy Zinger Burger + Crispy Fries + Chilled Cold Drink / Fruit Juice',
    items: ['1x Crispy Zinger Burger', '1x Salted Golden French Fries', '1x 250ml Cold Drink / Juice'],
    popular: true,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'combo-2',
    title: 'Combo #2: Pizza & Garlic Crunch Deal',
    tagline: 'Jumbo Cheesy Pizza Slice + 2x Cheesy Garlic Bread + Chilled Drink',
    items: ['1x Jumbo Pizza Slice', '2x Toasted Garlic Bread Slices', '1x 250ml Cold Drink / Juice'],
    popular: false,
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'combo-3',
    title: 'Combo #3: Shawarma & Loaded Fries Deal',
    tagline: 'Chicken Shawarma Roll + Masala Loaded Fries + Chilled Drink',
    items: ['1x Chicken Shawarma Roll', '1x Masala Cheesy Fries Cup', '1x 250ml Cold Drink / Juice'],
    popular: true,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=600'
  }
];

export const CLASSES_LIST = [
  'Class 5-A', 'Class 5-B',
  'Class 6-A', 'Class 6-B', 'Class 6-C',
  'Class 7-A', 'Class 7-B', 'Class 7-C',
  'Class 8-A', 'Class 8-B', 'Class 8-C',
  'Class 9 (Matric)', 'Class 9 (O-Levels)',
  'Class 10 (Matric)', 'Class 10 (O-Levels)',
  'Class 11 / 1st Year (FSc / ICS)', 'A-Levels (AS)',
  'Class 12 / 2nd Year (FSc / ICS)', 'A-Levels (A2)',
  'School Staff / Teacher'
];
