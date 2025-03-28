export interface Task {
  id: number;             // ID generado automáticamente
  title: string;          // Título de la tarea
  description: string;    // Descripción de la tarea
  startDate: string;      // Fecha de inicio
  endDate: string;        // Fecha de finalización
  priority: string;       // Prioridad (baja, media, alta)
  assigneeId: number | null; 
  completed: number;     // Estado de la tarea (completada o no)
}