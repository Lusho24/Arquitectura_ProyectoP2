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
  private _signInForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {
    this._signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  openSignUp(): void {
    const dialogRef = this.dialog.open(RegisterComponent);
  }

  signIn():void{
    const user: UserModel = this._signInForm.value

    this.authService.login(user).subscribe({
      next: (respose) => {
        console.log("USUARIO ACEPTADO", respose)
      },
      error: (error) => {
        console.log("ERROR: ", error)
      }
    });
    
  }

  
  public get signInForm(): FormGroup {
    return this._signInForm;
  }

  public get email() { return this._signInForm.get('email'); }
  public get password() { return this._signInForm.get('password'); }

}