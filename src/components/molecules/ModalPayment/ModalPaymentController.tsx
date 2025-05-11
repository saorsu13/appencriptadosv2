import React from "react";
import { useModalPayment } from "@/context/modalpayment";
import ModalPayment from "./ModalPayment";
import ModalPaymentView from "./ModalPaymentView"; 

const ModalPaymentController = () => {
  const { isModalOpen, closeModal, params } = useModalPayment();

  const { languageCode, productid, theme } = params;

  return (
    <ModalPayment visible={isModalOpen} onClose={closeModal}>
      {/* De momento puedes mostrar un texto simple o luego agregar WebView / Form */}
      <ModalPaymentView />
      {/* O en el futuro: 
      <WebViewComponent url={`https://app.encriptados.io/api/payment/${languageCode}/${productid}/${theme}`} />
      */}
    </ModalPayment>
  );
};

export default ModalPaymentController;
