import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') singupform:NgForm;
  defaultQuestion='pet';
  answer='';
  genders=['male','female'];
  user={
    username:'',
    email:'',
    secret:'',
    gender:'',
    answer:''
  }
  submitted=false;
  suggestUserName() {
    const suggestedName = 'Superuser';
    this.singupform.form.patchValue({
      userData:{
        username:suggestedName
      }
    });
    // this.singupform.setValue({userData:{
    //   username:suggestedName,
    //   email:''
    // },
    // secret:'pet',
    // questionAnswer:'',
    // gender:'male'

    // });
  }
  // onSubmit(form:NgForm){
  //   console.log(form);
  // }
  onSubmit(){
    console.log(this.singupform);
    this.submitted=true;
    this.user.username=this.singupform.form.value.userData.username;
    this.user.email=this.singupform.form.value.userData.email;
    this.user.answer=this.singupform.value.questionAnswer;
    this.user.gender=this.singupform.value.gender;
    this.user.secret=this.singupform.value.secret;
    this.singupform.reset();
  }
}
