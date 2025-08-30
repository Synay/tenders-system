import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/api.service';
import { MATERIAL_IMPORTS } from '../../../shared/material';
import { ProductFormComponent } from '../products-form/products-form';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ...MATERIAL_IMPORTS, ProductFormComponent],
  templateUrl: './products-list.html'
})
export class ProductListComponent implements OnInit {
  private api = inject(ApiService);

  displayedColumns = ['sku', 'nombre', 'costo'];
  dataSource = new MatTableDataSource<any>([]);

  async ngOnInit() { 
    const products = await this.api.getProducts(); 
    this.dataSource.data = products;
  }

  onProductCreated(p: any) { 
    this.dataSource.data = [...this.dataSource.data, p]; 
  }
}
