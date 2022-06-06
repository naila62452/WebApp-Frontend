// // // export class FullLayoutComponent implements OnInit {
// // //     constructor() {
// // //         localStorage.setItem('lastAction', Date.now().toString());
// // //     }
// // // }
// // //    }


// // import { Injectable } from "@angular/core";
// // import { Router } from '@angular/router'
// // // import {} from ''
// // // const store = require('store');

// // const MINUTES_UNITL_AUTO_LOGOUT = 1 // in mins
// // const CHECK_INTERVAL = 15000 // in ms
// // const STORE_KEY = 'lastAction';
// // @Injectable()
// // export class AutoLogoutService {
// //     public getLastAction() {
// //         return parseInt(localStorage.getItem(STORE_KEY));
// //     }
// //     public setLastAction(lastAction: number) {
// //         localStorage.setItem(STORE_KEY, lastAction.toString());
// //     }

// //     constructor(private router: Router) {
// //         console.log('object created');
// //         // this.auth = authService;
// //         this.check();
// //         this.initListener();
// //         this.initInterval();
// //         // localStorage.setItem(STORE_KEY,Date.now().toString());
// //     }

// //     initListener() {
// //         document.body.addEventListener('click', () => this.reset());
// //         document.body.addEventListener('mouseover', () => this.reset());
// //         document.body.addEventListener('mouseout', () => this.reset());
// //         document.body.addEventListener('keydown', () => this.reset());
// //         document.body.addEventListener('keyup', () => this.reset());
// //         document.body.addEventListener('keypress', () => this.reset());
// //     }

// //     reset() {
// //         this.setLastAction(Date.now());
// //     }

// //     initInterval() {
// //         setInterval(() => {
// //             this.check();
// //         }, CHECK_INTERVAL);
// //     }

// //     check() {
// //         const now = Date.now();
// //         const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
// //         const diff = timeleft - now;
// //         const isTimeout = diff < 0;

// //         // if (isTimeout && this.auth.loggedIn)
// //         if (isTimeout) {
// //             // alert('logout');
// //             localStorage.clear();
// //             this.router.navigate(['/authenticate/login']);
// //         }
// //     }
// // }

// import { Injectable, NgZone } from "@angular/core";
// import { Router } from "@angular/router";
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { environment } from "src/environments/environment";

// @Injectable({
//     providedIn: 'root'
// })
// export class AutoLogoutService {

//     //log off details
//     isLogin = false;

//     constructor(
//         private router: Router,
//         private _snackBar: MatSnackBar,
//         private ngZone: NgZone
//     ) {
//         if (this.isLoggedIn()) {
//             this.isLogin = true;
//         }
//         this.lastAction(Date.now());
//         this.check();
//         this.initListener();
//         this.initInterval();
//     }

//     /**
//      * last action
//      */
//     getLastAction() {
//         return localStorage.getItem('lastAction');
//     }

//     /**
//      * set last action
//      * @param value
//      */
//     lastAction(value: number) {
//         localStorage.setItem('lastAction', JSON.stringify(value))
//     }

//     /**
//      * start event listener
//      */
//     initListener() {
//         this.ngZone.runOutsideAngular(() => {
//             document.body.addEventListener('click', () => this.reset());
//         });
//     }

//     /**
//      * time interval
//      */
//     initInterval() {
//         this.ngZone.runOutsideAngular(() => {
//             setInterval(() => {
//                 this.check();
//             }, 1000);
//         })
//     }

//     /**
//      * reset timer
//      */
//     reset() {
//         this.lastAction(Date.now());
//     }

//     /**
//      * check timer
//      */
//     check() {
//         const now = Date.now();
//         const timeLeft = parseInt(this.getLastAction()) + (1) * 60 * 1000;
//         const diff = timeLeft - now;
//         const isTimeout = diff < 0;
//         //this.isLoggedIn.subscribe(event => this.isLogin = event);
//         this.ngZone.run(() => {
//             if (isTimeout && this.isLogin) {
//                 localStorage.removeItem('id');
//                 localStorage.removeItem('lastAction');
//                 localStorage.removeItem('name');
//                 localStorage.removeItem('token');
//                 localStorage.setItem('isLoggedIn', 'false');
//                 setTimeout(() => {
//                     console.log("Your Session Expired due to longer Inactivity, Login Again To Continue");
//                 }, 10000);
//                 this.router.navigate(['/authenticate/login']);
//             }
//         });
//     }

//     /**
//      *check if a user is logged in
//      */
//     isLoggedIn() {
//         var loginStatus = localStorage.getItem("isLoggedIn")
//         return loginStatus == "true";
//     }
// }
