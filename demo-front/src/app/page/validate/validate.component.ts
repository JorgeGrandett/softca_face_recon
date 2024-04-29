import { Component } from '@angular/core';
import { CardFormComponent } from '../../common/card-form/card-form.component';
import { PickerComponent } from '../../ui/picker/picker.component';

@Component({
  selector: 'app-validate',
  standalone: true,
  imports: [CardFormComponent, PickerComponent],
  templateUrl: './validate.component.html',
  styleUrl: './validate.component.css'
})
export class ValidateComponent {

  photo: File | null = null;
  
  onSaveBtn() {
    console.log('Save button clicked');
  }

}
