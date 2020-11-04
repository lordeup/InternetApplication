import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

const components = [
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
];

@NgModule({
  imports: [components],
  exports: [components]
})
export class AppMaterialModule { }
