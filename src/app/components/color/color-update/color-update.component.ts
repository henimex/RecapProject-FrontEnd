import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdateForm: FormGroup;
  color:Color;
  constructor(
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getColorById(params['colorId']);
    })
  }

  getColorById(colorId:number) {
    this.colorService.getColorById(colorId).subscribe(response => {
      this.color = response.data;
      this.createColorUpdateForm();
    })
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      id: [this.color.id, Validators.required],
      colorName: [this.color.colorName, Validators.required],
    });
  }

  updateColorRefactored(){
    this.colorService.updateColorSolid(this.colorUpdateForm);
  }

}
