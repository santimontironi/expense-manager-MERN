import { useMe } from "../../hooks/auth/useMe"
import Loader, { useMinLoading } from "../ui/Loader"
import { Navigate } from 'react-router-dom'

const VerifyAuth = ({ children }: { children: React.ReactNode }) => {
    const { data: me, isLoading } = useMe()
    const showLoader = useMinLoading(isLoading)

    if (showLoader) {
        return <Loader />
    }

    if (!me) {
        return <Navigate to="/" />
    }

    return children
}

export default VerifyAuth