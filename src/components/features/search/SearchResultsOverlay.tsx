import { memo, useRef } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { IMAGE_BASE, type Movie } from "@/lib/tmdb";
import { SEARCH_POSTER_SIZE } from "@/constants/search";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

type SearchResultsOverlayProps = {
  loading: boolean;
  error: string | null;
  results: Movie[];
  className?: string;
  isMobile?: boolean;
};

const LazySearchResultItem = ({ movie }: { movie: Movie }) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const isVisible = useIntersectionObserver(itemRef, {
    rootMargin: "80px",
    once: true,
  });

  return (
    <li ref={itemRef} className="px-2 py-1">
      {isVisible ? (
        <Link
          to={`/movie/${movie.id}`}
          className="flex items-center gap-2 px-3 py-2 text-left min-h-16 hover:bg-muted/50 transition-colors rounded-sm"
        >
          {movie.poster_path ? (
            <img
              src={`${IMAGE_BASE}/${SEARCH_POSTER_SIZE}${movie.poster_path}`}
              alt=""
              loading="lazy"
              className="size-12 shrink-0 rounded object-cover"
            />
          ) : (
            <div className="size-12 shrink-0 rounded bg-muted flex items-center justify-center text-muted-foreground text-xs">
              -
            </div>
          )}
          <span className="text-sm font-medium truncate">{movie.title}</span>
        </Link>
      ) : null}
    </li>
  );
};

export const SearchResultsOverlay = memo(
  ({
    loading,
    error,
    results,
    className,
    isMobile = false,
  }: SearchResultsOverlayProps) => {
    return (
      <div
        className={cn(
          "border border-border bg-background shadow-lg overflow-hidden z-50 overflow-y-auto",
          isMobile
            ? "fixed left-0 right-0 top-16 mt-0 max-h-[calc(100vh-4rem)] rounded-none border-x-0 border-t-0"
            : "absolute top-full left-0 right-0 mt-1 rounded-md max-h-[min(70vh,400px)]",
          className
        )}
      >
        {loading ? (
          <div className="py-6 flex justify-center">
            <Spinner className="size-6" />
          </div>
        ) : error ? (
          <div className="py-6 text-center text-sm text-destructive px-3">
            {error}
          </div>
        ) : results.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            No results
          </div>
        ) : (
          <ul className="py-1">
            {results.map((movie) => (
              <LazySearchResultItem key={movie.id} movie={movie} />
            ))}
          </ul>
        )}
      </div>
    );
  }
);
