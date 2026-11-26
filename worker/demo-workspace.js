// Canonical page paths for the public, business-only Vercel demo.
export function demoWorkspacePath(path) {
  if (path === '/admin' || path === '/admin/') return '/admin/dashboard';
  if (path === '/plans' || path === '/plans/') return '/hotel/subscription';
  if (path.startsWith('/admin/') || (path.startsWith('/hotel/') && path !== '/hotel/')) return path;
  return '/hotel/dashboard';
}
