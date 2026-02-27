const TMDB_API_KEY = "2dca580c2a14b55200e784d157207b4d";
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE = "https://image.tmdb.org/t/p";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
}

interface TMDBResponse {
  results: Movie[];
}

async function fetchTMDB(endpoint: string): Promise<Movie[]> {
  const res = await fetch(`${BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  const data: TMDBResponse = await res.json();
  return data.results;
}

export const getTrending = () => fetchTMDB("/trending/movie/week");
export const getTopRated = () => fetchTMDB("/movie/top_rated");
export const getUpcoming = () => fetchTMDB("/movie/upcoming");
