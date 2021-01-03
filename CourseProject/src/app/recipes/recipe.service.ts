import {  Injectable } from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
@Injectable()
export class RecipeService{
   private recipes:Recipe[]=[
        new Recipe('A Test Recipe','This is Pizza',
        'https://www.simplyrecipes.com/wp-content/uploads/2007/01/homemade-pizza-horiz-a-1200-768x512.jpg',
        [new Ingredient('Meat',1),new Ingredient('French Fries',20)]),
        new Recipe('A Test Recipe','This is Pasta','https://images.freeimages.com/images/large-previews/e7c/recipe-1538714.jpg',
        [new Ingredient('Buns',2),new Ingredient('Meat',1)])
      ];

      constructor(private slService:ShoppingListService){

      }
      getRecipes(){
          return this.recipes.slice();// don't want to send reference outside so using slice gives exact same copy of array
      }
      addIngredientsToShoppinglist(ing:Ingredient[]){
        this.slService.addIngredients(ing);
      }
      getRecipe(index:number){
        return this.recipes[index];
      }
      
}