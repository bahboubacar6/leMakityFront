import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category$!: Observable<Array<Category>>;
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;

  constructor(private categoryService: CategoryService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.searchCategory();
  }

  initForm(){
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    })
  }

  searchCategory() {
    let kw = this.searchFormGroup?.value.keyword;
    this.category$ = this.categoryService.searchCategory(kw).pipe(
      catchError(err=>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

  updateCategory(cat: Category) {
    this.router.navigateByUrl("/categories/"+ cat.idCategory, {state: cat});
  }

  deleteCategory(cat: Category) {
     let conf = confirm("Are you sure?");
    if(!conf) return;
    this.categoryService.deleteCategorie(cat.idCategory).subscribe({
      next: (resp) => {
        this.category$ = this.category$.pipe(
          map(data=>{
            let index = data.indexOf(cat);
            data.slice(index, 1);
            console.log(data);
            return data;
          })
        )
      },
      error:(err)=>{
        console.log(err);
        
      }
    });
  }
}
