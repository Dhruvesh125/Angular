import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  @Output() rescipeWasSelected=new EventEmitter<Recipe>();
  recipes:Recipe[]=[
    new Recipe('A Test Recipe','This is Pizza','https://www.simplyrecipes.com/wp-content/uploads/2007/01/homemade-pizza-horiz-a-1200-768x512.jpg'),
    new Recipe('A Test Recipe','This is Pasta','https://images.freeimages.com/images/large-previews/e7c/recipe-1538714.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe:Recipe){
    this.rescipeWasSelected.emit(recipe);
  }
}
