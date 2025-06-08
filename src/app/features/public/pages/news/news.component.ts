import { Component } from '@angular/core';
import { CardComponent } from "../../../../shared/components/card/card.component";

@Component({
  selector: 'app-news',
  imports: [CardComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
newsList = [
    {
      imageUrl: 'https://example.com/image1.jpg',
      title: 'Los Angeles wildfires',
      subtitle: 'Why is LA burning in winter, why the blaze is so bad',
      layout: 'vertical',
      size: 'lg'
    },
    {
      imageUrl: 'https://example.com/image2.jpg',
      title: 'Judge Neha Kakkar returns to Indian Idol 6',
      subtitle: 'She has been missing from Indian Idol...',
      layout: 'horizontal',
      size: 'md'
    },
    {
      imageUrl: 'https://example.com/image3.jpg',
      title: 'As Dhananjay Munde row continues to spiral',
      subtitle: 'Evidence could bring down the coalition...',
      layout: 'horizontal',
      size: 'lg'
    }
  ];
}
