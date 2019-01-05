import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaveCardDetails } from './save-card-details';

@NgModule({
  declarations: [
    SaveCardDetails,
  ],
  imports: [
    IonicPageModule.forChild(SaveCardDetails),
  ],
  exports: [
    SaveCardDetails
  ]
})
export class SaveCardDetailsModule {}
