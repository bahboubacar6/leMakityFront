import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatOptionModule } from '@angular/material/core';
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { MatCardModule } from "@angular/material/card";
import {MatSelectModule} from '@angular/material/select';
import {LayoutModule} from "@angular/cdk/layout";
import { ProductComponent } from './components/products/product/product.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductModule } from './components/products/product.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CarouselModule } from './components/carousel/carousel.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './components/admins/admin/admin.component';
import { UserComponent } from './components/users/user/user.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { DetailUserComponent } from './components/users/detail-user/detail-user.component';
import { OrderComponent } from './components/orders/order/order.component';
import { AddOrderComponent } from './components/orders/add-order/add-order.component';
import { CategoryComponent } from './components/categories/category/category.component';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { NavAdminComponent } from './components/admins/nav-admin/nav-admin.component';
import { ProfileComponent } from './components/profiles/profile/profile.component';
import { UpdateProfileComponent } from './components/profiles/update-profile/update-profile.component';
import { InterceptorService } from './services/interceptor.service';
import { LoginComponent } from './components/login/login.component';
import { UpdateCategoryComponent } from './components/categories/update-category/update-category.component';
import { OrderDetailComponent } from './components/orders/order-detail/order-detail.component';
import { ProductGesComponent } from './components/products/product-ges/product-ges.component';
import { PageMvtStkComponent } from './components/mvtStks/page-mvt-stk/page-mvt-stk.component';
import { DetailMvtStkProduitComponent } from './components/mvtStks/detail-mvt-stk-produit/detail-mvt-stk-produit.component';
import { DetailMvtStkComponent } from './components/mvtStks/detail-mvt-stk/detail-mvt-stk.component';
import { DetailCmdClientComponent } from './components/cmdClients/detail-cmd-client/detail-cmd-client.component';
import { DetailCmdComponent } from './components/cmdClients/detail-cmd/detail-cmd.component';
import { PageCmdClientComponent } from './components/cmdClients/page-cmd-client/page-cmd-client.component';
import { PagePanierComponent } from './components/paniers/page-panier/page-panier.component';
import { DetailCmdPanierComponent } from './components/paniers/detail-cmd-panier/detail-cmd-panier.component';
import { CommandeClientComponent } from './components/commande-client/commande-client.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductDetailComponent,
    ProductGesComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    UserComponent,
    AddUserComponent,
    DetailUserComponent,
    OrderComponent,
    AddOrderComponent,
    CategoryComponent,
    AddCategoryComponent,
    NavAdminComponent,
    ProfileComponent,
    UpdateProfileComponent,
    LoginComponent,
    UpdateCategoryComponent,
    OrderDetailComponent,
    PageMvtStkComponent,
    DetailMvtStkProduitComponent,
    DetailMvtStkComponent,
    DetailCmdClientComponent,
    DetailCmdComponent,
    PageCmdClientComponent,
    PagePanierComponent,
    DetailCmdPanierComponent,
    CommandeClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatOptionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatCardModule,
    LayoutModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    ProductModule,
    HttpClientModule,
    CarouselModule,
    MatSelectModule,
  ],
  exports: [
    MatIconModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
