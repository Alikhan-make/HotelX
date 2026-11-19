import { renderToString } from 'react-dom/server';
import { Editorial } from './Editorial';

export const markup = renderToString(<Editorial/>);
