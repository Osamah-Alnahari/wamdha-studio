"use client";
import { uploadFile } from "@/lib/services";
import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import FetchKeyImage from "@/components/FetchKeyImage";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface BookInfo {
  title: string;
  author: string;
  description: string;
  coverImageUrl?: string;
  isOwnedByUser: boolean;
}

interface BookDetailsProps {
  bookInfo: BookInfo;
  onUpdateBookInfo: (info: BookInfo) => void;
  isNew?: boolean;
  isSaving?: boolean;
}

export function BookDetails({
  bookInfo,
  onUpdateBookInfo,
  isNew = false,
  isSaving = false,
}: BookDetailsProps) {
  const [title, setTitle] = useState(bookInfo.title);
  const [author, setAuthor] = useState(bookInfo.author);
  const [description, setDescription] = useState(bookInfo.description || "");
  const [isOwnedByUser, setIsOwnedByUser] = useState(
    bookInfo.isOwnedByUser || false
  );
  const [coverImageUrl, setCoverImageUrl] = useState<string | undefined>(
    bookInfo.coverImageUrl
  );
  const [localImageUrl, setLocalImageUrl] = useState<string | undefined>(
    undefined
  );

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const router = useRouter();
  // Update local state when bookInfo prop changes
  useEffect(() => {
    setTitle(bookInfo.title || "");
    setAuthor(bookInfo.author || "");
    setDescription(bookInfo.description || "");
    setIsOwnedByUser(bookInfo.isOwnedByUser || false);
    setCoverImageUrl(bookInfo.coverImageUrl);
    setHasChanges(false);
  }, [bookInfo]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasChanges(true);
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
    setHasChanges(true);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
    setHasChanges(true);
  };

  const handleOwnershipChange = (checked: boolean) => {
    setIsOwnedByUser(checked);
    setHasChanges(true);
  };

  const handleSave = () => {
    const updatedBookInfo = {
      title,
      author,
      description,
      coverImageUrl,
      isOwnedByUser,
    };

    onUpdateBookInfo(updatedBookInfo);
    setHasChanges(false);

    // Redirect to books page after saving
    router.push("/books");

    toast.success("تم تحديث تفاصيل الكتاب", {
      description: "تم حفظ تفاصيل كتابك بنجاح",
    });
  };

  // better way for handling images
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadFile(file, "public", {
        onProgress: ({ transferredBytes, totalBytes = 100 }) => {
          const percent = Math.round((transferredBytes / totalBytes) * 100);
          console.log(`Upload progress: ${percent}%`);
        },
      });

      // immediate preview:
      setCoverImageUrl(result.key);
      setLocalImageUrl(URL.createObjectURL(file));
      setHasChanges(true);
      toast.success("تم رفع صورة الغلاف بنجاح!");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("فشل رفع صورة الغلاف");
    }
  };

  const processImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const uploadedImageUrl = event.target.result as string;
        setCoverImageUrl(uploadedImageUrl);
        setHasChanges(true);
      }
    };
    // triggers the onload event
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCoverImageUrl(undefined);
    setHasChanges(true);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        processImageFile(file);
      } else {
        toast.error("نوع ملف غير صالح", {
          description: "يرجى رفع ملف صورة",
        });
      }
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>معلومات الكتاب</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-5">
            <div className="space-y-2">
              <label htmlFor="book-title" className="text-sm font-medium">
                عنوان الكتاب
              </label>
              <Input
                id="book-title"
                value={title}
                onChange={handleTitleChange}
                placeholder="أدخل عنوان الكتاب"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="book-author" className="text-sm font-medium">
                اسم المؤلف
              </label>
              <Input
                id="book-author"
                value={author}
                onChange={handleAuthorChange}
                placeholder="أدخل اسم المؤلف"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="book-description" className="text-sm font-medium">
                الوصف
              </label>
              <Textarea
                id="book-description"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="أدخل وصف الكتاب"
                className="min-h-[150px]"
              />
            </div>

            <div className="flex items-center space-x-2 pt-3">
              <Checkbox
                id="ownership"
                checked={isOwnedByUser}
                onCheckedChange={handleOwnershipChange}
              />
              <Label
                htmlFor="ownership"
                className="text-sm font-medium cursor-pointer"
              >
                أؤكد أنني أملك حقوق هذا الكتاب أو لدي إذن باستخدامه
              </Label>
            </div>

            {!isOwnedByUser && hasChanges && (
              <Alert variant="destructive" className="mt-3">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  يجب عليك تأكيد أنك تملك حقوق هذا الكتاب أو لديك إذن باستخدامه
                  قبل الحفظ
                </AlertDescription>
              </Alert>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              {isNew ? (
                <Button
                  onClick={handleSave}
                  disabled={
                    !hasChanges ||
                    !isOwnedByUser ||
                    !title ||
                    !author ||
                    isSaving
                  }
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      جارٍ إنشاء الكتاب...
                    </>
                  ) : (
                    "إنشاء الكتاب"
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleSave}
                  disabled={
                    !hasChanges ||
                    !isOwnedByUser ||
                    !title ||
                    !author ||
                    isSaving
                  }
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      جارٍ الحفظ...
                    </>
                  ) : (
                    "حفظ تفاصيل الكتاب"
                  )}
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">غلاف الكتاب</label>
            <div
              className={cn(
                "border rounded-md overflow-hidden transition-colors",
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-dashed border-primary/50 hover:border-primary"
              )}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              {coverImageUrl ? (
                <div className="relative aspect-[2/3] w-full">
                  <FetchKeyImage
                    imageKey={localImageUrl || coverImageUrl}
                    tempUrl={localImageUrl !== undefined}
                    alt="Book cover"
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="aspect-[2/3] w-full flex flex-col items-center justify-center p-6 text-muted-foreground cursor-pointer">
                  <ImageIcon className="h-12 w-12 mb-3 text-primary/70" />
                  <p className="text-center text-sm">
                    {isDragging
                      ? "أفلت الصورة هنا"
                      : "انقر أو اسحب لرفع صورة الغلاف"}
                  </p>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/png, image/jpeg, image/gif"
              className="hidden"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
