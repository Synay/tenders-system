import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from '../../../shared/material';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...MATERIAL_IMPORTS],
  templateUrl: './products-form.html'
})
export class ProductFormComponent {
  @Output() productCreated = new EventEmitter<any>();

  private fb = inject(FormBuilder);
  private api = inject(ApiService);

  form = this.fb.group({
    sku: ['', Validators.required],
    nombre: ['', Validators.required],
    costo: [0, [Validators.required, Validators.min(0)]]
  });

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const val = this.form.value;
    const created = await this.api.createProduct(val);
    this.productCreated.emit(created);

    this.form.reset({ sku: '', nombre: '', costo: 0 });
  }
}
