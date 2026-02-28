import { IMAGE_BASE, type Movie } from "@/lib/tmdb";

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const year = movie.release_date?.split("-")[0] ?? "";

  const handleClick = () => onClick?.(movie);

  return (
    <div
      className="group relative flex-shrink-0 w-[150px] md:w-[180px] cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden rounded-md transition-transform duration-300 ease-out group-hover:scale-105 group-hover:z-10">
        {movie.poster_path ? (
          <img
            src={`${IMAGE_BASE}/w342${movie.poster_path}`}
            alt={movie.title}
            className="w-full aspect-[2/3] object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full aspect-[2/3] bg-secondary flex items-center justify-center text-muted-foreground text-xs">
            No Image
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <p className="text-foreground text-sm font-semibold leading-tight">
            {movie.title}
          </p>
          <p className="text-muted-foreground text-xs mt-1">{year}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
