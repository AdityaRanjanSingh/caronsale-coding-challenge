import { Pipe, PipeTransform, NgModule } from '@angular/core';

@Pipe({
  name: 'transformFuel'
})
export class TransformFuelPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    switch (value) {
      case 0:
        return 'Petrol';
      case 1:
        return 'Diesel';
      case 2:
        return 'Gas'
    }

  }

}
