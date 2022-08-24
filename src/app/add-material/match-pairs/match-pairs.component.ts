import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchPairsService } from 'src/app/service/match-pairs-service';
@Component({
  selector: 'app-match-pairs',
  templateUrl: './match-pairs.component.html',
  styleUrls: ['./match-pairs.component.scss']
})
export class MatchPairsComponent implements OnInit {
  @Output() submitEvent = new EventEmitter<boolean>();

  SetAsSubmitted(value: boolean) {
    this.submitEvent.emit(value);
  }
  topicId: any
  id: any;
  isAddMode: boolean;
  submitted = false;
  match_pairsForm: any;
  questionData: any
  updatedQuestion: any
  loading: boolean
  imageUrl: any
  Pickedimage: string

  constructor(private matchPairsService: MatchPairsService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar, private router: Router) { }

    get sequence() { return this.match_pairsForm.get('sequence'); }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('matchId');
    this.isAddMode = !this.id;
    console.log(this.id)
    this.match_pairsForm = new FormGroup({
      question: new FormControl("", [
        Validators.required
      ]),
      statement1: new FormControl("", [
        // Validators.required
      ]),
      answer1: new FormControl("", [
        // Validators.required
      ]),
      statement2: new FormControl("", [
        // Validators.required
      ]),
      answer2: new FormControl("", [
        // Validators.required
      ]),
      statement3: new FormControl("", [
        // Validators.required
      ]),
      answer3: new FormControl("", [
        // Validators.required
      ]),
      statement4: new FormControl("", [
        // Validators.required
      ]),
      answer4: new FormControl("", [
        // Validators.required
      ]),
      statement5: new FormControl("", [
        // Validators.required
      ]),
      answer5: new FormControl("", [
        // Validators.required
      ]),
      statement6: new FormControl("", [
        // Validators.required
      ]),
      answer6: new FormControl("", [
        // Validators.required
      ]),
      statement7: new FormControl("", [
        // Validators.required
      ]),
      answer7: new FormControl("", [
        // Validators.required
      ]),
      statement8: new FormControl("", [
        // Validators.required
      ]),
      answer8: new FormControl("", [
        // Validators.required
      ]),
      posFeedback: new FormControl("", [
        Validators.required
      ]),
      negFeedback: new FormControl("", [
        Validators.required
      ]),
      sequence: new FormControl("", [
        Validators.required,
        Validators.min(0)
      ]),
      file: new FormControl("", [
      ]),
    })

    if (!this.isAddMode) {
      console.log(this.id)
      this.matchPairsService.getQuestionById(this.id).subscribe(
        res => {
          this.questionData = res;
          this.imageUrl = this.questionData.file
          this.topicId = this.questionData.topicId
          this.match_pairsForm.patchValue({
            question: this.questionData.question,
            sequence: this.questionData.sequence,
            statement1: this.questionData.statement1,
            statement2: this.questionData.statement2,
            statement3: this.questionData.statement3,
            statement4: this.questionData.statement4,
            statement5: this.questionData.statement5,
            answer1: this.questionData.answer1,
            answer2: this.questionData.answer2,
            answer3: this.questionData.answer3,
            answer4: this.questionData.answer4,
            answer5: this.questionData.answer5,
            posFeedback: this.questionData.posFeedback,
            negFeedback: this.questionData.negFeedback,
            file: this.questionData.file
          })
          console.log(this.questionData)
        }, err => {
          console.log(err.status + 'i am error')
        });
    }
  }

  onSubmit() {
    //   this.submitted = true;

    //   // reset alerts on submit
    //   this._snackBar.dismiss();

    //   // stop here if form is invalid
    //   if (this.openEndedForm.invalid) {
    //     return;
    //   }

      this.loading = true;
    if (this.isAddMode) {
      this.createQuestion();
    } else {
      this.updateQuestion();
    }
  }

  createQuestion() {
    this.topicId = this.route.snapshot.paramMap.get('id')
    const formData = new FormData();
    if (this.match_pairsForm.get('file').value) {
      formData.append('file', this.match_pairsForm.get('file').value);
    }

    formData.append("question", this.match_pairsForm.get('question').value)
    formData.append("sequence", this.match_pairsForm.get('sequence').value)
    formData.append("statement1", this.match_pairsForm.get('statement1').value)
    formData.append("statement2", this.match_pairsForm.get('statement2').value)
    formData.append("statement3", this.match_pairsForm.get('statement3').value)
    formData.append("statement4", this.match_pairsForm.get('statement4').value)
    formData.append("statement5", this.match_pairsForm.get('statement5').value)
    formData.append("answer1", this.match_pairsForm.get('answer1').value)
    formData.append("answer2", this.match_pairsForm.get('answer2').value)
    formData.append("answer3", this.match_pairsForm.get('answer3').value)
    formData.append("answer4", this.match_pairsForm.get('answer4').value)
    formData.append("answer5", this.match_pairsForm.get('answer5').value)
    formData.append("posFeedback", this.match_pairsForm.get('posFeedback').value)
    formData.append("negFeedback", this.match_pairsForm.get('negFeedback').value)

    this.matchPairsService.addAll(formData, this.topicId)
      .subscribe(res => {
        console.log(res)
        this._snackBar.open(" Your Question has been created", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        this.loading = false
        // window.location.reload();
        this.SetAsSubmitted(true);
        localStorage.setItem('remainingQuestions', parseInt(localStorage.getItem('remainingQuestions')) + 1 + '')
        this.match_pairsForm.reset();
      },
        err => {
          console.log(err)
          this._snackBar.open(" Your Question has not been created", "Ok", {
            duration: 5000,
            panelClass: ['red-snackbar']
          });
        })
  }

  updateQuestion() {
    const formData = new FormData();
    if (this.match_pairsForm.get('file').value) {
      formData.append('file', this.match_pairsForm.get('file').value);
    }

    formData.append("question", this.match_pairsForm.get('question').value)
    formData.append("sequence", this.match_pairsForm.get('sequence').value)
    formData.append("statement1", this.match_pairsForm.get('statement1').value)
    formData.append("statement2", this.match_pairsForm.get('statement2').value)
    formData.append("statement3", this.match_pairsForm.get('statement3').value)
    formData.append("statement4", this.match_pairsForm.get('statement4').value)
    formData.append("statement5", this.match_pairsForm.get('statement5').value)
    formData.append("answer1", this.match_pairsForm.get('answer1').value)
    formData.append("answer2", this.match_pairsForm.get('answer2').value)
    formData.append("answer3", this.match_pairsForm.get('answer3').value)
    formData.append("answer4", this.match_pairsForm.get('answer4').value)
    formData.append("answer5", this.match_pairsForm.get('answer5').value)
    formData.append("posFeedback", this.match_pairsForm.get('posFeedback').value)
    formData.append("negFeedback", this.match_pairsForm.get('negFeedback').value)
    this.matchPairsService.updateQuestion(formData ,this.questionData._id).subscribe(
      res => {
        console.log("response:", res)
        this.updatedQuestion = res;

        this.match_pairsForm.patchValue({
          statement1: this.updatedQuestion.statement1,
          statement2: this.updatedQuestion.statement2,
          statement3: this.updatedQuestion.statement3,
          statement4: this.updatedQuestion.statement4,
          statement5: this.updatedQuestion.statement5,
          answer1: this.updatedQuestion.answer1,
          answer2: this.updatedQuestion.answer2,
          answer3: this.updatedQuestion.answer3,
          answer4: this.updatedQuestion.answer4,
          answer5: this.updatedQuestion.answer5,
          question: this.updatedQuestion.question,
          sequence: this.updatedQuestion.sequence,
          posFeedback: this.updatedQuestion.posFeedback,
          negFeedback: this.updatedQuestion.negFeedback
        })
        this.questionData = this.match_pairsForm.value;
        console.log(this.questionData);
        this._snackBar.open(" Your Question has been updated", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        this.loading = false
        this.router.navigate([`/material/view/${this.topicId}`]);
      },
      err => {
        console.log(err + 'error');
        this._snackBar.open(" Your Question has not been updated", "Ok", {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
      });
  }
  PickedImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.match_pairsForm.patchValue({ file: file })
    this.match_pairsForm.get('file').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.Pickedimage = reader.result as string;
      console.log(this.Pickedimage)
    };
    reader.readAsDataURL(file);
  }

  DeleteImage() {
    this.Pickedimage = ''
  }

  DeleteImageBackend() {
    this.imageUrl = ''
    this.match_pairsForm.patchValue({
      file: ''
    })
  }
}
