"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, Trash2, Edit, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { getBooks, deleteBook, type Book } from "@/lib/api-client"

// Dummy book data
const dummyBooks: Book[] = [
  {
    id: "book-1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A story of wealth, love, and the American Dream in the Jazz Age.",
    coverImageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    isOwnedByUser: true,
    createdAt: Date.now() - 1000000,
  },
  {
    id: "book-2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A novel about racial injustice and moral growth in the American South.",
    coverImageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
    isOwnedByUser: true,
    createdAt: Date.now() - 2000000,
  },
  {
    id: "book-3",
    title: "1984",
    author: "George Orwell",
    description: "A dystopian novel about totalitarianism, surveillance, and thought control.",
    coverImageUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800&auto=format&fit=crop",
    isOwnedByUser: true,
    createdAt: Date.now() - 3000000,
  },
  {
    id: "book-4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "A romantic novel of manners set in early 19th-century England.",
    coverImageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop",
    isOwnedByUser: true,
    createdAt: Date.now() - 4000000,
  },
  {
    id: "book-5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description: "A fantasy novel about the adventures of hobbit Bilbo Baggins.",
    coverImageUrl: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?q=80&w=800&auto=format&fit=crop",
    isOwnedByUser: true,
    createdAt: Date.now() - 5000000,
  },
  {
    id: "book-6",
    title: "Moby Dick",
    author: "Herman Melville",
    description: "The story of Captain Ahab's quest for revenge against the white whale.",
    coverImageUrl: "https://images.unsplash.com/photo-1603162525937-92a06da7f13d?q=80&w=800&auto=format&fit=crop",
    isOwnedByUser: true,
    createdAt: Date.now() - 6000000,
  },
]

export function LibraryPage() {
  const router = useRouter()
  const [books, setBooks] = useState<Book[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [bookToDelete, setBookToDelete] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load books using the API client
    const loadBooks = async () => {
      setIsLoading(true)
      try {
        let allBooks = await getBooks()

        // If no books were found, use dummy data
        if (allBooks.length === 0) {
          allBooks = [...dummyBooks]
        }

        // Sort books by creation date (newest first)
        allBooks.sort((a, b) => b.createdAt - a.createdAt)

        setBooks(allBooks)
      } catch (e) {
        console.error("Error loading books:", e)
        toast.error("Error loading books", {
          description: "There was a problem loading your books. Using sample books instead.",
        })

        // Use dummy data as fallback
        setBooks([...dummyBooks])
      } finally {
        setIsLoading(false)
      }
    }

    loadBooks()
  }, [])

  const handleDeleteClick = (bookId: string) => {
    setBookToDelete(bookId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!bookToDelete) return

    try {
      // Check if we're deleting a dummy book
      const isDummyBook = dummyBooks.some((book) => book.id === bookToDelete)

      if (!isDummyBook) {
        // Delete the book using the API client
        await deleteBook(bookToDelete)
      }

      // Update state
      const updatedBooks = books.filter((book) => book.id !== bookToDelete)
      setBooks(updatedBooks)

      toast.success("Book deleted", {
        description: "The book has been removed from your library.",
      })
    } catch (e) {
      console.error("Error deleting book:", e)
      toast.error("Error deleting book", {
        description: "There was a problem deleting the book.",
      })
    } finally {
      setDeleteDialogOpen(false)
      setBookToDelete(null)
    }
  }

  const cancelDelete = () => {
    setDeleteDialogOpen(false)
    setBookToDelete(null)
  }

  // Filter books based on search query
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle navigation to book details
  const handleEditBook = (bookId: string) => {
    // Use window.location.href for a full page navigation to ensure the route is correctly processed
    window.location.href = `/books/${bookId}`
  }

  // Handle navigation to create new book
  const handleCreateNewBook = () => {
    router.push("/books/new")
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Library</h1>
            <p className="mt-2 text-muted-foreground md:text-xl">Manage your books and summaries</p>
          </div>
          <Button className="md:w-auto w-full" onClick={handleCreateNewBook}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Book
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search books by title or author..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-[2/3] bg-muted animate-pulse" />
                <CardContent className="p-5">
                  <div className="h-6 bg-muted animate-pulse rounded mb-3" />
                  <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <Card key={book.id} className="overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                <div className="aspect-[2/3] relative cursor-pointer" onClick={() => handleEditBook(book.id)}>
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
                  <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{book.author}</p>
                </CardContent>
                <CardFooter className="p-5 pt-0 flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleEditBook(book.id)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(book.id)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-6 text-lg font-medium">No books found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {searchQuery ? "Try a different search term" : "Start by creating your first book"}
            </p>
            {!searchQuery && (
              <Button className="mt-6" onClick={handleCreateNewBook}>
                <Plus className="mr-2 h-4 w-4" />
                Create New Book
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Book</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this book? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
