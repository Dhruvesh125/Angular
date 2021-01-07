import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';


export class ShoppingListService{
    ingredientsChanged=new Subject<Ingredient[]>();
    startedEditing=new Subject<number>();
    private ingredients: Ingredient[]=[
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10),
      ];

    getIngredients(){
        return this.ingredients.slice();
    }
    getIngredient(index:number){
        return this.ingredients[index];
    }
    addIngredient(ing:Ingredient){
        this.ingredients.push(ing);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    addIngredients(inglist:Ingredient[]){
        this.ingredients.push(...inglist);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    updateIngredient(index:number,newIngredient:Ingredient){
        console.log("update ingredient called");
        this.ingredients[index]=newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    
    deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice())
    }
}