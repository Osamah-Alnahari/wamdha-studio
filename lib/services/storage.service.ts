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
  accessLevel: "guest" | "private" | "protected" | "public" = "public",
  options: UploadOptions = {}
): Promise<UploadResult> => {
  try {
    const { onProgress, contentType } = options;

    // Generate unique path based on access level and file properties
    const uniqueId = uuidv4();
    const extension = file.name.split(".").pop() || "";
    const path = `${accessLevel}/${uniqueId}.${extension}`;

    await uploadData({
      path,
      data: file,
      options: {
        onProgress,
        contentType,
      },
    });

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
