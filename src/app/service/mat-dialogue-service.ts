
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogueComponent } from '../user-profile/mat-confirm-dialogue/mat-confirm-dialogue.component';


@Injectable({
  providedIn: 'root'
})
export class DialogueService {

  constructor(private dialogue: MatDialog) {  }

  openDialogue = this.dialogue.open(MatConfirmDialogueComponent, {
    width: '390px',
    disableClose: true
  })
}