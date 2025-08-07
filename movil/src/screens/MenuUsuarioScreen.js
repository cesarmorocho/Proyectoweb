import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native';

export default function MenuUsuarioScreen({ user, onLogout }) {
  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sí, cerrar sesión',
          onPress: onLogout,
        },
      ]
    );
  };

  const menuOptions = [
    {
      id: 1,
      title: 'Generar Reporte',
      subtitle: 'Reportar incidente de seguridad',
      icon: '📝',
      color: '#FF6B35',
      onPress: () => {
        Alert.alert('Próximamente', 'Esta funcionalidad estará disponible pronto');
      }
    },
    {
      id: 2,
      title: 'Mis Reportes',
      subtitle: 'Ver historial de reportes',
      icon: '📋',
      color: '#4ECDC4',
      onPress: () => {
        Alert.alert('Próximamente', 'Esta funcionalidad estará disponible pronto');
      }
    },
    {
      id: 3,
      title: 'Notificaciones',
      subtitle: 'Ver alertas y notificaciones',
      icon: '🔔',
      color: '#45B7D1',
      onPress: () => {
        Alert.alert('Próximamente', 'Esta funcionalidad estará disponible pronto');
      }
    },
    {
      id: 4,
      title: 'Mi Perfil',
      subtitle: 'Actualizar información personal',
      icon: '👤',
      color: '#96CEB4',
      onPress: () => {
        Alert.alert('Próximamente', 'Esta funcionalidad estará disponible pronto');
      }
    },
    {
      id: 5,
      title: 'Mapa de Incidentes',
      subtitle: 'Ver incidentes en el mapa',
      icon: '🗺️',
      color: '#FECA57',
      onPress: () => {
        Alert.alert('Próximamente', 'Esta funcionalidad estará disponible pronto');
      }
    },
    {
      id: 6,
      title: 'Contacto de Emergencia',
      subtitle: 'Números de emergencia',
      icon: '🚨',
      color: '#FF9FF3',
      onPress: () => {
        Alert.alert('Contactos de Emergencia', 
          'Policía: 101\nBomberos: 102\nCruz Roja: 131\nECU 911: 911');
      }
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.welcomeText}>¡Hola!</Text>
            <Text style={styles.userName}>{user?.name || 'Usuario'}</Text>
            <Text style={styles.userEmail}>{user?.email || ''}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Options */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Servicios Disponibles</Text>
          
          <View style={styles.menuGrid}>
            {menuOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[styles.menuOption, { backgroundColor: option.color }]}
                onPress={option.onPress}
                activeOpacity={0.8}
              >
                <View style={styles.iconContainer}>
                  <Text style={styles.optionIcon}>{option.icon}</Text>
                </View>
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Estadísticas Rápidas</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Reportes Enviados</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Alertas Recibidas</Text>
            </View>
          </View>
        </View>

        {/* Safety Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.sectionTitle}>Consejos de Seguridad</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipIcon}>💡</Text>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Mantente Alerta</Text>
              <Text style={styles.tipText}>
                Siempre mantén conciencia de tu entorno y confía en tus instintos.
              </Text>
            </View>
          </View>
          <View style={styles.tipCard}>
            <Text style={styles.tipIcon}>📱</Text>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Reporta Inmediatamente</Text>
              <Text style={styles.tipText}>
                Ante cualquier situación sospechosa, reporta inmediatamente a través de la app.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#0066CC',
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  userDetails: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 2,
  },
  userEmail: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoutText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  menuContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  menuGrid: {
    gap: 16,
  },
  menuOption: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    marginRight: 16,
  },
  optionIcon: {
    fontSize: 32,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0066CC',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  tipsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  tipCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tipIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});
