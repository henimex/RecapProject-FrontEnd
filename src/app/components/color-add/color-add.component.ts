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
  employeeForm: FormGroup;
  colors: Color[];
  currentColor: Color;
  fullNameLength = 0;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    
    this.initFormv2();
    this.lengthCounter();
    this.jsonValueObserver();

    this.getColors();
    this.createColorAddForm();
    this.createColorUpdateForm();
  }

  //#region Self Codes
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

  deleteColor(color:Color){

  }

  selectedColor(color:Color){
    this.currentColor=color
  }

  update2(color:Color){
    this.colorService.updateColor(color).subscribe((response) =>{
      this.toastrService.success(response.message)
    })
  }
//#endregion

  //---Fresh Start---//

  initFormv1(){
    this.employeeForm = new FormGroup({
      fullName: new FormControl(),
      email: new FormControl(),
      skills: new FormGroup({
        skillName: new FormControl(),
        experienceInYears: new FormControl(),
        proficiency: new FormControl()
      })
    });
  }

  initFormv2(){
    this.employeeForm = this.formBuilder.group({
      fullName:['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
      email:[''],
      skills:this.formBuilder.group({
        skillName:[''],
        experienceInYears:[''],
        proficiency:['beginner'],
      })
    })

    this.colorUpdateForm = this.formBuilder.group({
      colorUName: ['', Validators.required],
      colorUId:['', Validators.required]
    });
  }

  onSubmit():void{
    console.log(this.employeeForm);
    console.log(this.employeeForm.value);
    
    console.log(this.employeeForm.controls.fullName.touched);
    console.log(this.employeeForm.get('fullName').value);
  }

  loadData():void{
    this.employeeForm.setValue({
      fullName: "Ferhat OYGUR",
      email: "henimex@gmail.com",
      skills: {
        skillName: "C Sharp",
        experienceInYears: 5,
        proficiency: "intermediate"
      }
    })
  }

  lengthCounter(){
    this.employeeForm.get('fullName').valueChanges.subscribe((data:any) =>{
      this.fullNameLength = data.length;
    })
  }

  jsonValueObserver(){
    this.employeeForm.valueChanges.subscribe((data:any) =>{
      console.log(JSON.stringify(data))
    })
  }

}
