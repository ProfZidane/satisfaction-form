import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawComponent } from './components/draw/draw.component';
import { DocumentComponent } from './pages/document/document.component';
import { FormsComponent } from './pages/forms/forms.component';

const routes: Routes = [
  {
    path: "",
    component: FormsComponent
  },
  {
    path: "document",
    component: DocumentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
