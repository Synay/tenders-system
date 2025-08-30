import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {

    base = 'http://localhost:4000/api';

    constructor(private http: HttpClient) { }
    getTenders() {
        return firstValueFrom(this.http.get<any[]>(`${this.base}/tenders`));
    }
    
    getTenderDetail(id: string) {
        return firstValueFrom(this.http.get<any>(`${this.base}/tenders/${id}`));
    }
    getProducts() {
        return firstValueFrom(this.http.get<any[]>(`${this.base}/products`));
    }

    createProduct(payload: any) {
        return firstValueFrom(this.http.post(`${this.base}/products`, payload));
    }

    createOrder(payload: any) {
        return firstValueFrom(this.http.post(`${this.base}/orders`, payload));
    }

    createTender(payload: any) {
        return firstValueFrom(this.http.post(`${this.base}/tenders`, payload));
    }
}
