import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService, setAuthToken } from '../services/apiService';

export default function LoginScreen({ navigation, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login(email.trim(), password);
      const { user, token } = response;

      // Guardar en AsyncStorage
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('usuario', JSON.stringify(user));

      // Configurar token para futuras peticiones
      setAuthToken(token);

      // Mostrar mensaje de bienvenida
      const welcomeMessage = user.role === 'admin' 
        ? 'Bienvenido Administrador' 
        : 'Bienvenido a Ponte Pilas';

      Alert.alert('Éxito', welcomeMessage, [
        {
          text: 'OK',
          onPress: () => {
            onLogin(user, token);
          }
        }
      ]);

    } catch (error) {
      console.error('Error en login:', error);
      
      let errorMessage = 'Error al iniciar sesión';
      
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || error.response.data?.error;
        
        if (status === 401) {
          errorMessage = 'Credenciales incorrectas';
        } else if (status === 404) {
          errorMessage = 'Usuario no encontrado';
        } else {
          errorMessage = message || 'Error del servidor';
        }
      } else if (error.request) {
        errorMessage = 'No se pudo conectar al servidor. Verifica tu conexión a internet.';
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <Text style={styles.backButtonText}>← Volver</Text>
            </TouchableOpacity>
            
            <View style={styles.logoContainer}>
              <View style={styles.logoPlaceholder}>
                <Text style={styles.logoText}>Ponte Pilas</Text>
              </View>
            </View>
            
            <Text style={styles.title}>Iniciar Sesión</Text>
            <Text style={styles.subtitle}>
              Ingresa tus credenciales para acceder
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Correo Electrónico</Text>
              <TextInput
                style={styles.input}
                placeholder="ejemplo@correo.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                placeholderTextColor="#999999"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Contraseña</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Tu contraseña"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  placeholderTextColor="#999999"
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.passwordToggleText}>
                    {showPassword ? '🙈' : '👁️'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
              )}
            </TouchableOpacity>

            {/* Links adicionales */}
            <View style={styles.linksContainer}>
              <TouchableOpacity>
                <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity>
              
              <View style={styles.divider} />
              
              <TouchableOpacity>
                <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Info adicional */}
          <View style={styles.footer}>
            <Text style={styles.infoText}>
              Al iniciar sesión aceptas nuestros términos y condiciones
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#0066CC',
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: 60,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  form: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
  },
  passwordToggle: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  passwordToggleText: {
    fontSize: 18,
  },
  loginButton: {
    backgroundColor: '#0066CC',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButtonDisabled: {
    backgroundColor: '#999999',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linksContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  linkText: {
    color: '#0066CC',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '50%',
    marginVertical: 10,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 16,
  },
});
