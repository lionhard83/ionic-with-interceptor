import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authService: AuthService, public toastController: ToastController, private storageService: StorageService) {}

  async presentToast(message: string, color: 'success' | 'danger' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }

  async login() {
    console.log(this.profileForm.value);
    try {
      const {accessToken, refreshToken, expiresIn} = await this.authService.login(this.profileForm.value);
      this.storageService.set('accessToken', accessToken);
      this.storageService.set('refreshToken', refreshToken);
      this.storageService.set('expiresIn', expiresIn);
      this.presentToast('Login successfull');
    } catch (error) {
      this.presentToast('generic error', 'danger');
      // this.presentToast(errors && errors[0].msg || 'generic error', 'danger');
    }
  }

}
