import { useState } from "react";
import type { Page } from "../App";
import { api } from "../api/axios";
import type { Pokemon } from "../types/Pokemon";

type Props = {
  setPage: (page: Page) => void;
};

const Add = ({ setPage }: Props) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("");

  const handleSave = () => {
    api
      .post<Pokemon>("/pokemons", {
        name,
        image,
        type,
      })
      .then(() => {
        setPage("list");
      });
  };

  return (
    <div className="card mx-auto max-w-md bg-base-100 shadow-xl">
      <div className="card-body">
        <h1 className="card-title text-2xl">Pokemon Ekle</h1>

        <input
          className="input input-bordered w-full"
          placeholder="Pokemon adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input input-bordered w-full"
          placeholder="Görsel URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <input
          className="input input-bordered w-full"
          placeholder="Güç tipi"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />

        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleSave}>
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;