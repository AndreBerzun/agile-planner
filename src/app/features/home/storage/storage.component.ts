import { Component } from '@angular/core';
import { StorageService } from '../../../shared/services/storage.service';
import { StateService } from '../../../shared/services/state.service';

@Component({
  selector: 'app-storage',
  imports: [],
  templateUrl: './storage.component.html'
})
export class StorageComponent {
  constructor(private readonly storageService: StorageService, private readonly state: StateService) {
  }

  exportData(): void {
    const project = this.state.project;
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(this.storageService.exportProject(project));
    const slug = project.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'project';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `agile-planner-${slug}-${new Date().toISOString().split('T')[0]}.json`);
    linkElement.click();
  }

  deleteProject(): void {
    const name = this.state.project.name || 'this project';
    if (confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      this.state.removeActiveProject();
    }
  }

  importData(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = (event: any) => {
      const file: File | undefined = event.target.files[0];
      if (!file) {
        return;
      }

      file.text().then(content => {
        try {
          this.state.addProject(this.storageService.importProject(content, file.name.replace(/\.json$/i, '')));
        } catch (error) {
          console.error('Error importing data:', error);
          alert('Invalid data format. Could not import.');
        }
      });
    };

    input.click();
  }
}
