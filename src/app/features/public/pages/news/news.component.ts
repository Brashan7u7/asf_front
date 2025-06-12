import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../../../shared/components/card/card.component";
import { NewService, Noticia } from '../../../../core/services/new.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news',
  imports: [CardComponent, CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit {
  noticias: Noticia[] = [];
  isLoading = true;

  constructor(private noticiaService: NewService) { }

  ngOnInit(): void {
    this.noticiaService.getNoticias().subscribe({
      next: (data) => {
        this.noticias = data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        this.isLoading = false;},
      error: (error) => console.error('Error al cargar noticias:', error),
    });
  }

}
