import { useQuery } from "@tanstack/react-query";
import { useMemo, useState, useEffect, useRef } from "react";
import { getTrending, getTopRated, getUpcoming, type Movie } from "@/lib/tmdb";
import Navbar from "@/components/features/layout/Navbar";
import HeroBanner from "@/components/shared/HeroBanner";
import MovieRow from "@/components/shared/MovieRow";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const hasToastRef = useRef(false);

  const {
    data: trending,
    isLoading: trendingLoading,
    isError: trendingError,
  } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
  });

  const {
    data: topRated,
    isLoading: topRatedLoading,
    isError: topRatedError,
  } = useQuery({
    queryKey: ["topRated"],
    queryFn: getTopRated,
  });

  const {
    data: upcoming,
    isLoading: upcomingLoading,
    isError: upcomingError,
  } = useQuery({
    queryKey: ["upcoming"],
    queryFn: getUpcoming,
  });

  const anyError = trendingError || topRatedError || upcomingError;

  useEffect(() => {
    if (anyError && !hasToastRef.current) {
      toast({
        title: "Failed to load",
        variant: "destructive",
      });

      hasToastRef.current = true;

      if (!anyError) {
        hasToastRef.current = false;
      }
    }
  }, [anyError]);

  const heroMovie = useMemo(() => {
    if (!trending?.length) return undefined;
    const withBackdrop = trending.filter((m) => m.backdrop_path);
    return withBackdrop[Math.floor(Math.random() * withBackdrop.length)];
  }, [trending]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroBanner movie={selectedMovie ?? heroMovie} />
        <div className="-mt-16 relative z-10 pb-12">
          <MovieRow
            title="🔥 Trending Now"
            movies={trending}
            isLoading={trendingLoading}
            onClick={setSelectedMovie}
          />
          <MovieRow
            title="⭐ Top Rated"
            movies={topRated}
            isLoading={topRatedLoading}
            onClick={setSelectedMovie}
          />
          <MovieRow
            title="🎬 Upcoming"
            movies={upcoming}
            isLoading={upcomingLoading}
            onClick={setSelectedMovie}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
