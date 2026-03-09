
export const restaurants = [
  {
    id: 1,
    name: "Nasi Lemak Village",
    image: "https://images.unsplash.com/photo-1756133570715-1b931bfb4482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXNpJTIwbGVtYWslMjBtYWxheXNpYW4lMjBmb29kfGVufDF8fHx8MTc3MjQ2MTU5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8,
    eta: "20-30 min",
    priceRange: "RM 10-20",
    tags: ["Malaysian", "Halal"],
    menu: [
      {
        id: 101,
        name: "Nasi Lemak Ayam Goreng Berempah",
        description: "Fragrant coconut rice served with spicy sambal, crispy anchovies, toasted peanuts, cucumber, and fried spiced chicken.",
        price: 12.00,
        image: "https://images.unsplash.com/photo-1756133570715-1b931bfb4482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXNpJTIwbGVtYWslMjBtYWxheXNpYW4lMjBmb29kfGVufDF8fHx8MTc3MjQ2MTU5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
      {
        id: 102,
        name: "Teh Tarik",
        description: "Pulled milk tea, hot and frothy.",
        price: 3.50,
        image: "https://images.unsplash.com/photo-1626202158866-9b266a218f48?q=80&w=1000&auto=format&fit=crop", // Fallback or general tea image
      }
    ]
  },
  {
    id: 2,
    name: "Burger Bros",
    image: "https://images.unsplash.com/photo-1577973479360-62e8e4759cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBidXJnZXIlMjBtZWFsfGVufDF8fHx8MTc3MjM3NTU5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.5,
    eta: "15-25 min",
    priceRange: "RM 15-30",
    tags: ["Fast Food", "Burgers"],
    menu: [
      {
        id: 201,
        name: "Classic Cheeseburger",
        description: "Juicy beef patty with cheddar cheese, lettuce, tomato, and secret sauce.",
        price: 18.00,
        image: "https://images.unsplash.com/photo-1577973479360-62e8e4759cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBidXJnZXIlMjBtZWFsfGVufDF8fHx8MTc3MjM3NTU5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      }
    ]
  }
];

export const rider = {
  name: "Ah Meng",
  plate: "VBC 1234",
  photo: "https://images.unsplash.com/photo-1769961982389-bb243681421a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwYXNpYW4lMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI0NjE1OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  location: { lat: 3.1412, lng: 101.6865 }, // Roughly KL
};

export const userLocation = "Office Tower B, KL";
