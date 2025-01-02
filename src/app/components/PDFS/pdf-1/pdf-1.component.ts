import {  Component, OnInit  } from '@angular/core';
import {  DatePipe   } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
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
  RSID : string;
}

interface PatientDetials {
  patientRace : string,
  patientFirstName : string,
  patientLastName : string,
  patientDob : string,
  patientGender : string,
  AccessionId : string,
  specimenType : string,
  specimenReciveDate : string,
  physicianName : string,
  reportedDate : string,
}


@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-1.component.html',
  styleUrls: ['./pdf-1.component.css']
})
export class Pdf1Component implements OnInit {
  accessionId: string | null = null;
  variantData : PatientVariantData  [] = []
  patientDetail : PatientDetials | null = null;
  constructor(private apiService: ApiService , private route: ActivatedRoute , private datePipe: DatePipe){

  }
  ngOnInit(): void {
  
    this.route.paramMap.subscribe(params => {
      this.accessionId = params.get('id'); // 'id' is the name of the route parameter
      this.loadData()
    });
  }

convertHtmlToPdf(): void {
  console.log("Generating PDF");

  const element = document.getElementById('pdf-1') as HTMLElement;

  if (!element) {
    console.error("Element with id 'pdf-1' not found");
    return;
  }

  let htmlContent = element.outerHTML;

  // Include inline styles if needed
  const styles = Array.from(document.styleSheets)
    .map(sheet => {
      try {
        if (sheet.cssRules) {
          return Array.from(sheet.cssRules).map(rule => rule.cssText).join(' ');
        }
      } catch (e) {
        console.error('Error accessing styles', e);
      }
      return '';
    })
  .join(' ');
  console.log(styles);

  // Insert the styles into the HTML content
    

  // Wrap the HTML content with additional styles to ensure margins and A4 size
  htmlContent = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>BioInfoTestPluto</title>
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

    <style>
      
     .header {
        background-color: transparent;
        color: white;
        padding: 0px 0px 8px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }

  #pdf-1{
    font-family: "Poppins", serif;
  }

  .header img{
    object-fit: contain;
  }

  .header-sub{
    color: #000;
    gap: 5px;
    flex-basis: 80%;
    /* background: red; */
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    text-align: right;
    font-size: 11px;
  }

  .gradient-background{
    width: 100%;
    height: 13px;
    background: rgb(33,170,148);
    background: linear-gradient(90deg, rgba(33,170,148,1) 0%, rgba(20,141,189,1) 100%);
  }

  .box-conatiner .card-custom{
    border-radius: 0px !important;
    border:  1.3px solid #0E709B;
  }

  .header-sub p{
    margin: 0px !important;
  }

  .panel-header {
    margin: 0px !important;
    font-size: 18px;
    text-align: left;
  }

  .panel-header h4{
    font-size: 20px;
    font-weight: 400;
    color: #21AA94;
    margin:22px 0px 15px !important;
  }

  .card-header {
    background-color: #0E709B;
    color: #fff;
    font-weight: 700;
    padding: 5px 8px;
    font-size: 14px;
  }

  .card-body{
    font-size: 12px;
  }

  .box-conatiner .card-header{
    border-radius: 0px !important;
  }

  .alert-positive {
    background-color: #CE5B5B;
    color: white;
    font-weight: 500;
    padding: 12px 22px; 
    text-align: left;
    font-size: 14px;
    border-radius: 25px;
    margin-top: 22px;
    border: 2px solid #0E709B;
  }
  .result-key {
    width:100%;
    display: flex;
    justify-content: center;
    gap:20px;
    align-items: center;
    margin: 20px 0px;
    width: 100%;
  }
  .result-key .result-key-box {
    width: 50px;
    height: 40px;
  }

  .result-key-box-cont div{
    margin-left:10px;
  }

  .result-key-box-cont{
    display: flex;
    justify-content: center;
    text-align: left;
    align-items: center;
    gap: 12px;
    font-size: 12px;
    margin: 0 12px;
  } 
     
  .acmg-box{
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 5px;
  }

  .result-key-box-cont p{
    margin: 0px !important;
  }

  .pathogenic { background-color: #CE5B5B; color: white; }
  .vus { background-color: #f0ad4e; color: white; }
  .negative { background-color: #26B586; color: white; }
  .table-custom th {
    background-color: #0E709B;
    color: white;
    font-size: 16px;
  }
  .table-custom td {
    /* background-color: #f7f7f7; */
    background-color: transparent !important;
  }
  .footer {
    text-align: right;
    font-size: 12px;
    color: #999;
    margin-top: 20px;
  }

  .box-conatiner {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; 
    gap: 10px; 
  }
  

  .box-conatiner .box-1{
    flex-basis: 33%;
  }

  .box-conatiner .card-body {
    padding: 0px !important;
  }

  .box-conatiner .card-body p{
    margin: 0px !important;    
    padding: 5px  8px !important;
  }

  .box-conatiner .card-body p:not(:last-child){
     border-bottom: 1.3px solid #0E709B;
  }

  .card-header-custom{
    padding: 10px;
    color: #fff;
  }

  .table-custom tbody{
    font-size: 13px !important;
    line-height: 22px !important;
  }

  .table-custom thead{
    font-size: 16px !important;
  }
  /* General Table Styles */
.table {
  width: 100%;
  color: #212529;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border: 1px solid #dee2e6;
}

/* Striped Table Rows */
.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}

/* Custom table styles */
.table-custom {
  border: 1px solid black;
  border-collapse: collapse;
}

.table-custom th,
.table-custom td {
  border: 1px solid black;
  padding: 13px 20px;
  text-align: left;
}

.table-custom th {
  font-weight: bold;
}

/* Table Row Styles */
.table-custom tr {
  border-top: none;
}

.table-custom tr td {
  background: transparent;
}

/* Specific Background Colors for ACMG Classification */
.acmg-likely-pathogenic {
  background-color: orange;
}

.acmg-pathogenic {
  background-color: red;
}

.acmg-uncertain-significance {
  background-color: yellow !important;
}

/* Font and Text Styles */
.varinat-tite{
  font-size:18px;
  font-weight: lighter;
}

.mt-4 {
  margin-top: 0.9rem;
}

.mb-0 {
  margin-bottom: 0;
}

/* Gene Info Table Custom Styling */
.table-custom .gene-info td {
  background: transparent;
  color: rgb(255, 107, 107);
}

.table-custom .gene-info td span {
  color: rgb(255, 107, 107);
}

.table-custom .variant-interpretation p {
  margin-top: 1.5rem;
  font-size: 16px;
}

/* Font Sizes */
.font-weight-400 {
  font-weight: 400;
}

.font-size-14 {
  font-size: 14px;
}

.table-para{
    padding: 7px 9px; 
    line-height: 16px;
}

/* Responsive Styles for Tables */
@media (max-width: 768px) {
  .table-custom th,
  .table-custom td {
    padding: 10px;
  }

  .font-size-15 {
    font-size: 14px;
  }
}

  @media screen and (max-width: 1100px) {
    .result-key-box-cont {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 8px;
        flex-direction: column;
    }
}
    </style>
  </head>
  <body>
      ${htmlContent}
  </body>
  </html>`;

  

  if (!htmlContent) {
    console.error("Failed to extract HTML content");
    return;
  }

  this.apiService.generatePdf(htmlContent).subscribe({
    next: (res: any) => {
      console.log('PDF generated successfully');
      console.log(res);
        const formData = new FormData();
  
      if (res instanceof ArrayBuffer) {
        try {
          const blob = new Blob([res], { type: 'application/pdf' });

          const file = new File([blob], 'pdf-1.pdf'); 
  
          formData.append('file', file);
  
          console.log(blob);
          saveAs(blob, 'pdf-1.pdf');

        } catch (error) {
          console.error('Error handling the ArrayBuffer response:', error);
        }
      } else {
        console.error('Expected ArrayBuffer, but got:', typeof res);
      }
    },
    error: (err) => {
      console.error('Error generating PDF', err);
    },
  });
}


// Function to parse HTML content into pdfMake content format
htmlToPdfMakeContent(html: string) {
  // This function is a basic example of converting HTML into a pdfMake format.
  // You may need to enhance this function to handle more complex HTML structures.
  
  // Replace <h1>, <h2>, <p> with appropriate pdfMake objects
  return html
      .replace(/<h1>(.*?)<\/h1>/g, (match, p1) => {
          return `{ text: '${p1}', style: 'heading' }`;
      })
      .replace(/<h2>(.*?)<\/h2>/g, (match, p1) => {
          return `{ text: '${p1}', style: 'subheading' }`;
      })
      .replace(/<p>(.*?)<\/p>/g, (match, p1) => {
          return `{ text: '${p1}' }`;
      });
}


  loadData(){
    if (this.accessionId) { // Ensure analysisId is not null or undefined
      this.apiService.getPatientVariantsPdf1(this.accessionId).subscribe({
        next: (res : any) => {
          console.log(res);
          this.variantData = res?.variants
          this.patientDetail = {
            patientRace : res?.patient?.Race ?? 'N/A',
            patientFirstName: res?.patient.PatientName?.split(' ')[0] ?? 'N/A',
            patientLastName: res?.patient.PatientName?.split(' ')[1] ?? 'N/A',   
            patientDob: this.datePipe.transform(res?.patient.Dob, 'yyyy-MM-dd') ?? 'N/A',  
            patientGender: res?.patient.Gender ?? 'N/A', 
            AccessionId: res?.swabBarCode?.AccessionId ?? 'N/A', 
            specimenType : res?.patientTests.SpecimenSource ?? 'N/A', 
            specimenReciveDate: this.datePipe.transform(res?.swabBarCode?.ReceivedOn, 'yyyy-MM-dd') ?? 'N/A',  
            physicianName: res?.provider ? res?.provider.Name : 'N/A',  
            reportedDate: this.datePipe.transform(res?.patientTests?.CreatedOn, 'yyyy-MM-dd') ?? 'N/A', 
          };
                            
          console.log(this.patientDetail);
        },
        error: (err) => {
          console.error('Error fetching data', err);
        },
        complete : () => {
          console.log(this.variantData);
          console.log(this.patientDetail);
        }
      });
    } else {
      console.error('Analysis ID is null or undefined.');
    }
  }
}
