import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from 'src/app/core/services/login/auth.service';
import { UserService } from 'src/app/core/services/login/user.service';
import { UserModel } from 'src/app/core/models/userModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  signInForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  openSignUp(): void {
    const dialogRef = this.dialog.open(RegisterComponent);
  }

  testUsers(): void {
    this.userService.findAll().subscribe({
      next: (respose) => {
        console.log("RESPUESTA: ", respose)
      },
      error: (error) => {
        console.log("ERROR: ", error)
      }
    });
  }

  loginTest(): void {
    var user: UserModel = {
      id: '1',
      idTienda: 1,
      name: 'Usuario Ejemplo',
      email: 'usuario@example.com',
      password: 'password123',
      address: '123 Calle Principal',
      phone: '123456789',
      roles: [
        { id: 1, name: 'Rol de Ejemplo' },
        { id: 2, name: 'Otro Rol' }
      ]
    };

    console.log("LOGIN USAURIO: ", user);

    this.authService.login(user).subscribe({
      next: (respose) => {
        console.log("RESPUESTA: ", respose)
      },
      error: (error) => {
        console.log("ERROR: ", error)
      }
    });

  }
}