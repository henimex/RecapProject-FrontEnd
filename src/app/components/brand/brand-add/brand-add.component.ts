import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css'],
})
export class BrandAddComponent implements OnInit {
  brandAddForm: FormGroup;

  constructor(
    private brandService: BrandService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createBqrandAddForm();
  }

  createBqrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      brandName:['', Validators.required]
    })
  }

  addNewBrand(){
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({},this.brandAddForm.value);
      this.brandService.addBrand(brandModel).subscribe((response) => {
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
  


  //--endregion
}


//#region Refactoring
// brandAddForm: FormGroup;
//   isSubmited = false;
//   brands: Brand[];

//   constructor(
//     private brandService: BrandService,
//     private toastrService: ToastrService,
//     private formBuilder: FormBuilder
//   ) {}

//   ngOnInit(): void {
//     this.createBrandAddForm();
//     this.getAllBrands();
//   }

//   createBrandAddForm() {
//     this.brandAddForm = this.formBuilder.group({
//       id: [0],
//       brandName: ['', Validators.required],
//       is_active: [1],
//     });
//   }

//   get _fc() {
//     return this.brandAddForm.controls;
//   }

//   save() {
//     this.isSubmited = true;
//     if (this.brandAddForm.valid) {
//       let id = this.brandAddForm.controls.id.value;
//       if (!id) {
//         this.brandService.addBrand(this.brandAddForm.value).subscribe(
//           (response) => {
//             this.toastrService.success(response.message, 'Brand Added');
//             this.reset();
//           },
//           (responseError) => {
//             if (responseError.error.Errors.length > 0) {
//               console.log(responseError.error.Errors);
//               for (let i = 0; i < responseError.error.Errors.length; i++) {
//                 this.toastrService.error(
//                   responseError.error.Errors[i].ErrorMessage,
//                   'Errors'
//                 );
//               }
//             }
//           }
//         );
//       }
//     } else {
//       return;
//     }
//   }

//   reset() {
//     this.brandAddForm.reset();
//     this.brandAddForm.controls.is_active.setValue(1);
//     this.isSubmited = false;
//   }

//   getAllBrands() {
//     this.brandService.getBrands().subscribe((response) => {
//       this.brands = response.data;
//     });
//   }

//   edit(id:number){
//     if (id) {
//       const brand = this.brands.find(x=>x.id===id);
//         if (!brand) return;

//       this.brandService.getBrandById(id).subscribe((response) => {
//         Object.keys(this.brandAddForm.controls).forEach(key => {
//           //this.brandAddForm.controls[key].setValue(response[key]);
//         });
//       })
//     }
//   }

//   delete(id:number){

//   }
//#endregion
