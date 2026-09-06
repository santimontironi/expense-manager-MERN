import { useMe } from "../../hooks/auth/useMe"
import { Navigate } from 'react-router-dom'

const VerifyAuth = ({ children }: { children: React.ReactNode }) => {
    const { data: me, isLoading } = useMe()

    if (isLoading) {
        return <div>Cargando...</div>
    }

    if (!me) {
        return <Navigate to="/" />
    }

    return children
}

export default VerifyAuth