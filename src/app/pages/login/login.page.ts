import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

  loginUser = {
    email: 'cris@gmail.com',
    password: '1234'
  };

  registerUser: Usuario = {
    email: 'prueba',
    password: '1234',
    nombre: 'prueba',
    avatar: 'av-1.png'
  };

  constructor(
    private usuarioService: UsuarioService,
    private navCtrol: NavController,
    private uiService: UiServiceService
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {

    if (fLogin.invalid) { return; }

    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);

    if (valido) {
      this.navCtrol.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      this.uiService.alertaInformativa('Usuario o contraseña no son correctos');
    }
    // console.log(this.loginUser);
  }

  async registro(fRegistro: NgForm) {
    // console.log(this.registerUser);
    if (fRegistro.invalid) { return; }

    const valido = await this.usuarioService.registro(this.registerUser);

    if (valido) {
      this.navCtrol.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      this.uiService.alertaInformativa('Ese correo electrónico ya existe');
    }
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);

  }
}
