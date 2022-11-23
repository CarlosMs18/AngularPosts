import { PostsService } from './../posts.service';
import { Component , EventEmitter, Output, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Post } from "../post.model";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector : 'app-post-create',
  templateUrl : './post-create.component.html',
  styleUrls : ['./post-create.style.css']
})

export class PostCreateComponent implements OnInit{
  enteredContent  = '';
  enteredTitle = '';
  post : Post;
  isLoading  = false;
  private mode  = 'create'
  private postId :string;


  /* PostCreated  = new EventEmitter<Post>(); */


  constructor(public postService : PostsService, public route :ActivatedRoute){}


  ngOnInit() {
    this.route.paramMap.subscribe((paramMap : ParamMap) => {
      if(paramMap.has('postId')){
          this.mode = 'edit';
          this.postId = paramMap.get('postId');

          this.isLoading = true;

          this.post = this.postService.getPost(this.postId)

          this.isLoading= false;
      }else{
        this.mode = 'create'
        this.postId = null;
      }
    })
  }

   onSavePost(form : NgForm ){

    if(form.invalid){
      return
    }
    this.isLoading = true;
    if(this.mode === 'create'){
      this.postService.addPost(form.value.title, form.value.content);
      form.resetForm();
    }else{
      this.postService.updatePost(this.postId, form.value.title, form.value.content)
    }
    /*  const post  : Post = {
      title : form.value.title,
      content : form.value.content
     } */

    /*  this.PostCreated.emit(post) */


   }
}
