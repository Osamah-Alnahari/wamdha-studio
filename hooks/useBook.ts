"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBookById, updateBook } from "@/lib/services/book.service";
import { useAmplifyClient } from "@/hooks/use-amplify-client";
import { useAuth } from "@/contexts/AuthContext";

// 1 hour stale, 2 hour garbage collection
const ONE_HOUR = 1000 * 60 * 60;

export function useBook(bookId: string | undefined) {
  const { client } = useAmplifyClient();
  const enabled = !!client && !!bookId;
  return useQuery({
    queryKey: ["book", bookId],
    queryFn: async () => {
      if (!client || !bookId) throw new Error("Missing client or bookId");
      const book = await getBookById(client, bookId);
      return book;
    },
    enabled,
    staleTime: ONE_HOUR,
    gcTime: ONE_HOUR * 2,
    refetchOnWindowFocus: false,
  });
}

export function useUpdateBook(bookId: string | undefined) {
  const { client } = useAmplifyClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateBook", bookId],
    mutationFn: async (updates: any) => {
      if (!client || !bookId) throw new Error("Missing client or bookId");
      const input = { id: bookId, ...updates };
      const updated = await updateBook(client, input);
      return updated;
    },
    onSuccess: (_data) => {
      if (bookId) {
        // Invalidate to refetch latest metadata after mutation
        queryClient.invalidateQueries({ queryKey: ["book", bookId] });
      }
    },
  });
}
