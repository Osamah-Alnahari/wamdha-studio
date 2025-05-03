"use client";

import { useState, useEffect } from "react";
import { BookDetails } from "@/components/shared/book/book-details";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateBook, type Book } from "@/lib/api-client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { client } from "@/lib/amplify";
import { createRead, updateRead } from "@/src/graphql/mutations";
import { getRead } from "@/src/graphql/queries";

interface BookDetailsPageProps {
  bookId?: string;
  isNew?: boolean;
}

export function BookDetailsPage({
  bookId,
  isNew = false,
}: BookDetailsPageProps) {
  const router = useRouter();
  const [bookInfo, setBookInfo] = useState<Book>({
    id: bookId || `book-${Date.now()}`,
    title: "",
    author: "",
    description: "",
    coverImageUrl: undefined,
    isOwnedByUser: false,
    createdAt: Date.now(),
  });
  const [isLoading, setIsLoading] = useState(!isNew);
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
      return;
    } else {
      loadBookData();
    }

    if (!isNew && !bookId) {
      router.push("/books");
      return;
    }
    setIsLoading(true);
  }, [bookId, isNew, router]);
  const loadBookData = async () => {
    try {
      // Get book info
      const response = await client.graphql({
        query: getRead,
        variables: { id: bookId! },
        authMode: "userPool",
      });
      if (response.data?.getRead) {
        const book = response.data.getRead;
        if (book) {
          setBookInfo({
            id: book.id,
            title: book.title,
            author: book.AuthorName,
            description:
              typeof book.description === "string" ? book.description : "",
            coverImageUrl: book.thumbnailUrl,
            isOwnedByUser: book.userId === user?.userId,
            createdAt: new Date(book.createdAt).getTime(),
          });
        }
      }
    } catch (e) {
      console.error("Failed to load book data:", e);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const handleBookInfoUpdate = async (info: Omit<Book, "id" | "createdAt">) => {
    try {
      if (!user?.userId) {
        console.error("User not found. Cannot create a book.");
        toast.error("Authentication Error", {
          description: "You must be logged in to create a book.",
        });
        return;
      }
      if (isNew) {
        const response = await client.graphql({
          query: createRead,
          variables: {
            input: {
              title: info.title,
              AuthorName: info.author,
              description: info.description,
              thumbnailUrl: info.coverImageUrl ?? "",
              userId: user.userId,
            },
          },
          authMode: "userPool",
        });
        if (response && "data" in response && response.data?.createRead) {
          const newBook = response.data.createRead;

          router.push(`/books/${newBook.id}/content`);
        } else {
          console.error("Failed to create book:", response);
          throw new Error("Failed to create book.");
        }
      } else {
        const response = await client.graphql({
          query: updateRead,
          variables: {
            input: {
              id: bookId!,
              title: info.title,
              AuthorName: info.author,
              description: info.description,
              thumbnailUrl: info.coverImageUrl ?? "",
            },
          },
          authMode: "userPool",
        });
        toast.success("Book details updated", {
          description: "Your book details have been saved.",
        });
      }
    } catch (e: any) {
      console.error("Failed to save book:", e);
      toast.error("Error saving book", {
        description:
          e?.message || "There was a problem saving your book details.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-muted rounded w-1/3"></div>
          <div className="h-6 bg-muted rounded w-2/3"></div>
          <div className="h-[400px] bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {isNew ? "Create New Book" : "Book Details"}
          </h1>
          <div className="flex gap-3">
            <Link href="/books">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                My Library
              </Button>
            </Link>
            {!isNew && (
              <Link href={`/books/${bookInfo.id}/content`}>
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Go to Content Management
                </Button>
              </Link>
            )}
          </div>
        </div>

        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          {isNew
            ? "Enter the details of your new book below."
            : "Edit the details of your book below before creating summaries."}
        </p>

        <BookDetails
          bookInfo={bookInfo}
          onUpdateBookInfo={handleBookInfoUpdate}
          isNew={isNew}
        />
      </div>
    </div>
  );
}
