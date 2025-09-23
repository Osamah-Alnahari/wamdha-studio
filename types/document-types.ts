// Core document types
export interface PageSummary {
  title: string;
  content: string;
  imageUrl?: string;
  localImageUrl?: string;
  imagePosition?: "top" | "bottom";
  isLoading?: boolean;
  isGeneratingImage?: boolean;
}

export interface BookInfo {
  title: string;
  author: string;
  description: string;
  coverImageUrl?: string;
  isOwnedByUser: boolean;
  id?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImageUrl?: string;
  isOwnedByUser: boolean;
  createdAt: number;
}

// Content type definition
export interface BookContent {
  pages: string[];
  summaries: PageSummary[];
}

// Document state types
export interface DocumentState {
  pages: any[];
  pageSummaries: PageSummary[];
  fileName: string;
  fileType: "word" | "pdf" | null;
  selectedPageIndex: number;
  viewMode: "pages" | "summaries";
  startedFromScratch: boolean;
}

export interface LoadingState {
  isProcessing: boolean;
  isLoadingData: boolean;
  isUploading: boolean;
  isSaving: boolean;
  isSummarizingAll: boolean;
  isRemoving: boolean;
  isGeneratingImage: boolean;
}

export interface ProcessingState {
  summarizingPageIndices: Set<number>;
  error: string | null;
}

export interface EditorState {
  title: string;
  content: string;
  imagePosition: "top" | "bottom";
  viewMode: "edit" | "preview";
}

export interface ImageState {
  imageUrl?: string;
  localImageUrl?: string;
  imageDisplayUrl?: string;
  isDragging: boolean;
}

export interface UIState {
  draggedItemIndex: number | null;
  dropIndicatorPosition: number | null;
  deleteDialogOpen: boolean;
  pageToDelete: number | null;
  isDownloading: boolean;
  isAddingPage: boolean;
  isRemoving: boolean;
  isUploading: boolean;
}