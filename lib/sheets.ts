import { google } from "googleapis";
import {
  mockCourses,
  mockGallery,
  mockPlacements,
  mockTestimonials,
  mockVideoTestimonials,
} from "@/data/mock-data";
import type {
  Course,
  GalleryItem,
  LeadFormData,
  Placement,
  Testimonial,
  VideoTestimonial,
} from "@/lib/types";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const USE_MOCK_DATA = process.env.USE_MOCK_DATA === "true";

function hasSheetsEnv() {
  return Boolean(SHEET_ID && process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY);
}

async function getSheetsClient() {
  if (!hasSheetsEnv()) {
    throw new Error("Missing Google Sheets environment variables");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

async function getSheetData(tabName: string): Promise<string[][]> {
  const sheets = await getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${tabName}!A:Z`,
  });

  return response.data.values ?? [];
}

function rowsToObjects<T extends { active: boolean }>(rows: string[][]): T[] {
  if (!rows.length) return [];

  const [headers, ...dataRows] = rows;

  return dataRows
    .map((row) => {
      const entry: Record<string, string | boolean> = {};

      headers.forEach((header, index) => {
        const value = row[index] ?? "";
        entry[header] = header === "active" ? value.toUpperCase() === "TRUE" : value;
      });

      return entry as T;
    })
    .filter((item) => item.active === true);
}

function shouldUseMockData() {
  return USE_MOCK_DATA || !hasSheetsEnv();
}

function withDataFallback<T>(sheetData: T[], fallbackData: T[]): T[] {
  if (sheetData.length > 0) return sheetData;
  return fallbackData;
}

async function safeFetch<T>(fn: () => Promise<T[]>, fallbackData: T[]): Promise<T[]> {
  if (shouldUseMockData()) {
    return fallbackData;
  }

  try {
    const result = await fn();
    return withDataFallback(result, fallbackData);
  } catch (error) {
    console.error("Sheets fetch error", error);
    return fallbackData;
  }
}

export async function getCourses(): Promise<Course[]> {
  return safeFetch(async () => rowsToObjects<Course>(await getSheetData("courses")), mockCourses);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return safeFetch(
    async () => rowsToObjects<Testimonial>(await getSheetData("testimonials")),
    mockTestimonials,
  );
}

export async function getVideoTestimonials(): Promise<VideoTestimonial[]> {
  return safeFetch(
    async () => rowsToObjects<VideoTestimonial>(await getSheetData("video_testimonials")),
    mockVideoTestimonials,
  );
}

export async function getPlacements(): Promise<Placement[]> {
  return safeFetch(
    async () => rowsToObjects<Placement>(await getSheetData("placements")),
    mockPlacements,
  );
}

export async function getGallery(): Promise<GalleryItem[]> {
  return safeFetch(async () => rowsToObjects<GalleryItem>(await getSheetData("gallery")), mockGallery);
}

export async function appendLead(data: LeadFormData): Promise<void> {
  if (shouldUseMockData()) {
    console.log("Mock lead captured", data);
    return;
  }

  const sheets = await getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: "leads!A:E",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[new Date().toISOString(), data.name, data.phone, data.course, data.source]],
    },
  });
}
