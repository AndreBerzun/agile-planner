import { Pipe, PipeTransform } from '@angular/core';
import { interval, map, Observable, switchMap, take } from 'rxjs';

@Pipe({
  name: 'calculation',
  standalone: true
})
export class CalculationPipe implements PipeTransform {
  private readonly CALCULATING_STEPS = ['|', '/', '--', '\\', '|', '/'];
  private readonly STEP_DELAY = 100;

  transform<T>(value$: Observable<T>): Observable<string | T> {
    return value$.pipe(
      switchMap(value => {
        const values = [...this.CALCULATING_STEPS, value];
        return interval(this.STEP_DELAY).pipe(
          take(values.length),
          map(index => values[index])
        );
      }),
    );
  }
}
