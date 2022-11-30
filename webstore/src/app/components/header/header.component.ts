import { Component, Input } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from 'src/app/tools/authenticator/authenticator.component';
import { LoginService } from 'src/app/services/login.service';

// import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'

})
export class HeaderComponent {

  private _cart: Cart = { items: [] }
  itemsQuantity = 0

  @Input()
  get cart(): Cart {
    return this._cart
  }

  set cart(cart: Cart) {
    this._cart = cart

    this.itemsQuantity = cart.items.map((item) => item.quantity).reduce((prev, current) => prev + current, 0)
  }

  // auth = new FirebaseTSAuth()
  // isLoggedIn = false

  constructor(private cartService: CartService, private loginSheet: MatBottomSheet, private login: LoginService) {

    // this.auth.listenToSignInStateChanges(
    //   user => {
    //     this.auth.checkSignInState({
    //       whenSignedIn: user => {
    //         alert('Logged in!')
    //         this.isLoggedIn = true
    //       },
    //       whenSignedOut: user => {
    //         alert('Logged out!')
    //         this.isLoggedIn = false
    //       },
    //       whenChanged: user => {

    //       }
    //     })
    //   }
    // )
  }


  loggedIn(): boolean {
    return this.login.loggedIn()
  }

  onLogout() {
    this.login.onLogout()
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items)
  }

  onClearCart() {
    this.cartService.clearCart()
  }

  onLoginClick() {
    this.loginSheet.open(AuthenticatorComponent)
  }

}
