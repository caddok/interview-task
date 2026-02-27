import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getTrending, getTopRated, getUpcoming } from "@/lib/tmdb";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import MovieRow from "@/components/MovieRow";

const Index = () => {
  const { data: trending, isLoading: trendingLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
  });

  const { data: topRated, isLoading: topRatedLoading } = useQuery({
    queryKey: ["topRated"],
    queryFn: getTopRated,
  });

  const { data: upcoming, isLoading: upcomingLoading } = useQuery({
    queryKey: ["upcoming"],
    queryFn: getUpcoming,
  });

  const heroMovie = useMemo(() => {
    if (!trending?.length) return undefined;
    const withBackdrop = trending.filter((m) => m.backdrop_path);
    return withBackdrop[Math.floor(Math.random() * withBackdrop.length)];
  }, [trending]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroBanner movie={heroMovie} />
        <div className="-mt-16 relative z-10 pb-12">
          <MovieRow title="🔥 Trending Now" movies={trending} isLoading={trendingLoading} />
          <MovieRow title="⭐ Top Rated" movies={topRated} isLoading={topRatedLoading} />
          <MovieRow title="🎬 Upcoming" movies={upcoming} isLoading={upcomingLoading} />
        </div>
      </main>
    </div>
  );
};

export default Index;
