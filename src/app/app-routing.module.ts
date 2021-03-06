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

// 0 - Neyi Filtreliyorum : [Arabalar??] neye g??re filtre uygulayaca????m [Markas??na] g??re
// 1 - Marka HTML inde click eventi olu??turulup componente current ile baglanacak (click)=""
// 2 - Componente setCurrent ile filtrelenmek istenen nesne modeline g??re g??nderilecek (click)="setCurrentMarka(marka)" 
//     # burda marka zaten ngfor ile html de d??n??yor.
// 3 - Componenette olu??turdu??umuz de??i??kene ba??lad??k veriyi gonderdik. gonderdi??imiz veriyi tekrar htmle standart {{marka.id}} ile ??ektik
// 4 - ??ekti??imiz id bize link olu??turmada yarayacak. Link Yine filtre uygulanacak HTML de olacak yani [Marka]
// 5 - routerLink="Filtrelenecek_Olan/Filtre/Filtrenin ID si ad?? vs"
//     # routerLink="arabalar/markas??/markaNo"
//     # routerLink="cars/brand/{{brand.Id}}" setCurrent muhabbetini s??rf buraya degisken linki gonderebilmek icin al??yoruz.
//        # T??klay??p event olusturulup id kaydediliyor ve ayn?? anda al??n??p verdigimiz critere g??re link olusturuluyor.
// 6 - Olusturulan Linkin kar????l?? app-routing.module de kaydediliyor.
//     # path: 'cars/brand/:brandId', component: CarComponent
//             Filtrelenen/biltresi , kar????l?????? Filtrelenen componentinde olacak
// 7 - Filtrelenen componentine giderek OnInitinde kontrolumuzu yap??yoruz.
//     # eger activatedRoute parametreleri i??erisinde app-route.module de de??i??ken olarak tuttu??umuz de??er varm?? if (params['brandId'])
//     # varsa gelen parametre deger ile bu methodu ??al????t??r diyoruz ve filtreleme i??i bitiyor.

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
