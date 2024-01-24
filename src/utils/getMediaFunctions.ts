export const getTrendingMedia = async (type: string) => {
  const baseUrl = process.env.TMDB_BASE_URL;
  const apiKey = process.env.TMDB_API_KEY;
  try {
    const response = await fetch(
      `${baseUrl}/trending/${type}/day?api_key=${apiKey}&language=en-US`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data.results;
  } catch (error: any) {
    console.error("Error while getting trending media", error);
    return null;
  }
};

export const getPopularMedia = async (type: string) => {
  const baseUrl = process.env.TMDB_BASE_URL;
  const apiKey = process.env.TMDB_API_KEY;
  try {
    const response = await fetch(
      `${baseUrl}/${type}/popular?api_key=${apiKey}&language=en-US`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data.results;
  } catch (error: any) {
    console.error("Error while getting popular media", error);
    return null;
  }
};

export const getTopRatedMedia = async (type: string) => {
  const baseUrl = process.env.TMDB_BASE_URL;
  const apiKey = process.env.TMDB_API_KEY;
  try {
    const response = await fetch(
      `${baseUrl}/${type}/top_rated?api_key=${apiKey}&language=en-US`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data.results;
  } catch (error: any) {
    console.error("Error while getting top rated media", error);
    return null;
  }
};

export const getMediaByGenre = async (type: string, genreId: number) => {
  const baseUrl = process.env.TMDB_BASE_URL;
  const apiKey = process.env.TMDB_API_KEY;
  try {
    const response = await fetch(
      `${baseUrl}/discover/${type}/?api_key=${apiKey}&language=en-US&include_adult=false&sort_by=popularity.desc&with_genres=${genreId}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data.results;
  } catch (error: any) {
    console.error("Error while getting top rated media", error);
    return null;
  }
};
