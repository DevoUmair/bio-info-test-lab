import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { BioInfoColumnFillterComponent } from './bio-info-column-fillter/bio-info-column-fillter.component';

interface AcmgClassificationData {
  AcmgClassification: string;
}

interface VariantWithAnalysisData {
  Id: number;
  Variant: string;
  VariantType: string;
  Chrom: string;
  RefSeq: string;
  Position?: number;
  HgvsNotation: string;
  HgvsProtein: string;
  HgvsCoding: string;
  ExonLocation: string;
  GeneSymbol: string;
  AcmgClassification: string;
  RsId: string;
  CreatedAt?: string; // Handling as string for date
  AnalysisId: number;
  VariantId: number;
  Coverage: string;
  AllelicBalance: string;
  Zygosity: string;
  AcmgRules: string;
  AcmgScore: string;
}

@Component({
  selector: 'app-bio-info-variant',
  templateUrl: './bio-info-variant.component.html',
  styleUrls: ['./bio-info-variant.component.css']
})
export class BioInfoVariantComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [];
  allColumns: string[] = [
    'Variant', 'VariantType', 'Chrom', 'RefSeq', 'Position', 
    'HgvsNotation', 'HgvsProtein', 'HgvsCoding', 'ExonLocation', 
    'GeneSymbol', 'AcmgClassification', 'RsId', 'CreatedAt', 
    'Coverage', 'AllelicBalance', 
    'Zygosity', 'AcmgRules', 'AcmgScore'
  ];
  checkedColumn: string[] = [];

  accesionId: string | null = null;
  dataSource: MatTableDataSource<VariantWithAnalysisData> = new MatTableDataSource<VariantWithAnalysisData>();
  recordOptions = [10, 40, 80, 120, 200, 300];
  recordsToShow = this.recordOptions[0];
  TotalRecords: number = 0;
  noDataFound: boolean = true;
  offset: number = 0;
  pageSize: number = this.recordsToShow;
  loader: boolean = false;
  selectedAcmgClassification: string = 'All'; 

  uniqueAcmgClassifications: AcmgClassificationData[] = [];

  @ViewChild(MatPaginator, { static: false }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort?: MatSort;

  constructor(private apiService: ApiService, public matDialog: MatDialog , private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getUniqueAcmgClassification();
    this.checkedColumn = this.allColumns; // Start with all columns checked
    this.displayedColumns = [...this.checkedColumn]; // Initialize displayedColumns
    this.route.paramMap.subscribe(params => {
      this.accesionId = params.get('id'); // 'id' is the name of the route parameter
      console.log(params.get('id'));
      this.loadData()
    });
  }

  getUniqueAcmgClassification() {
    this.apiService.getUniqueAcmgClassification().subscribe({
      next: (res: any) => {
        this.uniqueAcmgClassifications = res;
        this.uniqueAcmgClassifications.unshift({ AcmgClassification: 'All' });
        console.log(this.uniqueAcmgClassifications);
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  loadData(): void {
    this.loader = true;
    this.dataSource.data = [];
    if(this.accesionId != null){
      this.apiService.getVarinatDataBioInformatica(this.accesionId, this.offset, this.pageSize, this.selectedAcmgClassification).subscribe({
        next: (res: any) => {
          if (res && res.Data && Array.isArray(res.Data)) {
            this.dataSource.data = res.Data;
            this.TotalRecords = res.Count;   
            this.noDataFound = false;
          } else {
            this.noDataFound = true;
          }
        },
        error: (err) => {
          console.log(err);
          this.noDataFound = true;
          this.loader = false;
        },
        complete: () => {
          this.loader = false;
        }
      });
    }
  }

  openFillterDialog() {
    const dialogRef = this.matDialog.open(BioInfoColumnFillterComponent, {
      width: '1000px',
      data : this.checkedColumn
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Selected columns:', result);
      this.checkedColumn = result || []; // Update checked columns
      this.displayedColumns = this.checkedColumn.length > 0 ? this.checkedColumn : this.allColumns; // Ensure at least one column is displayed
    });
  }

  serahcVarinats(){
    this.loadData();
  }

onPageSizeChange(event: any): void {
    this.recordsToShow = event.value;
    if (this.paginator) {
      this.paginator.pageSize = this.recordsToShow;
    }
    this.loadData();
  }

  onPaginateChange(event: any): void {
    this.pageSize = event.pageSize;
    this.offset = event.pageIndex * this.pageSize;
    console.log(this.pageSize);
    console.log(this.offset);
    this.loadData();
  }

getSelectedAcmgClassification(): void {
    console.log('Selected Acmg Classification:', this.selectedAcmgClassification);
    this.loadData()
  }


}
