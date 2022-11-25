import Contact from '../models/Contact';
import axios from 'axios';
// import React, { useState, useEffect } from "react";
// import { Table } from "react-bootstrap";
// import ContactRow from "../components/ContactRow";
/** 
 * This class controls the list of contacts for the app.
 * This would be a good place to implement the data
 * connections to your API. Whenever a change is made the 
 * 'contactChange' event is dispatched to trigger the 
 * Contact list to refresh.
 */

class ContactController {

  constructor() {
    if(ContactController._instance){
      return ContactController._instance;
    }
    ContactController._instance = this;
    this.event = new Event('contactChange');
    this.contacts = [];
    this.count = 0;
  }
  
  getAll( options = null ) {
    
    axios.get("http://localhost:8080/api/getAll/")
    .then(({ data }) => {

      //return this.contacts.push(data);
      
     // console.log(data);
      //setContacts(data);
    })
    .catch((error) => {
      console.log(error);
    });

 return this.contacts;
  }

  add( fName, lName, email, phone, imageUrl ){
    let contact = new Contact( this.count, fName, lName, email, phone, imageUrl );
    if( contact instanceof Contact ){


      axios.post(
        'http://localhost:8080/api/post', 
        contact)
              .then(res => {
                if (res.status === 200)
                  alert('Contact successfully created')
                else
                  Promise.reject()
              })
              .catch(err => alert('Something went wrong'))


      this.contacts.push(contact);
      this.count++;
      window.dispatchEvent(this.event);
      return true;
    }
    return false;
  }

  remove( contact_id ){
    for (let i = 0; i < this.contacts.length; i++) {
      if(this.contacts[i].id === contact_id){
        this.contacts.splice(i, 1);
        i--;
        window.dispatchEvent(this.event);
      }
    }
  }

  update( contact_id, options ){
    for (let i = 0; i < this.contacts.length; i++) {
      if(this.contacts[i].id === contact_id){
        this.contacts[i].fName = options.fName;
        this.contacts[i].lName = options.lName;
        this.contacts[i].email = options.email;
        this.contacts[i].phone = options.phone;
        this.contacts[i].imageUrl = options.imageUrl;
        window.dispatchEvent(this.event);
      }
    }
  }
}

export default ContactController;