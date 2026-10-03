import { Component, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StoryLine, toStoryLines } from '../../services/story-syntax';

@Component({
  selector: 'storyarea',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './storyarea.component.html',
  styleUrl: './storyarea.component.scss'
})
export class StoryareaComponent implements OnInit {
  @Input({required: true}) control!: FormControl;
  @Input() placeholder = '';
  readonly lines = signal<StoryLine[]>([]);
  readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(startWith(this.control.value), takeUntilDestroyed(this.destroyRef))
      .subscribe(value => this.lines.set(toStoryLines(value ?? '')));
  }
}
