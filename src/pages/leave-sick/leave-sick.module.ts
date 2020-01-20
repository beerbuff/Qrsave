import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveSickPage } from './leave-sick';

@NgModule({
  declarations: [
    LeaveSickPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveSickPage),
  ],
})
export class LeaveSickPageModule {}
