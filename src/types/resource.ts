// src/types/resource.ts
export type ServiceType =
  | 'Mental Health'
  | 'Substance Use'
  | 'Shelter'
  | 'Basic Needs'
  | 'Healthcare'
  | 'Integrated'
  | 'Food'
  | 'Hygiene'
  | 'Medical'
  | 'Documents'
  | 'Employment'
  | 'Shelter+Medical'
  | 'Shelter+Food'
  | 'Hygiene+Documents'
  | 'Substance Use'
  | 'Transportation'
  | 'Information';

export interface Resource {
  id: string;
  name: string;
  type: ServiceType | string; // Allow string for flexibility with Google Sheets data
  address: string;
  phone: string;
  hours: string;
  status: 'Open' | 'Closed' | 'At Capacity' | string; // Allow string for flexibility
  capacity?: number | string; // Allow both for parsing
  notes?: string;
  
  // Optional fields to help with filtering & smart matching
  latitude?: number;
  longitude?: number;
  familyFriendly?: boolean;
  petsAllowed?: boolean;
  disabilityAccess?: boolean;
  lgbtqFriendly?: boolean;
  soberLiving?: boolean;
}

export interface LiveStatus {
  resourceId: string;
  availableBeds?: number | string | null; // Allow string for parsing
  waitTime?: string;
  specialNotes?: string;
  updatedTimestamp: string;
}

export interface ResourceWithLive extends Resource {
  liveStatus?: LiveStatus;
}

// Alias for compatibility with existing code
export type CombinedResource = ResourceWithLive;