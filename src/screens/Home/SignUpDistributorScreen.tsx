// // src/screens/Home/SignUpDistributorScreen.tsx
// import React, { useEffect } from "react";
// import { ScrollView, Text, View, StyleSheet } from "react-native";
// import { useTheme } from "@shopify/restyle";
// import { Formik, FormikHelpers } from "formik";
// import { RadioButton } from "react-native-paper";
// import { useMutation } from "@tanstack/react-query";

// import { ThemeCustom } from "@/config/theme2";
// import { useDarkModeTheme } from "@/context/theme";
// import HeaderEncrypted from "@/components/molecules/HeaderEncrypted/HeaderEncrypted";
// import InputField from "@/components/molecules/InputField/InputFIeld";
// import Button from "@/components/atoms/Button/Button";
// import { validationSchemaDistributors } from "./schema";
// import { postForm } from "@/api/distributors";
// import useModalAll from "@/hooks/useModalAll";
// import { useAppDispatch } from "@/hooks/hooksStoreRedux";
// import { setLoading } from "@/features/loading/loadingSlice";
// import { t } from "i18next";

// interface FormValues {
//   username: string;
//   email: string;
//   contactChat: string;
//   hasWebsite: "yes" | "no";
//   website: string;
//   physicalStore: string;
//   cities: string;
//   hasExperience: "yes" | "no";
//   experienceDetails: string;
// }

// const SignUpDistributorScreen: React.FC = () => {
//   const { themeMode } = useDarkModeTheme();
//   const theme = ThemeCustom[themeMode];
//   const { colors } = theme;
//   const dispatch = useAppDispatch();
//   const { showModal } = useModalAll();

//   const mutation = useMutation({
//     mutationFn: (body: any) => postForm(body),
//   });

//   const handleSubmit = (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
//     const body = {
//       name_or_nickname: values.username,
//       email: values.email,
//       contact_chat: values.contactChat,
//       has_website: values.hasWebsite === "yes",
//       website_url: values.website || "",
//       has_physical_store: !!values.physicalStore,
//       target_cities: values.cities,
//       has_experience: values.hasExperience === "yes",
//       experience_details: values.experienceDetails,
//       lang: "es",
//     };

//     mutation.mutate(body, {
//       onSuccess: () => {
//         showModal({
//           type: "confirm",
//           oneButton: true,
//           title: "Formulario enviado exitosamente",
//           description:
//             "El formulario ha sido enviado con éxito. Para finalizar el proceso es necesario que se comunique con nosotros vía telegram: @encriptados y se identifique con el correo registrado en el formulario.",
//           textConfirm: t("actions.right"),
//           buttonColorConfirm: "#10B4E7",
//         });
//         resetForm();
//       },
//       onError: () => {
//         showModal({
//           type: "error",
//           oneButton: true,
//           title: t("type.error"),
//           description: "Se ha producido un error enviando el formulario",
//           textConfirm: t("actions.right"),
//           buttonColorConfirm: "#CB0808",
//         });
//       },
//     });
//   };

//   useEffect(() => {
//     dispatch(setLoading(mutation.isPending));
//   }, [mutation.isPending, dispatch]);

//   return (
//     <ScrollView style={{ backgroundColor: colors.background }}>
//       <HeaderEncrypted iconBack="DistributorsScreen" />

//       <View style={styles.container}>
//         <Formik
//           initialValues={{
//             username: "",
//             email: "",
//             contactChat: "",
//             hasWebsite: "no",
//             website: "",
//             physicalStore: "",
//             cities: "",
//             hasExperience: "no",
//             experienceDetails: "",
//           }}
//           validationSchema={validationSchemaDistributors}
//           onSubmit={handleSubmit}
//         >
//           {({
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             values,
//             errors,
//             touched,
//           }) => (
//             <>
//               <InputField
//                 placeholder="Nombre o Seudónimo"
//                 onChangeText={handleChange("username")}
//                 onBlur={handleBlur("username")}
//                 value={values.username}
//               />
//               {touched.username && errors.username && (
//                 <Text style={styles.errorText}>{errors.username}</Text>
//               )}

//               <InputField
//                 placeholder="Correo Electrónico"
//                 onChangeText={handleChange("email")}
//                 onBlur={handleBlur("email")}
//                 value={values.email}
//               />
//               {touched.email && errors.email && (
//                 <Text style={styles.errorText}>{errors.email}</Text>
//               )}

//               <InputField
//                 placeholder="Chat de Contacto (Signal, Telegram, Threema)"
//                 onChangeText={handleChange("contactChat")}
//                 onBlur={handleBlur("contactChat")}
//                 value={values.contactChat}
//               />
//               {touched.contactChat && errors.contactChat && (
//                 <Text style={styles.errorText}>{errors.contactChat}</Text>
//               )}

//               <View style={styles.radioGroup}>
//                 <Text style={[styles.label, { color: colors.primaryText }]}>
//                   ¿Tiene un sitio web?
//                 </Text>
//                 <RadioButton.Group
//                   onValueChange={handleChange("hasWebsite")}
//                   value={values.hasWebsite}
//                 >
//                   <View style={styles.radioRow}>
//                     <RadioButton value="yes" color={colors.primaryColor} />
//                     <Text style={{ color: colors.primaryText }}>Sí</Text>
//                     <RadioButton value="no" color={colors.primaryColor} />
//                     <Text style={{ color: colors.primaryText }}>No</Text>
//                   </View>
//                 </RadioButton.Group>
//               </View>

//               {values.hasWebsite === "yes" && (
//                 <InputField
//                   placeholder="URL del Sitio Web"
//                   onChangeText={handleChange("website")}
//                   onBlur={handleBlur("website")}
//                   value={values.website}
//                 />
//               )}
//               {touched.website && errors.website && (
//                 <Text style={styles.errorText}>{errors.website}</Text>
//               )}

//               <InputField
//                 placeholder="¿Posee tienda física? ¿En qué ubicaciones?"
//                 onChangeText={handleChange("physicalStore")}
//                 onBlur={handleBlur("physicalStore")}
//                 value={values.physicalStore}
//               />
//               {touched.physicalStore && errors.physicalStore && (
//                 <Text style={styles.errorText}>{errors.physicalStore}</Text>
//               )}

//               <InputField
//                 placeholder="Ciudades donde planea vender nuestros servicios"
//                 onChangeText={handleChange("cities")}
//                 onBlur={handleBlur("cities")}
//                 value={values.cities}
//               />
//               {touched.cities && errors.cities && (
//                 <Text style={styles.errorText}>{errors.cities}</Text>
//               )}

//               <View style={styles.radioGroup}>
//                 <Text style={[styles.label, { color: colors.primaryText }]}>
//                   ¿Tiene experiencia usando o vendiendo sistemas encriptados?
//                 </Text>
//                 <RadioButton.Group
//                   onValueChange={handleChange("hasExperience")}
//                   value={values.hasExperience}
//                 >
//                   <View style={styles.radioRow}>
//                     <RadioButton value="yes" color={colors.primaryColor} />
//                     <Text style={{ color: colors.primaryText }}>Sí</Text>
//                     <RadioButton value="no" color={colors.primaryColor} />
//                     <Text style={{ color: colors.primaryText }}>No</Text>
//                   </View>
//                 </RadioButton.Group>
//               </View>

//               {values.hasExperience === "yes" && (
//                 <InputField
//                   placeholder="¿Cuáles?"
//                   onChangeText={handleChange("experienceDetails")}
//                   onBlur={handleBlur("experienceDetails")}
//                   value={values.experienceDetails}
//                 />
//               )}
//               {touched.experienceDetails && errors.experienceDetails && (
//                 <Text style={styles.errorText}>{errors.experienceDetails}</Text>
//               )}

//               <Button size="small" onClick={handleSubmit}>
//                 Enviar formulario
//               </Button>
//             </>
//           )}
//         </Formik>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     flexGrow: 1,
//   },
//   radioGroup: {
//     marginVertical: 10,
//   },
//   radioRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   label: {
//     fontWeight: "600",
//     marginBottom: 5,
//   },
//   errorText: {
//     color: "red",
//     fontSize: 12,
//     marginBottom: 5,
//   },
// });

// export default SignUpDistributorScreen;
