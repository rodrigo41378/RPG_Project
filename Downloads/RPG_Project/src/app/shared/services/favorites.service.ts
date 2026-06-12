import { Injectable } from '@angular/core';
export interface FavoriteItem { type: string; id: string; name?: string }

const KEY = 'epic:favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private list: FavoriteItem[] = [];

  constructor() {
    try {
      const raw = localStorage.getItem(KEY);
      this.list = raw ? JSON.parse(raw) : [];
    } catch {
      this.list = [];
    }
  }

  private persist() {
    try { localStorage.setItem(KEY, JSON.stringify(this.list)); } catch {}
  }

  getAll(): FavoriteItem[] { return [...this.list]; }

  isFavorite(type: string, id: string) {
    return this.list.some(i => i.type === type && i.id === id);
  }

  add(type: string, id: string, name?: string) {
    if (!this.isFavorite(type, id)) {
      this.list.push({ type, id, name });
      this.persist();
    }
  }

  remove(type: string, id: string) {
    const idx = this.list.findIndex(i => i.type === type && i.id === id);
    if (idx >= 0) { this.list.splice(idx, 1); this.persist(); }
  }

  toggle(type: string, id: string, name?: string) {
    if (this.isFavorite(type, id)) { this.remove(type, id); return false; }
    this.add(type, id, name); return true;
  }
}
