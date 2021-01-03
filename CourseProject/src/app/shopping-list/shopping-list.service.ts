import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';
export class ShoppingListService{
    ingredientsChanged=new Subject<Ingredient[]>();
    private ingredients: Ingredient[]=[
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10),
      ];

    getIngredients(){
        return this.ingredients.slice();
    }
    addIngredient(ing:Ingredient){
        this.ingredients.push(ing);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    addIngredients(inglist:Ingredient[]){
        // for(let i of inglist){
        //     this.addIngredient(i);
        // }
        this.ingredients.push(...inglist);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    
}