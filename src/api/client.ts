const BASE_URL = import.meta.env.API_URL

/**
 * @param endpoint - La ruta (ej: '/users/register')
 * @param options - Configuración adicional (method, body, etc.)
 */

export const client = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const url = `${BASE_URL}${endpoint}`

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const config = {
    ...options,
    headers,
  }

  const response = await fetch(url, config)

  let data: any
  try {
    data = await response.json()
  } catch (error) {
    data = null
  }

  if (!response.ok) {
    const error = {
      ok: response.ok,
      status: response.status,
      message: data?.message,
      error: data?.error,
    }
    throw error
  }

  return data as T
}
