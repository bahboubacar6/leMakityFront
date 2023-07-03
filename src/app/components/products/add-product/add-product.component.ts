import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductFormGroup: FormGroup|undefined;
  message: any = undefined;
  public created: boolean = false;
  product!: Product;
  files: File[] = [];
  categorie: Category[] = [];

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router, private catService: CategoryService){

  }

  ngOnInit(): void{
    this.catService.getAllCategory().subscribe({
      next: (data) => {
        this.categorie = data;
      },
      error: (err) => {
        console.log(err);   
      }
    })
    this.iniForm();
  }

  iniForm(){
    this.addProductFormGroup = this.fb.group({
      productName: this.fb.control("", [Validators.required]),
      price: this.fb.control("", [Validators.required]),
      description: this.fb.control("", [Validators.required]),
      image: this.fb.control("", [Validators.required]),
      stockQuantity: this.fb.control("", [Validators.required]),
      idCategory: this.fb.control("", [Validators.required]),
    })
  }

   addProduct(){
    
    let prod: Product = this.addProductFormGroup?.value;
    
    this.productService.addProduct(prod).subscribe(
      (response: Product | any)=>{
        
        console.log(response);
        if (!response.status) {
          console.log(response.status);
          // Redirige vers la liste des produits
          this.router.navigate(['/product']);
        } else {
          this.message = 'Il y a eu une erreur. Vérifiez vos saisies';
          console.log(response.status);
        }
      });
  }
  
  saveProduct(){
    
    let prod: Product = this.addProductFormGroup?.value;

    let productFormData = this.prepareFormData(prod);
    console.log(productFormData);
    
    if(productFormData)
    this.productService.saveProduct(productFormData).subscribe(
      (response: Product | any)=>{
        
        console.log(response);
        if (!response.status) {
          console.log(response.status);
          // Redirige vers la liste des produits
          this.router.navigate(['/product']);
        } else {
          this.message = 'Il y a eu une erreur. Vérifiez vos saisies';
          console.log(response.status);
        }
      });
  }

  onFileSelected(event: any){
    this.files = [];
    console.log(event);
    if(!event.target.files && event.target.files === 0){
      return;
    }
    for(let file of event.target.files){
      console.log(file);
      
      this.files.push(file);
    }
    console.log(this.files);
  }

  prepareFormData(product: Product): FormData{
    let formData = new FormData();

    formData.append(
      'productDTO',
      new Blob([JSON.stringify(product)], {type: 'application/json'})
    );

      for (let file of this.files) {
        formData.append(
          'imageFile',
          file
        ) 
      }
      console.log(formData);
      
    return formData;
  }

}
