import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Contact } from 'src/app/models/Contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  public contactID:string|null = '';
  public contact:Contact = {} as Contact;
  public errorMessage:string | undefined;

  constructor(private activatedRoute: ActivatedRoute,
    private contactService: ContactService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param:ParamMap) => {
      this.contactID = param.get('id');
    });

    this.contactService.getAllContacts().subscribe((data:Contact[]) => {
      let contacts:Contact[] = data;
      let selectedContact = contacts.find(contact => contact.login.uuid === this.contactID);
      if(selectedContact){
        this.contact = selectedContact;
      }
    });
  }

  public isNotEmpty(){
    return Object.keys(this.contact).length > 0;
  }

}
