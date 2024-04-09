import { LoaderIcon } from "react-hot-toast";

function Loader() {
  return (
    <div
      className="select-character loading"
    >
      <p> Loading Data...</p>
      <LoaderIcon style={{ width: "1.3rem", height: "1.3rem", marginLeft:"10px"}} />
    </div>
  );
}

export default Loader;
