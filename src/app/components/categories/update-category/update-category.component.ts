import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  updateCategoryFormGroup: FormGroup|undefined;

  idCategory!: number;
  category!: Category

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private router: Router, private route: ActivatedRoute){
    this.idCategory = this.route.snapshot.params['id'];
    this.category = this.router.getCurrentNavigation()?.extras.state as Category;
  }

  ngOnInit():void{
    this.iniForm();
  }

  iniForm(){
    this.updateCategoryFormGroup = this.fb.group({
      idCategory: this.fb.control(this.category.idCategory),
      categoryName: this.fb.control(this.category.categoryName, [Validators.required])
    })
  }
  
  updateCategorie(){
    let categorie: Category = this.updateCategoryFormGroup?.value;
    
    this.categoryService.updateCategorie(categorie).subscribe({
      next: (data)=>{
        this.router.navigateByUrl("/categories");
      },
      error: (err)=>{
        console.log(err);
        
      }
    });
  }

}
