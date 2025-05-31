import { AfterViewInit, Component, DestroyRef, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'storyarea',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './storyarea.component.html',
  styleUrl: './storyarea.component.scss'
})
export class StoryareaComponent implements AfterViewInit {
  @ViewChild('textArea') textArea!: ElementRef<HTMLTextAreaElement>;
  @Input({required: true}) control!: FormControl;
  @Input() placeholder = '';
  readonly destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    this.control.valueChanges
      .pipe(startWith(this.control.value), takeUntilDestroyed(this.destroyRef))
      .subscribe(this.autoResize.bind(this));
  }

  autoResize(): void {
    const textarea = this.textArea.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}
