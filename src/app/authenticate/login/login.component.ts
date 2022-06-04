import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TeacherAuthService } from 'src/app/service/teacher-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { APPErrors } from 'src/_Error-handler/appError';
import { NotFoundError } from 'src/_Error-handler/notFoundError';
import { UnauthorizedErrors } from 'src/_Error-handler/unauthorizedErrors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading: boolean

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [
      Validators.required,
    ]),
    password: new FormControl("",
      [Validators.required])
  });
  constructor(private teacherService: TeacherAuthService,
    private _snackBar: MatSnackBar, private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.loading = true
    this.teacherService.loginUser(this.loginForm.value, true)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('name', res.user.name);
          localStorage.setItem('id', res.user._id);
          localStorage.setItem("isLoggedIn", "true");
          console.log(res)
          this._snackBar.open("You have logged in successfully", "Ok", {
            duration: 5000,
            panelClass: ['blue-snackbar']
          });
          this.loading = false;
          this.loginForm.reset();
          this.router.navigate(['/user/profile']);
        },
        (err: APPErrors) => {
          if (err instanceof NotFoundError) {
            this._snackBar.open("No user associated with this email", "Ok", {
              duration: 5000,
              panelClass: ['blue-snackbar']
            });
          }
          else if (err instanceof UnauthorizedErrors) {
            this._snackBar.open("Incorrect Email or Password", "Ok", {
              duration: 5000,
              panelClass: ['blue-snackbar']
            });
          }
          else throw err;
            // else
            // this._snackBar.open("An unexpected Error Occured", "Ok", {
            //   duration: 5000,
            //   panelClass: ['blue-snackbar']
            // });
        })
  }
  hide = true;
  get passwordInput() {
    return this.loginForm.get('password');
  }
}
   // if (res.user.isVerified == true) {
          //   localStorage.setItem('token', res.token);
          //   localStorage.setItem('name', res.user.name);
          //   localStorage.setItem('id', res.user._id);
          //   localStorage.setItem("isLoggedIn", "true");

          //   this._snackBar.open("You have logged in successfully", "Ok", {
          //     duration: 5000,
          //     panelClass: ['blue-snackbar']
          //   });
          //   this.loginForm.reset();
          //   this.router.navigate(['/user/profile']);
          // }
          // else {
          //   this._snackBar.open("Please verify your email first", "Ok", {
          //     duration: 5000,
          //     panelClass: ['blue-snackbar']
          //   });
          // }