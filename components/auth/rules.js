const Rules = {
    "/" : null,
    "/auth/logout" : { auth: true, unauthorized: '/login' },
    "/auth/login" : { auth: false, unauthorized: '/' },
    "/auth/forgot" : { auth: false, unauthorized: '/' },

    "/manager/users" : { auth: true, unauthorized: '/', roles: 'admin,user-manager' },
    "/manager/users/[id]" : { auth: true, unauthorized: '/', roles: 'admin,user-manager' },
    "/manager/users/[id]/edit" : { auth: true, unauthorized: '/', roles: 'admin,user-manager' },
}

export default Rules