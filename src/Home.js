import React from "react";
import { Link } from "react-router-dom";

function highlightSearch(text, pokemon) {
  let charFirstIndex = pokemon.name.toUpperCase().indexOf(text.toUpperCase());
  let charLastIndex = charFirstIndex + text.length;
  let capitalCase =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  return (
    <span>
      {capitalCase.slice(0, charFirstIndex)}
      <b>{capitalCase.slice(charFirstIndex, charLastIndex)}</b>
      {capitalCase.slice(charLastIndex, pokemon.name.length)}
    </span>
  );
}

function Home({ prop: results, resetFilters: resetFilters, text: text }) {
  return (
    <div className="w-full">
      <div className="mt-10 mx-12 grid grid-cols-2 md:grid-cols-4 lg:mx-52 gap-4">
        {results &&
          results.map((val) => {
            return (
              <Link
                onClick={resetFilters}
                to={`/more/${val.idx}`}
                key={val.idx}
              >
                <div className="w-full text-2xl text-yellow-500 rounded-xl flex flex-col items-center overflow-hidden">
                  <div className="w-full md:h-36 lg:h-40 flex justify-center items-center bg-white">
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${val.idx}.png`}
                    ></img>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-600 to-yellow-500 hover:from-yellow-200 w-full flex justify-center items-center py-5">
                    <p className="text-base md:text-lg text-white">
                      {highlightSearch(text, val)}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
