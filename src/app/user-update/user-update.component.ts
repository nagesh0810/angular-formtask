import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { updateUser } from 'src/store/registration.actions';
import { User } from 'src/store/registration.model';
import { RegistrationformServicesService } from 'src/services/registration.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  user$: Observable<User>;
  id: number;
  userForm: FormGroup;
  users$: Observable<User[]>;
  emailExists = false;
  message = '';

  constructor(
    private store: Store<{ users: { users: User[] } }>,
    private userService: RegistrationformServicesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.user$ = this.store
      .select((state) => state.users.users)
      .pipe(map((users) => users.find((user) => user.id === this.id)));

    this.userForm = new FormGroup({
      id: new FormControl(null),
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      dateOfBirth: new FormControl(null),
      gender: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
      accept: new FormControl(null),
    });
    this.user$.subscribe((user) => {
      if (user) {
        this.userForm.patchValue(user);
      }
    });
  }

  onSubmit(): void {
    const updatedUser: User = {
      id: this.id,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      dateOfBirth: this.userForm.value.dateOfBirth,
      gender: this.userForm.value.gender,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      accept: this.userForm.value.accept,
    };
    if (!updatedUser.id) {
      throw new Error('User ID is not set');
    }

    this.userService.getUsers().subscribe((users) => {
      const emailExists = users.some((u) => u.email === updatedUser.email);
      if (emailExists) {
        this.emailExists = true;
        this.message = 'Email is already in use';
      } else {
        this.emailExists = false;
        this.message = '';
        this.userService.updateUser(updatedUser).subscribe(() => {
          this.store.dispatch(
            updateUser({ id: updatedUser.id, changes: updatedUser })
          );
          this.router.navigate(['/users']);
        });
      }
    });
  }
}
