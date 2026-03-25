import Dexie, { type Table } from 'dexie'

export interface RegistroPrecio {
  id: string // Ej: "modena-1200x1100"
  linea: string
  tipologia: string
  ancho: number
  alto: number
  precios: Record<string, number>
  archivo: string
  fechaActualizacion: string
}

// 1. Definición de la Base de Datos
export class LebauxDatabase extends Dexie {
  precios!: Table<RegistroPrecio>

  constructor() {
    super('lebaux_db_precios')
    this.version(1).stores({
      // El primer campo es la Primary Key (id).
      // Los demás son índices para búsquedas rápidas.
      precios: 'id, archivo, linea, [ancho+alto]',
    })
  }
}

export const db = new LebauxDatabase()

// 2. Clase de Servicio para manejar los datos
class PreciosService {
  /**
   * Obtiene todos los precios
   */
  public async getAll(): Promise<RegistroPrecio[]> {
    return await db.precios.toArray()
  }

  /**
   * Guarda o actualiza múltiples registros (Bulk Put)
   * IndexedDB es asíncrono, por lo que usamos async/await.
   */
  public async bulkPut(nuevosDatos: RegistroPrecio[]): Promise<void> {
    try {
      await db.precios.bulkPut(nuevosDatos)
    } catch (error) {
      console.error('Error al guardar en IndexedDB:', error)
      throw error
    }
  }

  /**
   * Busca un precio por archivo y dimensiones
   */
  public async buscarPrecio(archivo: string, ancho: number, alto: number) {
    return await db.precios.where({ archivo, ancho, alto }).first()
  }

  /**
   * Borra todos los datos (Reset)
   */
  public async clearAll(): Promise<void> {
    await db.precios.clear()
  }

  /**
   * Obtiene los nombres de archivos únicos (para el Select de tu vista)
   */
  public async getNombresArchivos(): Promise<string[]> {
    const todos = await db.precios.toArray()
    const nombres = new Set(todos.map((p) => p.archivo))
    return Array.from(nombres)
  }
}

export const preciosDB = new PreciosService()
