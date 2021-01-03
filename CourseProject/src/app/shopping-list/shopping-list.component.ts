import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {Ingredient} from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients: Ingredient[];
  private subscription:Subscription;
  constructor(private slService:ShoppingListService) {
    this.ingredients=this.slService.getIngredients()
   }

  ngOnInit(): void {
    this.ingredients=this.slService.getIngredients();
    this.subscription=this.slService.ingredientsChanged.subscribe(
      (ingList:Ingredient[])=>this.ingredients=ingList
    )
  };
  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }
}
