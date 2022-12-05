import { connectSearchBox } from "react-instantsearch-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function SearchBox({ refine, onCloseHandler }) {

  const onSearchHandlerClose = () => {
    onCloseHandler(false);
  };

  return (
    <>
      <form action="" role="search">
        <input
          id="algolia_search"
          type="search"
          placeholder="Search"
          onChange={(e) => refine(e.currentTarget.value)}
          className="algolia_input"
        />
        <span className="cursor-pointer hover:text-indigo-900" onClick={onSearchHandlerClose}>
          <FontAwesomeIcon
            icon={faXmark}
            className="search--cancel"
          ></FontAwesomeIcon>
        </span>
      </form>
      <span className="px-5 py-2 text-sm">
        Hit enter to search or ESC to close
      </span>
    </>
  );
}

export default connectSearchBox(SearchBox);
