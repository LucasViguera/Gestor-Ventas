import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';  // Asegúrate de que este servicio esté correctamente importado
import { UserService } from '../../services/user.service';  // Asegúrate de que el servicio de usuarios esté importado
import { Task } from '../../models/task.model';  // Asegúrate de tener una interfaz de Task para tipado correcto


import { format } from 'date-fns'; 

@Component({
  selector: 'app-task',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],  // Asegúrate de incluir la hoja de estilos si la tienes
  standalone: true,
  imports: [CommonModule],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];  // Aquí se almacenarán las tareas obtenidas del backend
  users: any[] = [];  // Aquí almacenaremos los usuarios
  errorMessage: string | null = null;  // Para manejar posibles errores

  constructor(private taskService: TaskService, private userService: UserService) {}

  ngOnInit(): void {
    // Al inicializar el componente, obtenemos las tareas y los usuarios
    this.getTasks();
    this.getUsers();
  }

  // Método para obtener las tareas desde el servicio
  getTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;  // Asignamos las tareas obtenidas a la variable 'tasks'
      },
      error: (error: any) => {
        console.error('Error al obtener tareas:', error);
        this.errorMessage = 'Hubo un problema al cargar las tareas.';
      }
    });
  }

  // Método para obtener los usuarios desde el servicio
  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users: any[]) => {
        this.users = users;  // Asignamos los usuarios obtenidos a la variable 'users'
      },
      error: (error: any) => {
        console.error('Error al obtener usuarios:', error);
        this.errorMessage = 'Hubo un problema al cargar los usuarios.';
      }
    });
  }

  // Método para obtener el nombre de usuario a partir del assigneeId
  getUsername(assigneeId: number | null): string {
    if (assigneeId === null) {
      return 'No asignado';  // Si no hay un usuario asignado, retornamos 'No asignado'
    }
    const user = this.users.find((user: { id: number; }) => user.id === assigneeId);
    return user ? user.username : 'Usuario no encontrado';  // Si encontramos el usuario, mostramos su nombre, sino, mostramos 'Usuario no encontrado'
  }

  // Eliminar tarea
  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        // Actualiza la lista después de eliminar la tarea
        this.tasks = this.tasks.filter(task => task.id !== taskId);
      },
      error: (error: any) => {
        console.error('Error al eliminar tarea:', error);
        this.errorMessage = 'Hubo un problema al eliminar la tarea.';
      }
    });
  }

  // Cambiar estado de completado
  toggleCompletion(taskId: number): void {
    const task = this.tasks.find(task => task.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.taskService.updateTask(task).subscribe({
        next: (updatedTask) => {
          console.log('Tarea actualizada:', updatedTask);
        },
        error: (error: any) => {
          console.error('Error al actualizar tarea:', error);
        }
      });
    }
  }

  // Método para editar una tarea
  editTask(task: Task): void {
    console.log('Editar tarea:', task);
  }

  // Cambiar estado de completado
  markComplete(task: Task): void {
    // Cambia el estado de completado de la tarea
    task.completed = !task.completed;

    // Llamamos al servicio para actualizar la tarea en el backend
    this.taskService.updateTask(task).subscribe({
      next: (updatedTask: Task) => {
        console.log('Tarea actualizada:', updatedTask);
        // Si es necesario, actualiza alguna otra parte del UI, o agrega lógica adicional aquí.
      },
      error: (error: any) => {
        console.error('Error al actualizar tarea:', error);
        // Si ocurre un error, podrías mostrar un mensaje en el UI o revertir el cambio realizado.
      }
    });
  }
}
