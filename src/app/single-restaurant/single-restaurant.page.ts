import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant, RestaurantsService } from '../services/restaurants.service';

@Component({
  selector: 'app-single-restaurant',
  templateUrl: './single-restaurant.page.html',
  styleUrls: ['./single-restaurant.page.scss'],
})
export class SingleRestaurantPage implements OnInit {
  id: number;
  restaurant: Restaurant;
  constructor(private route: ActivatedRoute, private restaurantService: RestaurantsService) {}

  async ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.restaurant = await this.restaurantService.getRestaurant(this.id);
  }

}
