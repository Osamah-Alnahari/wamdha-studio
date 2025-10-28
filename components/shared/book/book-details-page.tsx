"use client";

import { useState, useEffect } from "react";
import { BookDetails } from "@/components/shared/book/book-details";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Book } from "@/lib/api-client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useAmplifyClient } from "@/hooks/use-amplify-client";
import { createBook, updateBook, getBookById } from "@/lib/services";
import BookDetailsSkeleton from "@/components/skeletons/BookDetailsSkeleton";

interface BookDetailsPageProps {
  bookId?: string;
  isNew?: boolean;
}

export function BookDetailsPage({
  bookId,
  isNew = false,
}: BookDetailsPageProps) {
  const router = useRouter();
  const { client } = useAmplifyClient();
  const [bookInfo, setBookInfo] = useState<Book>({
    id: bookId || `book-${Date.now()}`,
    title: "",
    author: "",
    description: "",
    coverImageUrl: undefined,
    isOwnedByUser: false,
    createdAt: Date.now(),
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isNavigatingToContent, setIsNavigatingToContent] = useState(false);
  const [hasLoadedData, setHasLoadedData] = useState(false);
  const { user } = useAuth();

  // Load book info from API on component mount
  useEffect(() => {
    if (isNew) {
      // For new books, reset to empty state
      setBookInfo({
        id: `book-${Date.now()}`,
        title: "",
        author: "",
        description: "",
        coverImageUrl: undefined,
        isOwnedByUser: false,
        createdAt: Date.now(),
      });

      setHasLoadedData(true);
      return;
    }

    if (!isNew && !bookId) {
      router.push("/books");
      return;
    }

    if (!client) {
      return;
    }

    loadBookData();
  }, [bookId, isNew, router, client]);

  const loadBookData = async () => {
    try {
      if (!client) {
        throw new Error("Client not available");
      }

      // Get book info
      const book = await getBookById(client, bookId!);
      if (book) {
        setBookInfo({
          id: book.id,
          title: book.title,
          author: book.authorName,
          description:
            typeof book.description === "string" ? book.description : "",
          coverImageUrl: book.thumbnailUrl,
          isOwnedByUser: book.userId === user?.userId,
          createdAt: new Date(book.createdAt).getTime(),
        });
      }
    } catch (e) {
      console.error("Failed to load book data:", e);
    } finally {
      setHasLoadedData(true);
    }
  };
  const handleBookInfoUpdate = async (info: Omit<Book, "id" | "createdAt">) => {
    setIsSaving(true);
    try {
      if (!user?.userId) {
        console.error("User not found. Cannot create a book.");
        toast.error("خطأ في المصادقة", {
          description: "يجب تسجيل الدخول لإنشاء كتاب",
        });
        return;
      }

      if (!client) {
        throw new Error("Client not available");
      }

      if (isNew) {
        const newBook = await createBook(client, {
          title: info.title,
          authorName: info.author,
          description: info.description,
          thumbnailUrl: info.coverImageUrl ?? "",
          userId: user.userId,
        });
        if (newBook) {
          router.push(`/books/${newBook.id}/content`);
        } else {
          console.error("Failed to create book:", newBook);
          throw new Error("Failed to create book.");
        }
      } else {
        const updatedBook = await updateBook(client, {
          id: bookId!,
          title: info.title,
          authorName: info.author,
          description: info.description,
          thumbnailUrl: info.coverImageUrl ?? "",
        });
        toast.success("تم تحديث تفاصيل الكتاب", {
          description: "تم حفظ تفاصيل كتابك بنجاح",
        });
        // Redirect to books page after successful save
        router.push("/books");
      }
    } catch (e: any) {
      // handle error after fixing the backend issue
      console.log("Failed to save book:", e);
      // toast.error("Error saving book", {
      //   description:
      //     e?.message || "There was a problem saving your book details.",
      // });
    } finally {
      setIsSaving(false);
    }
  };

  const handleNavigateToContent = () => {
    setIsNavigatingToContent(true);
    router.push(`/books/${bookInfo.id}/content`);
  };

  // render skeleton while loading
  if (!hasLoadedData) {
    return <BookDetailsSkeleton isNew={isNew} />;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {isNew ? "إنشاء كتاب جديد" : "تفاصيل الكتاب"}
          </h1>
          <div className="flex gap-3">
            <Link href="/books">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                مكتبتي
              </Button>
            </Link>
            {!isNew && (
              <Button
                onClick={handleNavigateToContent}
                disabled={isNavigatingToContent}
              >
                {isNavigatingToContent ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    إدارة المحتوى...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    الذهاب لإدارة المحتوى
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          {isNew
            ? "أدخل تفاصيل كتابك الجديد أدناه"
            : "عدّل تفاصيل كتابك أدناه قبل إنشاء الملخصات"}
        </p>

        <BookDetails
          bookInfo={bookInfo}
          onUpdateBookInfo={handleBookInfoUpdate}
          isNew={isNew}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
}
