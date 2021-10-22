import "./App.css";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useEffect, useState, useMemo, Suspense } from "react";
import PikachuLogo from "./pikachu.svg";
import More from "./More";
const Home = React.lazy(() => import("./Home"));

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [text, setText] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=898&offset=0")
      .then((res) => res.json())
      .then((data) => {
        const results = data.results.map((pokemon, idx) => {
          return { ...pokemon, idx: idx + 1 };
        });
        setPokemon({ ...data, results });
      });
  }, []);

  useMemo(() => {
    const timeOut = setTimeout(() => {
      if (text.length === 0) {
        setFilteredPokemon(pokemon.results);
      } else {
        setFilteredPokemon(() => {
          return pokemon.results.filter((p) =>
            p.name.includes(text.toLowerCase())
          );
        });
      }
    }, 2000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [pokemon.results, text]);

  const resetFilters = () => {
    setText("");
    setFilteredPokemon(pokemon.results);
  };

  return (
    <Router>
      <div>
        <div className="flex flex-col items-center">
          <Link
            onClick={resetFilters}
            className="flex flex-col gap-2 transform transition hover:scale-105"
            to="/"
          >
            <img className="h-16" src={PikachuLogo}></img>
            <header className="text-4xl font-bold text-yellow-500 text-center">
              Pokémon Api
            </header>
          </Link>
        </div>
      </div>

      <Switch>
        <Route path="/more/:slug">
          <More></More>
        </Route>
        <Route exact path="/">
          <div className="w-full flex justify-center">
            <input
              type="text"
              onChange={($event) => setText($event.target.value)}
              placeholder="Search your Pokemon here"
              className="mt-10 p-2 w-10/12 md:w-6/12 bg-white ring-1 ring-yellow-300 rounded-lg placeholder-gray-400 text-gray-900 appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <Suspense
            fallback={
              <div className="text-center mt-12 font-bold text-lg text-gray-400">
                Loading Pokemon...
              </div>
            }
          >
            {pokemon && (
              <Home
                prop={filteredPokemon}
                resetFilters={resetFilters}
                text={text}
              />
            )}
          </Suspense>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
