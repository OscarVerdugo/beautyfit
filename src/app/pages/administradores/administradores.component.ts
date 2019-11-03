import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AdministradoresService } from "../../services/administradores/administradores.service";
@Component({
  selector: "app-administradores",
  templateUrl: "./administradores.component.html",
  styleUrls: ["./administradores.component.scss"]
})
export class AdministradoresComponent implements OnInit {
  form;
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private adminService: AdministradoresService
  ) {}

  date: Date = new Date();
  modalReason: string;
  bMessage: boolean = false;
  cMessage: string = "";
  bNew: boolean = false;

  cFilterProperty: string = "name";
  cSearch: string = "";

  ngOnInit() {
    this.adminService.load();

    this.form = this.formBuilder.group(
      {
        id: [-1],
        user: ["", Validators.required],
        name: ["", Validators.required],
        phone: ["", Validators.required],
        confirmpass: [""],
        password: ["", Validators.required]
      },
      { validators: [this.checkPasswords.bind(this),this.checkPhone.bind(this), this.checkUser.bind(this)] }
    );
    console.log(this.form.controls.user);
    this.formReset();
  }

  filterList() {
    if (this.cSearch && this.cSearch.trim() != "") {
      return this.adminService.lstAdmin.filter(
        x => x[this.cFilterProperty].indexOf(this.cSearch) != -1
      );
    } else {
      return this.adminService.lstAdmin;
    }
  }

  open(content, item = undefined) {
    if (item) {
      console.log(item);
      this.bNew = false;
      this.form.controls.password.setValue("11111111111111");
      this.form.controls.confirmpass.setValue("11111111111111");

      this.form.controls.id.setValue(item.id);
      this.form.controls.user.setValue(item.user);
      this.form.controls.name.setValue(item.name);
      this.form.controls.phone.setValue(item.phone);

      this.modalReason = "Actualizar administrador";
    } else {
      this.bNew = true;
      this.modalReason = "Nuevo administrador";
    }
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          if (result["response"]) {
            this.saveData();
          }
        },
        reason => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openDelete(content, item) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          if (result["response"]) {
            this.delete(item.id);
          }
        },
        reason => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  delete(id) {
    if (this.adminService.delete(id)) {
      this.bMessage = true;
      this.cMessage = "Administrador eliminado exitosamente!";
      setTimeout(() => {
        this.bMessage = false;
      }, 3000);
    }
  }
  saveData() {
    if (this.form.controls.id.value == -1) {
      //nuevo
      this.adminService.add(
        this.form.controls.user.value,
        this.form.controls.name.value,
        this.form.controls.phone.value,
        this.form.controls.password.value
      );
      this.cMessage = "Administrador guardado exitosamente!";
    } else {
      //actualizar
      if (
        this.adminService.update(
          this.form.controls.id.value,
          this.form.controls.user.value,
          this.form.controls.name.value,
          this.form.controls.phone.value
        )
      ) {
        this.cMessage = "Administrador actualizado exitosamente!";
      }
    }
    this.formReset();

    this.bMessage = true;
    setTimeout(() => {
      this.bMessage = false;
    }, 3000);
  }

  formReset() {
    this.form.reset();
    this.form.controls.id.setValue(-1);
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get("password").value;
    let confirmPass = group.get("confirmpass").value;

    return pass === confirmPass ? null : { notSame: true };
  }

  checkUser(group: FormGroup) {
    let user = group.get("user").value;
    let i = this.adminService.lstAdmin.findIndex(x => x.user === user);

    return i == -1  || !this.bNew ? null : { userUsed: true };
  }

  checkPhone(group: FormGroup) {
    let phone = group.get("phone").value;
    let i = this.adminService.lstAdmin.findIndex(x => x.phone === phone);

    return i == -1 || !this.bNew ? null : { phoneUsed: true };
  }
}
