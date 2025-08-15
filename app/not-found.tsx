import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Book, Home, Search, ArrowLeft, Library } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="w-full max-w-4xl text-center space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl"></div>
            <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 p-8 rounded-full">
              <Book className="h-20 w-20 text-primary" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-8xl font-black text-red-800 dark:text-red-600">
            404
          </h1>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Page Not Found
          </h2>
          <p className="text-2xl text-muted-foreground">
            Looks like this book has gone missing from our shelves.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 text-base text-muted-foreground">
          <Library className="h-5 w-5" />
          <span>عليم Library</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button asChild className="flex items-center gap-3 text-lg px-8 py-6">
            <Link href="/books">
              <Home className="h-5 w-5" />
              Return to Library
            </Link>
          </Button>

          <Button
            variant="outline"
            asChild
            className="flex items-center gap-3 text-lg px-8 py-6"
          >
            <Link href="/books/new">
              <Search className="h-5 w-5" />
              Add New Book
            </Link>
          </Button>
        </div>

        <div>
          <Button
            variant="ghost"
            asChild
            className="flex items-center gap-3 mx-auto text-lg px-6 py-4"
          >
            <Link href="javascript:history.back()">
              <ArrowLeft className="h-5 w-5" />
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
