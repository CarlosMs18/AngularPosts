import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import {Post} from './post.model'
import { Router } from '@angular/router';


@Injectable({providedIn : 'root'})
export class PostsService{
  private posts : Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router : Router){}

  getPosts(){
   /*  return [...this.posts] */
   this.http
   .get<{message : string,  posts : /* Post[] */ any}>(
    'http://localhost:3000/api/posts'
    )
    .pipe(
      map((postData) => {
        return postData.posts.map( post => {
          return {
            title : post.title,
            content : post.content,
            id : post._id
          }
        })
      })
    )
              .subscribe((transformedPosts=> {
                  this.posts =  transformedPosts;
                  this.postsUpdated.next([...this.posts]);
              })
              )}

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();//devuelve un onjeto qiue podemos escuchar pero no emitir, podemos emitir desde el mismo archivo
                                            //mas no desde otgros
  }


  getPost(id : string){
    return {...this.posts.find( p =>  p.id  === id)};
  }

  addPost(title: string, content : string){
    const post : Post = {id : null, title, content};
    this.http.post<{message : string, postId : string}>('http://localhost:3000/api/posts',post)
            .subscribe((responseData )=> {
              /* console.log(responseData.message); */
              const id = responseData.postId;
              post.id = id;
              this.posts.push(post);

              this.postsUpdated.next([...this.posts]);
              this.router.navigate(["/"]);
            })


  }

  updatePost(id : string, title : string, content : string){
      const post : Post = {id, title, content};
      this.http.put(`http://localhost:3000/api/posts/` + id, post)
                .subscribe(response => console.log(response))
                this.router.navigate(["/"]);

  }

  deletePost(postId : string){
    this.http.delete(`http://localhost:3000/api/posts/` + postId)
        .subscribe(() => {
          const updatedPosts = this.posts.filter(post => post.id !== postId)
          this.posts= updatedPosts;
          this.postsUpdated.next([...this.posts])
        })
  }

}