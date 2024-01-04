import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp } from '@angular/fire/firestore'
import { loginInterface, signupInterface } from '../models/auth';
import * as bcrypt from 'bcryptjs';

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

  async add_password_reset_key(key: string, email: string) {
    const dbInstance = collection(this.firestore, 'Users');
    const q = query(dbInstance, where("email", "==", email));
    return getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc_data) => {
        const docRef = doc(dbInstance, doc_data.id);
        return updateDoc(docRef, { pass_reset_key: key, key_creation_time: serverTimestamp()});
      });
    });
  }

  async update_user_password(pass_key: string, new_password: string) {
    let results: string = "";
  
    try {
      const dbInstance = collection(this.firestore, 'Users');
      const q = query(dbInstance, where("pass_reset_key", "==", pass_key));
      const querySnapshot = await getDocs(q);
  
      for (const doc_data of querySnapshot.docs) {
        const user_data = doc_data.data();
        const pass_key_time = user_data.key_creation_time.toDate();
        // Get the current time
        const currentTime = new Date();
        // Calculate the time difference in milliseconds
        const timeDifference = currentTime.getTime() - pass_key_time.getTime();
        // Convert the time difference to hours
        const hoursDifference = timeDifference / (1000 * 60 * 60);
  
        if (hoursDifference <= 2) {
          const saltRounds = 10;
          // Generate a salt
          const salt = bcrypt.genSaltSync(saltRounds);
          // Hash the password
          const hashedPassword = bcrypt.hashSync(new_password, salt);
          const docRef = doc(dbInstance, doc_data.id);
  
          // Await the updateDoc operation
          await updateDoc(docRef, { password: hashedPassword, pass_reset_key: "", key_creation_time: "" });
          results = "success";
          console.log(results)

        } else {
          results = "expired pass_key";
        }
      }
    } catch (error) {
      console.error("Error updating password:", error);
      results = "error";
    }
  
    return results;
  }

}
