import ReactDOM from "react-dom";
import { useModal } from "@/store/store";

const Modal = () => {
  const { isModalOpen, modalContent, closeModal } = useModal();

  if (!isModalOpen) return null;

  const handleClose = (e) => {
    e.stopPropagation();
    closeModal();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <div
      onClick={handleClose}
      className="absolute inset-0  bg-black bg-opacity-50 z-10 px-[20px] pt-[166px]"
    >
      <div
        onClick={handleContentClick}
        className="bg-white top-[166px] rounded-lg w-full max-w-md z-20 p-[20px]"
      >
        {modalContent}
      </div>
    </div>,
    document.getElementById("main")
  );
};

export default Modal;
