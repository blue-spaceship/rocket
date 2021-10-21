import Axios from "axios"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Pipeless from "/services/pipeless"

export default NextAuth({
    providers: [
        Credentials({
            name: "Credenciais de Gestão",
            credentials: {
                username: { label: "Usuário", type: "text", placeholder: "usuário" },
                password: { label: "Senha", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    const result = await Axios.post(`${ process.env.NEXTAUTH_URL }/api/auth/login`, credentials)
                    .then((result)=>{
                        if (result.data) {
                            return { ...result.data }
                        } else {
                            return null
                        }
                    }).catch( error =>{
                        // console.error('ERRO DE LOGIN 1', error);
                        return null
                    })
                    return result
                } catch (error) {
                    // console.error('ERRO DE LOGIN 2', error);
                    return null
                }
            }
        })
    ],

    secret: process.env.SESSION_SECRET,

    pages: {
        signIn: '/login',
        signOut: '/auth/logout',
        error: '/auth/error',
        newUser: '/welcome'
    },

    session: { jwt: true },

    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }){
            const __token = { ...token, ...user, isNewUser }
            return __token
        },
        async session({ session, token, user }) {
            return { ...session, user: { ...session.user, ...token} }
        }
    },

    events:{
        signIn({ account, user, isNewUser, profile }){
            const _ = Pipeless
            new _.Event(
                new _.Subject(user._id, _.ObjectTypes.user),
                new _.Relationship(_.RelationshipTypes.loggedIn, null, true),
                new _.Subject(process.env.APP_NAME, _.ObjectTypes.app) ).Save()
        }
    }

})