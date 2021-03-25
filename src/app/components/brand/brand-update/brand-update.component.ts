import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css'],
})
export class BrandUpdateComponent implements OnInit {
  brandUpdateForm: FormGroup;
  brand:Brand;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.getBrandById(params['brandId']);
    })
  }

  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      id:[this.brand.id, Validators.required],
      brandName:[this.brand.brandName, Validators.required]
    })
  }

  getBrandById(brandId: number) {
    this.brandService.getBrandById(brandId).subscribe(response=>{
      this.brand = response.data;
      this.createBrandUpdateForm();
    })
  }

  updateBrand(){
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({},this.brandUpdateForm.value);
      this.brandService.updateBrand(brandModel).subscribe((response) => {
        this.toastrService.success(response.message,"Operation Successfull");
      },responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Something Wrong");
          }
        }
      })
    } else {
      this.toastrService.error("Form Information Empty Or Invalid Please Check Again","Invalid Information");
    }
  }

  updateBrandorg(){
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({},this.brandUpdateForm.value);
      this.brandService.updateBrand(brandModel).subscribe((response) => {
        this.toastrService.success(response.message,"Operation Successfull");
      },responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Something Wrong");
          }
        }
      })
    } else {
      this.toastrService.error("Form Information Empty Or Invalid Please Check Again","Invalid Information");
    }
  }

}
