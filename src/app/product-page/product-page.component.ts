import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {
  cocktailId: string = '';
  cocktailDetails: any;
  ingredientSum: number[] = [];
  descriptionSum: string[] = [];
  descriptionElements: string[] = [ '' , 'DE', 'ES', 'FR', 'IT', 'ZH-HANS', 'ZH-HANT'];

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private http: HttpClient,
              private router: Router) {}



  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.cocktailId = params.get('idDrink') || '';
        if (this.cocktailId) {
          this.fetchCocktailDetails();
        }
      });

      for (let i = 1; i <= 15; i++) {
        this.ingredientSum.push(i);
      }
      for (let i = 0; i < this.descriptionElements.length; i++) {
        this.descriptionSum.push(this.descriptionElements[i]);
      }
    }


  fetchCocktailDetails(): void {
    this.http.get<any>(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.cocktailId}`)
      .subscribe(
        response => {
          console.log(response);
          if (response && response.drinks && response.drinks.length > 0) {
            this.cocktailDetails = response.drinks[0];
          } else {
            console.error('Invalid response');
          }
        },
        error => {
          console.error('Error', error);
        }
      );
  }


  navigateToHomePage(): void {
    this.router.navigate(['']);
  }

}
