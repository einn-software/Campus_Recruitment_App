import { NgModule } from '@angular/core';

import { FileUploadModule } from 'primeng/fileupload';
import { SharedModule } from '../shared/shared.module';
import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './upload.component'

@NgModule({
  imports: [
    SharedModule,
    UploadRoutingModule,
    FileUploadModule,

  ],
  declarations: [
    UploadComponent
  ]
})
export class UploadModule {}
