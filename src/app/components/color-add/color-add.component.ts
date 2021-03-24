import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css'],
})
export class ColorAddComponent implements OnInit {
  colorAddForm: FormGroup;
  colorUpdateForm: FormGroup;
  colors: Color[];
  currentColor: Color;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.getColors();
    this.createColorAddForm();
    this.createColorUpdateForm();
  }

  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      colorName: ['', Validators.required],
    });
  }

  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorUName: ['', Validators.required],
      colorUId:['', Validators.required]
    });
  }

  setCurrentColor(color:Color){
    this.currentColor = color;
  }

  addColor() {
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value);
      this.colorService.addColor(colorModel).subscribe((response) => {
        this.toastrService.success(response.message,'Color Added');
      },responseError => {
        if (responseError.error.Errors.length > 0) {
          console.log(responseError.error.Errors)
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Errors");
          }
        }
      });
    } else{
      this.toastrService.error('Check Log files for more details', 'Unknown Error');
    }
  }

  updateColor(color:Color) {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.updateColor(colorModel).subscribe(response => {
        this.toastrService.success(response.message,'Color Updated');
      },responseError => {
        if (responseError.error.Errors.length > 0) {
          console.log(responseError.error.Errors)
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Errors");
          }
        }
      })
    }
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
}
