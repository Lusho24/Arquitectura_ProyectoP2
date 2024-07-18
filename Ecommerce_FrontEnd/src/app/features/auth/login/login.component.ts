import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from 'src/app/core/services/login/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoleModel, UserModel } from 'src/app/core/models/login/userModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private _signInForm: FormGroup;
  isLoading = false;

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

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      const auxUser: UserModel = this.authService.getCurrentUser()!;
      const roles: RoleModel[] = auxUser?.roles!;

      const hasAdminRole = roles.some(role => role.name === 'ADMIN');
      const hasUserRole = roles.some(role => role.name === 'USER')

      if (hasAdminRole) {
        this.router.navigate(['/admin']);
        this.isLoading = false;
      } else if (hasUserRole) {
        this.router.navigate(['/']);
        this.isLoading = false;
      }
    }
    
  }

  openSignUp(): void {
    const dialogRef = this.dialog.open(RegisterComponent);
  }

  signIn(): void {
    this.isLoading = true;
    const user: UserModel = this._signInForm.value

    this.authService.login(user).subscribe({
      next: () => {
        const auxUser: UserModel | null = this.authService.getCurrentUser();
        const roles: RoleModel[] = auxUser?.roles!;

        const hasAdminRole = roles.some(role => role.name === 'ADMIN');
        const hasUserRole = roles.some(role => role.name === 'USER');

        if (hasAdminRole) {
          this.router.navigate(['/admin']);
          this.isLoading = false;
        } else if (hasUserRole) {
          this.router.navigate(['/']);
          this.isLoading = false;
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
        this.isLoading = false;
      },
    });

  }


  // ** Getters del formulario y sus campos necesarios**
  public get signInForm(): FormGroup {
    return this._signInForm;
  }

  public get email() { return this._signInForm.get('email'); }
  public get password() { return this._signInForm.get('password'); }

}