import { Component, OnInit } from '@angular/core'; //por defecto

import { ServiceService } from '../../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  public usuarios: any[] = [];
  public email: string = '';
  public pass: string = '';
  public showPassword: boolean = false;

  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.service.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
        console.log(this.usuarios);
      },
      (error) => {
        console.error('Error loading usuarios', error);
      }
    );
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  iniciarSesion() {
    const usuarioEncontrado = this.usuarios.find(
      (usuario) =>
        usuario.email === this.email && usuario.password === this.pass
    );

    if (usuarioEncontrado) {
      this.router.navigate(['/home']);
    } else {
      alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  }
}