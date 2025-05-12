import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PayWithBancolombiaProps {
  onConfirm?: () => void;
}

// Componente para instruir y confirmar pago vía Bancolombia
const PayWithBancolombia: React.FC<PayWithBancolombiaProps> = ({ onConfirm }) => {
  // Datos de ejemplo: reemplaza por datos reales o props
  const bankDetails = {
    accountType: 'Ahorros',
    accountNumber: '1234567890',
    accountHolder: 'Mi Empresa S.A.S.',
    bankName: 'Bancolombia',
    value: '50 USD',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pago con Bancolombia</Text>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Banco:</Text>
        <Text style={styles.value}>{bankDetails.bankName}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Tipo de cuenta:</Text>
        <Text style={styles.value}>{bankDetails.accountType}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Número de cuenta:</Text>
        <Text style={styles.value}>{bankDetails.accountNumber}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Titular:</Text>
        <Text style={styles.value}>{bankDetails.accountHolder}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Monto:</Text>
        <Text style={styles.value}>{bankDetails.value}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onConfirm}>
        <Text style={styles.buttonText}>He realizado el pago</Text>
      </TouchableOpacity>
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
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    color: '#B3B3B3',
    flex: 1,
  },
  value: {
    color: '#FFFFFF',
    flex: 1,
  },
  button: {
    backgroundColor: '#1E88E5',
    padding: 12,
    borderRadius: 6,
    marginTop: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default PayWithBancolombia;
