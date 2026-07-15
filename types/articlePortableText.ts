import type { PortableTextBlock } from "sanity"

export interface PortableTextObjectNode {
  _key?: string
  _type: string
  [key: string]: unknown
}

export interface ArticleTableRow extends PortableTextObjectNode {
  _type: "articleTableRow"
  cells?: string[]
}

export interface ArticleTableBlock extends PortableTextObjectNode {
  _type: "articleTable"
  caption?: string
  firstRowIsHeader?: boolean
  rows?: ArticleTableRow[]
}

export interface EditorNoteBlock extends PortableTextObjectNode {
  _type: "editorNote"
  noteType?: "editors_note" | "afftraff_opinion" | "our_experience"
  text?: string
}

export type ArticlePortableTextNode = PortableTextBlock | ArticleTableBlock | EditorNoteBlock | PortableTextObjectNode
