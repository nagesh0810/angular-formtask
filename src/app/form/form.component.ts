import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addUser } from 'src/store/registration.actions';
import { User } from 'src/store/registration.model';
import { RegistrationformServicesService } from 'src/services/registration.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  registrationForm: FormGroup;
  users$: Observable<User[]>;
  emailExists: boolean = false;

  constructor(
    private store: Store<{ users: { users: User[] } }>,
    private userService: RegistrationformServicesService
  ) { }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
    this.registrationForm = new FormGroup({
      firstName: new FormControl(null,[Validators.required,Validators.minLength(6)]),
      lastName: new FormControl(null,[Validators.required,Validators.minLength(3)]),
      dateOfBirth: new FormControl(null,Validators.required),
      gender: new FormControl(null,[Validators.required]),
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required,Validators.minLength(6)]),
      accept: new FormControl(false,Validators.requiredTrue)
      
    });
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      return;
    }

    const user: User = {
      id: Date.now(),
      ...this.registrationForm.value,
      // uniqueEmail:true
    };

    this.users$.subscribe((users) => {
      const emailExists = users.some((u) => u.email === user.email);
      if(emailExists){
        this.registrationForm.get('email').setErrors({emailExists:true});
        this.emailExists = true;
      }else{
        this.store.dispatch(addUser({ user }));
        this.userService.addUser(user).subscribe();
        this.registrationForm.reset();
      }
    });
  }
}
