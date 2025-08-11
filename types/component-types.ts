import { PageSummary, BookInfo } from "./document-types";

// Component prop types
export interface AmplifyErrorBoundaryProps {
  children: React.ReactNode;
}

export interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  height?: string;
}

export interface DocumentUploaderProps {
  onDocumentProcessed: (
    pages: string[],
    fileName: string,
    fileType: "word" | "pdf"
  ) => void;
  onProcessingStateChange: (isProcessing: boolean) => void;
  onError: (error: string | null) => void;
  onStartFromScratch: () => void;
}

export interface DocumentPageProps {
  bookId?: string;
}

export interface DocumentSplitterProps {
  bookId?: string;
}

export interface SummaryViewerProps {
  pageSummary: PageSummary;
  pageIndex: number;
  bookInfo: BookInfo;
  onUpdateSummary: (summary: PageSummary, pageIndex: number) => void;
  onImageGenerationStart?: (pageIndex: number) => void;
  onImageGenerationComplete?: (pageIndex: number, imageUrl: string) => void;
}

export interface SummaryViewerLoadingState {
  isGeneratingImage: boolean;
  isUploading: boolean;
  isRemoving: boolean;
  isSaving: boolean;
}

export interface PageViewerProps {
  page: string;
  pageIndex: number;
  fileName: string;
  onGenerateSummary?: (pageIndex: number) => Promise<void> | undefined;
  isSummarizing?: boolean;
}

export interface PagesListProps {
  pages: string[];
  fileName: string;
  fileType: "word" | "pdf";
  selectedPageIndex: number;
  onSelectPage: (index: number) => void;
  onSummarizeAllPages?: () => Promise<void>;
}

export interface SummarizedPagesListProps {
  pageSummaries: PageSummary[];
  fileName: string;
  fileType: "word" | "pdf";
  selectedPageIndex: number;
  onSelectPage: (index: number) => void;
  onReorderPages?: (reorderedPages: PageSummary[]) => void;
  onAddNewPage?: (options?: {
    duplicate?: boolean;
    insertAfterIndex?: number;
    template?: "blank" | "detailed";
  }) => void;
  onDeletePage?: (index: number) => void;
  onGenerateAllImages?: () => void;
  onUploadSlides?: () => Promise<void>;
  summarizingPageIndices?: Set<number>;
}

export interface MobilePreviewProps {
  title: string;
  content: string;
  imageUrl?: string;
  imagePosition?: "top" | "bottom";
  bookTitle: string;
  author: string;
  description: string;
}

export interface FetchKeyImageProps {
  imageKey?: string;
  className?: string;
  tempUrl?: boolean;
  alt?: string;
}
