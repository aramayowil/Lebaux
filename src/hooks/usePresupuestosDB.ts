// hooks/usePresupuestosDB.ts
import { useEffect, useState, useCallback } from 'react'
import IPresupuesto from '@/interfaces/IPresupuesto'

const DB_NAME = 'lebaux_db'
const STORE_NAME = 'presupuestos'
const DB_VERSION = 1

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export function usePresupuestosDB() {
  const [presupuestos, setPresupuestos] = useState<IPresupuesto[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const cargarPresupuestos = useCallback(async () => {
    try {
      const db = await openDB()
      const tx = db.transaction(STORE_NAME, 'readonly')
      const store = tx.objectStore(STORE_NAME)
      const request = store.getAll()

      request.onsuccess = () => {
        const data = request.result as IPresupuesto[]
        // Ordenamos por fecha o ID de forma descendente para el historial
        setPresupuestos([...data].reverse())
        setIsLoading(false)
      }
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }, [])

  /**
   * NUEVA FUNCIÓN: Obtiene el ID más alto de la DB y genera el siguiente.
   * Útil para evitar duplicados incluso si se borraron registros intermedios.
   */
  /**
   * Obtiene el ID numérico más alto y devuelve el siguiente con 5 dígitos.
   */
  const createId = useCallback(async (): Promise<string> => {
    const db = await openDB()
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)

    return new Promise((resolve) => {
      const request = store.getAllKeys()

      request.onsuccess = () => {
        const keys = request.result as string[]
        let maxCorrelativo = 0

        keys.forEach((id) => {
          // Convertimos el ID guardado (ej: "00005") a número (ej: 5)
          const num = parseInt(id, 10)
          if (!isNaN(num) && num > maxCorrelativo) {
            maxCorrelativo = num
          }
        })

        // Sumamos 1 al más alto encontrado
        const nuevoNumero = maxCorrelativo + 1

        // Lo transformamos a string rellenando con ceros hasta tener 5 caracteres
        resolve(nuevoNumero.toString().padStart(5, '0'))
      }

      request.onerror = () => resolve('00001') // Si hay error, empieza en 1
    })
  }, [])

  const obtenerPresupuestoPorId = useCallback(async (id: string) => {
    const db = await openDB()
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    const request = store.get(id)

    return new Promise<IPresupuesto | undefined>((resolve) => {
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => resolve(undefined)
    })
  }, [])

  const guardarPresupuesto = useCallback(
    async (p: IPresupuesto) => {
      const db = await openDB()
      const tx = db.transaction(STORE_NAME, 'readwrite')
      tx.objectStore(STORE_NAME).put(p)

      return new Promise<void>((resolve) => {
        tx.oncomplete = () => {
          cargarPresupuestos()
          resolve()
        }
      })
    },
    [cargarPresupuestos],
  )

  const eliminarPresupuesto = useCallback(
    async (id: string | number) => {
      const db = await openDB()
      const tx = db.transaction(STORE_NAME, 'readwrite')
      tx.objectStore(STORE_NAME).delete(id)

      return new Promise<void>((resolve) => {
        tx.oncomplete = () => {
          cargarPresupuestos()
          resolve()
        }
      })
    },
    [cargarPresupuestos],
  )

  const actualizarPresupuesto = useCallback(
    async (id: string, data: Partial<IPresupuesto>) => {
      const db = await openDB()
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)

      // 1. Obtenemos el registro actual para no perder datos (como el estado o items si no vienen en data)
      const request = store.get(id)

      return new Promise<void>((resolve, reject) => {
        request.onsuccess = () => {
          const presupuestoActual = request.result as IPresupuesto
          if (!presupuestoActual) {
            reject(new Error('Presupuesto no encontrado'))
            return
          }

          // 2. Fusionamos los datos
          const presupuestoActualizado: IPresupuesto = {
            ...presupuestoActual,
            ...data,
            // IMPORTANTE: Mantenemos el ID original para no crear uno nuevo
            id: id,
          }

          // 3. Guardamos la versión actualizada
          store.put(presupuestoActualizado)

          tx.oncomplete = () => {
            cargarPresupuestos() // Recargamos la lista
            resolve()
          }
        }

        request.onerror = () => reject(request.error)
      })
    },
    [cargarPresupuestos],
  )

  // Actualiza solo el estado
  type EstadoPresupuesto = 'pendiente' | 'aprobado' | 'rechazado'
  const actualizarEstado = useCallback(
    async (id: string, estado: EstadoPresupuesto) => {
      const db = await openDB()
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)

      // 1. Obtenemos el registro actual para no perder datos (como el estado o items si no vienen en data)
      const request = store.get(id)

      return new Promise<void>((resolve, reject) => {
        request.onsuccess = () => {
          const presupuestoActual = request.result as IPresupuesto
          if (!presupuestoActual) {
            reject(new Error('Presupuesto no encontrado'))
            return
          }

          // 2. Fusionamos los datos
          const presupuestoActualizado: IPresupuesto = {
            ...presupuestoActual,
            estado: estado,
            // IMPORTANTE: Mantenemos el ID original para no crear uno nuevo
            id: id,
          }

          // 3. Guardamos la versión actualizada
          store.put(presupuestoActualizado)

          tx.oncomplete = () => {
            cargarPresupuestos() // Recargamos la lista
            resolve()
          }
        }

        request.onerror = () => reject(request.error)
      })
    },
    [cargarPresupuestos],
  )

  useEffect(() => {
    cargarPresupuestos()
  }, [cargarPresupuestos])

  return {
    presupuestos,
    isLoading,
    obtenerPresupuestoPorId,
    guardarPresupuesto,
    eliminarPresupuesto,
    createId, // Exportamos la nueva función
    actualizarPresupuesto,
    actualizarEstado,
  }
}
