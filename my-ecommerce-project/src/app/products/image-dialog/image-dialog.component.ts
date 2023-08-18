import { Component, Inject, OnInit } from '@angular/core';
import {  MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent implements OnInit {

  imageIndex: number = 0;
  data:any;
  variantIndex:any;

  constructor(@Inject(MAT_DIALOG_DATA) public variantData: any) { }


  ngOnInit(): void {
    this.variantIndex = this.variantData.variantIndex;
    this.data = this.variantData.data;
  }


  changeImage(index: number) {
    this.imageIndex = index;
  }
}