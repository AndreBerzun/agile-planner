import { Directive, ElementRef, HostListener, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { format, parse } from 'date-fns';
import { dateFormat } from '../../services/constants';

@Directive({
  selector: 'input[type="date"]',
  standalone: true
})
export class DateFormatterDirective {
  constructor(
    private el: ElementRef<HTMLInputElement>,
    @Optional() @Self() private control: NgControl
  ) {
    this.control?.valueChanges?.subscribe(value => this.formatDisplayValue(value));
    setTimeout(() => this.formatDisplayValue(this.control?.value));
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.stopPropagation();
    this.el.nativeElement.showPicker();
  }

  private formatDisplayValue(dateValue?: string) {
    if (!dateValue) {
      return;
    }

    const date = parse(dateValue, 'yyyy-MM-dd', new Date());
    if (!isNaN(date.getTime())) {
      const formattedDate = format(date, dateFormat);
      this.el.nativeElement.setAttribute('data-formatted-date', formattedDate);
    }
  }
}
