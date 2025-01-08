import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.baseUrl;
  private varinatUrl = `${this.baseUrl}/Bioinformatics/`

  constructor(private http : HttpClient) {

  }

  getVarinatDataBioInformatica(accesionId: string, offset: number, length: number , acmgClassification: string) {
    console.log(accesionId);
    return this.http.get(`${this.varinatUrl}variants/${accesionId}/${offset}/${length}/${acmgClassification}`);
  }
  
  getUniqueAcmgClassification() {
    return this.http.get(`${this.varinatUrl}unique-acmg-classifications/`);
  }

  getAnalysisSpecificPatientid(patinetId : number) {
    return this.http.get(`${this.varinatUrl}analysis-specific-patient/${patinetId}`);
  }

  getPatientVariantsPdf1(analysisId : string){
    return this.http.get(`${this.varinatUrl}patient-variants-pdf1-data/${analysisId}`)
  }
 
  generatePdf(htmlContent: string) {
    return this.http.post(`${this.varinatUrl}generate_result_pdf`, 
      { htmlContent }, 
      { responseType: 'arraybuffer' } // Expect binary data
    );
  }  
  
  
  
}
