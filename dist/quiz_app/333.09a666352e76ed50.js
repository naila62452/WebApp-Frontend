"use strict";(self.webpackChunkquiz_app=self.webpackChunkquiz_app||[]).push([[333],{6532:(z,u,r)=>{r.r(u),r.d(u,{UserProfileModule:()=>Q});var l=r(9808),m=r(6030),a=r(3075),s=r(1083),e=r(5e3),g=r(8213);function f(t,i){1&t&&(e.TgZ(0,"span",19),e._uU(1,"science"),e.qZA())}function h(t,i){1&t&&(e.TgZ(0,"span",20),e._uU(1,"calculate"),e.qZA())}function Z(t,i){1&t&&(e.TgZ(0,"span",21),e._uU(1,"history"),e.qZA())}function _(t,i){1&t&&(e.TgZ(0,"span",22),e._uU(1,"business_center"),e.qZA())}function b(t,i){1&t&&(e.TgZ(0,"span",23),e._uU(1,"computer"),e.qZA())}function v(t,i){1&t&&(e.TgZ(0,"span",24),e._uU(1,"language"),e.qZA())}function A(t,i){1&t&&(e.TgZ(0,"span",25),e._uU(1,"biotech "),e.qZA())}function T(t,i){1&t&&(e.TgZ(0,"span",26),e._uU(1,"architecture "),e.qZA())}function y(t,i){1&t&&(e.TgZ(0,"span",27),e._uU(1,"bar_chart"),e.qZA())}function I(t,i){1&t&&(e.TgZ(0,"span",28),e._uU(1,"psychology"),e.qZA())}function C(t,i){1&t&&(e.TgZ(0,"span",29),e._uU(1,"design_services"),e.qZA())}const q=function(t){return["/material/topic/",t]};function U(t,i){if(1&t&&(e.TgZ(0,"div",5),e.TgZ(1,"div",6),e.TgZ(2,"span",7),e._uU(3),e.qZA(),e.YNc(4,f,2,0,"span",8),e.YNc(5,h,2,0,"span",9),e.YNc(6,Z,2,0,"span",10),e.YNc(7,_,2,0,"span",11),e.YNc(8,b,2,0,"span",12),e.YNc(9,v,2,0,"span",13),e.YNc(10,A,2,0,"span",14),e.YNc(11,T,2,0,"span",15),e.YNc(12,y,2,0,"span",16),e.YNc(13,I,2,0,"span",17),e.YNc(14,C,2,0,"span",18),e.qZA(),e.qZA()),2&t){const n=i.$implicit,o=i.index;e.xp6(2),e.Q6J("routerLink",e.VKq(13,q,n._id)),e.xp6(1),e.Oqu(n.subject),e.xp6(1),e.Q6J("ngIf",0==o),e.xp6(1),e.Q6J("ngIf",1==o),e.xp6(1),e.Q6J("ngIf",2==o),e.xp6(1),e.Q6J("ngIf",3==o),e.xp6(1),e.Q6J("ngIf",4==o),e.xp6(1),e.Q6J("ngIf",5==o),e.xp6(1),e.Q6J("ngIf",6==o),e.xp6(1),e.Q6J("ngIf",7==o),e.xp6(1),e.Q6J("ngIf",8==o),e.xp6(1),e.Q6J("ngIf",9==o),e.xp6(1),e.Q6J("ngIf",10==o)}}let M=(()=>{class t{constructor(n,o){this.route=n,this.typeService=o,this.activityForm=new a.cw({subject:new a.NI("",[a.kI.required]),ageGroup:new a.NI("",[a.kI.required]),language:new a.NI("",[a.kI.required]),activities:new a.NI("",[a.kI.required]),topic:new a.NI("",[a.kI.required])}),this.subject=[],this.type=[],this.isSubjectSelected=!1,this.isLangSelected=!1}ngOnInit(){this.typeService.getSubject().subscribe(n=>{this.subject=n,console.log(n)}),this.topicId=this.route.snapshot.paramMap.get("id"),localStorage.setItem("topicId",this.topicId),console.log(localStorage.getItem("topicId")),this.typeService.getQuestionType().subscribe(n=>{this.type=n,console.log(n)})}onSubmit(){}onSubjectSelection(n){var o;null===(o=this.activityForm.get("ageGroup"))||void 0===o||o.enable(),this.isSubjectSelected=null!=n}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(s.gz),e.Y36(g.n))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-add-material"]],decls:13,vars:1,consts:[[1,"main"],[1,"container-fluid"],[1,"home"],[1,"home__step"],["class","home__circle",4,"ngFor","ngForOf"],[1,"home__circle"],[1,"pointer"],[3,"routerLink"],["class","material-icons","style","color: red;",4,"ngIf"],["class","material-icons","style","color: blue;",4,"ngIf"],["class","material-icons","style","color: brown;",4,"ngIf"],["class","material-icons","style","color: #f49b29;",4,"ngIf"],["class","material-icons","style","color: green;",4,"ngIf"],["class","material-icons","style","color: yellow;",4,"ngIf"],["class","material-icons","style","color: purple;",4,"ngIf"],["class","material-icons","style","color: black;",4,"ngIf"],["class","material-icons","style","color: #bfd131;",4,"ngIf"],["class","material-icons","style","color: lightseagreen;",4,"ngIf"],["class","material-icons","style","color: palevioletred;",4,"ngIf"],[1,"material-icons",2,"color","red"],[1,"material-icons",2,"color","blue"],[1,"material-icons",2,"color","brown"],[1,"material-icons",2,"color","#f49b29"],[1,"material-icons",2,"color","green"],[1,"material-icons",2,"color","yellow"],[1,"material-icons",2,"color","purple"],[1,"material-icons",2,"color","black"],[1,"material-icons",2,"color","#bfd131"],[1,"material-icons",2,"color","lightseagreen"],[1,"material-icons",2,"color","palevioletred"]],template:function(n,o){1&n&&(e.TgZ(0,"div",0),e.TgZ(1,"h2"),e._uU(2,"Create different kind of material with the help of seeds."),e.qZA(),e.TgZ(3,"p"),e._uU(4,"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."),e.qZA(),e.TgZ(5,"h2"),e._uU(6,"Let's get started!"),e.qZA(),e.TgZ(7,"div",1),e.TgZ(8,"div",2),e.TgZ(9,"div",3),e.YNc(10,U,15,15,"div",4),e.qZA(),e.qZA(),e._UZ(11,"br"),e._UZ(12,"br"),e.qZA(),e.qZA()),2&n&&(e.xp6(10),e.Q6J("ngForOf",o.subject))},directives:[l.sg,s.rH,l.O5],styles:[".main[_ngcontent-%COMP%]{margin:4rem 5rem 8rem}.theme-select-full[_ngcontent-%COMP%]{width:100%;margin-bottom:1rem}.theme-select-full[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{width:100%}.theme-select-full[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]   .mat-form-field-wrapper[_ngcontent-%COMP%]{margin-bottom:0}.theme-select-full[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]   .mat-form-field-wrapper[_ngcontent-%COMP%]   .mat-form-field-flex[_ngcontent-%COMP%]{padding:.8rem;border-radius:1rem}.theme-select-full[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]   .mat-form-field-wrapper[_ngcontent-%COMP%]   .mat-form-field-flex[_ngcontent-%COMP%]   .mat-select-trigger[_ngcontent-%COMP%]{width:100%}.theme-select-full[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]   .mat-form-field-wrapper[_ngcontent-%COMP%]   .mat-form-field-flex[_ngcontent-%COMP%]   .mat-select-trigger[_ngcontent-%COMP%]   .mat-select-arrow-wrapper[_ngcontent-%COMP%]{position:absolute;top:50%;right:0;display:block;left:auto}"]}),t})();var p=r(520),P=r(4653),k=r(9472),x=r(1271),O=r(7423),S=r(7322),F=r(7531);const w=function(t){return{width:t}};function N(t,i){if(1&t&&(e.TgZ(0,"div",41),e.TgZ(1,"div",42),e._uU(2),e.qZA(),e.qZA()),2&t){const n=e.oxw();e.xp6(1),e.Q6J("ngStyle",e.VKq(3,w,n.progress+"%")),e.uIk("aria-valuenow",n.progress),e.xp6(1),e.hij(" ",n.progress,"% ")}}function J(t,i){if(1&t&&(e.TgZ(0,"ul",43),e.TgZ(1,"li",44),e.TgZ(2,"a",45),e._uU(3),e.qZA(),e.qZA(),e.qZA()),2&t){const n=i.$implicit;e.xp6(2),e.s9C("href",n.url,e.LSH),e.xp6(1),e.Oqu(n.name)}}const L=[{path:"profile",component:(()=>{class t{constructor(n,o,c,d,j){this.router=n,this.route=o,this.teacherService=c,this.global=d,this._snackBar=j,this.selectedFiles=null,this.currentFile=null,this.progress=0,this.message="",this.updateForm=new a.cw({name:new a.NI("",[a.kI.required]),email:new a.NI("",[a.kI.required])}),this.teacherService.getUserById().subscribe(B=>{this.user=B,this.updateForm.patchValue({name:this.user.data.name,email:this.user.data.email})})}ngOnInit(){this.fileInfos=this.teacherService.getAllFiles()}getImage(){this.teacherService.getFilesByName().subscribe(n=>{const o=new Blob([n.blob]);this.fileInfos=URL.createObjectURL(o)})}onLogout(){localStorage.removeItem("id"),localStorage.removeItem("name"),localStorage.removeItem("token"),localStorage.setItem("isLoggedIn","false"),this.router.navigate(["/authenticate/login"])}openMenu(){var n=document.getElementById("menu3");null==n||n.classList.toggle("showMenu1")}deleteUser(){this.teacherService.deleteUser().subscribe(n=>{localStorage.removeItem("name"),localStorage.removeItem("email"),this._snackBar.open(" You account has been deleted","Ok",{duration:5e3,panelClass:["blue-snackbar"]}),localStorage.removeItem("id"),localStorage.removeItem("token"),localStorage.setItem("isLoggedIn","false"),this.router.navigate(["/authenticate/login"])},n=>{console.log(n),this._snackBar.open("Failed to delete account","Ok",{duration:5e3,panelClass:["blue-snackbar"]})})}updateUser(){this.teacherService.updateUser(this.updateForm.value).subscribe(o=>{this.updatedUser=o,localStorage.setItem("name",this.updatedUser.data.name),this.updateForm.patchValue({name:this.updatedUser.data.name,email:this.user.data.email}),this.user=this.updateForm.value,console.log(this.user),this._snackBar.open(" You profile has been updated","Ok",{duration:5e3,panelClass:["blue-snackbar"]})},o=>{this._snackBar.open("Failed to update account","Ok",{duration:5e3,panelClass:["blue-snackbar"]}),this.router.navigate(["/user/profile"])})}selectFile(n){this.selectedFiles=n.target.files}upload(){this.progress=0,this.currentFile=this.selectedFiles.item(0),this.teacherService.upload(this.currentFile).subscribe(n=>{this.ngOnInit(),n.type===p.dt.UploadProgress?(window.location.reload(),n.total&&(this.progress=Math.round(100*n.loaded/n.total))):n instanceof p.Zn&&(this.message=n.body.message,this.fileInfos=this.teacherService.getAllFiles())},n=>{this.progress=0,this.message="Could not upload the file!",this.currentFile=void 0}),this.selectedFiles=void 0}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(s.F0),e.Y36(s.gz),e.Y36(P.J),e.Y36(k.U),e.Y36(x.ux))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-profile"]],decls:74,vars:8,consts:[[1,"main-content"],[1,"container"],[1,"row"],[1,"col-md-8"],[1,"card"],[1,"card-header","card-header-danger"],[1,"card-title"],["mat-stroked-button","","type","button","routerLink","/authenticate/login",1,"button",2,"color","black",3,"click"],[1,"card-body"],[3,"formGroup","ngSubmit"],[1,"col-md-5"],[1,"example-full-width"],["matInput","","placeholder","Company Seeds","disabled",""],[1,"col-md-3"],["matInput","","formControlName","name","placeholder","Full name","type","text","name","name","id","name"],[1,"col-md-4"],["matInput","","formControlName","email","placeholder","Email address","type","email"],[1,"col-md-6"],["matInput","","placeholder","Fist Name","type","text"],["matInput","","placeholder","Last Name","type","text"],[1,"col-md-12"],["matInput","","placeholder","Adress","type","text"],["mat-stroked-button","","type","submit",1,"button"],[1,"clearfix"],[1,"buttonDiv"],["mat-stroked-button","","type","submit",1,"button",3,"click"],["mat-stroked-button","","type","submit","routerLink","/authenticate/changePassword",1,"button"],[1,"card","card-profile"],[1,"card-avatar"],["src","assets/avatar.png"],[1,"card-category","text-gray"],[1,"card-description"],[1,"main-button"],["mat-stroked-button","","type","button","routerLink","/user/add",1,"button"],["class","progress",4,"ngIf"],[1,"btn","btn-default"],["type","file",3,"change"],[1,"btn","btn-success",3,"disabled","click"],["role","alert",1,"alert","alert-light"],[1,"card-header"],["class","list-group list-group-flush",4,"ngFor","ngForOf"],[1,"progress"],["role","progressbar","aria-valuemin","0","aria-valuemax","100",1,"progress-bar","progress-bar-info","progress-bar-striped",3,"ngStyle"],[1,"list-group","list-group-flush"],[1,"list-group-item"],[3,"href"]],template:function(n,o){1&n&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"div",2),e.TgZ(3,"div",3),e.TgZ(4,"div",4),e.TgZ(5,"div",5),e.TgZ(6,"h4",6),e._uU(7,"Edit Profile"),e.qZA(),e.TgZ(8,"button",7),e.NdJ("click",function(){return o.onLogout()}),e._uU(9,"Logout"),e.qZA(),e.qZA(),e.TgZ(10,"div",8),e.TgZ(11,"form",9),e.NdJ("ngSubmit",function(){return o.updateUser()}),e.TgZ(12,"div",2),e.TgZ(13,"div",10),e.TgZ(14,"mat-form-field",11),e._UZ(15,"input",12),e.qZA(),e.qZA(),e.TgZ(16,"div",13),e.TgZ(17,"mat-form-field",11),e._UZ(18,"input",14),e.qZA(),e.qZA(),e.TgZ(19,"div",15),e.TgZ(20,"mat-form-field",11),e._UZ(21,"input",16),e.qZA(),e.qZA(),e.qZA(),e.TgZ(22,"div",2),e.TgZ(23,"div",17),e.TgZ(24,"mat-form-field",11),e._UZ(25,"input",18),e.qZA(),e.qZA(),e.TgZ(26,"div",17),e.TgZ(27,"mat-form-field",11),e._UZ(28,"input",19),e.qZA(),e.qZA(),e.qZA(),e.TgZ(29,"div",2),e.TgZ(30,"div",20),e.TgZ(31,"mat-form-field",11),e._UZ(32,"input",21),e.qZA(),e.qZA(),e.qZA(),e.TgZ(33,"button",22),e._uU(34,"Update Profile"),e.qZA(),e._UZ(35,"hr"),e._UZ(36,"div",23),e.qZA(),e.TgZ(37,"div",24),e.TgZ(38,"button",25),e.NdJ("click",function(){return o.deleteUser()}),e._uU(39,"Delete account"),e.qZA(),e.TgZ(40,"button",26),e._uU(41,"Change Password"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e._UZ(42,"br"),e.TgZ(43,"div",15),e.TgZ(44,"div",27),e.TgZ(45,"div",28),e._UZ(46,"img",29),e.qZA(),e.TgZ(47,"div",8),e.TgZ(48,"h6",30),e._uU(49,"Welcome to Seeds"),e.qZA(),e.TgZ(50,"h4"),e._uU(51),e.qZA(),e.TgZ(52,"p",31),e._uU(53," Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "),e.qZA(),e.TgZ(54,"div",32),e.TgZ(55,"button",33),e._uU(56,"Want to add some material?"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e._UZ(57,"br"),e._UZ(58,"br"),e.YNc(59,N,3,5,"div",34),e.TgZ(60,"label",35),e.TgZ(61,"input",36),e.NdJ("change",function(d){return o.selectFile(d)}),e.qZA(),e.qZA(),e.TgZ(62,"button",37),e.NdJ("click",function(){return o.upload()}),e._uU(63," Upload\n"),e.qZA(),e.TgZ(64,"div",38),e._uU(65),e.qZA(),e.TgZ(66,"div",4),e.TgZ(67,"div",39),e._uU(68,"List of Files"),e.qZA(),e.YNc(69,J,4,2,"ul",40),e.ALo(70,"async"),e.qZA(),e._UZ(71,"br"),e._UZ(72,"br"),e._UZ(73,"br")),2&n&&(e.xp6(11),e.Q6J("formGroup",o.updateForm),e.xp6(40),e.hij("Hello ",o.global.getItem("name"),""),e.xp6(8),e.Q6J("ngIf",o.currentFile),e.xp6(3),e.Q6J("disabled",!o.selectedFiles),e.xp6(3),e.Oqu(o.message),e.xp6(4),e.Q6J("ngForOf",e.lcZ(70,6,o.fileInfos)))},directives:[O.lW,s.rH,a._Y,a.JL,a.sg,S.KE,F.Nt,a.Fj,a.JJ,a.u,l.O5,l.PC,l.sg],pipes:[l.Ov],styles:[".circle[_ngcontent-%COMP%]{background-color:#00f;width:100px;height:100px;border-radius:50px;text-align:center}p[_ngcontent-%COMP%]{font-family:Lato}.hoverable[_ngcontent-%COMP%]{position:relative;display:block;cursor:pointer;height:200px;border-radius:50%}.hoverable[_ngcontent-%COMP%]   .hover-text[_ngcontent-%COMP%]{position:absolute;display:none;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2}.hoverable[_ngcontent-%COMP%]   .background[_ngcontent-%COMP%]{position:absolute;display:none;top:0;left:0;bottom:0;right:0;background-color:#ffffff80;pointer-events:none;border-radius:50%;z-index:1}.hoverable[_ngcontent-%COMP%]:hover   .hover-text[_ngcontent-%COMP%], .hoverable[_ngcontent-%COMP%]:hover   .background[_ngcontent-%COMP%]{display:block}#fileInput[_ngcontent-%COMP%]{display:none}"]}),t})()},{path:"add",component:M}];let Y=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[[s.Bz.forChild(L)],s.Bz]}),t})(),Q=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[[l.ez,Y,m.q,a.u5,a.UX]]}),t})()}}]);