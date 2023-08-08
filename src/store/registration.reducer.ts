import { createReducer, on } from '@ngrx/store';
import { initialState, UserState } from './registration.model';
import * as UserActions from './registration.actions';
import { User } from './registration.model';


export const userReducer = createReducer(
  initialState,
  on(UserActions.addUser, (state, { user }) => {
    // Check if email already exists in state
    const existingUser = state.users.find(u => u.email === user.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }
    // Otherwise, add the new user to the state
    return {
      ...state,
      users: [...state.users, user]
    };
  }),
  on(UserActions.deleteUser, (state, { id }) => ({
    ...state,
    users: state.users.filter(user => user.id !== id),
    selectedUser: null
  })),
  on(UserActions.updateUser, (state, { id, changes }) => ({
    ...state,
    users: state.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...changes };
      }
      return user;
    }),
    selectedUser: { ...state.selectedUser, ...changes },
  })),
  on(UserActions.selectUser, (state, { userId }) => ({
    ...state,
    selectedUser: state.users.find((user) => user.id === userId)|| null,
  })),
  on(UserActions.setUsers,(state,{users}) => ({...state,users})),
  on(UserActions.showUserPassword, (state, { userId }) => ({
    ...state,
    users: state.users.map(user => user.id === userId ? { ...user, showPassword: true } : user)
  }))
);

export function registrationReducer(state: UserState, action: UserActions.UserActions): UserState {
  return userReducer(state, action);
}
