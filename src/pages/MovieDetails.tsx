import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovie, IMAGE_BASE } from "@/lib/tmdb";
import Navbar from "@/components/Navbar";
import { Spinner } from "@/components/ui/spinner";
import { ArrowLeftIcon, StarIcon } from "lucide-react";

const MovieDetails = () => {
  const { id } = useParams<"id">();
  const numericId = id != null ? Number(id) : NaN;
  const isValidId = Number.isInteger(numericId) && numericId > 0;

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie", numericId],
    queryFn: ({ signal }) => getMovie(numericId, signal),
    enabled: isValidId,
  });

  if (!isValidId) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-24 px-4">
          <h1 className="text-2xl font-bold text-foreground">Invalid movie</h1>
          <Link
            to="/"
            className="mt-4 text-primary underline hover:text-primary/90"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <Spinner className="size-10" />
        </div>
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-24 px-4">
          <h1 className="text-2xl font-bold text-foreground">
            Movie not found
          </h1>
          <Link
            to="/"
            className="mt-4 text-primary underline hover:text-primary/90"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const year = movie.release_date?.split("-")[0] ?? "";
  const genres = movie.genres?.map((g) => g.name).join(", ") ?? "";
  const runtime = movie.runtime != null ? `${movie.runtime} min` : null;

  return (
    <div className={"min-h-screen bg-background"}>
      <Navbar />
      <header className="relative h-[85vh] overflow-hidden">
        {movie.backdrop_path ? (
          <img
            src={`${IMAGE_BASE}/original${movie.backdrop_path}`}
            alt={movie.title}
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-black leading-tight drop-shadow-lg md:text-5xl">
              {movie.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              {year && <span>{year}</span>}
              {genres && <span>{genres}</span>}
              {runtime && <span>{runtime}</span>}
              <span className="inline-flex items-center gap-1">
                <StarIcon className="size-4" />
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
            {movie.overview && (
              <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {movie.overview}
              </p>
            )}
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-1 text-primary underline hover:text-primary/90"
            >
              <ArrowLeftIcon className="size-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default MovieDetails;
