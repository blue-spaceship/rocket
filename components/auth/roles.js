const roles = {
    "/" : null,
    "/auth/logout" : { loggedIn: true, unauthorized: '/login' },
    "/auth/login" : { loggedIn: false, unauthorized: '/' },
    "/auth/forgot" : { loggedIn: false, unauthorized: '/' }
}

export default roles