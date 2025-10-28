import { uploadData, getUrl, remove } from "aws-amplify/storage";
import { v4 as uuidv4 } from "uuid";

// Types for storage operations
export interface UploadOptions {
  onProgress?: (progress: {
    transferredBytes: number;
    totalBytes: number;
  }) => void;
  contentType?: string;
}

export interface UploadResult {
  key: string;
  url: string;
}

// Upload file to S3
export const uploadFile = async (
  file: File,
  accessLevel: "guest" | "private" | "protected" = "guest",
  options: UploadOptions = {}
): Promise<UploadResult> => {
  try {
    const { onProgress, contentType } = options;

    // Generate unique path based on access level and file properties
    const uniqueId = uuidv4();
    const extension = file.name.split(".").pop() || "";
    const path = `${uniqueId}.${extension}`;

    const uploadTask = uploadData({
      path,
      data: file,
      options: {
        onProgress: (progress) => {
          if (onProgress && progress.totalBytes) {
            onProgress({
              transferredBytes: progress.transferredBytes,
              totalBytes: progress.totalBytes,
            });
          }
        },
        contentType,
      },
    });

    await uploadTask.result;

    // Get the public URL for the uploaded file
    const { url } = await getUrl({ path });

    return {
      key: path,
      url: url.href,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error(
      `Failed to upload file: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

// Upload a book file to a specific S3 path convention
// Path convention: public/books/{userId}/{bookId}/{bookTitle}.docs
export const uploadBookFile = async (
  file: File,
  userId: string,
  bookId: string,
  bookTitle: string,
  options: UploadOptions = {}
): Promise<UploadResult> => {
  try {
    const { onProgress, contentType } = options;
    const safeTitle = bookTitle
    .trim()
    .replace(/[\/\\?%*:|"<>]/g, "-") 
    .substring(0, 200);

    // Use the public/ prefix directly in the path since Amplify Storage
    // requires explicit paths for authenticated uploads
    const path = `public/books/${userId}/${bookId}/${safeTitle}.docs`;

    console.log("Uploading book file:", {
      path,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      userId,
      bookId,
      bookTitle,
      safeTitle,
    });

    // Upload to S3 - note: path is relative, Amplify adds the access level prefix
    const uploadTask = uploadData({
      path,
      data: file,
      options: {
        contentType: contentType ?? file.type,
        onProgress: (progress) => {
          console.log(
            `Upload progress: ${progress.transferredBytes}/${progress.totalBytes}`
          );
          if (onProgress && progress.totalBytes) {
            onProgress({
              transferredBytes: progress.transferredBytes,
              totalBytes: progress.totalBytes,
            });
          }
        },
      },
    });

    // Wait for the upload to complete
    const result = await uploadTask.result;
    console.log("Upload completed successfully:", result);

    // Get the public URL for the uploaded file
    const { url } = await getUrl({ path });

    return {
      key: path,
      url: url.href,
    };
  } catch (error) {
    console.error("Error uploading book file:", error);
    throw new Error(
      `Failed to upload book: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

// Get file URL from S3
export const getFileUrl = async (key: string): Promise<string | undefined> => {
  if (!key) return undefined;

  try {
    const { url } = await getUrl({ path: key });
    return url.href;
  } catch (error) {
    console.error("Error fetching file URL for key:", key, error);
    return undefined;
  }
};

// Delete file from S3
export const deleteFile = async (key: string): Promise<void> => {
  if (!key) {
    throw new Error("File key is required for deletion");
  }

  try {
    await remove({ path: key });
    console.log(`File deleted successfully: ${key}`);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error(
      `Failed to delete file: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

// Helper function to validate file before upload
export const validateFile = (file: File, maxSizeMB: number = 10): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  if (file.size > maxSizeBytes) {
    throw new Error(`File size exceeds ${maxSizeMB}MB limit`);
  }

  // Add more validation as needed (file type, etc.)
  return true;
};
