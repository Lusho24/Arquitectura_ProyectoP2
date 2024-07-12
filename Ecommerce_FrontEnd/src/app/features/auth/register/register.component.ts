import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  password: string = '';
  isOpen = true;
  passwordStrength: string = '';
  passwordMessage: string = '';

  private _registerForm: FormGroup = this._formBuilder.group({
    id: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    role: ['', Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,

    private _formBuilder: FormBuilder,
  ) { }

  // ** LOGICA DEL FORMULARIO** 
  /*saveUserForm(): void {

    if (this._signUpForm.get('role')?.value === "CREADOR_C") {
      let creator: CreatorModel = new CreatorModel;
      creator.id = this._signUpForm.get('id')?.value;
      creator.name = this._signUpForm.get('name')?.value;
      creator.email = this._signUpForm.get('email')?.value;
      creator.password = this.password;
      creator.role = this._signUpForm.get('role')?.value;

      this.creatorService.save(creator).subscribe({
        next: () => {
          this.snackBar.open("✅ Creador de contenido registrado correctamente", "Cerrar", {
            duration: 2500
          });
          this.dialogRef.close();
        },
        error: (error) => {
          this.snackBar.open("⛔ Ocurrió un error al registrarse como creador de contenido", "Cerrar", {
            duration: 2500
          });
          console.log(error);
        }
      });
    } else if (this._signUpForm.get('role')?.value === "CONSUMIDOR_C") {
      let user: UserModel = new UserModel;
      user.id = this._signUpForm.get('id')?.value;
      user.name = this._signUpForm.get('name')?.value;
      user.email = this._signUpForm.get('email')?.value;
      user.password = this.password;
      user.role = this._signUpForm.get('role')?.value;

      this.userService.save(user).subscribe({
        next: () => {
          this.snackBar.open("✅ Estudiante registrado correctamente", "Cerrar", {
            duration: 2500
          });
          this.dialogRef.close();
        },
        error: (error) => {
          this.snackBar.open("⛔ Ocurrió un error al registrarse como estudiante", "Cerrar", {
            duration: 2500
          });
          console.log(error);
        }
      });

    }

  }*/



  // ** VALIDACIONES DEL FORMULARIO **

  //Control de Seguridad de Contraseña
  checkPasswordStrength(): void {
    let regExpWeak = /^[a-z]+$/;
    let regExpMedium = /^(?=.*\d)(?=.*[a-zA-Z])/;
    let regExpStrong = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*?-~])/;

    if (this.password.length < 8 || regExpWeak.test(this.password)) {
      this.passwordStrength = 'weak';
      this.passwordMessage = 'Clave Débil';
    } else if (this.password.length >= 8 && this.password.length <= 12 && regExpMedium.test(this.password)) {
      this.passwordStrength = 'medium';
      this.passwordMessage = 'Clave Media';
    } else if (this.password.length > 12 && regExpStrong.test(this.password)) {
      this.passwordStrength = 'strong';
      this.passwordMessage = 'Clave Fuerte';
    } else {
      this.passwordStrength = '';
      this.passwordMessage = '';
    }
  }

  // Desactivación de las teclas especiales mencionadas abajo
  disallowSpecialCharacters(event: KeyboardEvent): void {
    const forbiddenCharacters = ['$', '%', '!', '&', '#', '/', '\\'];
    if (forbiddenCharacters.includes(event.key)) {
      event.preventDefault();
    }
  }

  // Impedir que se pueda pegar texto externo que contenga los caracteres especiales mencionados abajo
  handlePaste(event: ClipboardEvent): void {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData?.getData('text') || '';
    const forbiddenCharacters = ['$', '!', '%', '&', '#', '/', '\\'];

    for (const char of forbiddenCharacters) {
      if (pastedText.includes(char)) {
        event.preventDefault();
        return;
      }
    }
  }


  public get registerForm(): FormGroup {
    return this._registerForm;
  }
}
