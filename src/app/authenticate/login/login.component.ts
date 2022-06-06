import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [
      Validators.required,
    ]),
    password: new FormControl("",
      [Validators.required])
  });

  token: any;
  hide = true;
  loading: boolean
  private tokenTimer: any;

  constructor(private teacherService: TeacherAuthService,
    private _snackBar: MatSnackBar, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true
    this.teacherService.loginUser(this.loginForm.value, true)
      .subscribe(
        res => {
          const token = res.token;
          this.token = token
          if (token) {
            const expiresInDuration = res.expiresIn;
            this.setAuthTimer(expiresInDuration);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            this.saveAuthData(token, expirationDate, res.user.name, res.user._id, res.user.role);
          }
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
        })
  }
  // onSubmit() {
  //   this.loading = true
  //   this.teacherService.loginUser(this.loginForm.value, true)
  //     .subscribe(
  //       res => {
  //         localStorage.setItem('token', res.token);
  //         localStorage.setItem('name', res.user.name);
  //         localStorage.setItem('id', res.user._id);
  //         localStorage.setItem('isLoggedIn', 'true');
  //         console.log(res)
  //         this._snackBar.open("You have logged in successfully", "Ok", {
  //           duration: 5000,
  //           panelClass: ['blue-snackbar']
  //         });
  //         this.loading = false;
  //         this.loginForm.reset();
  //         this.router.navigate(['/user/profile']);
  //       },
  //       (err: APPErrors) => {
  //         if (err instanceof NotFoundError) {
  //           this._snackBar.open("No user associated with this email", "Ok", {
  //             duration: 5000,
  //             panelClass: ['blue-snackbar']
  //           });
  //         }
  //         else if (err instanceof UnauthorizedErrors) {
  //           this._snackBar.open("Incorrect Email or Password", "Ok", {
  //             duration: 5000,
  //             panelClass: ['blue-snackbar']
  //           });
  //         }
  //         else throw err;
  //       })
  // }

  onLogout() {
    this.teacherService.onLogout()
    // this.router.navigate(["/authenticate/login"]);
    clearTimeout(this.tokenTimer);
  }

  private saveAuthData(token: string, expirationDate: Date, name: string, _id: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('name', name);
    localStorage.setItem('id', _id);
    localStorage.setItem("isLoggedIn", "true");
  }

  // private clearAuthData() {
  //   localStorage.removeItem('id');
  //   localStorage.removeItem('name');
  //   localStorage.removeItem("token");
  //   localStorage.removeItem('role');
  //   localStorage.setItem('isLoggedIn', 'false');
  //   localStorage.removeItem("expiration");
  // }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    const now = new Date();
    const expiresInDuration = authInformation.expirationDate.getTime() - now.getTime();

    if (expiresInDuration > 0) {
      this.token = authInformation.token;
      this.setAuthTimer(expiresInDuration / 1000);
    }
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return null;
    }
    else return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.onLogout();
    }, duration * 1000);
  }

  rememberMe() {
    // localStorage.getItem('token');
    // localStorage.getItem('name');

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