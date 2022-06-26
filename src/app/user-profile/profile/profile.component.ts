import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TeacherAuthService } from 'src/app/service/teacher-auth.service';
import { GlobalService } from 'src/app/service/global.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	username = localStorage.getItem('name')
	user: any;
	isDisabled = true;
	// Pickedimage: string;

	constructor(private router: Router,
		private teacherService: TeacherAuthService,
		public global: GlobalService,
		private _snackBar: MatSnackBar,
		private dialogue: MatDialog) {

		this.teacherService.getUserById().subscribe(
			res => {
				this.user = res;
			});
	}
	ngOnInit(): void { }
	openDialogue() {
		this.dialogue.open(EditProfileComponent)
	}
	// PickedImage(event: Event) {
	// 	const file = (event.target as HTMLInputElement).files[0];
	// 	const reader = new FileReader();
	// 	reader.onload = () => {
	// 		this.Pickedimage = reader.result as string;
	// 	};
	// 	reader.readAsDataURL(file);
	// }

	deleteUser() {
		this.teacherService.deleteUser()
			.subscribe(
				res => {
					localStorage.removeItem('name');
					localStorage.removeItem("id");
					localStorage.removeItem("token");
					localStorage.removeItem("role");
					localStorage.setItem("isLoggedIn", "false");
					this._snackBar.open(" You account has been deleted", "Ok", {
						duration: 5000,
						panelClass: ['blue-snackbar']
					});
					this.router.navigate(["/authenticate/login"]);
				},
				err => {

					console.log(err);
					this._snackBar.open("Failed to delete account", "Ok", {
						duration: 5000,
						panelClass: ['blue-snackbar']
					});
				});
	}
}
