import { PostsService } from './../posts.service';
import { Component, OnInit , Input , OnDestroy} from '@angular/core';

import {Subscription} from 'rxjs';

import {Post} from '../post.model'
import { PageEvent } from '@angular/material/paginator';

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
 totalPosts = 0
 postsPerPage  = 2 ;
 currentPage = 1;
 pageSizeOptions = [1,2,5,10]
 private postsSub : Subscription
  /* postService : PostsService; */

  constructor(public postsService : PostsService) {
  /*   this.postService = postsService; */
   }


  ngOnInit(){
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener()
                .subscribe((postData : {posts : Post[] , postCount : number}) =>{
                  this.isLoading = false;
                  this.totalPosts = postData.postCount
                  this.posts = postData.posts;
                })
  }

  onChangedPage(pageData : PageEvent){
    this.isLoading = true;
    console.log(pageData)
    this.currentPage = pageData.pageIndex +1;
    this.postsPerPage = pageData.pageSize
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }


  onDelete(postId: string){
    this.isLoading = true;
    this.postsService.deletePost(postId)
            .subscribe(() =>{
              this.postsService.getPosts(this.postsPerPage, this.currentPage);
            })
  }
  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
