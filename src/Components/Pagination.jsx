import React from "react";

function Pagination({pageNo, handlePrev, handleNext}) {
  return (
    <div className="bg-gray-400 p-3 mt-8 flex justify-center">
      <div className="px-20" onClick={handlePrev}><i className="fa-solid fa-arrow-left"></i></div>
      <div className="font-bold">{pageNo}</div>
      <div className="px-20" onClick={handleNext}><i className="fa-solid fa-arrow-right"></i></div>
    </div>
  );
}

export default Pagination;
