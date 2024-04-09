import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function CharacterEpisodes({ episode }) {
  const [isSortBy, setIsSortBy] = useState(true);

  let sortEpisode;

  if (isSortBy) {
    sortEpisode = [...episode].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else if (!isSortBy) {
    sortEpisode = [...episode].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }

  return (
    <div className="card h-100">
      <div className="title">
        <h3>List of Episodes:</h3>
        <button>
          <ArrowUpCircleIcon
            className={`icon ${!isSortBy ? "rotate-180deg" : "rotate-0deg"}`}
            onClick={() => setIsSortBy((is) => !is)}
          />
        </button>
      </div>

      <ul className="list">
        {sortEpisode.map((item) => (
          <EpisodesItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default CharacterEpisodes;

function EpisodesItem({ item }) {
  return (
    <li className="item">
      <div className="text">
        {item.id} - {item.episode} : <strong>{item.name}</strong>
      </div>
      <div className="badge badge--secondary">{item.air_date}</div>
    </li>
  );
}
