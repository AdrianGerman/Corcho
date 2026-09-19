import Dexie, { type Table } from 'dexie'
import type { Nota, Carpeta, Tag } from '../types/note'

export class CorchoDB extends Dexie {
  notas!: Table<Nota, string>
  carpetas!: Table<Carpeta, string>
  tags!: Table<Tag, string>

  constructor () {
    super('corcho-db')
    this.version(1).stores({
      notas: 'id, tipo, carpetaId, nombre, updatedAt, *tagIds',
      carpetas: 'id, nombre',
      tags: 'id, nombre',
    })
  }
}

export const db = new CorchoDB()