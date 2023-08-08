
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { deleteUser, showUserPassword } from 'src/store/registration.actions';
import { User } from 'src/store/registration.model';
import { RegistrationformServicesService } from 'src/services/registration.service';
import { setUsers } from 'src/store/registration.actions';
import {faEye} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent {

  users$: Observable<User[]>;
  passwordIcon=faEye;
  showPasswordUserId: number | null = null;

  constructor(
    private store: Store<{ users: { users: User[] } }>,
    private userService: RegistrationformServicesService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.store.dispatch(setUsers({ users: users }));
    });
    console.log(this.store);
    this.users$ = this.store.select(state => state.users.users);
  }

  onDelete(user: User): void {
    if (confirm(`Are you sure you want to delete ${user.firstName}?`)) {
      this.store.dispatch(deleteUser({ id: user.id }));
      this.userService.deleteUser(user.id).subscribe();
    }
  }

  onShowPassword(id: number): void {
    const userId = id;
    this.store.dispatch(showUserPassword({ userId:id }));
    this.showPasswordUserId = id;
    setTimeout(() => {
      this.showPasswordUserId = null;
    }, 1000);
  }
}
