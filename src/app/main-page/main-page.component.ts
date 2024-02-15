import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {
    searchKeyword: string = '';
    products: any[] = [];
    cocktails: any[] = [];
    allCocktails: any[] = [];
    filteredData: any[] = [];
    panelOpenState = false;
    categories: any[] = [];
    filters: any[] = [];
    selectedCategory: any;
    filteredCocktails: any[] = [];
    selectedCategories: string[] = [];
    totalLength = 0;
    pageSize = 12;
    pageIndex = 0;
    pageSizeOptions = [8, 12, 28, 100];


    constructor(private productService: ProductService,
                private router: Router) {}

    ngOnInit(): void {

      const alphabet = 'abcdefghijklmnopqrstuvwxyz';

      const requests = alphabet.split('').map(letter =>
        this.productService.searchProducts(letter)
      );

      forkJoin(requests).subscribe((responses: any[]) => {
        responses.forEach(response => {
          this.allCocktails.push(...(response?.drinks || []));
          this.filteredCocktails = [...this.allCocktails];
          this.totalLength = this.filteredCocktails.length;
          this.updatePaginator();
        });
      });

       this.searchCategory();

    }

    search() {
      this.searchKeyword = this.searchKeyword || '';
      if (this.searchKeyword.trim() === '') {
        this.filteredData = this.allCocktails;
      } else {
        this.filteredData = this.allCocktails.filter(item =>
          item.strDrink && item.strDrink.toLowerCase()?.includes(this.searchKeyword.toLowerCase())
        );
      }
      this.filteredCocktails = this.filteredData;
      console.log(this.filteredData);
    }


    filterCategories(event: any): void {
      const selectedCategory = event?.options?.[0]?.value?.strCategory;
      const selected = event?.options?.[0]?.selected;

      if (selectedCategory) {
        if (selected) {
          this.selectedCategories.push(selectedCategory);
        } else {
          const index = this.selectedCategories.indexOf(selectedCategory);
          if (index !== -1) {
            this.selectedCategories.splice(index, 1);
          }
        }

        if (this.selectedCategories.length > 0) {
          this.filteredCocktails = this.allCocktails.filter(cocktail =>
            this.selectedCategories.includes(cocktail?.strCategory)
          );
        } else {
          this.filteredCocktails = this.allCocktails;
        }
      }
    }

    searchCategory() {
      this.productService.searchCategories().subscribe((data: any) => {
        this.categories = data.drinks || [];
        this.reachData();
      });
    }

    reachData(): void {
      this.filters = this.categories;
    }

    onPageChange(event: any): void {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.updatePaginator();
    }

    private updatePaginator(): void {
      const startIndex = this.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.filteredCocktails = this.allCocktails.slice(startIndex, endIndex);
    }

    navigateToProductPage(idDrink: string): void {
      this.router.navigate(['/cocktail', idDrink]);
    }

}
