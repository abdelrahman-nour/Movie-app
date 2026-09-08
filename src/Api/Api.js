import axios from "axios";
const API_KEY = "4bc5948b7a983fa2e2b50818606ebbb3";
const BASE_URL = "https://api.themoviedb.org/3";

// getAllMovies
export async function getAllMovies() {
  try {
    const res = await axios.get(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`,
    );
    // console.log(res.data.results);

    return res.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

// getAllTvShows
export async function getAllTvShows() {
  try {
    const res = await axios.get(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
    console.log(res.data.results);
    return res.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

// search
export async function searchMovies(query) {
  try {
    const res = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
    );
    // console.log(res.data.results);
    return res.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
}
