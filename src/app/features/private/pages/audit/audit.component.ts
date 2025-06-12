import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Auditoria,
  AuditoriaResponse,
  AuditService,
} from '../../../../core/services/audit.service';
import { SearchFormComponent } from '../../../../shared/components/search-form/search-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audit',
  standalone: true,
  imports: [CommonModule, SearchFormComponent],
  templateUrl: './audit.component.html',
  styleUrl: './audit.component.scss',
})
export class AuditComponent {
  isLoading = true;
  auditorias: Auditoria[] = [];
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 10;

  searchText: string = '';
  selectedOption: string = 'Todos';

  constructor(private auditoriaService: AuditService, private router: Router) {}
  verDetalle(id: number) {
    this.router.navigate(['private/more', id]);
  }

  ngOnInit(): void {
    this.loadAuditorias();
  }

  onFilterChange(filters: { searchText: string; selectedOption: string }) {
    this.searchText = filters.searchText;
    this.selectedOption = filters.selectedOption;
    this.currentPage = 1;
    this.loadAuditorias();
  }

  loadAuditorias(): void {
    this.auditoriaService
      .getAuditorias({
        filtro:
          this.selectedOption === 'Todos' ? undefined : this.selectedOption,
        search: this.searchText || undefined,
        page: this.currentPage,
      })
      .subscribe({
        next: (response: AuditoriaResponse) => {
          this.auditorias = response.data;
          this.totalPages = response.lastPage;
          this.currentPage = response.page;
        },
        error: (error) => {
          console.error('Error al cargar auditorías:', error);
        },
      });
  }

  getPaginatedPages(): number[] {
    let startPage = Math.max(1, this.currentPage - 4);
    let endPage = Math.min(this.totalPages, startPage + 9);

    if (endPage - startPage < 9) {
      startPage = Math.max(1, endPage - 9);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => i + startPage
    );
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadAuditorias();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadAuditorias();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadAuditorias();
    }
  }
}
