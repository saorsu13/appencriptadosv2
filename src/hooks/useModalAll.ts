import { useContext } from "react";
import { ModalContext } from "@/context/modal";

const useModalAll = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModalAll must be used within a ModalProvider");
  }

  return { showModal: ctx.showModal };
};

export default useModalAll;
