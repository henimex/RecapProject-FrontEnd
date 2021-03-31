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
import { HttpClientModule } from '@angular/common/http';
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
    ColorFilterPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgImageSliderModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      progressBar: true,
      
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
