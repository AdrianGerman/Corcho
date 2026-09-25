import { db } from './db'
import type { Nota, NoteType } from '../types/note'

function contenidoInicial (tipo: NoteType) {
  switch (tipo) {
    case 'pizarra':
      return {}
    case 'lista':
      return []
    case 'hoja':
      return ''
  }
}

export async function crearNota (params: {
  nombre: string
  tipo: NoteType
  carpetaId: string | null
  tagIds: string[]
}): Promise<Nota> {
  const now = Date.now()

  const nota = {
    id: crypto.randomUUID(),
    nombre: params.nombre.trim() || 'Sin título',
    carpetaId: params.carpetaId,
    tagIds: params.tagIds,
    createdAt: now,
    updatedAt: now,
    tipo: params.tipo,
    contenido: contenidoInicial(params.tipo),
  } as Nota

  await db.notas.add(nota)
  return nota
}

export async function crearCarpeta (nombre: string) {
  const now = Date.now()
  const carpeta = {
    id: crypto.randomUUID(),
    nombre: nombre.trim(),
    createdAt: now,
    updatedAt: now,
  }
  await db.carpetas.add(carpeta)
  return carpeta
}

export async function crearTag (nombre: string) {
  const tag = {
    id: crypto.randomUUID(),
    nombre: nombre.trim(),
  }
  await db.tags.add(tag)
  return tag
}