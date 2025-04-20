import { PLUGIN_BASE_URL } from '../constants';

// Prefixes the route with the base URL of the plugin
export function prefixRoute(route?: string): string {
  if (!route) {
    return PLUGIN_BASE_URL;
  }
  return `${PLUGIN_BASE_URL}${route}`;
}
