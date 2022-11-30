import { Injectable } from "@angular/core";
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';


@Injectable({
    providedIn: 'root'
})

export class LoginService {
    auth = new FirebaseTSAuth()
    isLoggedIn = false

    constructor() {

        this.auth.listenToSignInStateChanges(
            user => {
                this.auth.checkSignInState({
                    whenSignedIn: user => {
                        alert('Logged in!')
                        this.isLoggedIn = true
                    },
                    whenSignedOut: user => {
                        alert('Logged out!')
                        this.isLoggedIn = false
                    },
                    whenChanged: user => {

                    }
                })
            }
        )
    }

    loggedIn(): boolean {
        return this.auth.isSignedIn()
    }

    onLogout() {
        this.auth.signOut()
    }

}