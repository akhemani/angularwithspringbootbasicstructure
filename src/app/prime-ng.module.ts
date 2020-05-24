import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropdownModule, InputTextModule, PasswordModule, ButtonModule } from 'primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';

@NgModule({
    imports: [
        ReactiveFormsModule,
        DropdownModule,
        BrowserAnimationsModule,
        FormsModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        TableModule
    ], exports: [
        ReactiveFormsModule,
        DropdownModule,
        BrowserAnimationsModule,
        FormsModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        TableModule
    ]
})
export class PrimeNgModule { }