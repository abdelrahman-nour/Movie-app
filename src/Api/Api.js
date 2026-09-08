// import axios from "axios";
// const API_KEY = "4bc5948b7a983fa2e2b50818606ebbb3";
// const BASE_URL = "https://api.themoviedb.org/3";
// // getAllMovies
// export async function getAllMovies(page = 1) {
//   try {
//     const res = await axios.get(
//       `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`,
//     );
//     console.log(res.data.results);

//     return res.data;
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//     return { results: [], total_pages: 0 };
//   }
// }

// // getAllTvShows
// export async function getAllTvShows() {
//   try {
//     const res = await axios.get(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
//     console.log(res.data.results);
//     return res.data.results;
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//     return [];
//   }
// }

// // search
// export async function searchMovies(query, page = 1) {
//   try {
//     const res = await axios.get(
//       `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
//     );
//     return res.data;
//   } catch (error) {
//     console.error("Error searching movies:", error);
//     return { results: [], total_pages: 0 };
//   }
// }
// get movie recommendations



import axios from "axios";

const API_KEY = "4bc5948b7a983fa2e2b50818606ebbb3";
const BASE_URL = "https://api.themoviedb.org/3";

export async function getAllMovies(page = 1) {
  try {
    const res = await axios.get(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`
    );

    console.log(res.data.results);

    return res.data;
  } catch (error) {
    console.error("Error fetching movies:", error);

    return {
      results: [],
      total_pages: 0,
    };
  }
}


// Get All TV Shows
export async function getAllTvShows() {
  try {
    const res = await axios.get(
      `${BASE_URL}/tv/popular?api_key=${API_KEY}`
    );

    console.log(res.data.results);

    return res.data.results;
  } catch (error) {
    console.error("Error fetching TV shows:", error);

    return [];
  }
}

// Search Movies
export async function searchMovies(query, page = 1) {
  try {
    const res = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}&page=${page}`
    );

    return res.data;
  } catch (error) {
    console.error("Error searching movies:", error);

    return {
      results: [],
      total_pages: 0,
    };
  }
}


// Get Movie Recommendations
export async function getMovieRecommendations(movieId) {
  try {
    const res = await axios.get(
      `${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`
    );

    return res.data.results;
  } catch (error) {
    console.error("Error fetching movie recommendations:", error);

    return [];
  }
}


// Get TV Recommendations
export async function getTvRecommendations(tvId) {
  try {
    const res = await axios.get(
      `${BASE_URL}/tv/${tvId}/recommendations?api_key=${API_KEY}`
    );

    return res.data.results;
  } catch (error) {
    console.error("Error fetching TV recommendations:", error);

    return [];
  }
}
// Get Movie Reviews
export async function getMovieReviews(movieId) {
  try {
    const res = await axios.get(
      `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`
    );

    return res.data.results;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    return [];
  }
}

// Get TV Reviews
export async function getTvReviews(tvId) {
  try {
    const res = await axios.get(
      `${BASE_URL}/tv/${tvId}/reviews?api_key=${API_KEY}`
    );

    return res.data.results;
  } catch (error) {
    console.error("Error fetching TV reviews:", error);
    return [];
  }
}

export async function getMovieDetails(id) {
  try {
    const res = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

export async function getTvDetails(id) {
  try {
    const res = await axios.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

