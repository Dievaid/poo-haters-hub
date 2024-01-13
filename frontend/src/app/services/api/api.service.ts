import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from '../auth/auth.service';

export interface PostData {
  uid: string;
  content: string;
  createdAt: string;
  user: UserData;
  comments: any[];
  likes: any[];
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = 'http://localhost:9229';
  // private url = 'http://feed-oop.ddns.net:9229';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<UserData[]>(this.url + '/users');
  }

  hasUser(uid: string) {
    return this.http.get<UserData>(this.url + '/users/' + uid);
  }

  addUser(uid: string, imgUrl: string) {
    const headers = {
      'content-type': 'application/json',
    };
    const body = JSON.stringify({ uid, imgUrl });
    return this.http.post(this.url + '/users', body, { headers });
  }

  addPost(uid: string, content: string) {
    const headers = {
      'content-type': 'application/json',
    };
    const params = new HttpParams().set('userId', uid);
    const body = JSON.stringify({ content });
    return this.http.post(this.url + '/posts', body, { headers, params });
  }

  getPosts() {
    return this.http.get<PostData[]>(this.url + '/posts');
  }

  addLike(userId: string, postId: string) {
    const headers = {
      'content-type': 'application/json',
    };
    const body = JSON.stringify({ userId, postId });
    console.log(body);
    return this.http.post(this.url + '/like', body, { headers });
  }
}
