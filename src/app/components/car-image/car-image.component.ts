import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailsDto } from 'src/app/models/Dto/carDetailDto';
import { CarImageService } from 'src/app/services/car-image.service';
import { HttpClient } from '@angular/common/http';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css'],
})
export class CarImageComponent implements OnInit {
  images: CarImage[];
  carImages: CarImage[];
  carDetails: CarDetailsDto[];
  imageObject: Array<object> = [];
  dataLoaded = false;
  defaultImgPath: string;
  selectedFile: File;
  currentCarId: string;
  fileSelected: boolean = false;
  noImage: string =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';

  constructor(
    private carImageService: CarImageService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getImagesByCarId(params['carId']);
        this.getCarDetailsById(params['carId']);
        this.currentCarId = params['carId'];
      } else {
        console.log('New Method Should be Iplemented');
        this.getImages();
      }
    });
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

  // onUpload(){
  //   const formData = new FormData();
  //   formData.append('image',this.selectedFile,this.selectedFile.name)
  //   formData.append('carId',this.currentCarId)
  //   this.httpClient.post('https://localhost:44327/api/carImages/add',formData).subscribe(response => {
  //     console.log(response)
  //   })
  // }
}
