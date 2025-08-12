import {
  DocumentState,
  BookInfo,
  LoadingState,
  ProcessingState,
  EditorState,
  ImageState,
  UIState,
  PageSummary,
} from "./document-types";

// Store interface
export interface DocumentStore {
  // State
  documentState: DocumentState;
  bookInfo: BookInfo;
  loadingState: LoadingState;
  processingState: ProcessingState;
  editorState: EditorState;
  imageState: ImageState;
  uiState: UIState;

  // Actions
  updateDocumentState: (updates: Partial<DocumentState>) => void;
  updateBookInfo: (updates: Partial<BookInfo>) => void;
  updateLoadingState: (updates: Partial<LoadingState>) => void;
  updateProcessingState: (updates: Partial<ProcessingState>) => void;
  updateEditorState: (updates: Partial<EditorState>) => void;
  updateImageState: (updates: Partial<ImageState>) => void;
  updateUIState: (updates: Partial<UIState>) => void;

  // Complex actions
  setSelectedPage: (index: number) => void;
  addPageSummary: (summary: PageSummary, index?: number) => void;
  updatePageSummary: (summary: PageSummary, index: number) => void;
  deletePageSummary: (index: number) => void;
  reorderPageSummaries: (fromIndex: number, toIndex: number) => void;

  // Additional actions for component functionality
  addNewPage: (options?: {
    duplicate?: boolean;
    insertAfterIndex?: number;
    template?: "blank" | "detailed";
  }) => void;
  generateAllImages: () => Promise<number>;

  // Reset functions
  resetDocumentState: () => void;
  resetAllState: () => void;
}
