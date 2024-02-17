import React, { useEffect, useState } from "react";
import MovieIcon from "../assets/MovieIcon.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [selected, setSelected] = useState("movies");

  useEffect(()=>{
    const currentPath = window.location.pathname;
    if(currentPath === "/"){
      setSelected("movies")
    }
    else if(currentPath === "/watchlist"){
      setSelected("watchlist")
    }
  },[]);

  return (
    <div className="flex border space-x-8 items-center pl-4 py-2 bg-slate-50">
      <img className="w-[50px]" src={MovieIcon} alt="" />
      <Link
        to="/"
        onClick={() => setSelected("movies")}
        className={`text-blue-400 font-bold text-2xl ${
          selected === "movies" ? "text-blue-800" : ""
        }`}
      >
        Movies
      </Link>
      <Link
        to="/watchlist"
        onClick={() => setSelected("watchlist")}
        className={`text-blue-400 font-bold text-2xl ${
          selected === "watchlist" ? "text-blue-800" : ""
        }`}
      >
        WatchList
      </Link>
    </div>
  );
}

export default Navbar;
