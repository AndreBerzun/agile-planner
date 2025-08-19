import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export type Backlog = {
  id: string;
  rawInput?: string;
  expanded: boolean;
}

export type BacklogFormModel = { [K in keyof Backlog]: FormControl<Backlog[K] | null> };

export function createBacklogForm(fb: FormBuilder, backlog: Backlog): FormGroup<BacklogFormModel> {
  return fb.group<BacklogFormModel>({
    id: fb.control(backlog.id),
    rawInput: fb.control(backlog.rawInput),
    expanded: fb.control(backlog.expanded ?? true)
  });
}

export function backlogFromForm(form: FormGroup<BacklogFormModel>): Backlog {
  return {
    id: form.value.id!,
    rawInput: form.value.rawInput ?? undefined,
    expanded: form.value.expanded ?? true
  };
}
