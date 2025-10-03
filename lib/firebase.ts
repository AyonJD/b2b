"use client"

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"

let firebaseApp: FirebaseApp | undefined
let firebaseAuth: Auth | undefined

export function getFirebaseApp(): FirebaseApp {
  if (!firebaseApp) {
    firebaseApp = getApps().length
      ? getApp()
      : initializeApp({
          apiKey: "AIzaSyAZ-JE3LqmyP-r2PPPhp9elKJjuch8XZk4",
          authDomain: "fake-shop-4f3c4.firebaseapp.com",
          projectId: "fake-shop-4f3c4",
          storageBucket: "fake-shop-4f3c4.appspot.com",
          messagingSenderId: "325965943092",
          appId: "1:325965943092:web:2dba3e526f39c09a529561",
        })
  }
  return firebaseApp
}

export function getFirebaseAuth(): Auth {
  if (!firebaseAuth) {
    const app = getFirebaseApp()
    firebaseAuth = getAuth(app)
  }
  return firebaseAuth
}


