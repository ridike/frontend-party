import { action } from "typesafe-actions"

export const userLoggedIn = (ticket: string) => action('UserLoggedIn', { ticket });

export const userLoggedOut = () => action('UserLoggedOut', {})
