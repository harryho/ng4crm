import { Component, Inject } from '@angular/core';
import {MD_DIALOG_DATA, MdDialog, MdDialogRef } from '@angular/material';

@Component({
    selector: 'confirm-dialog',
    template: `
<h1 md-dialog-title>{{data && data.title? data.title: 'Dialog'}}</h1>

<div md-dialog-content>
   {{data && data.message? data.message: 'Are you sure to do this?'}}
</div>
<div md-dialog-actions>
  <button md-button [md-dialog-close]="ACTION_CONFIRM">Confirm</button>
  <button md-button [md-dialog-close]="ACTION_CANCEL">Cancel</button>
</div>`
})
export class ConfirmDialog {
    // dialogTitle: string;
   public readonly  ACTION_YES: string = "YES";
   public readonly  ACTION_NO: string = "NO";
   public readonly  ACTION_CANCEL: string = "CANCELED";
   public readonly  ACTION_IGNORE: string = "IGNORED";
   public readonly  ACTION_OK: string = "OK";
   public readonly  ACTION_CLOSE: string = "CLOSED";
   public readonly  ACTION_CONFIRM: string = "CONFIRMED";

    constructor(@Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<ConfirmDialog>) {


     }
}
// export class ConfirmDialog {
//   constructor(public dialogRef: MdDialogRef<ConfirmDialog>) {


//   }
// }