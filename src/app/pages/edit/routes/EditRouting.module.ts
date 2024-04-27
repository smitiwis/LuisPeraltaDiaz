import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { EditComponent } from "../edit.component";

const routes: Routes = [
  {
    path: '',
    component: EditComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesEditModule {}
