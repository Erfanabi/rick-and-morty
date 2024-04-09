// import { character } from "../../data/data";
import { useEffect, useState } from "react";
import axios from "axios";
import CharacterEpisodes from "./CharacterEpisodes";
import toast, { Toaster } from "react-hot-toast";

function CharacterInfo({ selectBtnId, handleFavoChar, isAddToFave }) {
  const [characterDetailId, setCharacterDetailId] = useState(null);
  const [episode, setEpisode] = useState([]);

  // ! 1 ) aysinc await
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectBtnId}`
        );
        setCharacterDetailId(data.data);

        const arrEpi = data.data.episode.map((item) => item.split("/").at(-1));
        const episo = await axios.get(
          `https://rickandmortyapi.com/api/episode/${arrEpi}`
        );

        setEpisode([episo.data].flat());
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }

    if (selectBtnId != null) {
      fetchData();
    }
  }, [selectBtnId]);

  return (
    <div>
      <Toaster />
      <div>
        {characterDetailId == null || selectBtnId == null ? (
          <div className="character-detail row select-character">
            Please select a character
          </div>
        ) : (
          <div className="character-detail row">
            <div className="character-detail__image col-12 col-sm-5">
              <img src={characterDetailId.image} alt="" />
            </div>

            <div className="character-detail__info col-12 col-sm-7">
              <div className="d-flex flex-column align-items-start">
                <h3>
                  <span>
                    {characterDetailId.gender == "Alive" ? "👨" : "👩‍🦰"}
                  </span>
                  <span>{characterDetailId.name}</span>
                </h3>

                <div>
                  <span
                    className={`status ${
                      characterDetailId.status == "Dead" ? "red" : ""
                    }`}
                  ></span>
                  <span>{characterDetailId.status}</span>
                  <span className="d-inline">
                    {" "}
                    - {characterDetailId.species}
                  </span>
                </div>
              </div>

              <div>
                <p className="secendory">Last known location</p>
                <h4>{characterDetailId.location.name}</h4>
              </div>

              {!isAddToFave ? (
                <button
                  className="btn btn--primary"
                  onClick={() => handleFavoChar(characterDetailId)}
                >
                  Add to Favourite
                </button>
              ) : (
                <div style={{ color: "#64748b", fontWeight: "bold" }}>
                  Already list favorite
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <CharacterEpisodes episode={episode} />
    </div>
  );
}

export default CharacterInfo;
