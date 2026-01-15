export { }

export type Roles = 'admin' | 'member'

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            role?: Roles
        }
    }
}

export const BASE_URL = process.env.BASE_URL