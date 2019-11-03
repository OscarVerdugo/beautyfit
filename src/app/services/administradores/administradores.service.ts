import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdministradoresService {

  lstAdmin = [];
  currentUser:any;
  name = 'lstAdmin';
  constructor() {}

   load(){
    this.lstAdmin = JSON.parse(localStorage.getItem(this.name));
    if(!this.lstAdmin) this.lstAdmin = [];
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
   }

  add(us:string,name:string,phone:string,pass:string):boolean{
    let newAd = {user:us,name:name,phone:phone,password:pass};
    if(this.lstAdmin.length > 0){
      newAd['id'] = +this.lstAdmin[0].id + 1;
      if(this.findBy(newAd.phone || this.findBy(newAd.user,'user'))){
        return false;
      }
    }else{
      newAd['id']  = 1;
    }
    this.lstAdmin.unshift(newAd);
    this.save();
    return true;
  }

  update(id:number,us:string,name:string,phone:string):boolean{
    let admin = this.lstAdmin.find(x => x.id == id);
    if(admin){
      admin.user = us;
      admin.name = name;
      admin.phone = phone;
      this.save();
      return true;
    }else{
      return false;
    }
  }

  delete(id){
    let i = this.lstAdmin.findIndex(x => x.id == id);
    if(i != -1){
      this.lstAdmin.splice(i,1);
      this.save();
      return true;
    }else{
      return false;
    }
  }

  findBy(value:any,prop='phone'){
    return this.lstAdmin.find(x => x[prop] == value);
  }

  // prot(us:string,name:string,phone:string,pass:string): any{
  //   return ;
  // }

  login(username:string,pass:string):boolean{
    let user = this.findBy(username,'user');
    if(user && user.password == pass){
      localStorage.setItem('currentUser',JSON.stringify(user));
      return true;
    }else{
      return false;
    }
  }
  save(){
    localStorage.setItem(this.name,JSON.stringify(this.lstAdmin));
  }

  logout(){
    localStorage.removeItem('currentUser');
  }
}
