import { Injectable } from "@angular/core";
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    firestore: FirebaseTSFirestore
    auth: FirebaseTSAuth
    isLoggedIn = false

    constructor() {
        this.auth = new FirebaseTSAuth()
        this.firestore = new FirebaseTSFirestore()

        this.auth.listenToSignInStateChanges(
            user => {
                this.auth.checkSignInState({
                    whenSignedIn: user => {
                        this.isLoggedIn = true
                    },
                    whenSignedOut: user => {
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