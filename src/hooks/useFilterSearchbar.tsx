import { useState, useEffect } from "react";
import { Room } from "../interfaces";
import Searchbar from "../components/Searchbar";

export const useFilterSearchbar = (initialValue) => {
    const [searchInput, setSearchInput] = useState("");
    const [salas, setSalas] = useState<{
        salas: Room[];
        defaultSalas: Room[];
    }>({ salas: [], defaultSalas: initialValue });

    useEffect(() => {
        if (searchInput.length > 0) {
            let filtradas = salas.defaultSalas?.filter((room) =>
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
    }, [searchInput]);

    return {
        Searchbar: () => <Searchbar searchbarState={[searchInput, setSearchInput]} />,
        rooms: salas.salas
    }
}