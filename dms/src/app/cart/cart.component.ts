import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getCartDetails();
  }

  displayedColumns: string[] = ['Name', 'Description', 'Price', 'Discounted Price', 'Action'];

  cartDetails: any[] = [];

  getCartDetails() {
    this.productService.getCartDetails().subscribe(
      (response: any) => {
        console.log(response);
        this.cartDetails = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  checkout() {
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: false,
      id: 0
    }]);
  }

  delete(cartId: any) {
    console.log(cartId);
    this.productService.deleteCartItem(cartId).subscribe(
      (response: any) => {
        console.log(response);
        this.getCartDetails();
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
