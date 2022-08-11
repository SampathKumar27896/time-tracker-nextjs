import { createContext } from 'react';
import apiFetcher from '../helpers/utilityFunctions';
const APIContext = createContext(apiFetcher);
export default APIContext;