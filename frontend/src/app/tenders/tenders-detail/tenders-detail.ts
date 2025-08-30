import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../core/api.service';
import { MATERIAL_IMPORTS } from '../../../shared/material';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tenders-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...MATERIAL_IMPORTS],
  templateUrl: './tenders-detail.html'
})
export class TendersDetailComponent implements OnInit {
  tenderId!: string;
  tender: any = null;
  detalle = new MatTableDataSource<any>([]);
  products: any[] = [];
  addForm: any;

  displayedColumns = [
    'product_sku',
    'nombre',
    'cantidad',
    'precio_unitario',
    'costo_unitario',
    'margen_unitario',
    'margen_total'
  ];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    // Inicializa el formulario
    this.addForm = this.fb.group({
      product_sku: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precio_unitario: [0, [Validators.required, Validators.min(0.01)]]
    });

    // Obtén el ID de la ruta
    this.tenderId = this.route.snapshot.paramMap.get('id') || '';
    console.log('Tender ID:', this.tenderId);

    // Carga la data
    await this.loadAll();
  }

  async loadAll() {
    try {
      const result = await this.api.getTenderDetail(this.tenderId);
      console.log('Resultado API tender:', result);

      // Ajuste clave: extraer la propiedad 'tender'
      this.tender = result.tender;  
      this.detalle.data = result.detalle || [];

      this.products = await this.api.getProducts();
      console.log('Productos cargados:', this.products);

      this.cd.detectChanges();
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }

  findProduct(sku: string) {
    return this.products.find(p => p.sku === sku) || null;
  }

  get margenTotal() {
    return this.detalle.data.reduce(
      (s, it) => s + (Number(it.margen_total) || 0),
      0
    );
  }

async onAddOrder() {
  if (this.addForm.invalid) {
    this.addForm.markAllAsTouched();
    return alert('Por favor complete todos los campos correctamente');
  }

  const vals = this.addForm.value;
  const prod = this.findProduct(vals.product_sku!);
  if (!prod) return alert('Seleccione un producto válido');

  if (Number(vals.precio_unitario) <= Number(prod.costo)) {
    return alert('El precio debe ser mayor que el costo');
  }

  const payload = {
    tender_id: this.tenderId,
    product_sku: vals.product_sku,
    cantidad: Number(vals.cantidad),
    precio_unitario: Number(vals.precio_unitario)
  };

  try {
    const newOrder = await this.api.createOrder(payload);

    if (!newOrder || !(newOrder as any)?.id) {
      // Si la API no devuelve un id, consideramos que no se pudo agregar
      return alert('No se pudo agregar la orden. Intente nuevamente.');
    }

    const costo = Number(prod.costo);
    const precio_unitario = Number(payload.precio_unitario);
    const margen_unitario = precio_unitario - costo;
    const margen_total = margen_unitario * Number(payload.cantidad);

    this.detalle.data = [
      ...this.detalle.data,
      {
        id: (newOrder as any).id,
        product_sku: payload.product_sku,
        nombre: prod.nombre,
        cantidad: payload.cantidad,
        precio_unitario,
        costo_unitario: costo,
        margen_unitario,
        margen_total
      }
    ];

    this.addForm.reset({
      product_sku: '',
      cantidad: 1,
      precio_unitario: 0
    });
  } catch (error) {
    console.error('Error al agregar orden:', error);
    alert('Ocurrió un error al agregar la orden. Por favor intente nuevamente.');
  }
}

}
