import React, { useRef, useState, useContext } from "react";
import ReactDOM from "react-dom";

const FiltersContext = React.createContext();

export function FiltersProvider({ children }) {
    const [filter, setFilter] = useState(false);
    const [location, setLocation] = useState("");
    const [item, setItem] = useState({});
    const [count, setCount] = useState(1);
    const [recentId, setRecentId] = useState(1);
    const [profile, setProfile] = useState(false);
    const [results, setResults] = useState(1);






  return (
    <FiltersContext.Provider value={{ results, setResults, profile, setProfile, recentId, setRecentId, filter, setFilter, location, setLocation, item, setItem, count, setCount }}>
      {children}
    </FiltersContext.Provider>
  );
}

export const useFilters = () => useContext(FiltersContext);
