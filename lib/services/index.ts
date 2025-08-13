// Book Service
export {
  createBook,
  getBookById,
  updateBook,
  deleteBook,
  getUserBooks,
  listAllBooks,
  uploadSlides,
  deleteSlidesByBook,
} from "./book.service";

// Slide Service
export {
  createSlideItem,
  getSlideById,
  updateSlideItem,
  deleteSlideItem,
  getBookContent,
  listAllSlides,
  getSlidesByReadIdAndSlideNumber,
} from "./slide.service";

// User Service
export {
  createUserProfile,
  getUserById,
  updateUserProfile,
  deleteUserProfile,
  listAllUsers,
  getUserByEmail,
  getUserByUsername,
  updateUserLastActive,
  updateUserDailyStreak,
} from "./user.service";

// AI Service
export {
  summarizeText,
  generateImageFromPrompt,
  validateTextInput,
  validatePromptInput,
  sanitizeTextForAI,
  truncateTextForAI,
} from "./ai.service";
