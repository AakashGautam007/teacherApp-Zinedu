import { useDispatch, useSelector } from "react-redux";
import { setAuthValues, resetAuthValues } from "../../redux/reducer/authReducer";

interface AuthFieldsHooks {
    userName: string;
    userToken: string;
    isLoading: boolean;
    fcmToken: string;
}

// Custom hooks to get tokens and auth fields
export const useAuthFields = () => {
    const { userName, userToken, isLoading, fcmToken } = useSelector((state: any) => state['authReducer']);
    const dispatch = useDispatch()

    const setAuthFields = (value: AuthFieldsHooks) => {
        dispatch(setAuthValues({
            ...value
        }))
    }

    const resetAuthFields = () => {
        dispatch(resetAuthValues({}))
    }

    return {
        userName,
        userToken,
        isLoading,
        setAuthFields,
        resetAuthFields
    };
};

