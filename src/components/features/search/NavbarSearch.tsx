import { useState, useRef, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchMovies, type Movie } from "@/lib/tmdb";
import {
  SEARCH_DEBOUNCE_MS,
  SEARCH_MIN_QUERY_LENGTH,
} from "@/constants/constants";
import { useDebounce } from "@/hooks/use-debounce";
import { useComponentVisible } from "@/hooks/use-component-visible";
import { useIsMobile } from "@/hooks/use-mobile";
import { SearchResultsOverlay } from "@/components//features/search/SearchResultsOverlay";
import { toast } from "@/hooks/use-toast";

export function NavbarSearch() {
  const isMobile = useIsMobile();
  const {
    ref: wrapperRef,
    isVisible: isExpanded,
    setIsVisible: setIsExpanded,
  } = useComponentVisible(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const runSearch = useCallback(
    async (searchQuery: string, signal?: AbortSignal) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setSearchError(null);

        return;
      }

      setSearchError(null);
      setLoading(true);

      try {
        const data = await searchMovies(searchQuery, signal);
        setResults(data);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setSearchError("Failed to search");
        setResults([]);
        toast({
          title: "Search failed",
          description: "Please try again",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const triggerSearch = useCallback(
    (searchQuery: string) => {
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;
      runSearch(searchQuery, controller.signal);
    },
    [runSearch]
  );

  const [debouncedTriggerSearch, cancelDebounce] = useDebounce(
    triggerSearch,
    SEARCH_DEBOUNCE_MS
  );

  useEffect(() => {
    if (query.length >= SEARCH_MIN_QUERY_LENGTH) {
      debouncedTriggerSearch(query);
    } else {
      setResults([]);
      setSearchError(null);
    }
  }, [query, debouncedTriggerSearch]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "Enter") {
      return;
    }
    event.preventDefault();
    cancelDebounce();
    triggerSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setSearchError(null);
  };

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const showOverlay =
    isExpanded && (results.length > 0 || loading || searchError !== null);

  if (!isExpanded) {
    return (
      <button
        type="button"
        onClick={handleExpand}
        className="flex size-11 min-w-11 min-h-11 items-center justify-center rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors touch-manipulation"
        aria-label="Open search"
      >
        <Search className="size-5" />
      </button>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="relative w-full min-w-0 flex-1 md:flex-initial md:max-w-sm max-w-sm"
    >
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search movies…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
        leftIcon={<Search className="size-4" />}
        rightIcon={
          query ? (
            <button
              type="button"
              onClick={handleClear}
              className="flex size-5 items-center justify-center rounded hover:bg-muted text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="size-4" />
            </button>
          ) : undefined
        }
        className="h-11"
      />

      {showOverlay && (
        <SearchResultsOverlay
          loading={loading}
          error={searchError}
          results={results}
        />
      )}
    </div>
  );
}
