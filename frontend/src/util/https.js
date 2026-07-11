import { useEffect, useState } from "react";

const url = "https://api.themoviedb.org";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    origin: "*",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWVhNmFhNDM3MmMyMTk5YWNlMDhkZGQxODkxMzVjMCIsIm5iZiI6MTc2MDU3ODY4OS44ODMwMDAxLCJzdWIiOiI2OGYwNGM4MWFlZmUzMjJiNjk1MDJlZWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.k1CK98BSSJUb4n5YFoiwriOE6GLiZi4ErZc33kVhoLk",
  },
};

export const getFetchedMovies = (urlPath) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${url}${urlPath}`, options);
        const resData = await response.json();
        setMovies(resData.results);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  return { movies };
};

export const getMovieYoutubeKey = (id) => {
  const [movie, setMovie] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${url}/3/movie/${id}/videos?language=en-US`,
          options,
        );
        const resData = await response.json();
        setMovie(resData.results[0].key);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  return movie;
};

export const getFetchGenre = () => {
  const [genre, setGenre] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${url}/3/genre/movie/list?language=en`,
          options,
        );
        const resData = await response.json();
        return setGenre(resData.genres);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  return genre;
};

export const postRegister = async (dataObj) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/register`,
    {
      method: "POST",
      body: JSON.stringify(dataObj),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const resData = await response.json();

  if (!response.ok) {
    return resData.error;
  }

  return resData.message;
};

export const postLogin = async (dataObj) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(dataObj),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const resData = await response.json();

  if (!response.ok) {
    return resData.error;
  }

  return resData.message;
};

export const postLogout = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    return err;
  }

  const resData = response.json();
  return resData;
};
