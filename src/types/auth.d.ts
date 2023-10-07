import { Session } from "next-auth"

export type SessionUser = Session & {
  user?: {
    id?: string | null
  }
}