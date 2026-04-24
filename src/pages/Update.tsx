import { useEffect, useState } from "react";
import type { Page } from "../App";
import { api } from "../api/axios";
import type { Pokemon } from "../types/Pokemon";

type Props = {
  pokemonId: string;
  setPage: (page: Page) => void;
};

const Update = ({ pokemonId, setPage }: Props) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    api.get<Pokemon>(`/pokemons/${pokemonId}`).then((res) => {
      setPokemon(res.data);
    });
  }, [pokemonId]);

  const handleSave = () => {
    if (!pokemon) return;

    api.put<Pokemon>(`/pokemons/${pokemonId}`, pokemon).then(() => {
      setPage("list");
    });
  };

  if (!pokemon) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="card mx-auto max-w-md bg-base-100 shadow-xl">
      <div className="card-body">
        <h1 className="card-title text-2xl">Pokemon Güncelle</h1>

        <input
          className="input input-bordered w-full"
          value={pokemon.name}
          onChange={(e) =>
            setPokemon({
              ...pokemon,
              name: e.target.value,
            })
          }
        />

        <input
          className="input input-bordered w-full"
          value={pokemon.image}
          onChange={(e) =>
            setPokemon({
              ...pokemon,
              image: e.target.value,
            })
          }
        />

        <input
          className="input input-bordered w-full"
          value={pokemon.type}
          onChange={(e) =>
            setPokemon({
              ...pokemon,
              type: e.target.value,
            })
          }
        />

        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleSave}>
            Güncelle
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;