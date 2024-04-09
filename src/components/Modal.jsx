import { XCircleIcon } from "@heroicons/react/24/outline";

function Modal({ title, isOpen, setIsOpen, children }) {
  // ! first isOpen => true
  if (isOpen == true) return null;

  return (
    <div className="backdrop">
      <div className="modal">
        <div className="modal__header">
          <h2 className="title">{title}</h2>
          <button onClick={() => setIsOpen(true)}>
            <XCircleIcon className="icon close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
