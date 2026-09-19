export type NoteType = 'pizarra' | 'lista' | 'hoja'

export interface Carpeta {
  id: string
  nombre: string
  createdAt: number
  updatedAt: number
}

export interface Tag {
  id: string
  nombre: string
  color?: string
}

export interface ListaItem {
  id: string
  texto: string
  completado: boolean
  orden: number
}

export type ContenidoPizarra = Record<string, unknown>
export type ContenidoLista = ListaItem[]
export type ContenidoHoja = string

interface NotaBase {
  id: string
  nombre: string
  carpetaId: string | null
  tagIds: string[]
  createdAt: number
  updatedAt: number
}

export interface NotaPizarra extends NotaBase {
  tipo: 'pizarra'
  contenido: ContenidoPizarra
}

export interface NotaLista extends NotaBase {
  tipo: 'lista'
  contenido: ContenidoLista
}

export interface NotaHoja extends NotaBase {
  tipo: 'hoja'
  contenido: ContenidoHoja
}

export type Nota = NotaPizarra | NotaLista | NotaHoja