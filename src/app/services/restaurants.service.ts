import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { serialize } from './utils';

export interface Restaurant {
    preview?: any;
    note?: any;
    canCreatePayment?: boolean;
    private: boolean;
    distance: number;
    latitude: number;
    placeholderDelivery: string;
    rating?: number;
    description: string;
    enableTransfers: boolean;
    delayFrom?: number;
    cover: string;
    isDeliveryEnabled?: boolean;
    onlyPaynow?: boolean;
    mealVouchersUseMode: string;
    id: number;
    slug: string;
    longitude: number;
    area: string;
    address: string;
    companyType: string;
    payoff: string;
    delay: string;
    enableBulkEmailReports?: boolean;
    delayTo?: number;
    name: string;
    enableInvoices?: boolean;
    days: number[];
    delayTime: number;
    canCreatePaymentForUser: boolean;
    status: string;
    open: boolean;
    openingTime: number;
    closingTime: number;
    openingDay: number;
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  defaultValue = {latitude : 45.46, longitude : 9.18, open : true};
  constructor(private httpClient: HttpClient) { }

  getRestaurants = (options?: {latitude: number; longitude: number; open: boolean }) =>
    this.httpClient
    .get<Restaurant[]>(`${environment.host}/v2/restaurants?${serialize({...this.defaultValue, ...options})}`)
    .toPromise();
  getRestaurant = (id: number, options?: {latitude: number; longitude: number; open: boolean }) =>
    this.httpClient
    .get<Restaurant>(`${environment.host}/v2/restaurants/${id}?${serialize({...this.defaultValue, ...options})}`)
    .toPromise();


}
