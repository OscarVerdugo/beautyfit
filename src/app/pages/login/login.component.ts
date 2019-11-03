import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from "@angular/forms";
import { AdministradoresService } from "../../services/administradores/administradores.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form;
  bAlert = false;
  constructor(private formBuilder: FormBuilder,private adminService: AdministradoresService, private router: Router) { }

  ngOnInit() {
    this.adminService.load();
    this.form = this.formBuilder.group({
      'user':['',Validators.required],
      'pass':['',Validators.required]
    });
  }

  ex(){
    this.adminService.add("asd","asdasd","111","123");
  }

  save(){
    if(this.adminService.login(this.form.controls.user.value,this.form.controls.pass.value)){
      this.router.navigate(['/home']);
    }else{
      this.bAlert = true;
      setTimeout(() => {
        this.bAlert = false;
      },4000);
    }
  }

}
