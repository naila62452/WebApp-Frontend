import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomValidators } from 'src/_validator/password_validator';
import { TeacherAuthService } from 'src/app/service/teacher-auth.service';
import { PasswordStrengthValidator } from '../../../_validator/password-strength'
import { catchError, map, Observable } from 'rxjs';
import { UnauthorizedErrors } from 'src/_Error-handler/unauthorizedErrors';
import { SafeData } from 'src/app/_models/save-data-interface';
import { first } from 'rxjs/operators';

// import {
//   SocialAuthService,
//   GoogleLoginProvider,
//   SocialUser,
// } from 'angularx-social-login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, SafeData {

  // loginForm!: FormGroup;
  // passwordIsValid = false;
  // public socialUser: SocialUser = new SocialUser
  isLoggedin?: boolean;
  loading: boolean
  id: string;
  isAddMode: boolean;
  // loading = false;
  submitted = false;
  registerForm: any;
  user: any
  constructor(
    private formBuilder: FormBuilder,
    // private socialAuthService: SocialAuthService,
    private router: Router,
    private route: ActivatedRoute, private _snackBar: MatSnackBar,
    private teacherService: TeacherAuthService) { }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeReload(e: BeforeUnloadEvent) {
    e.stopPropagation();
    if (this.registerForm.dirty) {
      return (e.returnValue = 'Are you sure you want to exit?');
    }
    return true;
  }

  isDataSaved(): boolean {
    return this.registerForm.dirty;
  }

  // registerForm = new FormGroup({
  //   // email: new FormControl("", [Validators.required, Validators.email]),
  //   email: new FormControl('', {
  //     validators: [Validators.required, Validators.email],
  //     asyncValidators: this.uniqueEmailValidator(),
  //     updateOn: 'blur',
  //   }),
  //   name: new FormControl("", [Validators.required]),
  //   password: new FormControl("", [Validators.required, Validators.minLength(8)]),
  //   // password: new FormControl("", [Validators.required, Validators.minLength(8), PasswordStrengthValidator]),
  //   psw_repeat: new FormControl("", [Validators.required]),
  //   remember: new FormControl("", Validators.requiredTrue)
  // }, CustomValidators.checkPasswords
  // )

  uniqueEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      // console.log(control.value + ' naila')
      return this.teacherService.uniqueEmailCheck(control.value).pipe(
        map((res) => {
          let resEmail: string = res.email;
          let inputEmail: string = control.value;

          return (resEmail?.toLowerCase() === inputEmail?.toLowerCase() ? { emailExists: true } : null)
        }),
        catchError((err) => { console.log(err + 'i am error'); return null })
      )
    }
  }

  hide = true;
  get password() { return this.registerForm.get('password'); }
  get email() { return this.registerForm.get('email'); }
  get psw_repeat() { return this.registerForm.get('psw_repeat'); }

  // public onSubmit() {
  //   this.loading = true
  //   this.teacherService.registerUser(this.registerForm.value)
  //     .subscribe(
  //       data => {
  //         this._snackBar.open("Registered successfully, Please verify your Email and Login.", "Ok", {
  //           duration: 5000,
  //           panelClass: ['blue-snackbar']
  //         });
  //         this.loading = false;
  //         this.registerForm.reset();
  //         this.router.navigate(['/authenticate/login'], { relativeTo: this.route });

  //       },
  //       (err) => {
  //         if (err instanceof UnauthorizedErrors) {
  //           this._snackBar.open("There is already an account with this email, Please login.", "Ok", {
  //             duration: 5000,
  //             panelClass: ['blue-snackbar']
  //           });
  //           console.log(err)

  //           this.registerForm.reset();
  //         }
  //         else throw err;
  //       })
  // }
  // passwordValid(event: any) {
  //   this.passwordIsValid = event;
  // }
  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.isAddMode = !this.id;
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }
    this.registerForm = new FormGroup({
      index: new FormControl([{ value: null, disabled: true }]),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: this.uniqueEmailValidator(),
        updateOn: 'blur',
      }),
      name: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      psw_repeat: new FormControl("", [Validators.required]),
      remember: new FormControl("", Validators.requiredTrue)
    }, CustomValidators.checkPasswords
    )

    if (!this.isAddMode) {
      this.teacherService.getUserById().subscribe(
        res => {
          this.user = res;
          this.registerForm.patchValue({
            name: this.user.data.name,
            email: this.user.data.email
          })
          console.log(this.user.data)
        });
      // this.teacherService.getUserById()
      //   .pipe(first())
      //   .subscribe(x => this.registerForm.patchValue(x));
    }


    // this.loginForm = this.formBuilder.group({
    //   email: ['', Validators.required],
    //   password: ['', Validators.required],
    // });
    // this.socialAuthService.authState.subscribe((user) => {
    //   this.socialUser = user;
    //   this.isLoggedin = user != null;
    //   console.log(this.socialUser);
    // });
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this._snackBar.dismiss();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }
  private createUser() {
    this.teacherService.registerUser(this.registerForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this._snackBar.open("Registered successfully, Please verify your Email and Login.", "Ok", {
            duration: 5000,
            panelClass: ['blue-snackbar'],
          });
          // this.loading = false;
          this.registerForm.reset();
          this.router.navigate(['/authenticate/login'], { relativeTo: this.route });
          // this._snackBar.open('User added', { keepAfterRouteChange: true });
          // this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this._snackBar.open("Can not register" + error);
          this.loading = false;
        }
      });
  }

  private updateUser() {
    this.teacherService.updateUser(this.registerForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this._snackBar.open('User updated');
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: error => {
          this._snackBar.open('cant update' + (error));
          this.loading = false;
        }
      });
  }

  // loginWithGoogle(): void {
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
  //   .then(res => {
  //     console.log(res.idToken)
  //     this.teacherService.signInWithGoogle(res.idToken)
  //     .subscribe(data => {
  //       console.log(data)
  //     })
  //   })

  // }
  // logOut(): void {
  //   this.socialAuthService.signOut();
  // }
}