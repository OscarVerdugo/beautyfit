import { Injectable } from '@angular/core';
import { AdministradoresService } from "../administradores/administradores.service";
@Injectable({
  providedIn: 'root'
})
export class MembresiasService {
  lstMembresias = [];
  name:string = "lstMembresias";
  constructor(private adminService: AdministradoresService) { 

  
  }


  load(){
    this.lstMembresias = JSON.parse(localStorage.getItem(this.name));
    if(!this.lstMembresias) this.lstMembresias = [];
    this.adminService.load();
  }


  add(meses:number,precio:number,fechainicio,fechafin,nombre,tel){
    let newMemb = {meses:+meses,precio:+precio,fechainicio:fechainicio,fechafin:fechafin,nombre,telefono:tel};
    newMemb['usuario'] = this.adminService.currentUser.name;
    if(this.lstMembresias.length > 0){
      newMemb['id'] = +this.lstMembresias[0].id + 1;
    }else{
      newMemb['id']  = 1;
    }
    this.lstMembresias.unshift(newMemb);
    this.save();
  }

  update(id:number,meses:number,precio:number,fechainicio,fechafin,nombre,tel):boolean{
    let memb = this.lstMembresias.find(x => x.id == id);
    if(memb){
      memb.meses = meses;
      memb.precio = precio;
      memb.fechainicio = fechainicio;
      memb.fechafin = fechafin;
      memb.nombre = nombre;
      memb.telefono = tel;
      console.log(this.lstMembresias);
      this.save();
      return true;
    }else{
      return false;
    }
  }

  delete(id){
    let i = this.lstMembresias.findIndex(x => x.id == id);
    if(i != -1){
      this.lstMembresias.splice(i,1);
      this.save();
      return true;
    }else{
      return false;
    }
  }

  save(){
    localStorage.setItem(this.name,JSON.stringify(this.lstMembresias));
  }
}
