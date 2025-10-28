"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Trash2, Edit, BookOpen, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import type { Book } from "@/lib/api-client";
import { getUserBooks, deleteBook } from "@/lib/services/book.service";
import { useAuth } from "@/contexts/AuthContext";
import { useAmplifyClient } from "@/hooks/use-amplify-client";
import { getFileUrl } from "@/lib/services";
import LibrarySkeleton from "@/components/skeletons/LibrarySkeleton";

export function LibraryPage() {
  const router = useRouter();
  const { client, isLoading: clientLoading } = useAmplifyClient();
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);
  const { user } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasLoadedBooks, setHasLoadedBooks] = useState(false);

  useEffect(() => {
    const loadBooks = async () => {
      // Don't load books if client is still loading or not available
      if (clientLoading || !client) {
        return;
      }

      // Don't load books if user is not available yet
      if (!user?.userId) {
        return;
      }

      try {
        const allBooksData = await getUserBooks(client, user.userId);
        const allBooks: Book[] = await Promise.all(
          allBooksData.map(async (item: any) => {
            const imageUrl = item.thumbnailUrl
              ? await getFileUrl(item.thumbnailUrl)
              : undefined;

            return {
              id: item.id,
              title: item.title,
              author: item.authorName || "Unknown Author",
              description: item.description || "",
              coverImageUrl: imageUrl,
              isOwnedByUser: item.userId === user.userId,
              createdAt: new Date(item.createdAt).getTime(),
            };
          })
        );
        setBooks(allBooks);
      } catch (e) {
        console.log("Error loading books:", e);
        // toast.error("Error loading books", {
        //   description:
        //     "There was a problem loading your books. Using sample books instead.",
        // });
      } finally {
        setHasLoadedBooks(true);
      }
    };

    loadBooks();
  }, [user?.userId, refreshTrigger, client, clientLoading]);

  useEffect(() => {
    console.log("Books state updated:", books.length, "books");
  }, [books]);

  const handleDeleteClick = (bookId: string) => {
    setBookToDelete(bookId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!bookToDelete || !client) return;
    setIsDeleting(true);
    try {
      // Delete the book
      const result = await deleteBook(client, bookToDelete);
      // if (!result.success) {
      //   throw new Error(result.error);
      // }

      // Store the ID to be deleted in a local variable to ensure it's available in the closure
      const deletedBookId = bookToDelete;

      // Update the state with the filtered books
      setBooks((prevBooks) => {
        return prevBooks.filter((book) => book.id !== deletedBookId);
      });

      toast.success("تم حذف الكتاب", {
        description: "تم إزالة الكتاب من مكتبتك",
      });
    } catch (e) {
      console.log("Error deleting book:", e);
      // toast.error("Error deleting book", {
      //   description: "There was a problem deleting the book.",
      // });
    } finally {
      setDeleteDialogOpen(false);
      setBookToDelete(null);
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setBookToDelete(null);
  };

  // Filter books based on search query
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle navigation to book details
  const handleEditBook = (bookId: string) => {
    // Use window.location.href for a full page navigation to ensure the route is correctly processed
    window.location.href = `/books/${bookId}`;
  };

  // Handle navigation to create new book
  const handleCreateNewBook = () => {
    router.push("/books/new");
  };

  // Show skeleton while client is loading or books haven't been loaded yet
  if (clientLoading || !hasLoadedBooks) {
    return <LibrarySkeleton />;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              مكتبتي
            </h1>
            <p className="mt-2 text-muted-foreground md:text-xl">
              إدارة كتبك وملخصاتك
            </p>
          </div>
          {books.length > 0 && (
            <Button className="md:w-auto w-full" onClick={handleCreateNewBook}>
              <Plus className="mr-2 h-4 w-4" />
              إنشاء كتاب جديد
            </Button>
          )}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ابحث عن الكتب بالعنوان أو المؤلف..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <Card
                key={book.id}
                className="overflow-hidden flex flex-col hover:shadow-md transition-shadow"
              >
                <div
                  className="aspect-[2/3] relative cursor-pointer"
                  onClick={() => handleEditBook(book.id)}
                >
                  {book.coverImageUrl ? (
                    <img
                      src={book.coverImageUrl || "/placeholder.svg"}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <BookOpen className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <CardContent className="p-5 flex-grow">
                  <h3
                    className="font-semibold text-lg line-clamp-1 hover:underline cursor-pointer"
                    onClick={() => handleEditBook(book.id)}
                  >
                    {book.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                    {book.author}
                  </p>
                </CardContent>
                <CardFooter className="p-5 pt-0 flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditBook(book.id)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    تعديل
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteClick(book.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    حذف
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-6 text-lg font-medium">لا توجد كتب</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {searchQuery ? "جرّب كلمة بحث مختلفة" : "ابدأ بإنشاء كتابك الأول"}
            </p>
            {!searchQuery && (
              <Button className="mt-6" onClick={handleCreateNewBook}>
                <Plus className="mr-2 h-4 w-4" />
                إنشاء كتاب جديد
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>حذف الكتاب</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من حذف هذا الكتاب؟ لا يمكن التراجع عن هذا الإجراء
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جارٍ الحذف...
                </>
              ) : (
                "حذف"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
