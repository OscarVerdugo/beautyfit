import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators} from "@angular/forms";
import { MembresiasService } from "../../services/membresias/membresias.service";

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.scss']
})
export class MembresiaComponent implements OnInit {

  form;
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private membService: MembresiasService) { }

  date: Date = new Date;
  modalReason:string;
  bMessage:boolean = false;
  cMessage:string = "";

  cFilterProperty:string = "nombre";
  cSearch:string = "";

  ngOnInit() {
    this.membService.load();
    
    this.form = this.formBuilder.group({
      'id':[-1],
      'nombre':["",Validators.required],
      'telefono':["",Validators.required],
      'fechainicio':["",Validators.required],
      'meses':[1,Validators.required],
      'fechafin':["",Validators.required],
      'precio':["",Validators.required],

    });
    this.formReset();
  }


  filterList(){
    if(this.cSearch && this.cSearch.trim() != ""){
      return this.membService.lstMembresias.filter(x => x[this.cFilterProperty].indexOf(this.cSearch) != -1);
    }else{
      return this.membService.lstMembresias;
    }
  }


  open(content,item=undefined) {
    if(item){
      console.log(item);
      this.form.controls.id.setValue(item.id);
      this.form.controls.meses.setValue(item.meses);
      this.form.controls.precio.setValue(item.precio);
      this.form.controls.fechainicio.setValue(this.getNgbDate(new Date(item.fechainicio)));
      this.form.controls.fechafin.setValue(this.getNgbDate(new Date(item.fechafin)));
      this.form.controls.nombre.setValue(item.nombre);
      this.form.controls.telefono.setValue(item.telefono);

      this.modalReason = "Actualizar membresía";
    }else{
      this.modalReason = "Nueva membresía";
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(result['response']){
        this.saveData();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openDelete(content,item) {
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(result['response']){
        this.delete(item.id);
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  delete(id){
    if(this.membService.delete(id)){
      this.bMessage = true;
      this.cMessage = "Membresía eliminada exitosamente!";
      setTimeout(()=>{
        this.bMessage = false;
      },3000);
    }
  }
  saveData(){
    console.log(this.getDate(this.form.controls.fechainicio.value));
    if(this.form.controls.id.value == -1){ //nuevo
      this.membService.add(
        this.form.controls.meses.value,
        this.form.controls.precio.value,
        this.getDate(this.form.controls.fechainicio.value),
        this.getDate(this.form.controls.fechafin.value),
        this.form.controls.nombre.value,
        this.form.controls.telefono.value
      );
      this.cMessage = "Membresía guardada exitosamente!";
    }else{ //actualizar
      if(this.membService.update(
        this.form.controls.id.value,
        this.form.controls.meses.value,
        this.form.controls.precio.value,
        this.getDate(this.form.controls.fechainicio.value),
        this.getDate(this.form.controls.fechafin.value),
        this.form.controls.nombre.value,
        this.form.controls.telefono.value
      )){
        this.cMessage = "Membresía actualizada exitosamente!";
      }
    }
    this.formReset();

    this.bMessage = true;
      setTimeout(()=>{
        this.bMessage = false;
      },3000);
  }

  formReset(){
    let date = new Date;
    date.setMonth(date.getMonth() +1);
    this.form.reset();
    this.form.controls.id.setValue(-1);
    this.form.controls.fechainicio.setValue(this.getNgbDate(new Date));
    this.form.controls.meses.setValue(1);
    this.form.controls.fechafin.setValue(this.getNgbDate(date));
  }

  private getNgbDate(date:Date){
    return new NgbDate(date.getFullYear(),date.getMonth() + 1, date.getDate());
  }

  private getDate(ngbdate:NgbDate){
    let date = new Date;
    date.setFullYear(ngbdate.year);
    date.setMonth(ngbdate.month - 1);
    date.setDate(ngbdate.day);
    return date;
  }

  onDateChange(){
    let date: Date = this.getDate(this.form.controls.fechainicio.value);
    date.setMonth(date.getMonth() + this.form.controls.meses.value);
    this.form.controls.fechafin.setValue(this.getNgbDate(date));
  }
}


