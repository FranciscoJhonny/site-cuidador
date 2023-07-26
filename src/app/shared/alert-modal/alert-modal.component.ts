import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef}from 'ngx-bootstrap/modal'
declare var window: any;

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {
  formModal: any;
  @Input() type!:'success';
  @Input() message!:string;
  constructor(public bsModalRef:BsModalRef) { }

  ngOnInit() {
  
  }
  onClose(){
    this.bsModalRef.hide();
  }

}
