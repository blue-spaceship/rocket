import { useEffect } from "react"
import { useSession } from "next-auth/react"

export default function ACM ( { auth = true, roles = '', children } ){
    // when is null show for everyone
    if(auth === null){
        return children
    }

    const { data: session, status } = useSession({
        required: auth,
        onUnauthenticated() { return null }
    })

    useEffect(() => {
		if (status) return
	}, [status])

    // for non logged users only
    if(status === "unauthenticated" && !auth){
        return children
    }

    if(status === "authenticated" && auth){
        // In case is authentecated verify is there's a role based control before showing children
        if(roles !== '' && !roles.split(',').find( role => session.user?.roles?.includes(role) ) ){
            return null
        }

        return children
    }

    return null
}