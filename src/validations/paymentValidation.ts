// src/validations/paymentValidation.ts
import * as Yup from "yup";

export const paymentValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Ingrese un email válido")
    .required("Este campo es obligatorio"),
  telegramId: Yup.string(),
  termsAccepted: Yup.boolean()
    .oneOf([true], "Debes aceptar los términos y condiciones para continuar")
    .required("Debes aceptar los términos y condiciones para continuar"),
});

