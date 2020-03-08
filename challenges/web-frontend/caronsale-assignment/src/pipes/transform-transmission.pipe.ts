import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformTransmission'
})
export class TransformTransmissionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 0:
        return 'Automatic';
      case 1:
        return 'Manual'
    }
  }

}
