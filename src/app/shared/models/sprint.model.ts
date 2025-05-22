import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export type Sprint = {
  id: string;
  startDate?: Date;
  endDate?: Date;
  rawInput?: string;
  storyPoints?: number;
}

export type SprintFormModel = { [K in keyof Sprint]: FormControl<Sprint[K] | null> };

export function createSprintForm(fb: FormBuilder, sprint: Sprint): FormGroup<SprintFormModel> {
  return fb.group<SprintFormModel>({
    id: fb.control(sprint.id),
    startDate: fb.control(sprint.startDate),
    endDate: fb.control(sprint.endDate),
    rawInput: fb.control(sprint.rawInput),
    storyPoints: fb.control(sprint.storyPoints)
  });
}

export function sprintFromForm(form: FormGroup<SprintFormModel>): Sprint {
  return {
    id: form.value.id!,
    startDate: form.value.startDate ?? undefined,
    endDate: form.value.endDate ?? undefined,
    rawInput: form.value.rawInput ?? undefined,
    storyPoints: form.value.storyPoints ?? undefined
  };
}
