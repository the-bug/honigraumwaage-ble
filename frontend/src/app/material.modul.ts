import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule, // 
        MatDialogModule, //
        MatGridListModule, //
        MatInputModule, //
        MatGridListModule, //
        MatSelectModule,
    ],
    exports: [
        MatButtonModule, // 
        MatDialogModule, //
        MatGridListModule, //
        MatInputModule, //
        MatGridListModule, //
        MatSelectModule,
    ],
})
export class MaterialModule { }