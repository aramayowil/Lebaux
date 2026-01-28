export interface AuthResponse {
  ok: boolean // Viene del res.status().json({ ok: true }) del backend
  message: string
  auth_token: string // El JWT largo que generamos
  user: {
    // Los datos del usuario (puedes usar tu interfaz IUser aquí)
    usuario_id: number
    email: string
    nombre: string
    role: string
  }
}

export interface ApiError {
  status: number
  message: string
  ok: boolean
  error: string // Por si devuelves un código de error específico
}

export interface ApiSuccess {
  status: number
  message: string
  ok: boolean
  user?: {
    usuario_id: number
    email: string
    nombre: string
    role: string
  }
}
