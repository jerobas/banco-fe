import { useState, useEffect } from "react";
import { Room } from "../interfaces";
import Searchbar from "../components/Searchbar";

export const useFilterSearchbar = (initialValue: Room[]) => {
  const [searchInput, setSearchInput] = useState("");
  const [salas, setSalas] = useState<{
    salas: Room[];
    defaultSalas: Room[];
  }>({ salas: [], defaultSalas: [] });

  useEffect(() => {
    setSalas({
      defaultSalas: initialValue,
      salas: initialValue,
    });
  }, [initialValue]);

  useEffect(() => {
    if (searchInput.length > 0) {
      const filtradas = salas.defaultSalas?.filter((room) =>
        room.name.toLowerCase().startsWith(searchInput.toLowerCase())
      );
      setSalas((prev) => ({
        ...prev,
        salas: filtradas,
      }));
    } else {
      setSalas((prev) => ({
        ...prev,
        salas: prev.defaultSalas,
      }));
    }
  }, [searchInput, salas.defaultSalas]);

  return {
    Searchbar: () => (
      <Searchbar searchbarState={[searchInput, setSearchInput]} />
    ),
    rooms: salas.salas,
  };
};
