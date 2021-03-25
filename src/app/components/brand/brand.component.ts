import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[];
  dataLoaded = false;
  currentBrand: Brand;
  filterText:string;
  constructor(private brandService: BrandService,private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  clearFilter() {
    this.currentBrand = { id: 0, brandName: '' };
  }

  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
  }

  getCurrentBrandClass(brand: Brand) {
    if (brand == this.currentBrand) {
      return 'list-group-item list-group-item-action active';
    } else {
      return 'list-group-item list-group-item-action';
    }
  }

  deleteBrand(brand: Brand) {
    this.toastrService.error("Not Iplemented Yet","TODO List Item");
    //TODO:Add Brand Delete Service And Method
    this.brandService.deleteBrand(brand).subscribe(response=>{
      this.toastrService.info(brand.brandName +" Successfully deleted", "Delete Operation")
    })
  }
}
