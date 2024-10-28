import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  public nombre: any;
  public apellido: any;
  public email: any;
  public telefono: any;
  public mensaje: any;
  public datosEnviados: any=[];

  constructor(private cs : ServiceService, private router:Router) { }

  ngOnInit() {
  }

  guardarInfo(){
    this.datosEnviados = [];
    this.datosEnviados.push(this.nombre,this.apellido,this.email,this.telefono,this.mensaje);
    this.cs.guardarInfo(this.datosEnviados).subscribe(() =>{
      alert("Informacion de contacto registrada!")
      
    })
      
  }

}
