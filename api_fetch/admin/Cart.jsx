import Headers from '../Headers';
import { ProcessAPI, Const } from '../../utils/Constants';

export const checkExist = async (token) => {
    const res = await fetch(Const.Link + "api/addcart/checkExist", { method: "POST", body: JSON.stringify({ token }) });
    return ProcessAPI(res);
}

export const FinalPrice = async (body) => {
    const res = await fetch(Const.Link + "api/products/getFinalPrice", { method: "POST", body: JSON.stringify(body) });
    return ProcessAPI(res);
}

