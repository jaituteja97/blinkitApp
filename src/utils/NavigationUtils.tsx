import { CommonActions, createNavigationContainerRef, StackActions } from "@react-navigation/native";
import { FC } from "react";

export const navigationRef = createNavigationContainerRef();

export async function navigate(routeName: string, params?: object) {
    navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.navigate(routeName, params))
    }
}

export async function replace(routeName: string, params?: object) {
    navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(routeName, params))
    }
}


export async function resetAndNavigate(routeName: string) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: routeName }]
            })
        );
    }
}

export async function goBack(routeName: string) {
    navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.goBack())
    }
}

export async function push(routeName: string, params?: object) {
    navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.push(routeName, params))
    }
}

export async function prepareNavigation() {
    navigationRef.isReady();
}
