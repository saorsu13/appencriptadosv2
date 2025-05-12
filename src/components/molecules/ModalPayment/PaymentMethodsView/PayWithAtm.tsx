import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

interface AtmFormValues {
  accountNumber: string;
  referenceNumber: string;
}

const atmSchema = Yup.object().shape({
  accountNumber: Yup.string()
    .matches(/^\d+$/, 'Solo dígitos')
    .required('Requerido'),
  referenceNumber: Yup.string()
    .matches(/^\d+$/, 'Solo dígitos')
    .required('Requerido'),
});

const PayWithAtm: React.FC = () => {
  const handleSubmit = (values: AtmFormValues) => {
    // Aquí iría la llamada al backend para generar referencia ATM
    console.log('Generar referencia ATM para:', values);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pago vía ATM</Text>
      <Formik
        initialValues={{ accountNumber: '', referenceNumber: '' }}
        validationSchema={atmSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }: FormikProps<AtmFormValues>) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Número de cuenta"
              keyboardType="numeric"
              onChangeText={handleChange('accountNumber')}
              onBlur={handleBlur('accountNumber')}
              value={values.accountNumber}
            />
            {touched.accountNumber && errors.accountNumber && (
              <Text style={styles.error}>{errors.accountNumber}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Número de referencia"
              keyboardType="numeric"
              onChangeText={handleChange('referenceNumber')}
              onBlur={handleBlur('referenceNumber')}
              value={values.referenceNumber}
            />
            {touched.referenceNumber && errors.referenceNumber && (
              <Text style={styles.error}>{errors.referenceNumber}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Generar Referencia</Text>
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
  button: {
    backgroundColor: '#FFA000',
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

export default PayWithAtm;
