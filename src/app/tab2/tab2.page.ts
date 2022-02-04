import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  profileForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    os: new FormControl(''),
  });
  constructor(private authService: AuthService, public toastController: ToastController) {}

  async presentToast(message: string, color: 'success' | 'danger' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }

  async signup() {
    try {
      const {message} = await this.authService.signup(this.profileForm.value);
      this.presentToast(message);
    } catch ({error: { errors }}) {
      console.log('err:', errors);
      this.presentToast(errors && errors[0].msg || 'generic error', 'danger');
    }
  }

}
