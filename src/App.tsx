import { useState } from "react";
import List from "./pages/List";
import Add from "./pages/Add";
import Delete from "./pages/Delete";
import Update from "./pages/Update";

export type Page = "list" | "add" | "delete" | "update";

function App() {
  const [page, setPage] = useState<Page>("list");
  const [pokemonId, setPokemonId] = useState("");

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mb-6 flex gap-3 rounded-xl bg-white p-4 shadow">
        <button
          className="rounded bg-slate-700 px-10 py-2 text-white"
          onClick={() => setPage("list")}
        >
          List
        </button>

        <button
          className="rounded bg-blue-600 px-10 py-2 text-white"
          onClick={() => setPage("add")}
        >
          Add
        </button>

        
      </div>

      {page === "list" && (
        <List setPage={setPage} setPokemonId={setPokemonId} />
      )}

      {page === "add" && <Add setPage={setPage} />}

      {page === "delete" && (
        <Delete pokemonId={pokemonId} setPage={setPage} />
      )}

      {page === "update" && (
        <Update pokemonId={pokemonId} setPage={setPage} />
      )}
    </div>
  );
}

export default App;