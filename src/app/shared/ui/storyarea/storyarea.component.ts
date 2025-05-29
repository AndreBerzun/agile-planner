import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'storyarea',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './storyarea.component.html',
  styleUrl: './storyarea.component.scss'
})
export class StoryareaComponent {
  @ViewChild('textArea') textArea!: ElementRef<HTMLTextAreaElement>;
  @Input({required: true}) control!: FormControl<string | null | undefined>;
  @Input() placeholder = '';

  userInput = '';
  highlightedText = '';

  onInput(): void {
    this.updateHighlight();
    this.autoResize();
  }

  updateHighlight(): void {
    this.highlightedText = this.userInput
      .replace(/^(#+ .*)$/gm, match =>
        `<span class="heading">${match.toUpperCase()}</span>`
      )
      .replace(/\[(\d+)\]/g, (_, num) =>
        `<span class="number">[<span class="white">${num}</span>]</span>`
      );
  }

  autoResize(): void {
    const textarea = this.textArea.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}
