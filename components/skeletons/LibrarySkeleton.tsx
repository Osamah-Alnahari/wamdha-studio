import { Card, CardContent } from "@/components/ui/card";

export default function LibrarySkeleton() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              My Library
            </h1>
            <p className="mt-2 text-muted-foreground md:text-xl">
              Manage your books and summaries
            </p>
          </div>
          <div className="md:w-auto w-full h-10 bg-muted animate-pulse rounded-md" />
        </div>
        {/* Search Input Skeleton */}
        <div className="relative">
          <div className="absolute left-3 top-3 h-4 w-4 bg-muted animate-pulse rounded" />
          <div className="h-10 bg-muted animate-pulse rounded-md pl-10" />
        </div>

        {/* Books Grid Loading Skeleton */}
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
      </div>
    </div>
  );
}
