import { useEffect, useState } from "react";
import type { Pokemon } from "../types/Pokemon";
import { api } from "../api/axios";
import type { Page } from "../App";

type Props = {
  setPage: (page: Page) => void;
  setPokemonId: (pokemonId: string) => void;
};

const List = ({ setPage, setPokemonId }: Props) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    api.get<Pokemon[]>("/pokemons").then((res) => {
      setPokemons(res.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {pokemons.map((pokemon) => (
        <div key={pokemon.id} className="card bg-base-100 shadow-xl">
          <figure className="px-6 pt-6">
            <img src={pokemon.image} alt={pokemon.name} className="h-32 object-contain" />
          </figure>

          <div className="card-body">
            <h2 className="card-title">{pokemon.name}</h2>

            <div className="badge badge-info">{pokemon.type}</div>

            <div className="card-actions justify-end mt-4">
              <button
                className="btn btn-error"
                onClick={() => {
                  setPage("delete");
                  setPokemonId(pokemon.id);
                }}
              >
                Sil
              </button>

              <button
                className="btn btn-primary"
                onClick={() => {
                  setPage("update");
                  setPokemonId(pokemon.id);
                }}
              >
                Güncelle
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;