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
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent implements OnInit {
  employeeForm: FormGroup;
  fullNameLength = 0;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initFormv2();
    this.lengthCounter();
    this.jsonValueObserver();
  }

  initFormv1() {
    this.employeeForm = new FormGroup({
      fullName: new FormControl(),
      email: new FormControl(),
      skills: new FormGroup({
        skillName: new FormControl(),
        experienceInYears: new FormControl(),
        proficiency: new FormControl(),
      }),
    });
  }

  initFormv2() {
    this.employeeForm = this.formBuilder.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
        ],
      ],
      email: [''],
      skills: this.formBuilder.group({
        skillName: [''],
        experienceInYears: [''],
        proficiency: ['beginner'],
      }),
    });
  }

  onSubmit(): void {
    console.log(this.employeeForm);
    console.log(this.employeeForm.value);

    console.log(this.employeeForm.controls.fullName.touched);
    console.log(this.employeeForm.get('fullName').value);
  }

  loadData(): void {
    this.employeeForm.setValue({
      fullName: 'Ferhat OYGUR',
      email: 'henimex@gmail.com',
      skills: {
        skillName: 'C Sharp',
        experienceInYears: 5,
        proficiency: 'intermediate',
      },
    });
  }

  lengthCounter() {
    this.employeeForm.get('fullName').valueChanges.subscribe((data: any) => {
      this.fullNameLength = data.length;
    });
  }

  jsonValueObserver() {
    this.employeeForm.valueChanges.subscribe((data: any) => {
      console.log(JSON.stringify(data));
    });
  }
}
