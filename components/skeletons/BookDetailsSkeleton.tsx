const BookDetailsSkeleton = ({ isNew }: { isNew: boolean }) => {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {isNew ? "Create New Book" : "Book Details"}
          </h1>
          <div className="flex gap-3">
            <div className="h-10 w-32 bg-muted animate-pulse rounded-md" />
            {!isNew && (
              <div className="h-10 w-64 bg-muted animate-pulse rounded-md" />
            )}
          </div>
        </div>

        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          {isNew
            ? "Enter the details of your new book below."
            : "Edit the details of your book below before creating summaries."}
        </p>

        {/* Book Details Form Skeleton */}
        <div className="animate-pulse space-y-8">
          {/* Cover Image Section */}
          <div className="space-y-4">
            <div className="h-6 bg-muted rounded w-1/4" />
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-48 h-64 bg-muted rounded-md" />
              <div className="flex-1 space-y-4">
                <div className="h-10 bg-muted rounded w-1/2" />
                <div className="h-10 bg-muted rounded w-1/3" />
                <div className="h-10 bg-muted rounded w-1/4" />
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-5 bg-muted rounded w-1/6" />
              <div className="h-10 bg-muted rounded" />
            </div>

            <div className="space-y-2">
              <div className="h-5 bg-muted rounded w-1/6" />
              <div className="h-10 bg-muted rounded" />
            </div>

            <div className="space-y-2">
              <div className="h-5 bg-muted rounded w-1/6" />
              <div className="h-32 bg-muted rounded" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <div className="h-10 w-24 bg-muted animate-pulse rounded-md" />
            <div className="h-10 w-32 bg-muted animate-pulse rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsSkeleton;
