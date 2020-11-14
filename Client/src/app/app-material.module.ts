import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";

const components = [
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatGridListModule,
  MatSidenavModule,
  MatListModule,
  MatDialogModule,
  MatMenuModule,
];

@NgModule({
  imports: [components],
  exports: [components]
})
export class AppMaterialModule { }
