import { Component } from '@angular/core';
import { StorageService } from '../../../shared/services/storage.service';

@Component({
  selector: 'app-storage',
  imports: [],
  templateUrl: './storage.component.html'
})
export class StorageComponent {
  constructor(private readonly storageService: StorageService) {
  }

  exportData(): void {
    const dataStr = this.storageService.exportState();
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `agile-planner-backup-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  clearData(): void {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      this.storageService.clearState();
      window.location.reload();
    }
  }

  importData(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');

        reader.onload = (readerEvent) => {
          try {
            const content = readerEvent.target?.result as string;
            this.storageService.importState(content);
            window.location.reload(); // Reload to reflect changes
          } catch (error) {
            console.error('Error importing data:', error);
            alert('Invalid data format. Could not import.');
          }
        };
      }
    };

    input.click();
  }
}
