// src/utils/googleSheetsApi.ts
import axios from 'axios';
import { Resource, LiveStatus } from '../types/resource';

const SHEETS_ID = import.meta.env.VITE_GOOGLE_SHEETS_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;

if (!SHEETS_ID || !API_KEY) {
  console.warn('Missing Google Sheets credentials');
}

// Updated to match your actual Google Sheet columns
function parseResources(rows: string[][]): Resource[] {
  if (!rows || rows.length === 0) {
    console.warn('No rows found in resources sheet');
    return [];
  }

  const header = rows[0];
  const idx = (col: string) => header.indexOf(col);
  
  return rows.slice(1)
    .filter(row => row.length > 0 && row[0]) // Filter out empty rows
    .map(r => ({
      id: r[idx('Name')]?.replace(/\s+/g, '') || '',
      name: r[idx('Name')] || '',
      type: r[idx('Type')] || '',
      address: r[idx('Address')] || '',
      phone: r[idx('Phone')] || '',
      hours: r[idx('Hours')] || '',
      status: r[idx('Status')] || '',
      capacity: r[idx('Capacity')] || '',
      notes: r[idx('Notes')] || ''
    }));
}

function parseLiveStatus(rows: string[][]): LiveStatus[] {
  if (!rows || rows.length === 0) {
    console.warn('No rows found in live_status sheet');
    return [];
  }

  const header = rows[0];
  const idx = (col: string) => header.indexOf(col);
  
  return rows.slice(1)
    .filter(row => row.length > 0 && row[0]) // Filter out empty rows
    .map(r => ({
      resourceId: r[idx('ResourceID')] || '',
      availableBeds: r[idx('AvailableBeds')] || '',
      waitTime: r[idx('WaitTime')] || '',
      specialNotes: r[idx('SpecialNotes')] || '',
      updatedTimestamp: r[idx('UpdatedTimestamp')] || ''
    }));
}

export async function fetchAllResources(): Promise<Resource[]> {
  try {
    if (!SHEETS_ID || !API_KEY) {
      console.warn('Using mock data - missing Google Sheets credentials');
      return getMockResources();
    }

    const res = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/resources?key=${API_KEY}`
    );
    
    return parseResources(res.data.values);
  } catch (error) {
    console.error('Error fetching resources from Google Sheets:', error);
    return getMockResources();
  }
}

export async function fetchLiveStatus(): Promise<LiveStatus[]> {
  try {
    if (!SHEETS_ID || !API_KEY) {
      console.warn('Using mock data - missing Google Sheets credentials');
      return getMockLiveStatus();
    }

    const res = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/live_status?key=${API_KEY}`
    );
    
    return parseLiveStatus(res.data.values);
  } catch (error) {
    console.error('Error fetching live status from Google Sheets:', error);
    return getMockLiveStatus();
  }
}

export async function fetchResourcesWithLive(): Promise<(Resource & { liveStatus?: LiveStatus })[]> {
  try {
    const [resources, liveStatus] = await Promise.all([
      fetchAllResources(),
      fetchLiveStatus()
    ]);
    
    const liveMap = new Map<string, LiveStatus>();
    liveStatus.forEach(l => liveMap.set(l.resourceId, l));
    
    return resources.map(r => ({
      ...r,
      liveStatus: liveMap.get(r.id)
    }));
  } catch (error) {
    console.error('Error fetching combined resources:', error);
    return getMockResources().map(r => ({ ...r }));
  }
}

// Mock data as fallback (same as before)
const getMockResources = (): Resource[] => [
  {
    id: "NashuaSoupKitchenShelter",
    name: "Nashua Soup Kitchen & Shelter",
    type: "Shelter",
    address: "126 East Pearl St, Nashua, NH 03060",
    phone: "(603) 889-7770",
    hours: "24/7",
    status: "Open",
    capacity: "45",
    notes: "Emergency shelter & meals. Bring ID if possible"
  },
  {
    id: "HarborCare",
    name: "Harbor Care",
    type: "Shelter+Medical",
    address: "77 Northeastern Blvd, Nashua, NH 03062",
    phone: "(603) 882-3616",
    hours: "Mon-Fri 8am-5pm",
    status: "Open",
    capacity: "32",
    notes: "Integrated healthcare & housing services"
  },
  {
    id: "TheDoorwayNashua",
    name: "The Doorway Nashua",
    type: "Substance Use",
    address: "15 Knight St, Nashua, NH 03060",
    phone: "(603) 881-8373",
    hours: "24/7 Hotline",
    status: "Open",
    capacity: "",
    notes: "Substance use treatment & recovery services"
  }
];

const getMockLiveStatus = (): LiveStatus[] => [
  {
    resourceId: "NashuaSoupKitchenShelter",
    availableBeds: "12",
    waitTime: "None",
    specialNotes: "Warming center open tonight",
    updatedTimestamp: "2024-01-15 14:30"
  },
  {
    resourceId: "HarborCare",
    availableBeds: "5",
    waitTime: "2 hours",
    specialNotes: "Medical staff on duty",
    updatedTimestamp: "2024-01-15 14:25"
  }
];