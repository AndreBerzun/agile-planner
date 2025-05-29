import { Component, Input } from '@angular/core';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'retro-datepicker',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './retro-datepicker.component.html',
  styleUrl: './retro-datepicker.component.scss'
})
export class RetroDatepickerComponent {
  @Input({required: true}) control!: FormControl;
  @Input() placeholder = '';
}
