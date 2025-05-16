import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { ThemeCustomType } from '@/config/theme2';
import UserCircleIcon from '@/assets/icons/UserCircleIcon';

export default function LoginStoreScreen() {
  const navigation = useNavigation<any>();
  const { colors } = useTheme<ThemeCustomType>();

  const handleLogin = () => navigation.navigate('Login');
  const handleRegister = () => navigation.navigate('Register');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>      
      <View style={styles.content}>
        <View style={styles.iconWrapper}>
          <UserCircleIcon width={48} height={48} color={colors.white} />
        </View>
        <Text style={[styles.title, { color: colors.white }]}>          
          Acceder a la plataforma
        </Text>

        <TouchableOpacity
          style={[styles.loginButton, { borderColor: colors.primaryColor }]}
          onPress={handleLogin}
        >
          <Text style={[styles.loginButtonText, { color: colors.primaryColor }]}>            
            Iniciar sesión
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.registerButton, { backgroundColor: colors.white }]}
          onPress={handleRegister}
        >
          <Text style={[styles.registerButtonText, { color: colors.primaryText }]}>            
            Registrarme
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconWrapper: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 32,
  },
  loginButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  registerButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
