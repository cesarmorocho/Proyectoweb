// === IMPORTACIÓN DE MODELOS ===
// Importamos los modelos individuales de Sequelize para establecer sus relaciones
const User = require('./users.models');        // Modelo de usuarios (personas registradas)
const Report = require('./reports.models');    // Modelo de reportes (incidentes reportados por usuarios)
const Incident = require('./incidents.models'); // Modelo de tipos de incidentes (categorías de problemas)

// === DEFINICIÓN DE RELACIONES ENTRE MODELOS ===
// Las relaciones definen cómo se conectan las tablas en la base de datos

// RELACIÓN 1: Usuario -> Reportes (UNO a MUCHOS)
// Un usuario puede crear múltiples reportes
User.hasMany(Report, { 
  foreignKey: 'userId',    // Campo en la tabla Report que referencia al User
  as: 'reports'           // Alias para acceder a los reportes de un usuario (user.reports)
});

// RELACIÓN 2: Tipo de Incidente -> Reportes (UNO a MUCHOS)  
// Un tipo de incidente puede tener múltiples reportes asociados
Incident.hasMany(Report, { 
  foreignKey: 'incidentTypeId',  // Campo en Report que referencia al tipo de incidente
  as: 'reports'                  // Alias para acceder a reportes de un tipo (incident.reports)
});

// RELACIÓN 3: Reporte -> Usuario (MUCHOS a UNO - inversa de la relación 1)
// Cada reporte pertenece a un usuario específico
Report.belongsTo(User, { 
  foreignKey: 'userId',    // Campo que conecta con la tabla User
  as: 'user'              // Alias para acceder al usuario de un reporte (report.user)
});

// RELACIÓN 4: Reporte -> Tipo de Incidente (MUCHOS a UNO - inversa de la relación 2)
// Cada reporte pertenece a un tipo de incidente específico
Report.belongsTo(Incident, { 
  foreignKey: 'incidentTypeId',  // Campo que conecta con la tabla Incident
  as: 'incident'                 // Alias para acceder al tipo de incidente (report.incident)
});

// === EXPORTACIÓN DE MODELOS CON RELACIONES ===
// Exportamos los modelos ya configurados con sus relaciones
// Esto permite importar los modelos en otros archivos con todas sus relaciones ya definidas
module.exports = { 
  User,      // Modelo de usuarios con relación a sus reportes
  Report,    // Modelo de reportes con relación a usuario y tipo de incidente
  Incident   // Modelo de tipos de incidentes con relación a sus reportes
};