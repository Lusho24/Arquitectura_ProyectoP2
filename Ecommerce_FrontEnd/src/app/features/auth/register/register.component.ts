import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateUserModel } from 'src/app/core/models/login/createUserModel';
import { UserService } from 'src/app/core/services/login/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  passwordStrength: string = '';
  passwordMessage: string = '';
  isLoading = false;  

  private _registerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {
    this._registerForm = this._formBuilder.group({
      id: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      name: ['', [Validators.required, Validators.maxLength(32)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(32), this.emailDomainValidator]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      address: ['', [Validators.required, Validators.maxLength(64)]],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      //role: ['', Validators.required]
    });
   }

  // ** LOGICA DEL FORMULARIO ** 
  saveUserForm(): void {
    this.isLoading = true;
    const user: CreateUserModel = this._registerForm.value;
    user.idTienda = 1;
    user.roles = ['USER'];

    this.userService.save(user).subscribe({
      next: () =>{
        this.snackBar.open("✅ Usuario registrado correctamente", "Cerrar", {
          duration: 3000
        });
        this.dialogRef.close();
        this.isLoading = false;
      },
      error: (error) => {
        this.snackBar.open(`⛔ ${error.error.message}`, "Cerrar", {
          duration: 3000
        });
        console.log(error);
        this.isLoading = false;
      }
    });

  }


  // ** VALIDACIONES DEL FORMULARIO **

  //solo numeros
  allowNumbersOnly(event: KeyboardEvent): void {
    const invalidChars = /[^0-9]/g;
    if (invalidChars.test(event.key)) {
      event.preventDefault();
    }
  }
  //validacion de correo
  emailDomainValidator(control: AbstractControl): ValidationErrors | null {
    const email: string = control.value;
    const allowedDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'espe.edu.ec']; // Lista de dominios permitidos
    if (email) {
      const domain = email.substring(email.lastIndexOf('@') + 1);
      if (!allowedDomains.includes(domain)) {
        return { 'emailDomain': true };
      }
    }
    return null;
  }

  //Control de Seguridad de Contraseña
  checkPasswordStrength(): void {
    const passwordValue = this._registerForm.get('password')?.value;

    let regExpWeak = /^[a-z]+$/;
    let regExpMedium = /^(?=.*\d)(?=.*[a-zA-Z])/;
    let regExpStrong = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*?-~])/;

    if (passwordValue.length < 8 || regExpWeak.test(passwordValue)) {
      this.passwordStrength = 'weak';
      this.passwordMessage = 'Clave Débil';
    } else if (passwordValue.length >= 8 && passwordValue.length <= 12 && regExpMedium.test(passwordValue)) {
      this.passwordStrength = 'medium';
      this.passwordMessage = 'Clave Media';
    } else if (passwordValue.length > 12 && regExpStrong.test(passwordValue)) {
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

  //solo letras
  allowLettersOnly(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
      event.preventDefault();
    }
  }

  // ** Getters del formulario y sus campos necesarios**
  public get registerForm(): FormGroup {
    return this._registerForm;
  }

  public get id() { return this._registerForm.get('id'); }
  public get name() { return this._registerForm.get('name'); }
  public get email() { return this._registerForm.get('email'); }
  public get address() { return this._registerForm.get('address'); }
  public get phone() { return this._registerForm.get('phone'); }
  public get password() { return this._registerForm.get('password'); }
  //public get role() { return this._registerForm.get('role'); }

}
