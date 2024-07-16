import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from 'src/app/core/services/login/auth.service';
import { RoleModel, UserModel } from 'src/app/core/models/userModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private _signInForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this._signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  openSignUp(): void {
    const dialogRef = this.dialog.open(RegisterComponent);
  }

  signIn(): void {
    const user: UserModel = this._signInForm.value

    this.authService.login(user).subscribe({
      next: () => {
        const auxUser: UserModel | null = this.authService.getCurrentUser();
        const roles: RoleModel[] = auxUser?.roles!;

        const hasAdminRole = roles.some(role => role.name === 'ADMIN');
        const hasUserRole = roles.some(role => role.name === 'USER');

        if (hasAdminRole) {
          this.router.navigate(['/admin']);
        } else if (hasUserRole) {
          this.router.navigate(['/']);
        }

        this.snackBar.open(`✅ Bienvenido ${auxUser?.name}`, "Cerrar", {
          duration: 2500
        });

      },
      error: (error) => {
        this.snackBar.open("❌ Error al iniciar sesión", "Cerrar", {
          duration: 2500
        });
        console.log("ERROR: ", error);
      }
    });

  }


  // ** Getters del formulario y sus campos necesarios**
  public get signInForm(): FormGroup {
    return this._signInForm;
  }

  public get email() { return this._signInForm.get('email'); }
  public get password() { return this._signInForm.get('password'); }


}