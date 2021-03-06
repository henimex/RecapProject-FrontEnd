import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankComponent } from './components/about/bank/bank.component';
import { ContactComponent } from './components/about/contact/contact.component';
import { SocialComponent } from './components/about/social/social.component';
import { AdminComponent } from './components/admin/admin.component';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { BrandComponent } from './components/brand/brand.component';

import { CarImageComponent } from './components/car-image/car-image.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';

import { ColorComponent } from './components/color/color.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HelpComponent } from './components/help/help.component';
import { LoginComponent } from './components/login/login.component';
import { NaviComponent } from './components/navi/navi.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentRequestComponent } from './components/rent-request/rent-request.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },

  { path: 'cars', component: CarComponent },
  { path: 'cars/add', component: CarAddComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/:carId', component: CarComponent },
  { path: 'cars/filter/:filterColor/:filterBrand', component: CarComponent },
  
  { path: 'images', component: CarImageComponent },
  { path: 'images/car/:carId/:customerId', component: CarImageComponent, canActivate:[LoginGuard] },
  { path: 'carImages', component: CarImageComponent },

  { path: 'brands', component: BrandComponent },
  { path: 'brands/add', component: BrandAddComponent, canActivate:[LoginGuard] },
  { path: 'brands/brands/add', component: BrandAddComponent },
  { path: 'brands/update/:brandId', component: BrandUpdateComponent },

  { path: 'colors', component: ColorComponent },
  { path: 'colors/add', component: ColorAddComponent,  },
  { path: 'colors/colors/add', component: ColorAddComponent },
  { path: 'colors/update/:colorId', component: ColorUpdateComponent },

  { path: 'rentals', component: RentalComponent, canActivate:[LoginGuard] },
  { path: 'rentals/:rentCarId/:rentType/:customerId', component: RentRequestComponent },
  
  { path: 'payments', component: PaymentComponent },
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  { path: 'navibar', component: NaviComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'help', component: HelpComponent },
  { path: 'bank', component: BankComponent },
  { path: 'social', component: SocialComponent },
  { path: 'contact', component: ContactComponent },
  
  { path: 'admin', component: AdminComponent },
  


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
