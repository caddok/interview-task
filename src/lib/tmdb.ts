const TMDB_API_KEY = "2dca580c2a14b55200e784d157207b4d";
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE = "https://image.tmdb.org/t/p";

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
};

type TMDBResponse = {
  results: Movie[];
};

const defaultParams: Record<string, string> = {
  api_key: TMDB_API_KEY,
  language: "en-US",
  page: "1",
};

function buildUrl(endpoint: string, params?: Record<string, string>): string {
  const searchParams = new URLSearchParams({ ...defaultParams, ...params });
  const paramSeparator = endpoint.includes("?") ? "&" : "?";

  return `${BASE_URL}${endpoint}${paramSeparator}${searchParams.toString()}`;
}

async function fetchTMDB(
  endpoint: string,
  options?: { params?: Record<string, string>; signal?: AbortSignal }
): Promise<Movie[]> {
  const url = buildUrl(endpoint, options?.params);
  const response = await fetch(url, { signal: options?.signal });
  if (!response.ok) {
    throw new Error(`TMDB error: ${response.status}`);
  }
  const data: TMDBResponse = await response.json();
  return data.results;
}

export const getTrending = () => fetchTMDB("/trending/movie/week");
export const getTopRated = () => fetchTMDB("/movie/top_rated");
export const getUpcoming = () => fetchTMDB("/movie/upcoming");

export function searchMovies(
  query: string,
  signal?: AbortSignal
): Promise<Movie[]> {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return Promise.resolve([]);
  }
  return fetchTMDB("/search/movie", {
    params: { query: trimmedQuery },
    signal,
  });
}
