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

export type ArticlePortableTextNode = PortableTextBlock | ArticleTableBlock | PortableTextObjectNode
