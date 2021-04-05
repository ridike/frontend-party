import { AuthTicket } from './oauthService'
import { action } from "typesafe-actions"

export const userLoggedIn = (ticket: AuthTicket) => action('UserLoggedIn', { ticket });

export const userLoggedOut = () => action('UserLoggedOut', {})
