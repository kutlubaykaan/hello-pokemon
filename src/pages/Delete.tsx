import { useEffect, useState } from "react";
import type { Page } from "../App";
import { api } from "../api/axios";
import type { Pokemon } from "../types/Pokemon";

type Props = {
  pokemonId: string;
  setPage: (page: Page) => void;
};

const Delete = ({ pokemonId, setPage }: Props) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    api.get<Pokemon>(`/pokemons/${pokemonId}`).then((res) => {
      setPokemon(res.data);
    });
  }, [pokemonId]);

  const handleDelete = () => {
    api.delete(`/pokemons/${pokemonId}`).then(() => {
      setPage("list");
    });
  };

  if (!pokemon) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="card mx-auto max-w-md bg-base-100 shadow-xl">
      <div className="card-body">
        <h1 className="card-title text-2xl">Pokemon Sil</h1>

        <p>
          <strong>{pokemon.name}</strong> silinecek, emin misiniz?
        </p>

        <figure>
          <img src={pokemon.image} alt={pokemon.name} className="mx-auto h-32 object-contain" />
        </figure>

        <div className="card-actions justify-end">
          <button className="btn" onClick={() => setPage("list")}>
            Vazgeç
          </button>

          <button className="btn btn-error" onClick={handleDelete}>
            Sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;