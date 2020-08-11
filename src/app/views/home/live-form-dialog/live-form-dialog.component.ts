import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LiveService } from '../../../shared/service/live.service';
import * as moment from 'moment';

@Component({
  selector: 'app-live-form-dialog',
  templateUrl: './live-form-dialog.component.html',
  styleUrls: ['./live-form-dialog.component.css']
})
export class LiveFormDialogComponent implements OnInit {

  public liveForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rest: LiveService,
    public dialogRef: MatDialogRef<LiveFormDialogComponent>
  ) { }

  //ao iniciar o component o form sera gerado com certos parametros
  ngOnInit(): void {
    this.liveForm = this.fb.group({
      liveName: ['', [Validators.required] ],
      channelName: ['', [Validators.required] ],
      liveLink: ['', [Validators.required] ],
      liveDate: ['', [Validators.required] ],
      liveTime: ['', [Validators.required] ]
    })
  }

  createLive(){
    let newDate: moment.Moment = moment.utc(this.liveForm.value.liveDate).local();
    this.liveForm.value.liveDate = newDate.format("YYYY-MM-DD") + 'T' + this.liveForm.value.liveTime;
    console.log(this.liveForm.value);
    this.rest.postLives(this.liveForm.value).subscribe(result => {});
    this.dialogRef.close();
    this.liveForm.reset();
    
    window.location.reload(); //recarregar pagina ao salvar a live
  }

  cancel(): void {
    this.dialogRef.close();
    this.liveForm.reset();
  }

}
