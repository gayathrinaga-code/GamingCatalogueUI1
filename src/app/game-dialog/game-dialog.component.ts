import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-game-dialog',
  templateUrl: './game-dialog.component.html',
  styleUrl: './game-dialog.component.css'
})
export class GameDialogComponent {
  action: string;
  localData: any;
  productForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<GameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    console.log(data,'data')
    console.log(dialogRef,'dia')
    this.action = data.action;
    this.localData = { ...data.game };

    if(this.localData.id != null)
    {
      this.productForm = this.fb.group({
        id : [this.localData.id],
        title : [this.localData.title],
        platform: [this.localData.platform],
        description: [this.localData.description],
        game_Price: [this.localData.game_Price],
        developedBy: [this.localData.ageLevel],
        ageLevel: [this.localData.ageLevel],
      });
    }else
    {
      this.productForm = this.fb.group({
        title : [this.localData.title],
        platform: [this.localData.platform],
        description: [this.localData.description],
        game_Price: [this.localData.game_Price],
        developedBy: [this.localData.ageLevel],
        ageLevel: [this.localData.ageLevel],
      });
    }
    
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.productForm.value });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
