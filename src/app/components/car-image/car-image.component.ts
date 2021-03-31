import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailsDto } from 'src/app/models/Dto/carDetailDto';
import { CarImageService } from 'src/app/services/car-image.service';
import { HttpClient } from '@angular/common/http';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RentalService } from 'src/app/services/rental.service';
import { RentalsDto } from 'src/app/models/Dto/rentalsDto';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';




@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css'],
})
export class CarImageComponent implements OnInit {
  datePickerConfig:Partial<BsDatepickerConfig>;
  images: CarImage[];
  carImages: CarImage[];
  carDetails: CarDetailsDto[];
  imageObject: Array<object> = [];
  dataLoaded = false;
  defaultImgPath: string;
  selectedFile: File;
  currentCarId: string;
  carId:number;
  fileSelected: boolean = false;
  noImage: string ='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';
  rentable: boolean = false;
  rentalAddForm: FormGroup;
  rentalDto: RentalsDto[];
  disabledDateList:any[];

  constructor(
    private carImageService: CarImageService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private rentalService: RentalService
  ) {
    this.datePickerConfig = Object.assign( {}, 
      {
        containerClass:'theme-orange', 
        showWeekNumbers:false,
        minDate:new Date(2021,0,1),
        rangeInputFormat: 'DD-MM-YYYY',
        showClearButton:true
      });      
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getImagesByCarId(params['carId']);
        this.getCarDetailsById(params['carId']);
        this.getDisabledDates(params['carId'])
        this.carId = parseInt(params['carId']);
        this.createRentAddForm()
      } else {
        console.log('New Method Should be Iplemented');
        this.getImages();
      }
    });

    this.disabledDateList = [
      new Date('2021-03-31'),
      new Date('2021-04-05')
    ];
  }

  checkRentAvailability(){
    console.log("test")
    let rentalModel = Object.assign({},this.rentalAddForm.value);
    console.log(this.rentalAddForm.value)
    console.log(this.rentalAddForm.get("dateRange").value)
    this.rentalService.checkRentAvailability(rentalModel).subscribe(response => {
      console.log(response)
    })
  }

  createRentAddForm(){
    this.rentalAddForm = this.formBuilder.group({
      carId: [this.carId, Validators.required],
      //customerId: ['', Validators.required],
      dateRange: ['', Validators.required],
      daiylPrice: [1, Validators.required]
    })
  }

  getImagesForSlider(carImages: CarImage[]) {
    carImages.forEach((image) => {
      var obj = {
        image: image.imagePath,
        thumbImage: image.imagePath,
        alt: this.noImage,
        title: image.date,
      };
      this.imageObject.push(obj);
    });
  }

  getImages() {
    this.carImageService.getCarImages().subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
      response.data.forEach((image) => {
        var obj = {
          image: image.imagePath,
          thumbImage: image.imagePath,
          alt: this.noImage,
          title: image.date
        };
        this.imageObject.push(obj);
      });
    });
  }

  getImagesByCarId(carId: number) {
    this.carImageService.getCarImageByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
      this.getImagesForSlider(this.carImages);
      if (this.carImages[0].carId == 0) {
        this.defaultImgPath = this.carImages[0].imagePath;
        console.log('Yesss');
      }
    });
  }

  setCurrentImage(image: CarImage) {
    //this.currentImage = image;
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    this.fileSelected = true;
  }

  onUpload() {
    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
    formData.append('carId', this.currentCarId);
    this.httpClient
      .post('https://localhost:44327/api/carImages/add', formData)
      .subscribe((response) => {
        console.log(response);
      });
  }

  UpbloadImage() {
    this.carImageService.uploadCarImage2(this.currentCarId, this.selectedFile);
  }

  getCarDetailsById(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  rentRequest(){
    this.toastrService.success("Start Rental","RENT")
  }

  getDisabledDates(carId:number){
    //ulen ne ugrastım seninle be teh...
    this.rentalService.getDisabledDates(carId).subscribe((response:any[]) => {
      for (let i = 0; i < response.length; i++) {
        this.disabledDateList.push(new Date (response[i].toString()))
      }
    })
  }
}
