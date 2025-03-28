import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // URL base de la API (ajústala a la correcta)
  private apiUrl = 'http://localhost:3000/users';  

  constructor(private http: HttpClient) { }

  // Método para obtener todos los usuarios con sus tareas
  getUsers(): Observable<any[]> {
    const headers = this.getAuthHeaders();  // Obtener cabeceras de autenticación
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Método para eliminar un usuario
  deleteUser(userId: number): Observable<any> {
    const headers = this.getAuthHeaders();  // Reutilizando getAuthHeaders()
    // Cambié la URL para que coincida con el endpoint del backend
    return this.http.delete(`${this.apiUrl}/delete/${userId}`, { headers });
  }

  // Método para editar un usuario
  updateUser(userId: number, updatedData: any): Observable<any> {
    const headers = this.getAuthHeaders();  // Obtener cabeceras de autenticación
    const updateUrl = `${this.apiUrl}/${userId}`;
    return this.http.put<any>(updateUrl, updatedData, { headers });
  }

  // Método privado para obtener las cabeceras con el token de autenticación
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token de autenticación no encontrado');
      throw new Error('Token de autenticación no encontrado');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
