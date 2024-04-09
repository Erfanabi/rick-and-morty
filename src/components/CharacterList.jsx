import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";

function CharacterList({
  characters,
  onSelectCharacter,
  isLoading,
  selectBtnId,
}) {
  return (
    // <!-- character-detail -->
    <div className="col-12 col-md-5">
      {isLoading ? (
        characters.map((card) => (
          <CharacterCard key={card.id} card={card}>
            <button
              className="icon red"
              onClick={() => onSelectCharacter(card.id)}
            >
              {selectBtnId == card.id ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </CharacterCard>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default CharacterList;

export function CharacterCard({ card, children }) {
  return (
    <div className="card">
      <div className="card-body">
        <img src={card.image} alt={card.name} />

        <div className="card-item-info">
          <h3>
            <span>{card.gender == "Alive" ? "👨" : "👩‍🦰"}</span>
            <span>{card.name}</span>
          </h3>

          <div>
            <span
              className={`status ${card.status == "Dead" ? "red" : ""}`}
            ></span>
            <span>{card.status}</span>
            <span className="d-inline"> - {card.species}</span>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
