import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BioInfoVariantComponent } from './components/bio-info-variant/bio-info-variant.component';
import { AnlaysisPatientComponent } from './components/bio-info-variant/anlaysis-patient/anlaysis-patient.component';
import { Pdf1Component } from './components/PDFS/pdf-1/pdf-1.component';
import { Pdf2Component } from './components/PDFS/pdf-2/pdf-2.component';
import { Pdf3Component } from './components/PDFS/pdf-3/pdf-3.component';
import { Pdf4Component } from './components/PDFS/pdf-4/pdf-4.component';

const routes: Routes = [
  {
    component: BioInfoVariantComponent,
    path: 'bio-info/:id'
   },
   {
    component: AnlaysisPatientComponent,
    path: 'anlysis-patient'
   },
   {
    component: Pdf1Component,
    path: 'pdf-1/:id'
   },
   {
    component: Pdf2Component,
    path: 'pdf-2'
   },
   {
    component: Pdf3Component,
    path: 'pdf-3'
   },
   {
    component: Pdf4Component,
    path: 'pdf-4'
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
