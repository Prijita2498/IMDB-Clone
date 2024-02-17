import React, { useEffect, useState } from "react";
import genreIds from '../Utility/genre';

function Watchlist({ watchList, setWatchList,handleRemoveFromWatchList }) {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(["All Genres"]);
  const [currGenre, setCurrGenre] = useState("All Genres");

  useEffect(()=>{
    let genre = watchList.map((movieObj)=>{
      return genreIds[movieObj.genre_ids[0]]
    });

    //Show only unique values
    genre = new Set(genre);
    setGenreList(["All Genres",...genre]);
    console.log(genre);
  },[watchList]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCurrGenre = (genre) =>{
    setCurrGenre(genre);
  };

  const sortAscByRating = () =>{
   let sortedAsc= watchList.sort((movieA, movieB)=>{
      return movieA.vote_average - movieB.vote_average
    });

    setWatchList([...sortedAsc]);
  }

  const sortDescByRating = () =>{
    let sortedDesc = watchList.sort((movieA, movieB)=>{
      return movieB.vote_average - movieA.vote_average
    });

    setWatchList([...sortedDesc]);
  }

  const sortAscByPopularity = () => {
    let sortedAscByPopularity = watchList.sort((movieA, movieB)=>{
      return movieA.popularity - movieB.popularity
    });

    setWatchList([...sortedAscByPopularity]);
  }

  const sortDescByPopularity = () => {
    let sortedDescByPopularity = watchList.sort((movieA, movieB)=>{
      return movieB.popularity - movieA.popularity
    });

    setWatchList([...sortedDescByPopularity]);
  }

  return (
    <>
      <div className="flex justify-center flex-wrap m-4 gap-3">
        {
          genreList.map((genre, id)=>{
            return <div onClick={()=>handleCurrGenre(genre)} className={ currGenre == genre ? "flex justify-center h-[3rem] w-[9rem] bg-blue-500 rounded-2xl text-white font-bold items-center" : "flex justify-center h-[3rem] w-[9rem] bg-slate-300 rounded-2xl text-white font-bold items-center"} key={id}>
            {genre}
          </div>
          })
        }
      </div>
      <div className="flex justify-center my-4">
        <input
          className="h-[3rem] w-[18rem] bg-slate-200 outline-none px-4"
          type="text"
          placeholder="Search for Movies"
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-300 m-8">
        <table className="w-full text-gray-600 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>

              <th>
                <div className="flex justify-center">
                  <div className="p-2" onClick={sortAscByRating}><i className="fa-solid fa-arrow-up"></i></div>
                  <div className="p-2">Ratings</div>
                  <div className="p-2" onClick={sortDescByRating}> <i className="fa-solid fa-arrow-down"></i></div>
                </div>
              </th>

              <th>
                <div className="flex justify-center">
                  <div className="p-2" onClick={sortAscByPopularity}><i className="fa-solid fa-arrow-up"></i></div>
                  <div className="p-2">Popularity</div>
                  <div className="p-2" onClick={sortDescByPopularity}> <i className="fa-solid fa-arrow-down"></i></div>
                </div>
              </th>

              <th>Genre</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {watchList.filter((movieObj)=>{
              if(currGenre=="All Genres"){
                return true;
              }
              else{
                return genreIds[movieObj.genre_ids[0]] == currGenre;
              }
            })
              .filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase());
              })
              .map((movieObj, index) => {
                return (
                  <tr className="border-b-2" key={index}>
                    <td className="flex items-center px-3 py-2">
                      <img
                        className="h-[6rem] w-[6rem]"
                        src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                        alt=""
                      />
                      <div className="mx-8">{movieObj.title}</div>
                    </td>

                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreIds[movieObj.genre_ids[0]]}</td>
                    <td
                      className="text-red-500 font-bold hover:cursor-pointer"
                      onClick={() => handleRemoveFromWatchList(movieObj)}
                    >
                      Delete
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
