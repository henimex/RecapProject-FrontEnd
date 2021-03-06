import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgImageSliderModule } from 'ng-image-slider';
import { DiscountPipe } from './pipes/discount.pipe';
import { FilterPipe } from './pipes/filter-brand.pipe';
import { FilterCarDetailsPipe } from './pipes/filter-car-details.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarFilterComponent } from './components/car-filter/car-filter.component';

import { ToastrModule } from 'ngx-toastr';
import { RentRequestComponent } from './components/rent-request/rent-request.component';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { CustomerAddComponent } from './components/customer/customer-add/customer-add.component';
import { PreviewComponent } from './components/preview/preview.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';
import { CustomerUpdateComponent } from './components/customer/customer-update/customer-update.component';
import { ColorFilterPipePipe } from './pipes/color-filter-pipe.pipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RentCheckComponent } from './components/rent-check/rent-check.component';
import { PaymentComponent } from './components/payment/payment.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HelpComponent } from './components/help/help.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AdminComponent } from './components/admin/admin.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { ContactComponent } from './components/about/contact/contact.component';
import { SocialComponent } from './components/about/social/social.component';
import { BankComponent } from './components/about/bank/bank.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CarImageComponent,
    CustomerComponent,
    RentalComponent,
    NaviComponent,
    DiscountPipe,
    FilterPipe,
    FilterCarDetailsPipe,
    CarFilterComponent,
    RentRequestComponent,
    BrandAddComponent,
    CarAddComponent,
    CustomerAddComponent,
    PreviewComponent,
    BrandUpdateComponent,
    ColorAddComponent,
    ColorUpdateComponent,
    CustomerUpdateComponent,
    ColorFilterPipePipe,
    RentCheckComponent,
    PaymentComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HelpComponent,
    AdminComponent,
    CarUpdateComponent,
    ContactComponent,
    SocialComponent,
    BankComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgImageSliderModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      progressBar: true,
      
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
