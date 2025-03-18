import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";  // importa RouterOutlet

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, NavbarComponent] // Asegúrate de importar RouterModule
  // Asegúrate de importar RouterModule
})
export class AppComponent {
  title = 'my-angular-app';
}
