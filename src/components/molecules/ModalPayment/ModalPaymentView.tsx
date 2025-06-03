import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "./ModalPaymentViewStyles";
import { Formik, FormikProps } from "formik"; 
import * as Yup from "yup";
import { useModalPayment } from "@/context/modalpayment";
import IconSvg from "../IconSvg/IconSvg";
import OrderDetails from "./OrderDetails";
import FormPaymentInput from "./FormPaymentInput";
import PaymentOption from "./PaymentOption";
import DividerSection from "./DividerSection";
import PayWithCreditCard from "./PaymentMethodsView/PayWithCreditCard";
import PayWithAtm from "./PaymentMethodsView/PayWithAtm";
import PayWithBancolombia from "./PaymentMethodsView/PayWithBancolombia";
import { useQuery } from "@tanstack/react-query";
import { getProductsById } from "@/api/productsTab"; 
import type { Product } from "@/features/product/types"; 
import { PAYMENTS_METHODS, paymentOptions } from "@/constants/paymentOptions";
import { paymentValidationSchema } from "@/validations/paymentValidation";
import { initialFormValues } from "@/constants/initialFormValues"
import EditableDividerSection from "./EditableDividerSection";
import PayWithCrypto from "./PaymentMethodsView/PayWithCrypto";
import { useTranslation } from "react-i18next";


export interface FormValuesPayment {
  email: string;
  telegramId?: string;
  termsAccepted: boolean;
}


const ModalPaymentView = () => {
  const { t } = useTranslation();
  const { closeModal } = useModalPayment();
  const [activePaymentOption, setPaymentActiveOption] = useState<string | null>(
    null
  );
  const { params } = useModalPayment();
  const { productid } = params;

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ['productById', productid],
    queryFn: () => getProductsById(productid),
    enabled: !!productid,
  });

  const [quantity, setQuantity] = useState(1);
  const totalPrice = (Number(product?.price) || 0) * quantity;
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
 
  let component;

  switch (activePaymentOption) {
    case PAYMENTS_METHODS.CREDIT_CARD:
      component = (
        <PayWithCreditCard
          productId={productid}
          closeModal={goBack}
          languageCode={values?.languageCode ?? "es"}
        />
      );
      break;
    case PAYMENTS_METHODS.ATM:
      component = <PayWithAtm />;
      break;
    case PAYMENTS_METHODS.BANCOLOMBIA_PAY:
      component = <PayWithBancolombia />;
      break;

    case PAYMENTS_METHODS.CRYPTO:
      component = (
        <PayWithCrypto
          productId={productid}
          closeModal={goBack}
          languageCode={values?.languageCode ?? "es"}
        />
      );
      break;
    default:
      component = null;
  }

  const goBack = () => {
    closeModal();
  };

  return (
    <ScrollView scrollEnabled={!isLoading}>
      <View style={styles.container}>
         {isLoading ? (
        <View style={styles.loaderContainer}>
          <Text style={styles.loaderText}>{t('modalPayment.loadingProduct')}</Text>
          <ActivityIndicator size="large" color="#10B4E7" />
        </View>
      ) : (
        <Formik
          initialValues={initialFormValues}
          validationSchema={paymentValidationSchema}
          onSubmit={(values: FormValuesPayment) => {
            closeModal();
          }}
        >
          {({
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            setFieldValue,
          }: FormikProps<FormValuesPayment>) => (
            <View style={{ width: "100%" }}>
              <View style={styles.header}>
                <Text allowFontScaling={false} style={styles.headerTitle}>
                  {t('modalPayment.purchaseDetails')}
                </Text>
                <TouchableOpacity onPress={goBack}>
                  <IconSvg type="closeicon" />
                </TouchableOpacity>
              </View>
              <OrderDetails
                image={product?.image}
                title={product?.title}
                price={product?.price}
              />
              <View style={{ marginBottom: 10 }}>
            </View>

              {activePaymentOption === PAYMENTS_METHODS.ATM ||
              activePaymentOption ===
                PAYMENTS_METHODS.BANCOLOMBIA_PAY ? null : (
                <View>
                  <DividerSection label={t('modalPayment.unitPrice')} value={`${product?.price} USD`} />
                  <EditableDividerSection label={t('modalPayment.quantity')}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FormPaymentInput
                      placeholder={t('modalPayment.quantity')}
                      handleChange={(text) => {
                        const value = Number(text);
                        if (!isNaN(value)) {
                          setQuantity(value);
                        }
                      }}
                      handleBlur={() => {}}
                      value={quantity ? quantity.toString() : ""}
                      width="80%"
                    />
                    </View>
                  </EditableDividerSection>

                  <EditableDividerSection label={t('modalPayment.coupon')}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FormPaymentInput
                      placeholder={t('modalPayment.couponCode')}
                      handleChange={(text) => setCoupon(text)}
                      handleBlur={() => {}}
                      value={coupon}
                      width="80%"
                    />
                    <TouchableOpacity
                      onPress={() => {
                        if (coupon.trim().toUpperCase() === "DESCUENTO5") {
                          setDiscount(5);
                        } else {
                          setDiscount(0);
                        }
                      }}
                      style={{ marginLeft: 10 }}
                    >
                      <Text allowFontScaling={false} style={{ color: "#10B4E7", textDecorationLine: "underline", fontSize: 14 }}>
                        {t('modalPayment.apply')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </EditableDividerSection>


                  <DividerSection label={t('modalPayment.discount')} value={`-${discount} USD`} />
                  <DividerSection label={t('modalPayment.totalToPay')} value={`${totalPrice} USD`} />

                </View>
              )}

              {activePaymentOption === null ? (
                <View>
                  <View style={styles.inputContainer}>
                    <FormPaymentInput
                      placeholder={t('modalPayment.enterEmail')}
                      handleChange={handleChange("email")}
                      handleBlur={handleBlur("email")}
                      value={values.email}
                      width="48%"
                    />
                    <FormPaymentInput
                      placeholder={t('modalPayment.telegramId')}
                      handleChange={handleChange("telegramId")}
                      handleBlur={handleBlur("telegramId")}
                      value={values.telegramId ?? ""}
                      width="50%"
                    />
                  </View>
                   <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
                    <TouchableOpacity
                      onPress={() => {
                        setFieldValue("termsAccepted", !values.termsAccepted);
                      }}
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 4,
                        borderWidth: 1,
                        borderColor: "#959595",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: 8,
                      }}
                    >
                      {values.termsAccepted && (
                        <Text style={{ color: "#FFFFFF", fontSize: 14 }}>✓</Text>
                      )}
                    </TouchableOpacity>
                    <Text allowFontScaling={false} style={{ color: "#FFFFFF" }}>
                      {t('modalPayment.acceptTerms')}
                    </Text>
                  </View>

                  {errors.termsAccepted && touched.termsAccepted && (
                    <Text style={{ color: "red", fontSize: 12, marginBottom: 8 }}>
                      {errors.termsAccepted}
                    </Text>
                  )}
                </View>
              ) : (
                component
              )}
              <View style={styles.paymentOptionsContainer}>
                {activePaymentOption === null
                  ? paymentOptions.map((option, index) => (
                      <PaymentOption
                        key={index}
                        option={option}
                        activeOption={activePaymentOption}
                        setActiveOption={setPaymentActiveOption}
                      />
                    ))
                  : null}
              </View>
            </View>
          )}
        </Formik>
        )}
      </View>
    </ScrollView>
  );
};

export default ModalPaymentView;
