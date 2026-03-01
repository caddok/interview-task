import { IMAGE_BASE, type Movie } from "@/lib/tmdb";

interface HeroBannerProps {
  movie: Movie | undefined;
}

const HeroBanner = ({ movie }: HeroBannerProps) => {
  if (!movie) {
    return <div className="h-[70vh] bg-background animate-pulse" />;
  }

  return (
    <header className="relative h-[70vh] w-full overflow-hidden">
      <img
        key={movie.id}
        src={`${IMAGE_BASE}/original${movie.backdrop_path}`}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

      <div className="absolute bottom-16 left-6 md:left-12 max-w-xl z-10">
        <h2 className="text-4xl md:text-5xl font-black text-foreground mb-3 leading-tight drop-shadow-lg">
          {movie.title}
        </h2>
        <p className="text-sm md:text-base text-muted-foreground line-clamp-3 leading-relaxed">
          {movie.overview}
        </p>
      </div>
    </header>
  );
};

export default HeroBanner;
