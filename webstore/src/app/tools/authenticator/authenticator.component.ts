import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth'
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore'

@Component({
  selector: 'app-authenticator',
  templateUrl: 'authenticator.component.html'
})
export class AuthenticatorComponent implements OnInit {

  state = AuthenticatorCompState.LOGIN

  firestore: FirebaseTSFirestore
  firebasetsAuth: FirebaseTSAuth
  constructor(private bottomSheet: MatBottomSheet) {
    this.firebasetsAuth = new FirebaseTSAuth()
    this.firestore = new FirebaseTSFirestore()
  }

  ngOnInit(): void {
  }

  onRegister(registerEmail: HTMLInputElement, registerPassword: HTMLInputElement, registerRepass: HTMLInputElement) {
    let email = registerEmail.value
    let password = registerPassword.value
    let repass = registerRepass.value

    if (this.isNotEmpty(email) &&
      this.isNotEmpty(password) &&
      this.isNotEmpty(repass) &&
      this.isAMatch(password, repass)) {

      this.firebasetsAuth.createAccountWith({
        email: email,
        password: password,
        onComplete: (uc) => {
          this.bottomSheet.dismiss()
          registerEmail.value = ''
          registerPassword.value = ''
          registerRepass.value = ''
        },
        onFail: (err) => {
          
        }
      })

      this.firestore.create({
        path: ["Users", this.firebasetsAuth?.getAuth()?.currentUser?.uid || '{}'],
        data: {
          email: email,
          password: password
        },
        onComplete: (docId) => {
          alert('Account created successfully!')
        },
        onFail: (err) => {
          
        }
      })
    }
  }

  onLogin(loginEmail: HTMLInputElement, loginPassword: HTMLInputElement) {
    let email = loginEmail.value
    let password = loginPassword.value
    
    if (this.isNotEmpty(email) && this.isNotEmpty(password)) {
      this.firebasetsAuth.signInWith({
        email: email,
        password: password,
        onComplete: (uc) => {
          this.bottomSheet.dismiss()
        },
        onFail: (err) => {
          alert(err)
        }
      })
    }
  }

  isNotEmpty(text: string) {
    return text != null && text.length > 0
  }

  isAMatch(text: string, comparedWith: string) {
    return text === comparedWith
  }

  onRegisterClick(): void {
    this.state = AuthenticatorCompState.REGISTER
  }

  onLoginClick(): void {
    this.state = AuthenticatorCompState.LOGIN
  }

  isLoginState(): boolean {
    return this.state == AuthenticatorCompState.LOGIN
  }

  isRegisterState(): boolean {
    return this.state == AuthenticatorCompState.REGISTER

  }

  getStateText(): string {
    switch (this.state) {
      case AuthenticatorCompState.LOGIN:
        return "Login"
      case AuthenticatorCompState.REGISTER:
        return "Register"
    }
  }
}




export enum AuthenticatorCompState {
  LOGIN,
  REGISTER
}