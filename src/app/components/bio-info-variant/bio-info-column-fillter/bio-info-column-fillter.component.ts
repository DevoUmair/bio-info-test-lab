import { Component, OnInit, Inject , EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-bio-info-column-fillter',
  templateUrl: './bio-info-column-fillter.component.html',
  styleUrls: ['./bio-info-column-fillter.component.css']
})
export class BioInfoColumnFillterComponent implements OnInit {
  columdDataList: string[] = [
    'Variant', 'VariantType', 'Chrom', 'RefSeq', 'Position', 
    'HgvsNotation', 'HgvsProtein', 'HgvsCoding', 'ExonLocation', 
    'GeneSymbol', 'AcmgClassification', 'RsId', 'CreatedAt', 
    'Coverage', 'AllelicBalance', 
    'Zygosity', 'AcmgRules', 'AcmgScore'
  ];
  checkedColumnList: string[] = [];
  isCheckAll: boolean = true; // Set to true for default checked

  onCloseEvent: EventEmitter<void> = new EventEmitter<void>();
  
  constructor(public dialogRef: MatDialogRef<BioInfoColumnFillterComponent> , @Inject(MAT_DIALOG_DATA) public data: string[]) {
    console.log(data);
  }

  ngOnInit() {
    // Initialize checkedColumnList to include all columns
    this.checkedColumnList = [...this.data];
    if(this.checkedColumnList.length === this.columdDataList.length){
        this.isCheckAll = true
    }else{
      this.isCheckAll = false
    }
  }

  isChecked(item: any): boolean {
    return this.checkedColumnList.includes(item);
  }

  selectFormDataCkecked(event: any, data: any) {
    console.log(data);
    if (event.target.checked) {
      if (data === 'checkall') {
        this.checkedColumnList = [...this.columdDataList];
        this.isCheckAll = true;
        console.log('in check all');
      } else {
        this.checkedColumnList.push(data);
        if (this.checkedColumnList.length === this.columdDataList.length) {
          this.isCheckAll = true;
        }
      }
    } else {
      if (data === 'checkall') {
        this.checkedColumnList = [];
        this.isCheckAll = false;
        console.log('in check all');
      } else {
        const index = this.checkedColumnList.indexOf(data);
        if (index !== -1) {
          this.checkedColumnList.splice(index, 1);
        }
        if (this.checkedColumnList.length !== this.columdDataList.length) {
          this.isCheckAll = false;
        }
      }
    }
    console.log("checked column:", this.checkedColumnList);
    console.log("all column:", this.columdDataList);
  }

  onClose() {
    this.dialogRef.close(this.checkedColumnList);
  }
}
