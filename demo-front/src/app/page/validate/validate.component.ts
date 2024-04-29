import { Component } from '@angular/core';
import { CardFormComponent } from '../../common/card-form/card-form.component';
import { PickerComponent } from '../../ui/picker/picker.component';
import { ValidateService } from '../../services/validate/validate.service';

@Component({
  selector: 'app-validate',
  standalone: true,
  imports: [CardFormComponent, PickerComponent],
  templateUrl: './validate.component.html',
  styleUrl: './validate.component.css'
})
export class ValidateComponent {

  photo: File | null = null;
  
  constructor(
    private validateService: ValidateService
  ) { }

  onSaveBtn() {
    if (this.photo) {
      this.validateService.validate({ photo: this.photo })
        .subscribe({
          next: (response) => {
            console.log('Response:', response);
          },
          error: (error) => {
            console.error('Error:', error);
          }
        })
    }
  }

}
