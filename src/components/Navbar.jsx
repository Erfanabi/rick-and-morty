import { useState } from "react";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import { CharacterCard } from "./CharacterList";

function Navbar({
  qureyName,
  setQureyName,
  characters,
  favoriteCharacter,
  handleDeleteFavModal,
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Modal title="List of favourites" isOpen={isOpen} setIsOpen={setIsOpen}>
        {favoriteCharacter.map((card) => {
          return (
            <CharacterCard key={card.id} card={card}>
              <button
                className="icon white"
                onClick={() => handleDeleteFavModal(card.id)}
              >
                <TrashIcon />
              </button>
            </CharacterCard>
          );
        })}
      </Modal>
      <nav className="navbar">
        <p className="navbar__logo">Logo 😍</p>

        <input
          type="text"
          className="text-field"
          placeholder="search..."
          value={qureyName}
          onChange={(e) => {
            setQureyName(e.target.value);
          }}
        />

        <p className="navbar__result">Found {characters.length} characters</p>

        <button className="heart" onClick={() => setIsOpen(false)}>
          <HeartIcon className="icon" />

          <span className="badge">{favoriteCharacter.length}</span>
        </button>
      </nav>
    </>
  );
}

export default Navbar;
