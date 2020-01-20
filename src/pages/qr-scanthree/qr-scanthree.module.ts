import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrScanthreePage } from './qr-scanthree';

@NgModule({
  declarations: [
    QrScanthreePage,
  ],
  imports: [
    IonicPageModule.forChild(QrScanthreePage),
  ],
})
export class QrScanthreePageModule {}
