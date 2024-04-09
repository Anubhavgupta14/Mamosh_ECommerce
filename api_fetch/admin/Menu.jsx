import Headers from '../Headers';
import { ProcessAPI, Const } from '../../utils/Constants';

// Edit Product API
export const getMenu = async (body) => {
    const res = await fetch(Const.Link + "api/menu", new Headers("GET"));
    return ProcessAPI(res);
}