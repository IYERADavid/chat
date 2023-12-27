import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, collectionData, addDoc, getDocs, doc, updateDoc, deleteDoc } from '@angular/fire/firestore'
import { loginInterface, signupInterface } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore:Firestore ) { }

  adduser(data: signupInterface, Useruuid: string) {
    const dbInstance = collection(this.firestore, 'Users')
    return addDoc(dbInstance, {...data, user_id: Useruuid})
  }

  does_user_exist(email: string){
    const dbInstance = collection(this.firestore, 'Users')
    const q = query(dbInstance, where("email", "==", email));
    return getDocs(q)
  }

  deleteuser(doc_id: string){
    const dbInstance = collection(this.firestore, 'Users')
    const doc_ref = doc(dbInstance, doc_id)
    return deleteDoc(doc_ref)
  }

  loginuser(userdata: loginInterface){
    const dbInstance = collection(this.firestore, 'Users')
    const q = query(dbInstance, where("email", "==", userdata.email));
    return getDocs(q)
  }
}
