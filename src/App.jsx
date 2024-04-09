import "./App.css";
import "./libs/bootstrap-grid.css";
import CharacterEpisodes from "./components/CharacterEpisodes";
import CharacterInfo from "./components/CharacterInfo";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [characters, setCharacters] = useState([]);
  const [qureyName, setQureyName] = useState("");

  const [isLoading, setISLoading] = useState(false);

  // ! 1 ) aysinc await
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      try {
        setISLoading(false);
        const data = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${qureyName}`,
          {
            signal: signal,
          }
        );
        setCharacters(data.data.results);
        setISLoading(true);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("successfully aborted");
        } else {
          toast.error(err.response.data.error);
        }
      }
    }

    if (qureyName.length >= 1) {
      fetchData();
    } else {
      setISLoading(false);
    }

    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }, [qureyName]);

  // ! 2 ) axios
  // useEffect(() => {
  //   axios
  //     .get(`https://rickandmortyapi.com/api/character/?name=${qureyName}`)
  //     .then((data) => {
  //       setCharacters(data.data.results);
  //     })
  //     .catch((err) => console.log(err.response.data.error));
  // }, [qureyName]);

  // ! 3 ) fetch
  // fetch("https://rickandmortyapi.com/api/character")
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  const [selectBtnId, setSelectBtnId] = useState(null);

  function handleSelectCharacter(id) {
    setSelectBtnId(id);
    if (id == selectBtnId) {
      setSelectBtnId(null);
    }
  }

  const [favoriteCharacter, setFavoriteCharacter] = useState(
    () => JSON.parse(localStorage.getItem("FAVOURITECHAR")) || []
  );

  useEffect(() => {
    localStorage.setItem("FAVOURITECHAR", JSON.stringify(favoriteCharacter));
  }, [favoriteCharacter]);

  function handleFavoChar(faveCharacter) {
    const addOne = favoriteCharacter.map((item) => item.id);

    if (!addOne.includes(faveCharacter.id)) {
      setFavoriteCharacter((prevChar) => [...prevChar, faveCharacter]);
    }
  }

  const isAddToFave = favoriteCharacter
    .map((item) => item.id)
    .includes(selectBtnId);

  function handleDeleteFavModal(id) {
    const faveFilter = favoriteCharacter.filter((card) => card.id != id);
    setFavoriteCharacter(faveFilter);
  }

  return (
    <div>
      <Toaster />
      <Navbar
        qureyName={qureyName}
        setQureyName={setQureyName}
        characters={characters}
        favoriteCharacter={favoriteCharacter}
        handleDeleteFavModal={handleDeleteFavModal}
      />

      <div className="row reverse">
        <CharacterList
          characters={characters}
          onSelectCharacter={handleSelectCharacter}
          isLoading={isLoading}
          selectBtnId={selectBtnId}
        />

        <div className="col-12 col-md-7">
          <CharacterInfo
            selectBtnId={selectBtnId}
            handleFavoChar={handleFavoChar}
            isAddToFave={isAddToFave}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
