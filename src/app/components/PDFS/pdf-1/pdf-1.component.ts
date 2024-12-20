import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {jsPDF} from 'jspdf'
import html2canvas from 'html2canvas'
import { saveAs } from 'file-saver';

interface PatientVariantData {
  ACMGClassification: string;
  ACMGRules: string;
  AllelicBalance: string;
  AnalysisId: number;
  Coverage: string;
  ExonLocation: string;
  GeneSymbol: string;
  HGVSNotation: string;
  Variant: string;
  VariantId: number;
  Zygosity: string;
  HGVSCoding : string;
  VariantType : string;
  Inheritance : string;
  genes : string [] 
  gene_description : string
  pheno_type : string

}


@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-1.component.html',
  styleUrls: ['./pdf-1.component.css']
})
export class Pdf1Component implements OnInit {
  accessionId: string | null = null;
  variantData : PatientVariantData  [] = []
  constructor(private apiService: ApiService , private route: ActivatedRoute){

  }
  ngOnInit(): void {
  
    this.route.paramMap.subscribe(params => {
      this.accessionId = params.get('id'); // 'id' is the name of the route parameter
      // console.log(this.analysisId);
      this.loadData()
    });
  }

  convertHtmlToPdf(){
    const element = document.getElementById('pdf-1') as HTMLElement; // Replace with 'pdf-1' or your element ID
    if (element) {
      html2canvas(element, { allowTaint: true, useCORS: true }).then((canvas: any) => {
        // Create the PDF with dynamic size based on the canvas dimensions
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [0.562 * canvas.width, 0.562 * canvas.height] // Scale based on canvas size
        });
  
        // Add the canvas content to the PDF
        doc.addImage(canvas.toDataURL("image/jpeg"), "JPEG", 0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height);
  
        // Create FormData to send the file
        const formData = new FormData();
  
        setTimeout(() => {
          // Convert the PDF to a blob
          const blob = doc.output('blob');
          const file = new File([blob], 'pdf-1.pdf'); // Name the PDF file
  
          // Append the file to FormData
          formData.append('file', file);
  
          // Log the blob and trigger file download (if needed)
          console.log(blob);
          saveAs(blob, 'pdf-1.pdf');
           //pdf.save('reqform.pdf');
  
        }, 1000); // Timeout to ensure the PDF is properly generated
      }).catch(error => {
        console.error("Error generating PDF:", error);
      });
    } else {
      console.error("Element with id 'pdf-1' not found.");
    }
  }
  
  
  

  loadData(){
    if (this.accessionId) { // Ensure analysisId is not null or undefined
      this.apiService.getPatientVariantsPdf1(this.accessionId).subscribe({
        next: (res : any) => {
          console.log(res);
          this.variantData = res
        },
        error: (err) => {
          console.error('Error fetching data', err);
        },
        complete : () => {
          console.log(this.variantData);
        }
      });
    } else {
      console.error('Analysis ID is null or undefined.');
    }
  }
}
