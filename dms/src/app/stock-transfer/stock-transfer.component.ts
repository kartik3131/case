import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-stock-transfer',
  templateUrl: './stock-transfer.component.html',
  styleUrls: ['./stock-transfer.component.css']
})
export class StockTransferComponent {
  transferDetails = {
    productName: '',
    sourceDistributor: '',
    targetDistributor: '',
    quantity: 0
  };

  constructor(private productService: ProductService) { }

  onStockTransfer(stockTransferForm: NgForm) {
    const formData = new FormData();
    formData.append('productName', this.transferDetails.productName);
    formData.append('sourceDistributor', this.transferDetails.sourceDistributor);
    formData.append('targetDistributor', this.transferDetails.targetDistributor);
    formData.append('quantity', String(this.transferDetails.quantity));

    this.productService.transferStock(formData)
      .subscribe(
        (response: string) => {
          alert(response); // Display response message
          if (response === 'Stock transfer completed successfully') {
            stockTransferForm.resetForm(); // Reset the form
          }
        },
        (error) => {
          console.log('Error during stock transfer:', error);
          stockTransferForm.resetForm();
        }
      );
  }
}
