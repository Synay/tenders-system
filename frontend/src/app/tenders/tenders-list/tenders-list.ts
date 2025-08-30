import { Component, OnInit } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../core/api.service';
import { MATERIAL_IMPORTS } from '../../../shared/material';
import { MatTableDataSource } from '@angular/material/table';
import localeEs from '@angular/common/locales/es-CL';

// Registrar locale español
registerLocaleData(localeEs);

@Component({
  selector: 'app-tenders-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ...MATERIAL_IMPORTS],
  templateUrl: './tenders-list.html',
  styleUrls: ['./tenders-list.scss']
})
export class TendersListComponent implements OnInit {
  tenders = new MatTableDataSource<any>([]);
  displayedColumns = ['tender_id', 'cliente', 'fecha', 'margen_total'];

  constructor(private api: ApiService) { }

  async ngOnInit() {
    try {
      const data = await this.api.getTenders();
      this.tenders.data = data;
      console.log('Tenders cargadas:', this.tenders.data);
    } catch (err) {
      console.error('Error al cargar tenders', err);
    }
  }
}
