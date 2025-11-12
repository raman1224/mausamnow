import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

export interface SearchHistoryItem {
    id: string;
    query: string;
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
    searchedAt: number;
}

export function useSearchHistory() {
  const [history, setHistory] = useLocalStorage<SearchHistoryItem[]>("search-history", []);
  const queryClient = useQueryClient();

  const historyQuery = useQuery({
    queryKey: ["search-history"],
    queryFn: () => history,
    initialData: history,
    staleTime: Infinity,
  });

  const addToHistory = useMutation({
    mutationFn: async (item: Omit<SearchHistoryItem, "id" | "searchedAt">) => {  
      const newHistoryItem: SearchHistoryItem = {
        ...item,
        id: `${item.lat}-${item.lon}-${Date.now()}`,
        searchedAt: Date.now(),
      };
      
      // Remove duplicates and keep only last 10 items
      const filteredHistory = history.filter(
        hist => !(hist.lat === item.lat && hist.lon === item.lon)
      );
      const newHistory = [newHistoryItem, ...filteredHistory].slice(0, 10);
      
      setHistory(newHistory);
      return newHistory;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["search-history"],
      });
    },
  });

  const clearHistory = useMutation({
    mutationFn: async () => {
      setHistory([]);
      return [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["search-history"],
      });
    },
  });

  return {
    history: historyQuery.data ?? [],
    addToHistory,
    clearHistory,
  };
}