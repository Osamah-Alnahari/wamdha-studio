export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "ومضة";

// GraphQL BookCategory enum values with Arabic labels
export const BOOK_CATEGORIES = [
  { value: "FICTION", label: "روايات وقصص" },
  { value: "PERSONAL_GROWTH", label: "تنمية بشرية" },
  { value: "EDUCATION", label: "تعليم" },
  { value: "HISTORY", label: "تاريخ" },
  { value: "TECHNOLOGY", label: "تكنولوجيا" },
  { value: "SCIENCE", label: "علوم" },
  { value: "ART", label: "فن" },
  { value: "BUSINESS", label: "إدارة أعمال" },
  { value: "BIOGRAPHY", label: "سيرة ذاتية" },
  { value: "OTHER", label: "أخرى" },
] as const;

export type BookCategoryValue = (typeof BOOK_CATEGORIES)[number]["value"];
export type BookCategoryOption = (typeof BOOK_CATEGORIES)[number];
