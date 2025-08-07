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

export default function MenuAdminScreen({ user, onLogout }) {
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

  const adminMenuOptions = [
    {
      id: 1,
      title: 'Gestión de Usuarios',
      subtitle: 'Administrar usuarios del sistema',
      icon: '👥',
      color: '#FF6B35',
      onPress: () => {
        Alert.alert('Próximamente', 'Esta funcionalidad estará disponible pronto');
      }
    },
    {
      id: 2,
      title: 'Validar Alertas',
      subtitle: 'Revisar y validar reportes',
      icon: '✅',
      color: '#4ECDC4',
      onPress: () => {
        Alert.alert('Próximamente', 'Esta funcionalidad estará disponible pronto');
      }
    },
    {
      id: 3,
      title: 'Ver Reportes',
      subtitle: 'Visualizar todos los reportes',
      icon: '📊',
      color: '#45B7D1',
      onPress: () => {
        Alert.alert('Próximamente', 'Esta funcionalidad estará disponible pronto');
      }
    },
    {
      id: 4,
      title: 'Notificaciones Masivas',
      subtitle: 'Enviar alertas a usuarios',
      icon: '📢',
      color: '#96CEB4',
      onPress: () => {
        Alert.alert('Próximamente', 'Esta funcionalidad estará disponible pronto');
      }
    },
    {
      id: 5,
      title: 'Panel de Control',
      subtitle: 'Estadísticas y métricas',
      icon: '📈',
      color: '#FECA57',
      onPress: () => {
        Alert.alert('Próximamente', 'Esta funcionalidad estará disponible pronto');
      }
    },
    {
      id: 6,
      title: 'Configuración',
      subtitle: 'Ajustes del sistema',
      icon: '⚙️',
      color: '#FF9FF3',
      onPress: () => {
        Alert.alert('Próximamente', 'Esta funcionalidad estará disponible pronto');
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
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.adminBadge}>ADMINISTRADOR</Text>
            <Text style={styles.userName}>{user?.name || 'Admin'}</Text>
            <Text style={styles.userEmail}>{user?.email || ''}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      {/* Admin Dashboard */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Stats Dashboard */}
        <View style={styles.dashboardContainer}>
          <Text style={styles.sectionTitle}>Panel de Control</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>👤</Text>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Usuarios Totales</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>📝</Text>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Reportes Pendientes</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>✅</Text>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Reportes Validados</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🚨</Text>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Alertas Activas</Text>
            </View>
          </View>
        </View>

        {/* Admin Menu */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Herramientas de Administración</Text>
          
          <View style={styles.menuGrid}>
            {adminMenuOptions.map((option) => (
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
                <Text style={styles.arrowIcon}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activityContainer}>
          <Text style={styles.sectionTitle}>Actividad Reciente</Text>
          <View style={styles.activityCard}>
            <Text style={styles.activityIcon}>📈</Text>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Sistema Iniciado</Text>
              <Text style={styles.activityText}>
                Panel de administración listo para usar
              </Text>
              <Text style={styles.activityTime}>Hace unos momentos</Text>
            </View>
          </View>
        </View>

        {/* System Info */}
        <View style={styles.systemContainer}>
          <Text style={styles.sectionTitle}>Información del Sistema</Text>
          <View style={styles.systemCard}>
            <View style={styles.systemItem}>
              <Text style={styles.systemLabel}>Estado del Servidor:</Text>
              <View style={styles.statusIndicator}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Activo</Text>
              </View>
            </View>
            <View style={styles.systemItem}>
              <Text style={styles.systemLabel}>Última Actualización:</Text>
              <Text style={styles.systemValue}>Hoy</Text>
            </View>
            <View style={styles.systemItem}>
              <Text style={styles.systemLabel}>Versión:</Text>
              <Text style={styles.systemValue}>1.0.0</Text>
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
    backgroundColor: '#8B0000', // Color más oscuro para admin
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
  adminBadge: {
    fontSize: 10,
    color: '#FFD700',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 4,
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
  dashboardContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '47%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B0000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
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
  arrowIcon: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  activityContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  activityCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
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
  activityIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  activityText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#999999',
  },
  systemContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  systemCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  systemItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  systemLabel: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  systemValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
});
