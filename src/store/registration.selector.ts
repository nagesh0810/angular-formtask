import { createSelector } from '@ngrx/store';
import { UserState } from './registration.model';

export const selectUserState = (state: { users: UserState }) => state.users;

export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectSelectedUser = createSelector(
  selectUserState,
  (state: UserState) => state.selectedUser
);
