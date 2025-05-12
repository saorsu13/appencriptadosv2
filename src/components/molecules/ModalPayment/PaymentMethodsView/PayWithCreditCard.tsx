import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

interface CreditCardFormValues {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvc: string;
}

const creditCardSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, 'Ingresa 16 dígitos')
    .required('Requerido'),
  cardHolder: Yup.string().required('Requerido'),
  expiry: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/(\d{2})$/, 'Formato MM/AA')
    .required('Requerido'),
  cvc: Yup.string()
    .matches(/^\d{3,4}$/, '3 o 4 dígitos')
    .required('Requerido'),
});

const PayWithCreditCard: React.FC = () => {
  const handleSubmit = (values: CreditCardFormValues) => {
    // Aquí iría la llamada al backend o procesamiento del pago
    console.log('Pagar con tarjeta:', values);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pago con Tarjeta de Crédito</Text>
      <Formik
        initialValues={{ cardNumber: '', cardHolder: '', expiry: '', cvc: '' }}
        validationSchema={creditCardSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }: FormikProps<CreditCardFormValues>) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Número de tarjeta"
              keyboardType="numeric"
              onChangeText={handleChange('cardNumber')}
              onBlur={handleBlur('cardNumber')}
              value={values.cardNumber}
            />
            {touched.cardNumber && errors.cardNumber && <Text style={styles.error}>{errors.cardNumber}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Titular"
              onChangeText={handleChange('cardHolder')}
              onBlur={handleBlur('cardHolder')}
              value={values.cardHolder}
            />
            {touched.cardHolder && errors.cardHolder && <Text style={styles.error}>{errors.cardHolder}</Text>}

            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <TextInput
                  style={styles.input}
                  placeholder="MM/AA"
                  onChangeText={handleChange('expiry')}
                  onBlur={handleBlur('expiry')}
                  value={values.expiry}
                />
                {touched.expiry && errors.expiry && <Text style={styles.error}>{errors.expiry}</Text>}
              </View>
              <View style={{ flex: 1 }}>
                <TextInput
                  style={styles.input}
                  placeholder="CVC"
                  keyboardType="numeric"
                  onChangeText={handleChange('cvc')}
                  onBlur={handleBlur('cvc')}
                  value={values.cvc}
                />
                {touched.cvc && errors.cvc && <Text style={styles.error}>{errors.cvc}</Text>}
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Pagar</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#202020',
    borderRadius: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2A2A2A',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  error: {
    color: '#FF5252',
    fontSize: 12,
    marginBottom: 5,
  },
});

export default PayWithCreditCard;
