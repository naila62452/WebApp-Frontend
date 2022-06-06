
// import { Injectable } from "@angular/core";
// import { Router } from '@angular/router'
// // import {} from ''
// // const store = require('store');
// import { MatSnackBar } from '@angular/material/snack-bar';

// const MINUTES_UNITL_AUTO_LOGOUT = 1440 // in mins
// const CHECK_INTERVAL = 1000 // in ms
// const STORE_KEY = 'token';
// @Injectable()
// export class AutoLogoutService {
//     public getLastAction() {
//         return parseInt(localStorage.getItem('token'));
//     }
//     public setLastAction(lastAction: number) {
//         localStorage.setItem(STORE_KEY, lastAction.toString());
//     }

//     constructor(private router: Router,
//         private _snackBar: MatSnackBar
//         ) {
//         console.log('object created');
//         // this.auth = authService;
//         this.check();
//         // this.initListener();
//         this.initInterval();
//         this.lastAction(Date.now());
//         // localStorage.setItem(STORE_KEY,Date.now().toString());
//     }

//     // initListener() {
//     //     document.body.addEventListener('click', () => this.reset());
//     //     document.body.addEventListener('mouseover', () => this.reset());
//     //     document.body.addEventListener('mouseout', () => this.reset());
//     //     document.body.addEventListener('keydown', () => this.reset());
//     //     document.body.addEventListener('keyup', () => this.reset());
//     //     document.body.addEventListener('keypress', () => this.reset());
//     // }

//     // reset() {
//     //     this.setLastAction(Date.now());
//     // }

//     lastAction(value: number) {
//         localStorage.setItem('lastAction', JSON.stringify(value))
//     }

//     initInterval() {
//         setInterval(() => {
//             this.check();
//         }, CHECK_INTERVAL);
//     }

//     check() {
//         const now = Date.now();
//         const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
//         const diff = timeleft - now;
//         const isTimeout = diff < 0;

//         // if (isTimeout && this.auth.loggedIn)
//         if (isTimeout) {
//             // alert('logout');
//             // localStorage.clear();
//             localStorage.removeItem('id');
//             localStorage.removeItem('lastAction');
//             localStorage.removeItem('name');
//             localStorage.removeItem('token');
//             localStorage.setItem('isLoggedIn', 'false');
//             setTimeout(() => {
//                 console.log("Your Session Expired due to longer Inactivity, Login Again To Continue");
//             }, 10000);
//             this._snackBar.open("Your Session Expired due to longer Inactivity, Login Again To Continue", "Ok", {
//                 duration: 5000,
//                 panelClass: ['blue-snackbar']
//             })
//             this.router.navigate(['/authenticate/login']);
//         }
//     }
// }