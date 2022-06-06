import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherAuthService } from 'src/app/service/teacher-auth.service';
import { GlobalService } from 'src/app/service/global.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
// import { AutoLogoutService } from 'src/app/service/auto-logout-service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
	// providers: [AutoLogoutService]
})
export class ProfileComponent implements OnInit {

	username = localStorage.getItem('name')
	selectedFiles: FileList | any = null;
	name: string | null;
	currentFile: File | any = null;
	progress = 0;
	message = '';
	fileInfos: any
	user: any;
	updatedUser: any;
	isDisabled = true;

	// image = 'http://localhost:5000/api/image/files/' + localStorage.getItem('id')

	public updateForm: FormGroup = new FormGroup({
		name: new FormControl('', [
			Validators.required,
		]),
		email: new FormControl({ value: '', disabled: this.isDisabled }, [
			Validators.required,
		]),
	});
	constructor(private router: Router,
		private route: ActivatedRoute,
		private teacherService: TeacherAuthService,
		public global: GlobalService,
		private _snackBar: MatSnackBar) {
		// private autoLogoutService: AutoLogoutService) {

		// localStorage.setItem('lastAction', Date.now().toString());

		this.teacherService.getUserById().subscribe(
			res => {
				this.user = res;
				this.updateForm.patchValue({
					name: this.user.data.name,
					email: this.user.data.email
				})
			});
	}
	ngOnInit(): void {
		localStorage.setItem('lastAction', Date.now().toString());
		// this.getImage()
		this.fileInfos = this.teacherService.getAllFiles();
	}
	getImage() {
		this.teacherService.getFilesByName()
			.subscribe(res => {
				// debugger
				const file = new Blob([res.blob]);
				this.fileInfos = URL.createObjectURL(file);
				// debugger
			})
	}
	onLogout() {
		this.teacherService.onLogout()
		// this.router.navigate(["/authenticate/login"]);
	}

	openMenu() {
		var element = document.getElementById("menu3");
		element?.classList.toggle("showMenu1");
	}

	deleteUser() {
		this.teacherService.deleteUser()
			.subscribe(
				res => {
					localStorage.removeItem('name');
					localStorage.removeItem('email');
					this._snackBar.open(" You account has been deleted", "Ok", {
						duration: 5000,
						panelClass: ['blue-snackbar']
					});
					localStorage.removeItem("id");
					localStorage.removeItem("token");
					localStorage.setItem("isLoggedIn", "false");
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

	updateUser() {
		let body = this.updateForm.value;
		this.teacherService.updateUser(body).subscribe(
			res => {
				this.updatedUser = res;
				localStorage.setItem('name', this.updatedUser.data.name);
				this.updateForm.patchValue({
					name: this.updatedUser.data.name,
					// email: this.updatedUser.data.email,
				})
				this.user = this.updateForm.value;
				console.log(this.user);
				this._snackBar.open(" You profile has been updated", "Ok", {
					duration: 5000,
					panelClass: ['blue-snackbar']
				});
				window.location.reload();
			},
			(err: any) => {
				this._snackBar.open("Failed to update account", "Ok", {
					duration: 5000,
					panelClass: ['blue-snackbar']
				});
				this.router.navigate(['/user/profile']);
			});
	}

	// processFile(event: any) {
	// 	let reader = new FileReader();
	// 	reader.onload = function () {
	// 		let output: any = document.getElementById('blah');
	// 		output.src = reader.result;
	// 	}
	// 	if (event.target.files[0]) {
	// 		reader.readAsDataURL(event.target.files[0]);
	// 	}
	// }

	selectFile(event: any) {
		this.selectedFiles = event.target.files;
	}

	upload() {
		this.progress = 0;
		this.currentFile = this.selectedFiles.item(0);
		this.teacherService.upload(this.currentFile).subscribe(
			res => {
				this.ngOnInit()
				if (res.type === HttpEventType.UploadProgress) {
					window.location.reload();
					if (res.total) {
						const total: number = res.total
						this.progress = Math.round(100 * res.loaded / total);
					}
				} else if (res instanceof HttpResponse) {
					this.message = res.body.message;
					this.fileInfos = this.teacherService.getAllFiles();
				}
			},
			(err: Response) => {
				this.progress = 0;
				this.message = 'Could not upload the file!';
				this.currentFile = undefined;
			});
		this.selectedFiles = undefined;
	}
}
