import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
import { LoginService } from 'src/app/services/login.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from 'src/app/tools/authenticator/authenticator.component';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 }


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

})
export class HomeComponent implements OnInit, OnDestroy {

  category: string | undefined
  cols = 3
  rowHeight = ROWS_HEIGHT[this.cols]
  products: Array<Product> | undefined
  sort = 'desc'
  count = '12'
  productSubscription: Subscription | undefined

  constructor(private cartService: CartService, private storeService: StoreService, private login: LoginService, private loginSheet: MatBottomSheet) { }

  ngOnInit(): void {
    this.getProducts()
  }

  onBubbleClick() {
    this.loginSheet.open(AuthenticatorComponent)
  }


  getLogin(): boolean {
    return this.login.loggedIn()
  }

  getProducts(): void {
    this.productSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products
      })
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum
    this.rowHeight = ROWS_HEIGHT[this.cols]

  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory
    this.getProducts()
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    })
  }

  onItemsCountChange(newCount: number): void {
    this.count = newCount.toString()
    this.getProducts()
  }

  onSortChange(newSort: string): void {
    this.sort = newSort
    this.getProducts()
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe()
    }
  }


}
