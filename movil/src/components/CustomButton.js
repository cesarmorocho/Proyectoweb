// Importamos React para crear el componente
import React from 'react';
// Importamos los componentes necesarios de React Native:
// - TouchableOpacity: para crear un botón táctil con opacidad al presionar
// - Text: para mostrar texto dentro del botón
// - StyleSheet: para crear estilos optimizados
// - ActivityIndicator: para mostrar un spinner de carga
// - View: contenedor básico para organizar elementos
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View
} from 'react-native';

// Exportamos por defecto la función del componente CustomButton
// Recibe props destructuradas con valores por defecto:
export default function CustomButton({
  title,                    // El texto que mostrará el botón
  onPress,                 // Función que se ejecuta al presionar el botón
  variant = 'primary',     // Tipo de botón (primary, secondary, outline, danger)
  size = 'medium',         // Tamaño del botón (small, medium, large)
  disabled = false,        // Si el botón está deshabilitado
  loading = false,         // Si el botón está cargando (muestra spinner)
  icon = null,             // Icono opcional a mostrar junto al texto
  style = {},              // Estilos personalizados para el contenedor del botón
  textStyle = {},          // Estilos personalizados para el texto del botón
  ...props                 // Resto de props que se pasan al TouchableOpacity
}) {
  // Función que determina los estilos del botón basado en props
  const getButtonStyle = () => {
    // Comenzamos con el estilo base del botón
    const baseStyle = [styles.button];
    
    // Switch para aplicar estilos según la variante seleccionada
    switch (variant) {
      case 'primary':
        // Botón principal (azul) - estilo por defecto más llamativo
        baseStyle.push(styles.primaryButton);
        break;
      case 'secondary':
        // Botón secundario (gris) - menos prominente
        baseStyle.push(styles.secondaryButton);
        break;
      case 'outline':
        // Botón con solo borde - fondo transparente
        baseStyle.push(styles.outlineButton);
        break;
      case 'danger':
        // Botón de peligro (rojo) - para acciones destructivas
        baseStyle.push(styles.dangerButton);
        break;
      default:
        // Si no se reconoce la variante, usa primary como fallback
        baseStyle.push(styles.primaryButton);
    }
    
    // Switch para aplicar estilos según el tamaño seleccionado
    switch (size) {
      case 'small':
        // Botón pequeño - menos padding
        baseStyle.push(styles.smallButton);
        break;
      case 'large':
        // Botón grande - más padding
        baseStyle.push(styles.largeButton);
        break;
      default:
        // Tamaño medio por defecto
        baseStyle.push(styles.mediumButton);
    }
    
    // Si el botón está deshabilitado o cargando, aplica estilos de deshabilitado
    if (disabled || loading) {
      baseStyle.push(styles.disabledButton);
    }
    
    // Agrega cualquier estilo personalizado pasado como prop
    baseStyle.push(style);
    
    // Retorna el array de estilos combinados
    return baseStyle;
  };

  // Función que determina los estilos del texto basado en props
  const getTextStyle = () => {
    // Comenzamos con el estilo base del texto
    const baseStyle = [styles.buttonText];
    
    // Switch para aplicar colores de texto según la variante del botón
    switch (variant) {
      case 'primary':
        // Texto blanco para botón primario
        baseStyle.push(styles.primaryText);
        break;
      case 'secondary':
        // Texto blanco para botón secundario
        baseStyle.push(styles.secondaryText);
        break;
      case 'outline':
        // Texto azul para botón outline (coincide con el borde)
        baseStyle.push(styles.outlineText);
        break;
      case 'danger':
        // Texto blanco para botón de peligro
        baseStyle.push(styles.dangerText);
        break;
      default:
        // Texto blanco por defecto
        baseStyle.push(styles.primaryText);
    }
    
    // Switch para aplicar tamaños de fuente según el tamaño del botón
    switch (size) {
      case 'small':
        // Fuente más pequeña para botón pequeño
        baseStyle.push(styles.smallText);
        break;
      case 'large':
        // Fuente más grande para botón grande
        baseStyle.push(styles.largeText);
        break;
      default:
        // Tamaño de fuente medio por defecto
        baseStyle.push(styles.mediumText);
    }
    
    // Agrega cualquier estilo de texto personalizado pasado como prop
    baseStyle.push(textStyle);
    
    // Retorna el array de estilos de texto combinados
    return baseStyle;
  };

  // Renderizado del componente
  return (
    // TouchableOpacity es el contenedor principal táctil del botón
    <TouchableOpacity
      style={getButtonStyle()}              // Aplica los estilos calculados del botón
      onPress={onPress}                     // Función a ejecutar al presionar
      disabled={disabled || loading}        // Deshabilita si disabled=true o loading=true
      activeOpacity={0.8}                   // Opacidad al presionar (0.8 = 80% opacidad)
      {...props}                            // Pasa cualquier prop adicional al TouchableOpacity
    >
      {/* View interno para organizar el contenido del botón */}
      <View style={styles.buttonContent}>
        {/* Renderizado condicional: si está cargando muestra spinner, sino muestra contenido normal */}
        {loading ? (
          // Spinner de carga cuando loading=true
          <ActivityIndicator
            size="small"                                                    // Tamaño pequeño del spinner
            color={variant === 'outline' ? '#0066CC' : 'white'}           // Color azul para outline, blanco para otros
            style={styles.loader}                                         // Estilos del spinner
          />
        ) : (
          // Contenido normal del botón cuando no está cargando
          <>
            {/* Renderizado condicional del icono si existe */}
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            {/* Texto del botón con estilos calculados */}
            <Text style={getTextStyle()}>{title}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

// Creamos un objeto StyleSheet para optimizar los estilos
const styles = StyleSheet.create({
  // Estilo base para todos los botones
  button: {
    borderRadius: 8,              // Bordes redondeados de 8px
    alignItems: 'center',         // Centra elementos horizontalmente
    justifyContent: 'center',     // Centra elementos verticalmente
    // Propiedades de sombra para iOS
    shadowColor: '#000',          // Color de la sombra (negro)
    shadowOffset: {               // Desplazamiento de la sombra
      width: 0,                   // Sin desplazamiento horizontal
      height: 2,                  // 2px hacia abajo
    },
    shadowOpacity: 0.1,           // Opacidad de la sombra (10%)
    shadowRadius: 3.84,           // Radio de difuminado de la sombra
    elevation: 3,                 // Elevación para Android (sombra)
  },
  // Contenedor interno del botón para organizar icono y texto
  buttonContent: {
    flexDirection: 'row',         // Organiza elementos en fila (horizontal)
    alignItems: 'center',         // Centra elementos verticalmente
    justifyContent: 'center',     // Centra elementos horizontalmente
  },
  
  // === ESTILOS DE VARIANTES DE BOTÓN ===
  // Botón primario - color principal de la app
  primaryButton: {
    backgroundColor: '#0066CC',   // Azul corporativo
  },
  // Botón secundario - color neutro
  secondaryButton: {
    backgroundColor: '#6C757D',   // Gris medio
  },
  // Botón outline - solo borde, fondo transparente
  outlineButton: {
    backgroundColor: 'transparent',  // Fondo transparente
    borderWidth: 2,                  // Borde de 2px de grosor
    borderColor: '#0066CC',          // Borde azul igual al primario
  },
  // Botón de peligro - para acciones destructivas
  dangerButton: {
    backgroundColor: '#DC3545',   // Rojo de peligro/error
  },
  // Botón deshabilitado - cuando disabled=true o loading=true
  disabledButton: {
    backgroundColor: '#CCCCCC',   // Gris claro para indicar deshabilitado
    shadowOpacity: 0,             // Sin sombra
    elevation: 0,                 // Sin elevación en Android
  },
  
  // === ESTILOS DE TAMAÑOS DE BOTÓN ===
  // Botón pequeño - menor padding
  smallButton: {
    paddingVertical: 8,           // 8px de padding arriba y abajo
    paddingHorizontal: 16,        // 16px de padding izquierda y derecha
  },
  // Botón mediano - tamaño estándar
  mediumButton: {
    paddingVertical: 12,          // 12px de padding arriba y abajo
    paddingHorizontal: 24,        // 24px de padding izquierda y derecha
  },
  // Botón grande - mayor padding para más prominencia
  largeButton: {
    paddingVertical: 16,          // 16px de padding arriba y abajo
    paddingHorizontal: 32,        // 32px de padding izquierda y derecha
  },
  
  // === ESTILOS BASE DEL TEXTO ===
  // Estilo base para todo el texto de botones
  buttonText: {
    fontWeight: '600',            // Texto semi-bold (más grueso que normal)
    textAlign: 'center',          // Texto centrado
  },
  
  // === COLORES DE TEXTO SEGÚN VARIANTE ===
  // Texto para botón primario
  primaryText: {
    color: 'white',               // Blanco sobre fondo azul
  },
  // Texto para botón secundario
  secondaryText: {
    color: 'white',               // Blanco sobre fondo gris
  },
  // Texto para botón outline
  outlineText: {
    color: '#0066CC',             // Azul igual al borde (sin fondo)
  },
  // Texto para botón de peligro
  dangerText: {
    color: 'white',               // Blanco sobre fondo rojo
  },
  
  // === TAMAÑOS DE FUENTE SEGÚN TAMAÑO DE BOTÓN ===
  // Texto pequeño para botón pequeño
  smallText: {
    fontSize: 14,                 // 14px de tamaño de fuente
  },
  // Texto mediano para botón mediano
  mediumText: {
    fontSize: 16,                 // 16px de tamaño de fuente (estándar)
  },
  // Texto grande para botón grande
  largeText: {
    fontSize: 18,                 // 18px de tamaño de fuente
  },
  
  // === ELEMENTOS ADICIONALES ===
  // Contenedor para el icono del botón
  iconContainer: {
    marginRight: 8,               // 8px de margen a la derecha para separar del texto
  },
  // Estilos para el spinner de carga
  loader: {
    marginRight: 8,               // 8px de margen a la derecha (mismo que icono)
  },
});
