import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuditService, Auditoria } from '../../../../core/services/audit.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [NgChartsModule, FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  isLoading = true;
  auditorias: Auditoria[] = [];
  tipoLabels: string[] = [];
  tipoData: number[] = [];
  anioLabels: string[] = [];
  anioData: number[] = [];
  estatusLabels: string[] = [];
  estatusData: number[] = [];

  tipoChartData = {
    labels: this.tipoLabels,
    datasets: [{ data: this.tipoData, label: 'Tipo de Auditoría', backgroundColor: '#3b82f6' }],
  };

  anioChartData = {
    labels: this.anioLabels,
    datasets: [{ data: this.anioData, label: 'Auditorías por Año', backgroundColor: '#10b981' }],
  };

  estatusChartData = {
    labels: this.estatusLabels,
    datasets: [{ data: this.estatusData, backgroundColor: ['#f59e0b', '#ef4444', '#3b82f6'] }],
  };

  barOptions = {
    responsive: true,
    animation: { duration: 1000 },
  };

  pieOptions = {
    responsive: true,
    animation: { animateScale: true },
  };

  constructor(private router: Router, private auditoriaService: AuditService) { }

  ngOnInit(): void {
    this.auditoriaService.getAuditorias().subscribe({
      next: (data) => {
        this.auditorias = data;
        this.procesarDatos();
      },
      error: (error) => console.error('Error al cargar auditorías:', error),
    });
  }

  volver() {
    this.router.navigate(['/public/home']);
  }

  procesarDatos() {
    const tipos: Record<string, number> = {};
    const anios: Record<string, number> = {};
    const estatus: Record<string, number> = {};

    this.auditorias.forEach((a) => {
      tipos[a.tipo] = (tipos[a.tipo] || 0) + 1;
      const anio = new Date(a.fecha).getFullYear().toString();
      anios[anio] = (anios[anio] || 0) + 1;

      const label = this.mapEstatus(Number(a.estatus));
      estatus[label] = (estatus[label] || 0) + 1;
    });

    this.tipoLabels = Object.keys(tipos);
    this.tipoData = Object.values(tipos);

    this.anioLabels = Object.keys(anios);
    this.anioData = Object.values(anios);

    this.estatusLabels = Object.keys(estatus);
    this.estatusData = Object.values(estatus);

    this.tipoChartData = {
      labels: this.tipoLabels,
      datasets: [{ data: this.tipoData, label: 'Tipo de Auditoría', backgroundColor: '#3b82f6' }],
    };

    this.anioChartData = {
      labels: this.anioLabels,
      datasets: [{ data: this.anioData, label: 'Auditorías por Año', backgroundColor: '#10b981' }],
    };

    this.estatusChartData = {
      labels: this.estatusLabels,
      datasets: [{ data: this.estatusData, backgroundColor: ['#f59e0b', '#ef4444', '#3b82f6'] }],
    };
    this.isLoading = false;
  }

  mapEstatus(estatus: number): string {
    switch (estatus) {
      case 0: return 'Recibido';
      case 1: return 'En proceso';
      case 2: return 'Atendido';
      default: return 'Desconocido';
    }
  }

  exportToPDF() {
    html2canvas(this.chartContainer.nativeElement, {
      backgroundColor: '#ffffff',
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('estadisticas.pdf');
    });
  }
}
