import { Component, OnInit } from '@angular/core';
import { AdministradoresService } from "../../services/administradores/administradores.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private adminService: AdministradoresService, private router:Router) { }

  ngOnInit() {
  }

  logout(ev){
    ev.preventDefault();
    this.adminService.logout();
    this.router.navigate(['/login']);
  }

}
