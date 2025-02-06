import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  private _router = inject(Router);
  private _productService = inject(ProductService);

  @Input() product: Product | null = null;

  public view(): void {
    this._productService.select(this.product);

    this._router.navigate([`/products/${this.product?.id}`]);
  }

}
