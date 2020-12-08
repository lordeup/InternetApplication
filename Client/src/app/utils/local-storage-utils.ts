import { Injectable } from "@angular/core";
import { KeyLocalStorage } from "./key-local-storage";

@Injectable({
  providedIn: "root"
})
export class LocalStorageUtils {

  private static getItem(keyLocalStorage: KeyLocalStorage): string {
    return localStorage.getItem(keyLocalStorage);
  }

  private static removeItem(keyLocalStorage: KeyLocalStorage): void {
    localStorage.removeItem(keyLocalStorage);
  }

  private static setItem(keyLocalStorage: KeyLocalStorage, data: any): void {
    localStorage.setItem(keyLocalStorage, data);
  }

  getAccessToken(): string {
    return LocalStorageUtils.getItem(KeyLocalStorage.AccessToken);
  }

  getIdUser(): string {
    return LocalStorageUtils.getItem(KeyLocalStorage.IdUser);
  }

  getDarkMode(): string {
    return LocalStorageUtils.getItem(KeyLocalStorage.DarkMode);
  }

  removeAccessToken(): void {
    LocalStorageUtils.removeItem(KeyLocalStorage.AccessToken);
  }

  removeIdUser(): void {
    LocalStorageUtils.removeItem(KeyLocalStorage.IdUser);
  }

  setAccessToken(data: any): void {
    LocalStorageUtils.setItem(KeyLocalStorage.AccessToken, data);
  }

  setIdUser(data: any): void {
    LocalStorageUtils.setItem(KeyLocalStorage.IdUser, data);
  }

  setDarkMode(data: any): void {
    LocalStorageUtils.setItem(KeyLocalStorage.DarkMode, data);
  }
}
