

import { createAction, props } from '@ngrx/store';
import { User } from './registration.model';

export const addUser = createAction('[User Added] Add User', props<{ user: User }>());
export const deleteUser = createAction('[User Deleted] Delete User', props<{ id: number }>());
export const updateUser = createAction(
  '[User Updated] Update User',
  props<{ id: number, changes: Partial<User> }>()
);
export const selectUser = createAction('[User] Select User', props<{ userId: number }>());
export const setUsers = createAction('[Users] Set Users', props<{ users: User[] }>());
export const showUserPassword = createAction(
    '[User Password] Show User Password',
    props<{ userId: number }>()
  );

  export type UserActions = ReturnType<typeof addUser | typeof deleteUser | typeof updateUser | typeof selectUser | typeof setUsers | typeof showUserPassword>;