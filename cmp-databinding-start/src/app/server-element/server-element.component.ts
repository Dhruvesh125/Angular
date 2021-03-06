import { Component, OnInit,Input, ViewEncapsulation, OnChanges, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked,
   AfterViewChecked, AfterViewInit, OnDestroy, ViewChild, ElementRef, ContentChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated//default possile None,Native
})
export class ServerElementComponent implements OnInit , OnChanges,DoCheck,
AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy
 {
  @Input('srvElement') element:{type:string,name:string,content:string};
  @Input() name:string;
  @ViewChild('heading',{static:true}) header:ElementRef;
  @ContentChild('contentParagraph',{static:true}) para:ElementRef; 
  constructor() { 
    console.log('Constructor called');
  }

  ngOnDestroy(){
    console.log('ngOnDestroy called!');
  }

  ngAfterViewInit(){
    console.log('ngAfterViewInit called!');
    console.log('Text Content:',this.header.nativeElement.textContent);
  }

  ngAfterViewChecked(){
    console.log("ngAfterViewChecked called!");
  }

  ngAfterContentChecked(){
    console.log('ngAfterContentchecked!');
  }

  ngAfterContentInit(){
    console.log("ngAfterInit called!");
    console.log('Para Content:',this.para.nativeElement.textContent);
  }

  ngDoCheck(){
    console.log('ngDoCheckCalled'); 
  }

  ngOnChanges(changes:SimpleChanges){
    console.log('ngOnChanges called');
    console.log(changes);
  }
  ngOnInit(): void {
    console.log('ngOnIt called');
    console.log('Text Content:',this.header.nativeElement.textContent);
    console.log('Para Content:',this.para.nativeElement.textContent);
  }

}
