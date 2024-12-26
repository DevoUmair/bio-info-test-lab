import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {jsPDF} from 'jspdf'
import html2canvas from 'html2canvas'
import { saveAs } from 'file-saver';
import * as html2pdf from 'html2pdf.js';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as htmlToPdfMake from 'html-to-pdfmake';

import { vfs } from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = vfs;

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

  convertHtmlToPdf() {
    const element = document.getElementById('pdf-1') as HTMLElement;
    if (element) {
      html2canvas(element, { allowTaint: true, useCORS: true }).then((canvas: any) => {
        const imgData = canvas.toDataURL("image/jpeg");
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: 'a4', // A4 page size
        });
  
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
  
        // Scale the canvas to fit the page width
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const scaleRatio = pageWidth / imgWidth;
        const scaledHeight = imgHeight * scaleRatio;
  
        let yPosition = 0;
  
        // Loop to divide the canvas into A4-sized chunks
        while (yPosition < imgHeight) {
          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = canvas.width;
          pageCanvas.height = Math.min(canvas.height - yPosition, pageHeight / scaleRatio);
  
          const ctx = pageCanvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(
              canvas,
              0,
              yPosition,
              canvas.width,
              pageCanvas.height,
              0,
              0,
              pageCanvas.width,
              pageCanvas.height
            );
          }
  
          const pageImgData = pageCanvas.toDataURL('image/jpeg');
          pdf.addImage(
            pageImgData,
            'JPEG',
            0,
            0,
            pageWidth,
            pageHeight
          );
  
          yPosition += pageCanvas.height;
  
          // Add a new page if there's more content
          if (yPosition < imgHeight) {
            pdf.addPage();
          }
        }
  
        // Create FormData to send the file
        const formData = new FormData();
  
        setTimeout(() => {
          // Convert the PDF to a blob
          const blob = pdf.output('blob');
          const file = new File([blob], 'pdf-1.pdf'); // Name the PDF file
  
          // Append the file to FormData
          formData.append('file', file);
  
          // Log the blob and trigger file download (if needed)
          console.log(blob);
          saveAs(blob, 'pdf-1.pdf');
        }, 1000);
      }).catch(error => {
        console.error('Error generating PDF:', error);
      });
    } else {
      console.error("Element with id 'pdf-1' not found.");
    }
  }


  convertHtmlToPdf2() {
    console.log("third gen");
    const element = document.getElementById('pdf-1') as HTMLElement; // Replace with your element ID
    if (element) {
      const pdf = new jsPDF({
        unit: 'pt',
        format: 'a4',
        orientation: 'portrait',
      });
  
      const pageWidth = pdf.internal.pageSize.width;
      const pageHeight = pdf.internal.pageSize.height;
      const margin = 10; // Margin in points
      const usablePageHeight = pageHeight - 2 * margin;
  
      // Use html2canvas to render the element
      html2canvas(element, {
        scale: 2, // Increase scale for better quality
        useCORS: true, // Allow cross-origin images
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pageWidth - 2 * margin; // Account for margins
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
        let position = 0;
  
        // Add content to PDF page by page
        while (position < imgHeight) {
          pdf.addImage(
            imgData,
            'PNG',
            margin,
            margin - position,
            imgWidth,
            imgHeight
          );
          position += usablePageHeight;
          if (position < imgHeight) {
            pdf.addPage(); // Add a new page if content overflows
          }
        }
  
        // Save the PDF
        pdf.save('pdf-1.pdf');
      });
    } else {
      console.error("Element with id 'pdf-1' not found.");
    }
  }

  convertHtmlToPdf3() {
    console.log("third gen");
    const element = document.getElementById('pdf-1') as HTMLElement; // Replace with your element ID
    if (element) {
      const pdf = new jsPDF({
        unit: 'pt',
        format: 'a4',
        orientation: 'portrait',
      });
  
      const pageWidth = pdf.internal.pageSize.width;
      const pageHeight = pdf.internal.pageSize.height;
  
      // Calculate the scaling factor to fit the content within the page width
      const scaleFactor = pageWidth / element.offsetWidth;
  
      // Use the html method of jsPDF to directly add the HTML content
      pdf.html(element, {
        callback: (doc) => {
          // Save the PDF after it's generated
          doc.save('pdf-1.pdf');
        },
        x: 0, // X offset
        y: 10, // Y offset
        width: pageWidth - 10, // Set width to fit within the page minus margins
        html2canvas: {
          scale: scaleFactor, 
          letterRendering: true, 
          useCORS: true, 
          logging: false, 
        },
      });
    } else {
      console.error("Element with id 'pdf-1' not found.");
    }
  }


convertHtmlToPdf4() {
  console.log("third gen");
  const element = document.getElementById('pdf-1') as HTMLElement;
  if (element) {
      // Extract text content from the HTML
      const content = element.innerHTML;

      // Convert HTML content to a structured format compatible with pdfMake
      const formattedContent = this.htmlToPdfMakeContent(content);

      // Define the document structure for pdfMake
      const documentDefinition = {
          content: formattedContent,
          styles: {
              heading: {
                  fontSize: 14,
                  bold: true,
                  margin: [0, 0, 0, 0],
              },
              subheading: {
                  fontSize: 12,
                  italics: true,
                  margin: [0, 0, 0, 0],
              },
              defaultStyle: {
                  fontSize: 12,
                  lineHeight: 1.5,
                  margin: [0, 0, 0, 0],
              },
          },
      };

      // Generate PDF with the content and styles
      pdfMake.createPdf(documentDefinition).download('pdf-1.pdf');
  } else {
      console.error("Element with id 'pdf-1' not found.");
  }
}

convertHtmlToPdf5(): void {
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
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style>
      
     .header {
    background-color: transparent;
    color: white;
    padding: 20px 0px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  #pdf-1{
    background: transparent;
    max-width: 1200px;
    width: 100%;
    margin: auto;
    font-family: "Roboto", serif;
  }

  .header img{
    width: 300px;
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
  }

  .gradient-background{
    width: 100%;
    height: 20px;
    background: rgb(33,170,148);
    background: linear-gradient(90deg, rgba(33,170,148,1) 0%, rgba(20,141,189,1) 100%);
  }

  .box-conatiner .card-custom{
    border-radius: 0px !important;
    border:  1px solid #bbbbbb;
  }

  .header-sub p{
    margin: 0px !important;
  }

  .panel-header {
    margin: 20px 0;
    font-size: 24px;
    text-align: left;
  }

  .panel-header h4{
    font-size: 25px;
    font-weight: 500;
    background: -webkit-linear-gradient(rgba(33,170,148,1), rgba(20,141,189,1));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .card-header {
    background-color: #006eab;
    color: #fff;
    font-weight: 700;
    padding: 8px 12px;
    font-size: 16px;
  }

  .card-body{
    font-size: 13px;
  }

  .box-conatiner .card-header{
    border-radius: 0px !important;
  }

  .alert-positive {
    background-color: #d9534f;
    color: white;
    font-weight: 400;
    padding: 15px 22px; 
    text-align: left;
    font-size: 16px;
    border-radius: 25px;
    margin-top: 30px;
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
    height: 50px;
  }

  .result-key-box-cont{
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    gap: 12px;
    flex-direction: column;
    font-size: 14px;
    margin: 0 12px;
  } 

  .result-key-box-cont p{
    margin: 0px !important;
  }

  .pathogenic { background-color: #d9534f; color: white; }
  .vus { background-color: #f0ad4e; color: white; }
  .negative { background-color: #5cb85c; color: white; }
  .table-custom th {
    background-color: #006eab;
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
    padding: 8px 18px !important;
  }

  .box-conatiner .card-body p:not(:last-child){
    border-bottom: 1px solid #bbbbbb;
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
  margin-bottom: 1rem;
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
  font-size:16px;
  font-weight: lighter;
}

.mt-4 {
  margin-top: 1.5rem;
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
      // Ensure the response is an ArrayBuffer and process it
      if (res instanceof ArrayBuffer) {
        try {
          // Create a Blob from the ArrayBuffer with the correct MIME type for PDF
          const blob = new Blob([res], { type: 'application/pdf' });

          const file = new File([blob], 'pdf-1.pdf'); // Name the PDF file
  
          // Append the file to FormData
          formData.append('file', file);
  
          // Log the blob and trigger file download (if needed)
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
