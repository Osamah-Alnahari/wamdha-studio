import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  DocumentStore,
  DocumentState,
  BookInfo,
  LoadingState,
  ProcessingState,
  EditorState,
  ImageState,
  UIState,
  PageSummary,
} from "@/types";

// Initial states
const initialDocumentState: DocumentState = {
  pages: [],
  pageSummaries: [],
  fileName: "",
  fileType: null,
  selectedPageIndex: 0,
  viewMode: "pages",
  startedFromScratch: false,
};

const initialBookInfo: BookInfo = {
  title: "",
  author: "",
  description: "",
  coverImageUrl: undefined,
  isOwnedByUser: false,
};

const initialLoadingState: LoadingState = {
  isProcessing: false,
  isLoadingData: true,
  isUploading: false,
  isSaving: false,
  isSummarizingAll: false,
  isRemoving: false,
  isGeneratingImage: false,
};

const initialProcessingState: ProcessingState = {
  summarizingPageIndices: new Set(),
  error: null,
};

const initialEditorState: EditorState = {
  title: "",
  content: "",
  imagePosition: "bottom",
  viewMode: "edit",
};

const initialImageState: ImageState = {
  imageUrl: undefined,
  localImageUrl: undefined,
  imageDisplayUrl: undefined,
  isDragging: false,
};

const initialUIState: UIState = {
  draggedItemIndex: null,
  dropIndicatorPosition: null,
  deleteDialogOpen: false,
  pageToDelete: null,
  isDownloading: false,
  isAddingPage: false,
  isRemoving: false,
  isUploading: false,
};

// Create the store
export const useDocumentStore = create<DocumentStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      documentState: initialDocumentState,
      bookInfo: initialBookInfo,
      loadingState: initialLoadingState,
      processingState: initialProcessingState,
      editorState: initialEditorState,
      imageState: initialImageState,
      uiState: initialUIState,

      // Basic update actions
      updateDocumentState: (updates) =>
        set(
          (state) => ({
            documentState: { ...state.documentState, ...updates },
          }),
          false,
          "updateDocumentState"
        ),

      updateBookInfo: (updates) =>
        set(
          (state) => ({
            bookInfo: { ...state.bookInfo, ...updates },
          }),
          false,
          "updateBookInfo"
        ),

      updateLoadingState: (updates) =>
        set(
          (state) => ({
            loadingState: { ...state.loadingState, ...updates },
          }),
          false,
          "updateLoadingState"
        ),

      updateProcessingState: (updates) =>
        set(
          (state) => ({
            processingState: { ...state.processingState, ...updates },
          }),
          false,
          "updateProcessingState"
        ),

      updateEditorState: (updates) =>
        set(
          (state) => ({
            editorState: { ...state.editorState, ...updates },
          }),
          false,
          "updateEditorState"
        ),

      updateImageState: (updates) =>
        set(
          (state) => ({
            imageState: { ...state.imageState, ...updates },
          }),
          false,
          "updateImageState"
        ),

      updateUIState: (updates) =>
        set(
          (state) => ({
            uiState: { ...state.uiState, ...updates },
          }),
          false,
          "updateUIState"
        ),

      // Complex actions
      setSelectedPage: (index) => {
        const { documentState } = get();
        if (index >= 0 && index < documentState.pageSummaries.length) {
          set(
            (state) => ({
              documentState: {
                ...state.documentState,
                selectedPageIndex: index,
              },
            }),
            false,
            "setSelectedPage"
          );
        }
      },

      addPageSummary: (summary, index) => {
        const { documentState } = get();
        const newSummaries = [...documentState.pageSummaries];
        const insertIndex = index !== undefined ? index : newSummaries.length;
        newSummaries.splice(insertIndex, 0, summary);

        set(
          (state) => ({
            documentState: {
              ...state.documentState,
              pageSummaries: newSummaries,
              selectedPageIndex: insertIndex,
            },
          }),
          false,
          "addPageSummary"
        );
      },

      updatePageSummary: (summary, index) => {
        const { documentState } = get();
        if (index >= 0 && index < documentState.pageSummaries.length) {
          const newSummaries = [...documentState.pageSummaries];
          newSummaries[index] = summary;

          set(
            (state) => ({
              documentState: {
                ...state.documentState,
                pageSummaries: newSummaries,
              },
            }),
            false,
            "updatePageSummary"
          );
        }
      },

      deletePageSummary: (index) => {
        const { documentState } = get();
        if (index >= 0 && index < documentState.pageSummaries.length) {
          const newSummaries = [...documentState.pageSummaries];
          newSummaries.splice(index, 1);

          let newSelectedIndex = documentState.selectedPageIndex;
          if (documentState.selectedPageIndex >= newSummaries.length) {
            newSelectedIndex = Math.max(0, newSummaries.length - 1);
          } else if (documentState.selectedPageIndex === index) {
            newSelectedIndex = Math.max(0, index - 1);
          }

          set(
            (state) => ({
              documentState: {
                ...state.documentState,
                pageSummaries: newSummaries,
                selectedPageIndex: newSelectedIndex,
              },
            }),
            false,
            "deletePageSummary"
          );
        }
      },

      reorderPageSummaries: (fromIndex, toIndex) => {
        const { documentState } = get();
        if (
          fromIndex >= 0 &&
          fromIndex < documentState.pageSummaries.length &&
          toIndex >= 0 &&
          toIndex < documentState.pageSummaries.length
        ) {
          const newSummaries = [...documentState.pageSummaries];
          const [movedItem] = newSummaries.splice(fromIndex, 1);
          newSummaries.splice(toIndex, 0, movedItem);

          let newSelectedIndex = documentState.selectedPageIndex;
          if (documentState.selectedPageIndex === fromIndex) {
            newSelectedIndex = toIndex;
          } else if (
            documentState.selectedPageIndex > fromIndex &&
            documentState.selectedPageIndex <= toIndex
          ) {
            newSelectedIndex = documentState.selectedPageIndex - 1;
          } else if (
            documentState.selectedPageIndex < fromIndex &&
            documentState.selectedPageIndex >= toIndex
          ) {
            newSelectedIndex = documentState.selectedPageIndex + 1;
          }

          set(
            (state) => ({
              documentState: {
                ...state.documentState,
                pageSummaries: newSummaries,
                selectedPageIndex: newSelectedIndex,
              },
            }),
            false,
            "reorderPageSummaries"
          );
        }
      },

      // Additional actions for component functionality
      addNewPage: (options?: {
        duplicate?: boolean;
        insertAfterIndex?: number;
        template?: "blank" | "detailed";
      }) => {
        const { documentState } = get();
        const MAX_PAGES = 100;

        if (documentState.pageSummaries.length >= MAX_PAGES) {
          throw new Error(`Maximum page limit reached: ${MAX_PAGES}`);
        }

        const insertAtIndex =
          options?.insertAfterIndex !== undefined
            ? options.insertAfterIndex + 1
            : documentState.pageSummaries.length;

        let newPage: PageSummary;

        if (
          options?.duplicate &&
          insertAtIndex > 0 &&
          insertAtIndex <= documentState.pageSummaries.length
        ) {
          const sourcePage =
            documentState.pageSummaries[
              options.insertAfterIndex || documentState.selectedPageIndex
            ];
          newPage = {
            title: `${sourcePage.title} (Copy)`,
            content: sourcePage.content,
            imageUrl: sourcePage.imageUrl,
            localImageUrl: sourcePage.localImageUrl,
            imagePosition: sourcePage.imagePosition,
            isGeneratingImage: false,
          };
        } else {
          if (options?.template === "detailed") {
            newPage = {
              title: `New Page ${documentState.pageSummaries.length + 1}`,
              content:
                "# Summary Heading\n\nAdd your detailed summary here...\n\n## Key Points\n\n- First point\n- Second point\n- Third point\n\n## Conclusion\n\nSummarize your main points here.",
              imageUrl: undefined,
              imagePosition: "bottom",
              isGeneratingImage: false,
            };
          } else {
            newPage = {
              title: `New Page ${documentState.pageSummaries.length + 1}`,
              content: "Add your summary content here...",
              imageUrl: undefined,
              imagePosition: "bottom",
              isGeneratingImage: false,
            };
          }
        }

        get().addPageSummary(newPage, insertAtIndex);
      },

      generateAllImages: async () => {
        const { documentState } = get();
        const summariesToProcess = documentState.pageSummaries.filter(
          (summary) => !summary.imageUrl && !summary.isGeneratingImage
        );

        if (summariesToProcess.length === 0) {
          throw new Error("No pages need images");
        }

        // Set all pages to generating state
        documentState.pageSummaries.forEach((summary, index) => {
          if (!summary.imageUrl && !summary.isGeneratingImage) {
            const updatedSummary = { ...summary, isGeneratingImage: true };
            get().updatePageSummary(updatedSummary, index);
          }
        });

        return summariesToProcess.length;
      },

      // Reset functions
      resetDocumentState: () =>
        set(
          { documentState: initialDocumentState },
          false,
          "resetDocumentState"
        ),

      resetAllState: () =>
        set(
          {
            documentState: initialDocumentState,
            bookInfo: initialBookInfo,
            loadingState: initialLoadingState,
            processingState: initialProcessingState,
            editorState: initialEditorState,
            imageState: initialImageState,
            uiState: initialUIState,
          },
          false,
          "resetAllState"
        ),
    }),
    {
      name: "document-store",
    }
  )
);

// Selector hooks for better performance
export const useDocumentState = () =>
  useDocumentStore((state) => state.documentState);
export const useBookInfo = () => useDocumentStore((state) => state.bookInfo);
export const useLoadingState = () =>
  useDocumentStore((state) => state.loadingState);
export const useProcessingState = () =>
  useDocumentStore((state) => state.processingState);
export const useEditorState = () =>
  useDocumentStore((state) => state.editorState);
export const useImageState = () =>
  useDocumentStore((state) => state.imageState);
export const useUIState = () => useDocumentStore((state) => state.uiState);

// Action selector hooks
export const useDocumentActions = () => {
  const store = useDocumentStore();
  return {
    updateDocumentState: store.updateDocumentState,
    updateBookInfo: store.updateBookInfo,
    updateLoadingState: store.updateLoadingState,
    updateProcessingState: store.updateProcessingState,
    updateEditorState: store.updateEditorState,
    updateImageState: store.updateImageState,
    updateUIState: store.updateUIState,
    setSelectedPage: store.setSelectedPage,
    addPageSummary: store.addPageSummary,
    updatePageSummary: store.updatePageSummary,
    deletePageSummary: store.deletePageSummary,
    reorderPageSummaries: store.reorderPageSummaries,
    addNewPage: store.addNewPage,
    generateAllImages: store.generateAllImages,
    resetDocumentState: store.resetDocumentState,
    resetAllState: store.resetAllState,
  };
};
