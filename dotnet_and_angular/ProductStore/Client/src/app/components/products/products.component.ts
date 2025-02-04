import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  private _productService = inject(ProductService);

  // By virtue of having this & how the getAllProducts() is implemented,
  // we will have access to all products once our http call successfully returns.
  public productList$ = this._productService.productList$;

  ngOnInit(): void {    
    this._productService.getAllProducts().subscribe((res) => {
      console.log('res:', res);
    });
  }

}