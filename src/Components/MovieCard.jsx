import React from "react";

function MovieCard({
  movieObj,
  poster_path,
  original_title,
  handleAddToWatchList,
  handleRemoveFromWatchList,
  watchList,
}) {
  function doesContain(movieObj) {
    for (let i = 0; i < watchList.length; i++) {
      if (watchList[i].id == movieObj.id) {
        return true;
      }
    }
    return false;
  }
  return (
    <div
      className="h-[40vh] w-[200px] bg-center rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
        backgroundSize: "110% 100%",
      }}
    >
      {doesContain(movieObj) ? (
        <div
          className="bg-gray-900/90 rounded-lg px-1 py-1 m-2"
          onClick={() => handleRemoveFromWatchList(movieObj)}
        >
          &#10060;
        </div>
      ) : (
        <div
          className="bg-gray-900/90 rounded-lg px-1 py-1 m-2"
          onClick={() => handleAddToWatchList(movieObj)}
        >
          &#128525;{" "}
        </div>
      )}

      <div className="text-white text-center w-full text-xl bg-gray-900/60">
        {original_title}
      </div>
    </div>
  );
}

export default MovieCard;
