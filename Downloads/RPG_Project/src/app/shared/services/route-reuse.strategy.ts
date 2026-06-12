import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, DetachedRouteHandle,
  RouteReuseStrategy
} from '@angular/router';

/**
 * Estratégia customizada:
 * - Rotas com params dinâmicos (:id, :type) NÃO são reutilizadas quando
 *   os params mudam → sem necessidade de Ctrl+R ao navegar entre itens.
 * - Rotas estáticas (home, bestiary, etc.) SÃO mantidas em cache para
 *   transições fluidas e estado preservado (scroll, filtros).
 */
@Injectable({ providedIn: 'root' })
export class AppRouteReuseStrategy implements RouteReuseStrategy {
  private cache = new Map<string, DetachedRouteHandle>();

  /** Rotas que NÃO devem ser cacheadas (têm params dinâmicos) */
  private readonly dynamicRoutes = new Set([
    'detail', 'category',
  ]);

  private key(route: ActivatedRouteSnapshot): string {
    // Inclui os params na chave para distinguir /detail/creature/1 de /detail/creature/2
    const paramStr = JSON.stringify(route.params);
    return `${route.routeConfig?.path ?? ''}::${paramStr}`;
  }

  private isDynamic(route: ActivatedRouteSnapshot): boolean {
    const path = route.routeConfig?.path ?? '';
    return this.dynamicRoutes.has(path.split('/')[0]);
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // Não armazena rotas dinâmicas no cache
    return !this.isDynamic(route) && !!route.routeConfig;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    if (handle && !this.isDynamic(route)) {
      this.cache.set(this.key(route), handle);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    if (this.isDynamic(route)) return false;
    return this.cache.has(this.key(route));
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (this.isDynamic(route)) return null;
    return this.cache.get(this.key(route)) ?? null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // Mesma config de rota E mesmos params → reutiliza
    if (future.routeConfig !== curr.routeConfig) return false;

    // Se params mudaram em rota dinâmica, força recriação do componente
    if (this.isDynamic(future)) {
      return JSON.stringify(future.params) === JSON.stringify(curr.params);
    }

    return true;
  }
}
