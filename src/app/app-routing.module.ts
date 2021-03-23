import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { RentRequestComponent } from './components/rent-request/rent-request.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'images/car/:carId', component: CarImageComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/:carId', component: CarComponent },
  { path: 'brands', component: BrandComponent },
  { path: 'images', component: CarImageComponent },
  { path: 'color', component: ColorComponent },
  { path: 'rentals', component: RentalComponent },
  { path: 'carImages', component: CarImageComponent },
  { path: 'cars/filter/:filterColor/:filterBrand', component: CarComponent },
  { path: 'rental/:rentCarId/:rentType', component: RentRequestComponent },
];

// 0 - Neyi Filtreliyorum : [Arabaları] neye göre filtre uygulayacağım [Markasına] göre
// 1 - Marka HTML inde click eventi oluşturulup componente current ile baglanacak (click)=""
// 2 - Componente setCurrent ile filtrelenmek istenen nesne modeline göre gönderilecek (click)="setCurrentMarka(marka)" 
//     # burda marka zaten ngfor ile html de dönüyor.
// 3 - Componenette oluşturduğumuz değişkene bağladık veriyi gonderdik. gonderdiğimiz veriyi tekrar htmle standart {{marka.id}} ile çektik
// 4 - Çektiğimiz id bize link oluşturmada yarayacak. Link Yine filtre uygulanacak HTML de olacak yani [Marka]
// 5 - routerLink="Filtrelenecek_Olan/Filtre/Filtrenin ID si adı vs"
//     # routerLink="arabalar/markası/markaNo"
//     # routerLink="cars/brand/{{brand.Id}}" setCurrent muhabbetini sırf buraya degisken linki gonderebilmek icin alıyoruz.
//        # Tıklayıp event olusturulup id kaydediliyor ve aynı anda alınıp verdigimiz critere göre link olusturuluyor.
// 6 - Olusturulan Linkin karşılı app-routing.module de kaydediliyor.
//     # path: 'cars/brand/:brandId', component: CarComponent
//             Filtrelenen/biltresi , karşılığı Filtrelenen componentinde olacak
// 7 - Filtrelenen componentine giderek OnInitinde kontrolumuzu yapıyoruz.
//     # eger activatedRoute parametreleri içerisinde app-route.module de değişken olarak tuttuğumuz değer varmı if (params['brandId'])
//     # varsa gelen parametre deger ile bu methodu çalıştır diyoruz ve filtreleme işi bitiyor.

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
