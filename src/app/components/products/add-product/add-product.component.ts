import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { PhotosService } from 'src/photo/services';
import SavePhotoParams = PhotosService.SavePhotoParams;
import { ImageService } from 'src/app/services/image.service';

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
  file: File | null = null;
  categories: Category[] = [];
  imgUrl: string | ArrayBuffer = "../../../../assets/images/photoParDefaut.png";

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router, private catService: CategoryService, private imageService: ImageService){

  }

  ngOnInit(): void{
    this.catService.getAllCategory().subscribe({
      next: (data) => {
        this.categories = data;
        console.log(this.categories);
        
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
      stockQuantity: this.fb.control("", [Validators.required]),
      idCategory: this.fb.control("", [Validators.required]),
    })
  }

   addProduct(){
    
    let prod: Product = this.addProductFormGroup?.value;
    
     this.productService.addProduct(prod).subscribe(
    
      (response: Product | any)=>{
        this.savePhoto(response.idProduct, response.productName);
        console.log("savePhotoTest");
        
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
  
  onFileInput(files: FileList |  null) : void {
    if (files) {
      this.file = files.item(0);
      if (this.file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.file);
        fileReader.onload = () => {
          if (fileReader.result) {
            this.imgUrl = fileReader.result;
          }
        };
      }
    }
  }

  savePhoto(idProduct: number, title: string): void {
    if (idProduct && title && this.file) {
      const params: SavePhotoParams = {
        id: idProduct,
        file: this.file,
        title: title,
        context: 'product'
      };
      this.imageService.savePhoto(params).subscribe(
        (res: any) => {
          console.log("testPhoto");
          console.log(res);
          this.router.navigate(['/product']);
        }
      )
    } else {
      this.router.navigate(['/product']);
    }
  }

}
