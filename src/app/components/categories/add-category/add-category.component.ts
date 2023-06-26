import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  addCategoryFormGroup: FormGroup|undefined;
  category!: Category;
  message: any = undefined;

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private router: Router){

  }

  ngOnInit():void{
    this.iniForm();
  }

  iniForm(){
    this.addCategoryFormGroup = this.fb.group({
      categoryName: this.fb.control("", [Validators.required])
    })
  }
  
  addCategory(){
    
    let cat: Category = this.addCategoryFormGroup?.value;
    
    this.categoryService.addCategorie(cat).subscribe(
      (response: Category | any)=>{
        
        console.log(response);
        if (!response.status) {
          console.log(response.status);
          // Redirige vers la liste des categories
          this.router.navigate(['/categories']);
        } else {
          this.message = 'Il y a eu une erreur. Vérifiez vos saisies';
          console.log(response.status);
        }
      });
  }

}
