import { hydrateRoot } from 'react-dom/client';
import { Editorial } from './Editorial';

export function mount(container: HTMLElement) {
  const root = hydrateRoot(container, <Editorial/>);
  return () => root.unmount();
}
