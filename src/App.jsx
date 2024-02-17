import { useState,useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Movies from "./Components/Movies";
import Watchlist from "./Components/Watchlist";
import Banner from "./Components/Banner";

function App() {
  const [watchList, setWatchList] = useState([]);

  useEffect(()=>{
    let moviesFromLocalStorage = localStorage.getItem('WatchList');
    if(!moviesFromLocalStorage){
      return
    }
      setWatchList(JSON.parse(moviesFromLocalStorage));
  },[])

  const handleAddToWatchList = (movieObj) => {
    let newwatchList = [...watchList, movieObj]; //Keep the existing watchList and then add a new movieObj
    localStorage.setItem("WatchList",JSON.stringify(newwatchList));
    setWatchList(newwatchList);
  };

  const handleRemoveFromWatchList = (movieObj) => {
    let filteredWatchList = watchList.filter((movie)=>{
      return movie.id !=movieObj.id      
    });
    setWatchList(filteredWatchList);
    localStorage.setItem("WatchList",JSON.stringify(filteredWatchList));
    console.log(filteredWatchList);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies watchList={watchList}handleAddToWatchList={handleAddToWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList} />
              </>
            }
          />
          <Route path="/watchlist" element={<Watchlist watchList={watchList} setWatchList={setWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
