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

// Auth Service
export {
  signInUser,
  signUpUser,
  confirmSignUpUser,
  resendConfirmationCode,
  signOutUser,
  getCurrentUserInfo,
  getCurrentSession,
  getUserAttributes,
  extractUserFromSession,
  getCurrentUserSession,
  listenToAuthEvents,
  isAuthenticated,
  type SignInCredentials,
  type SignUpData,
  type ConfirmSignUpData,
  type UserSession,
} from "./auth.service";

// Storage Service
export {
  uploadFile,
  uploadBookFile,
  getFileUrl,
  deleteFile,
  validateFile,
  type UploadOptions,
  type UploadResult,
} from "./storage.service";
