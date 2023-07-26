import { Injectable, Input } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { AlertModalComponent } from "./alert-modal/alert-modal.component";

export enum AlertTypes {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SUCCESS = "success",
  DANGER = "danger",
  WARNING = "warning",
  INFO = "info",
  LIGHT = "light",
  DARK = "dark",
}

@Injectable({
  providedIn: "root",
})
export class AlertModalService {
  formModal: any;

  @Input() type!: string;
  @Input() message!: string;

  constructor(private modalService: BsModalService) {}

  private showAlert(message: string, type: AlertTypes) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
  }
  showAlertPrimary(message: string) {
    this.showAlert(message, AlertTypes.PRIMARY);
  }
  showAlertSecondary(message: string) {
    this.showAlert(message, AlertTypes.SECONDARY);
  }
  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS);
  }
  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER);
  }
  showAlertWarning(message: string) {
    this.showAlert(message, AlertTypes.WARNING);
  }
  showAlertInfo(message: string) {
    this.showAlert(message, AlertTypes.INFO);
  }
  showAlertLight(message: string) {
    this.showAlert(message, AlertTypes.LIGHT);
  }
  showAlertDark(message: string) {
    this.showAlert(message, AlertTypes.DARK);
  }
}
