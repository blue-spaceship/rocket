const Rules = {
    "/" : null,
    "/auth/logout" : { auth: true, unauthorized: '/login' },
    "/auth/login" : { auth: false, unauthorized: '/' },
    "/auth/forgot" : { auth: false, unauthorized: '/' },

    "/manager/users" : { auth: true, unauthorized: '/', roles: ['admin', 'user-manager'] },
    "/manager/users/[id]" : { auth: true, unauthorized: '/', roles: ['admin', 'user-manager'] },
    "/manager/users/[id]/edit" : { auth: true, unauthorized: '/', roles: ['admin', 'user-manager'] },

    "/manager/roles" : { auth: true, unauthorized: '/', roles: ['admin', 'user-manager'] },
    "/manager/roles/[id]/edit" : { auth: true, unauthorized: '/', roles: ['admin', 'user-manager'] },

    // API routers
    "/api/users" : {
        isLogged: true,
        roles: {
            GET: ['admin', 'user-manager'],
            POST: ['admin', 'user-manager']
        }
    },
    "/api/users/[id]" : {
        isLogged: true,
        roles: {
            GET: ['admin', 'user-manager'],
            PUT: ['admin', 'user-manager'],
            PATCH: ['admin', 'user-manager'],
            DELETE: ['admin', 'user-manager']
        }
    },
    "/api/roles" : {
        isLogged: true,
        roles: {
            GET: ['admin', 'role-manager'],
            POST: ['admin', 'role-manager']
        }
    },
    "/api/roles/[id]" : {
        isLogged: true,
        roles: {
            GET: ['admin', 'role-manager'],
            POST: ['admin', 'role-manager'],
            PATCH: ['admin', 'user-manager'],
            DELETE: ['admin', 'user-manager']
        }
    },
}

export default Rules