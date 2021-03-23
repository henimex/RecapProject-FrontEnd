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
import { NgImageSliderModule } from 'ng-image-slider';
import { DiscountPipe } from './pipes/discount.pipe';
import { FilterPipe } from './pipes/filter-brand.pipe';
import { FilterCarDetailsPipe } from './pipes/filter-car-details.pipe';
import { FormsModule } from '@angular/forms';
import { CarFilterComponent } from './components/car-filter/car-filter.component';



@NgModule({
  declarations: [	
    AppComponent, CarComponent, BrandComponent, ColorComponent, CarImageComponent, CustomerComponent, RentalComponent, NaviComponent, DiscountPipe, FilterPipe, FilterCarDetailsPipe, CarFilterComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgImageSliderModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
