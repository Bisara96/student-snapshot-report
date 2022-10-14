import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentLoggedInUser: string | null = null;

  constructor() { }

  registerNewUser(username: string, password: string) {
    return new Promise((resolve, reject) => {

      const users = this.getUsers();

      localStorage.setItem('users', JSON.stringify([...users, { username, password: window.btoa(password) }]));

      resolve(true);
    })
  }

  login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {

      const users = this.getUsers();

      const user = users.find((user: { username: string, password: string }) => user.username === username);

      if (user && user.password === window.btoa(password)) {
        this.currentLoggedInUser = user.username;
        resolve(true);
      }

      reject(false);
    })
  }

  usernameAvailable(username: string) {
    const users = this.getUsers();
    return !users.find((user: { username: string, password: string }) => user.username === username);
  }

  getUsers() {
    let users;
    try {
      users = JSON.parse(localStorage.getItem('users') || '[]')
    } catch {
      users = [];
    }

    return users;
  }

  isLoggedIn() {
    return !!this.currentLoggedInUser;
  }

  logout() {
    this.currentLoggedInUser = null;
  }
}
