import { PostsService } from './../posts.service';
import { Component, OnInit , Input , OnDestroy} from '@angular/core';

import {Subscription} from 'rxjs';

import {Post} from '../post.model'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit , OnDestroy {

 /*  posts = [
    {title : 'First Post', content : 'This is the first post content' },
    {title : 'Second Post', content : 'This is the second post content' },
    {title : 'Tercer Post', content : 'This is the tercer post content' }
  ]*/

 posts : Post[] = [];
 isLoading = false;
 private postsSub : Subscription
  /* postService : PostsService; */

  constructor(public postsService : PostsService) {
  /*   this.postService = postsService; */
   }
  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }

  ngOnInit(){
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
                .subscribe((posts : Post[]) =>{
                  this.isLoading = false;
                  this.posts = posts;
                })
  }


  onDelete(postId: string){
    console.log('lero')
    console.log(postId)
    this.postsService.deletePost(postId)
  }

}
