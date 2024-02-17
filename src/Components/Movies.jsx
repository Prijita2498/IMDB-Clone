import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({handleAddToWatchList, handleRemoveFromWatchList, watchList}) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  //Handle Page no
  const handlePrev = () => {
    if (pageNo == 1) {
      setPageNo(1);
    } else {
      setPageNo(pageNo - 1);
    }
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=028bafa5b74c7294bd42cfe872073ad7&language=en-US&page=${pageNo}`
      );
      setMovies(res.data.results);
    }
    fetchData();
  }, [pageNo]);

  return (
    <div className="p-5">
      <div className="text-center w-full text-xl font-bold m-5">
        Trending Movies
      </div>

      <div className="flex flex-row flex-wrap justify-around gap-5">
        {movies.map((movieObj, index) => {
          return (
            <MovieCard
              poster_path={movieObj.poster_path}
              original_title={movieObj.original_title}
              key={index}
              handleAddToWatchList={handleAddToWatchList}
              handleRemoveFromWatchList={handleRemoveFromWatchList}
              movieObj={movieObj}
              watchList={watchList}
            />
          );
        })}
      </div>

      <Pagination
        pageNo={pageNo}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
    </div>
  );
}

export default Movies;
