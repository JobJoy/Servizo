

import { Service, ServiceType, UserProfile, ServiceDeliveryMethod, ServiceStatus } from './types'; 

export const APP_NAME = "Servizo";
export const DEFAULT_USER_AVATAR = 'https://picsum.photos/seed/avatar/100/100';

export const MOCK_USER_JOHN_ID = 'user1'; 
export const MOCK_USER_MARIA_ID = 'user2'; 

export const MOCK_USER_JOHN: UserProfile = {
  id: MOCK_USER_JOHN_ID,
  name: 'Juan Dela Cruz (Mock)',
  avatar_url: 'https://picsum.photos/seed/juan/100/100', 
  location: 'Manila, Philippines',
  contactNumber: '09171234567',
  bio: 'Experienced handyman and proud Filipino worker. Ready to help with your home needs!',
  average_rating: null,
  review_count: 0,
};

export const MOCK_USER_MARIA: UserProfile = {
  id: MOCK_USER_MARIA_ID,
  name: 'Maria Santos (Mock)',
  avatar_url: 'https://picsum.photos/seed/maria/100/100', 
  location: 'Cebu City, Philippines',
  contactNumber: '09287654321',
  bio: 'Creative graphic designer passionate about helping small businesses shine.',
  average_rating: null,
  review_count: 0,
};


export const MOCK_SERVICES: Service[] = [
  {
    id: 'serv1',
    title: 'Expert Aircon Cleaning & Repair (Mock)',
    description: 'Full aircon cleaning and minor repair service for split type and window type units. Keep your aircon running efficiently! Price starts at P500. Servicing Metro Manila.',
    price: 500,
    price_unit: 'fixed',
    location: 'Quezon City, Metro Manila',
    images: ['https://picsum.photos/seed/aircon1/600/400', 'https://picsum.photos/seed/aircon2/600/400'],
    provider_id: MOCK_USER_JOHN_ID, 
    provider: MOCK_USER_JOHN,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    type: ServiceType.SERVICE_OFFERED,
    tags: ['aircon', 'cleaning', 'home repair', 'maintenance'],
    delivery_methods: [ServiceDeliveryMethod.CLIENT_LOCATION],
    average_rating: null, // Added
    review_count: 0,   // Added
    status: ServiceStatus.ACTIVE,
  },
  // Ensure other mock services also have category_id and category removed
];

// Pagination constants
export const SEARCH_RESULTS_PER_PAGE = 8; // For services and users in search results
export const REVIEWS_PER_PAGE = 5;
export const PROFILE_LISTINGS_PER_PAGE = 6;
export const DASHBOARD_LISTINGS_PER_PAGE = 6;