import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css'],
})
export class CarImageComponent implements OnInit {
  images: CarImage[];
  carImages: CarImage[];
  dataLoaded = false;
  defaultImgPath: string;
  selectedFile: File;
  currentCarId: string;

  
  constructor(
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {

    let image1 = {  
      id: 1,
      carId: 2,
      imagePath: ".\\Assets\\CarImages\\cd821de38bf9498992fa5cd9d1b56002.jpg",
      date: '2021-03-15 13:47:27.367'}
  
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getImagesByCarId(params['carId']);
        this.currentCarId = params['carId'];
      } else {
        console.log('New Method Should be Iplemented');
        this.getImages();
      }
    });
  }

  getImages() {
    this.carImageService.getCarImages().subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
      
      //let rep = 'E:\\Apps\\Angular\\RecapProject-FrontEnd\\src';
      //this.carImages = response.data.map(imagePath => imagePath.replace(rep, '.').replace('\\', '/'));

      // response.data.forEach(x => {
      //   x.imagePath = x.map(x.imagePath.replace(rep,"."))
      //   console.log(response.data)
      // });
      // this.carImages = response.data;
      // this.dataLoaded = true;

      //console.log("son"+response.data)

      // for (let index = 0; index < response.data.length; index++) {
      //   const element = response.data[index];
      //   element.imagePath.replace(rep,".")
      // }

      // response.data.forEach((image) => {
      //   console.log(image.imagePath)
      //   console.log("edited"+image.imagePath.replace(rep,"."))
      //   image.imagePath.replace(rep,".")
      // });

      // this.carImages = response.data;
    });
    
  }

  getImagesByCarId(carId: number) {
    this.carImageService.getCarImageByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
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

  // onUpload(){
  //   const formData = new FormData();
  //   formData.append('image',this.selectedFile,this.selectedFile.name)
  //   formData.append('carId',this.currentCarId)
  //   this.httpClient.post('https://localhost:44327/api/carImages/add',formData).subscribe(response => {
  //     console.log(response)
  //   })
  // }
}
