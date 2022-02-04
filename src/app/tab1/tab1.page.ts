import { Component, OnInit } from '@angular/core';
import { Restaurant, RestaurantsService } from '../services/restaurants.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  restaurants: Restaurant[] = [];
  allRestaurants: Restaurant[] = [];
  search = '';
  constructor(private restaurantService: RestaurantsService) {}
  async ngOnInit() {
    this.allRestaurants = await this.restaurantService.getRestaurants();
    this.restaurants = [...this.allRestaurants];
  }

  searchRestaurant() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.search.length === 0 ?
      (this.restaurants = [...this.allRestaurants]) :
      (this.restaurants = [...this.allRestaurants].filter(({name}) => name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())));
  }



}
