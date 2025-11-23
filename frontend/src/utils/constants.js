// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Restaurant Information
export const RESTAURANT_INFO = {
  name: 'Café Fausse',
  address: '1234 Culinary Ave, Suite 100, Washington, DC 20002',
  phone: '(202) 555-4567',
  email: 'info@cafefausse.com',
  
  hours: {
    weekday: 'Monday–Saturday: 5:00 PM – 11:00 PM',
    sunday: 'Sunday: 5:00 PM – 9:00 PM'
  },
  
  hoursDetailed: {
    monday: { open: '17:00', close: '23:00' },
    tuesday: { open: '17:00', close: '23:00' },
    wednesday: { open: '17:00', close: '23:00' },
    thursday: { open: '17:00', close: '23:00' },
    friday: { open: '17:00', close: '23:00' },
    saturday: { open: '17:00', close: '23:00' },
    sunday: { open: '17:00', close: '21:00' }
  }
};

// About Information
export const ABOUT_INFO = {
  history: `Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse blends traditional Italian flavors with modern culinary innovation. Our mission is to provide an unforgettable dining experience that reflects both quality and creativity.`,
  
  founders: [
    {
      name: 'Chef Antonio Rossi',
      role: 'Head Chef & Co-Founder',
      bio: 'With over 20 years of culinary experience, Chef Rossi brings authentic Italian flavors to every dish.'
    },
    {
      name: 'Maria Lopez',
      role: 'Restaurateur & Co-Founder',
      bio: 'Maria\'s passion for hospitality and attention to detail creates an unforgettable dining atmosphere.'
    }
  ],
  
  commitment: 'We are committed to using locally sourced ingredients and providing an unforgettable dining experience with excellent food.'
};

// Awards
export const AWARDS = [
  {
    title: 'Culinary Excellence Award',
    year: '2022'
  },
  {
    title: 'Restaurant of the Year',
    year: '2023'
  },
  {
    title: 'Best Fine Dining Experience',
    source: 'Foodie Magazine',
    year: '2023'
  }
];

// Customer Reviews
export const REVIEWS = [
  {
    text: 'Exceptional ambiance and unforgettable flavors.',
    source: 'Gourmet Review'
  },
  {
    text: 'A must-visit restaurant for food enthusiasts.',
    source: 'The Daily Bite'
  }
];

// Navigation Links
export const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Menu' },
  { path: '/reservations', label: 'Reservations' },
  { path: '/about', label: 'About Us' },
  { path: '/gallery', label: 'Gallery' }
];

// Reservation Settings
export const RESERVATION_CONFIG = {
  minGuests: 1,
  maxGuests: 8,
  duration: 2, // hours
  minAdvanceHours: 1
};
