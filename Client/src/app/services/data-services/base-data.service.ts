import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Id } from "../../models/id";

@Injectable({
  providedIn: "root"
})
export class BaseDataService<TEntity> {

  constructor(
    protected readonly http: HttpClient,
    @Inject(String) protected readonly apiUrl: string,
    @Inject(String) protected readonly routeName: string
  ) {
  }

  protected readonly baseUrl = this.apiUrl + this.routeName;

  getAll(): Promise<TEntity[]> {
    return this.http.get<TEntity[]>(this.baseUrl).toPromise();
  }

  getById(id: Id): Promise<TEntity> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<TEntity>(url).toPromise();
  }

  add(data: Partial<TEntity>): Promise<TEntity> {
    return this.http.post<TEntity>(this.baseUrl, data).toPromise();
  }

  update(id: Id, data: Partial<TEntity>): Promise<boolean> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.patch<boolean>(url, data).toPromise();
  }

  delete(id: Id): Promise<boolean> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<boolean>(url).toPromise();
  }
}
