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

export const getMediaVideoByID = async (type: string, id: number) => {
  const baseUrl = process.env.TMDB_BASE_URL;
  const apiKey = process.env.TMDB_API_KEY;
  try {
    const response = await fetch(
      `${baseUrl}/${type}/${id}/videos?api_key=${apiKey}&language=en-US&append_to_response=videos`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error while getting top rated media", error);
    return null;
  }
};

export const getSearchResults = async (type: string, query: string) => {
  const baseUrl = process.env.TMDB_BASE_URL;
  const apiKey = process.env.TMDB_API_KEY;
  try {
    const response = await fetch(
      `${baseUrl}/search/${type}?query=${query}&include_adult=false&language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTJjNTVmNmViNDU5NDAyZGM0OTlmZWI0MTVmMjlmNyIsInN1YiI6IjY1YjBiN2ZkMmZlMmZhMDE3MjNjYjQ5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x8V0-sWtcDylBDnkSIyhxA93-G5ATtZBhfaLU0Pxq6s",
        },
      }
    );
    const data = await response.json();
    return data.results;
  } catch (error: any) {
    console.error("Error while getting search results", error);
    return null;
  }
};

export const getMediaDetailsByID = async (type: string, id: number) => {
  const baseUrl = process.env.TMDB_BASE_URL;
  const apiKey = process.env.TMDB_API_KEY;
  try {
    const response = await fetch(
      `${baseUrl}/${type}/${id}?api_key=${apiKey}&language=en-US&append_to_response=videos`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error while getting media details by ID", error);
    return null;
  }
};

export const getSimilarMediaDetailsByID = async (type: string, id: number) => {
  const baseUrl = process.env.TMDB_BASE_URL;
  const apiKey = process.env.TMDB_API_KEY;
  try {
    const response = await fetch(
      `${baseUrl}/${type}/${id}/similar?api_key=${apiKey}&language=en-US`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error while getting similar media", error);
    return null;
  }
};
