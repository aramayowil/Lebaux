export interface IUser {
  usuario_id: number
  email: string
  nombre: string
  apellido: string
  role?: 'admin' | 'user' // Opcional para facilitar el registro
  token_expires_at?: string | null
  welcome_shown?: boolean
  last_version_seen?: string
  last_login?: string | null // Nullable si nunca ha iniciado sesión
  is_verified?: boolean
  readonly fecha_creacion?: string // Cambiado a Date para coincidir con el driver de PG o prisma
}

// Payload para registro
export interface RegisterPayload {
  nombre: string
  apellido: string
  email: string
  password: string
}

// Payload para registro
export interface RegisterPayload {
  nombre: string
  apellido: string
  email: string
  password: string
}
