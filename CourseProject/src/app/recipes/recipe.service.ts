import {  Injectable } from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
@Injectable()
export class RecipeService{
  recipesChanged=new Subject<Recipe[]>();
  //  private recipes:Recipe[]=[
  //       new Recipe('A Test Recipe','This is Pizza',
  //       'https://www.simplyrecipes.com/wp-content/uploads/2007/01/homemade-pizza-horiz-a-1200-768x512.jpg',
  //       [new Ingredient('Meat',1),new Ingredient('French Fries',20)]),
  //       new Recipe('A Test Recipe','This is Pasta','https://images.freeimages.com/images/large-previews/e7c/recipe-1538714.jpg',
  //       [new Ingredient('Buns',2),new Ingredient('Meat',1)]),
  //       new Recipe('Spaghetti','Tasty spaghetti','https://i0.wp.com/www.eatthis.com/wp-content/uploads/2019/01/healthy-spaghetti-spicy-tomato-sauce.jpg?resize=800%2C450&ssl=1',
  //       [new Ingredient('Spaghetti',100),new Ingredient('Tomatoes',3)])
  //     ];
  private recipes:Recipe[]=[];
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
      addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }
      updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index]=newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }
      deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }
      setRecipes(recipes:Recipe[]){
        this.recipes=recipes;
        this.recipesChanged.next(this.recipes.slice());
      }
}