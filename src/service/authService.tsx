import axios from "axios"
import { baseUrl } from "./config"
import { AppDispatch, store } from "../redux/store";
import { clearUser, setUser } from "../redux/slice/userSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { resetAndNavigate } from "../utils/NavigationUtils";
import { appAxios } from "./apiInterceptors";
import { Alert } from "react-native";


export const customerLogin = (phone: string) => async (dispatch: any) => {
    {
        try {
            const response = await axios.post(`${baseUrl}/customer/login`, { phone })
            const { accessToken, refreshToken, customer } = response.data;
            dispatch(setUser({ user: customer, accessToken, refreshToken, role: response?.data?.customer?.role }));
              resetAndNavigate("ProductDashboard");
        }
        catch (error) {
            console.log("Login Error", error)
        }
    }
}


export const deliveryLogin = (email: string,password : string) => async (dispatch: Dispatch) => {
    {
        try {
            const response = await axios.post(`${baseUrl}/deliveryPartnerLogin/login`, {email,password})
            console.log(response.data, "res");
            const { accessToken, refreshToken, deliveyPartner } = response.data;
            
            console.log(response?.data?.customer?.role);
            dispatch(setUser({ user: deliveyPartner, accessToken, refreshToken, role: response?.data?.deliveyPartner?.role }));
            resetAndNavigate("ProductDashboard");
        }
        catch (error) {
            console.log("Login Error", error)
        }
    }
}

export const refechUser = () => async (dispatch: Dispatch) => {
    {
        try {
            const response = await appAxios.get(`/user`)
            dispatch(setUser({user: response.data.user}));

        }
        catch (error) {
            console.log("Login Error", error)
        }
    }
}



export const refresh_token = () => async (dispatch: Dispatch) => {
    try {
        const state = await store.getState();
        const token = await state.user.accessToken; 
        const response = await axios.post(`${baseUrl}/refreshToken`, { token })
        const { accessToken, refreshToken } = response.data;
        dispatch(setUser({ accessToken, refreshToken }));
        return accessToken;
    }
    catch (e) {
        console.log("Something went wrong")
        dispatch(clearUser())
        resetAndNavigate("CustomerLogin")
    }

}