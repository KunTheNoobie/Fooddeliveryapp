export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  restaurantId: string;
  restaurantName: string;
  isHalal: boolean;
  prepTime: string;
  isSpicy: boolean;
  isVegetarian: boolean;
  isPopular: boolean;
  customizations: {
    checkboxes: string[];
    portionOptions: Array<{ name: string; price: number }>;
  };
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  eta: string;
  isHalal: boolean;
}

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Warung Pak Hassan",
    image: "https://images.unsplash.com/photo-1730491813799-5d12913c868d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHJlc3RhdXJhbnQlMjBzdG9yZWZyb250fGVufDF8fHx8MTc3MjQzOTc0MHww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    eta: "15-20 min",
    isHalal: true,
  },
  {
    id: "2",
    name: "Tandoori Palace",
    image: "https://images.unsplash.com/photo-1690915475414-9aaecfd3ba74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjdXJyeSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzcyNDQ5NzY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    eta: "25-30 min",
    isHalal: true,
  },
  {
    id: "3",
    name: "Hainan Chicken Rice",
    image: "https://images.unsplash.com/photo-1581184953963-d15972933db1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwcmljZSUyMGFzaWFuJTIwZm9vZHxlbnwxfHx8fDE3NzI0MDE2NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    eta: "10-15 min",
    isHalal: false,
  },
];

export const foodItems: FoodItem[] = [
  {
    id: "1",
    name: "Nasi Lemak Special",
    description: "Fragrant coconut rice with sambal, crispy anchovies, peanuts, boiled egg, and cucumber",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1705147289789-6df2593f1b1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXNpJTIwbGVtYWslMjBwbGF0ZSUyMGNvY29udXQlMjByaWNlfGVufDF8fHx8MTc3MzA1NjYzNHww&ixlib=rb-4.1.0&q=80&w=1080",
    restaurantId: "1",
    restaurantName: "Warung Pak Hassan",
    isHalal: true,
    prepTime: "15-20 min",
    isSpicy: true,
    isVegetarian: false,
    isPopular: true,
    customizations: {
      checkboxes: ["No Peanuts", "No Anchovies", "Less Sambal", "Extra Egg"],
      portionOptions: [
        { name: "Normal Portion", price: 0 },
        { name: "Large Portion", price: 3.00 },
      ],
    },
  },
  {
    id: "2",
    name: "Roti Canai with Curry",
    description: "Flaky flatbread served with aromatic dhal curry",
    price: 8.00,
    image: "https://images.unsplash.com/photo-1768967032487-b6ef958a017e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3RpJTIwY2FuYWklMjBtYWxheXNpYW4lMjBmb29kfGVufDF8fHx8MTc3MzA1NTMwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    restaurantId: "1",
    restaurantName: "Warung Pak Hassan",
    isHalal: true,
    prepTime: "10-15 min",
    isSpicy: false,
    isVegetarian: true,
    isPopular: true,
    customizations: {
      checkboxes: ["Extra Crispy", "Less Oil", "Add Cheese", "Add Egg"],
      portionOptions: [
        { name: "1 Piece", price: 0 },
        { name: "2 Pieces", price: 4.00 },
        { name: "3 Pieces", price: 8.00 },
      ],
    },
  },
  {
    id: "3",
    name: "Chicken Satay",
    description: "Grilled marinated chicken skewers with peanut sauce",
    price: 14.00,
    image: "https://images.unsplash.com/photo-1744175331258-f4758acce6ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRheSUyMHNrZXdlcnMlMjBhc2lhbnxlbnwxfHx8fDE3NzMwMjkxNTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    restaurantId: "1",
    restaurantName: "Warung Pak Hassan",
    isHalal: true,
    prepTime: "15-20 min",
    isSpicy: false,
    isVegetarian: false,
    isPopular: true,
    customizations: {
      checkboxes: ["Extra Peanut Sauce", "No Onions", "Extra Cucumber", "Spicy Sauce"],
      portionOptions: [
        { name: "5 Sticks", price: 0 },
        { name: "10 Sticks", price: 6.00 },
        { name: "15 Sticks", price: 12.00 },
      ],
    },
  },
  {
    id: "4",
    name: "Laksa Penang",
    description: "Spicy and tangy fish-based noodle soup",
    price: 13.50,
    image: "https://images.unsplash.com/photo-1768703321913-db220381bb84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtzYSUyMG5vb2RsZSUyMHNvdXB8ZW58MXx8fHwxNzczMDI5MTU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    restaurantId: "1",
    restaurantName: "Warung Pak Hassan",
    isHalal: true,
    prepTime: "20-25 min",
    isSpicy: true,
    isVegetarian: false,
    isPopular: false,
    customizations: {
      checkboxes: ["Extra Spicy", "Less Soup", "No Fish Cake", "Add Prawns"],
      portionOptions: [
        { name: "Regular Bowl", price: 0 },
        { name: "Large Bowl", price: 3.50 },
      ],
    },
  },
  {
    id: "5",
    name: "Beef Rendang",
    description: "Slow-cooked beef in rich coconut curry",
    price: 18.00,
    image: "https://images.unsplash.com/photo-1640542509430-f529fdfce835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5kYW5nJTIwY3VycnklMjBtZWF0fGVufDF8fHx8MTc3MzA1NTMwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    restaurantId: "2",
    restaurantName: "Tandoori Palace",
    isHalal: true,
    prepTime: "25-30 min",
    isSpicy: true,
    isVegetarian: false,
    isPopular: true,
    customizations: {
      checkboxes: ["Extra Tender Beef", "Less Spicy", "Extra Gravy", "Add Rice"],
      portionOptions: [
        { name: "Regular Serving", price: 0 },
        { name: "Large Serving", price: 5.00 },
      ],
    },
  },
  {
    id: "6",
    name: "Char Kway Teow",
    description: "Stir-fried flat rice noodles with prawns and Chinese sausage",
    price: 11.00,
    image: "https://images.unsplash.com/photo-1723561796007-2fcf547ec47d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyJTIwa3dheSUyMHRlb3clMjBub29kbGVzfGVufDF8fHx8MTc3MzAyOTE1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    restaurantId: "3",
    restaurantName: "Hainan Chicken Rice",
    isHalal: false,
    prepTime: "10-15 min",
    isSpicy: false,
    isVegetarian: false,
    isPopular: true,
    customizations: {
      checkboxes: ["Extra Wok Hei", "No Bean Sprouts", "Extra Prawns", "Less Oily"],
      portionOptions: [
        { name: "Regular Plate", price: 0 },
        { name: "Large Plate", price: 3.00 },
      ],
    },
  },
  {
    id: "7",
    name: "Mee Goreng",
    description: "Spicy fried yellow noodles with vegetables",
    price: 9.50,
    image: "https://images.unsplash.com/photo-1597394412740-fc6d57326e73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWUlMjBnb3JlbmclMjBub29kbGVzfGVufDF8fHx8MTc3MzA1NTMwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    restaurantId: "1",
    restaurantName: "Warung Pak Hassan",
    isHalal: true,
    prepTime: "10-15 min",
    isSpicy: true,
    isVegetarian: false,
    isPopular: false,
    customizations: {
      checkboxes: ["Extra Spicy", "Add Egg", "Add Chicken", "Less Vegetables"],
      portionOptions: [
        { name: "Regular Portion", price: 0 },
        { name: "Large Portion", price: 2.50 },
      ],
    },
  },
];