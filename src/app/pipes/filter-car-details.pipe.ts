import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailsDto } from '../models/Dto/carDetailDto';

@Pipe({
  name: 'filterCarDetails'
})
export class FilterCarDetailsPipe implements PipeTransform {

  transform(value: CarDetailsDto[], filterTextBrand: string, filterTextColor: string): CarDetailsDto[] {
    
    filterTextBrand = filterTextBrand ? filterTextBrand.toLocaleLowerCase() : '';
    filterTextColor = filterTextColor ? filterTextColor.toLocaleLowerCase() : '';
    
    if (filterTextBrand) {
      return filterTextBrand
      ? value.filter(
          (x: CarDetailsDto) =>
            x.brandName.toLocaleLowerCase().indexOf(filterTextBrand) !== -1
        )
      : value;
    } else if (filterTextColor != null) {
      return filterTextColor
      ? value.filter(
          (x: CarDetailsDto) =>
            x.colorName.toLocaleLowerCase().indexOf(filterTextColor) !== -1
        )
      : value;
    } else {
      return value;
    }
  }
}
