// NOTE This file is auto-generated by Contentlayer

import type { Markdown, MDX, ImageFieldData, IsoDateTimeString } from 'contentlayer2/core'
import * as Local from 'contentlayer2/source-files'

export { isType } from 'contentlayer2/client'

export type { Markdown, MDX, ImageFieldData, IsoDateTimeString }

/** Document types */
export type Post = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Post'
  /** The title of the post */
  title: string
  /** The date of the post */
  date: IsoDateTimeString
  /** The intro for the post */
  intro: string
  /** Image source url */
  imgSrc: string
  /** MDX file body */
  body: MDX
  url: string
  slug: string
}

export type Project = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Project'
  /** The title of the project */
  title: string
  /** The date of the project */
  date: IsoDateTimeString
  tags?: string | undefined
  /** Image source url */
  imgSrc: string
  /** MDX file body */
  body: MDX
  url: string
  slug: string
}  

/** Nested types */
  

/** Helper types */

export type AllTypes = DocumentTypes | NestedTypes
export type AllTypeNames = DocumentTypeNames | NestedTypeNames

export type DocumentTypes = Post | Project
export type DocumentTypeNames = 'Post' | 'Project'

export type NestedTypes = never
export type NestedTypeNames = never

export type DataExports = {
  allDocuments: DocumentTypes[]
  allPosts: Post[]
  allProjects: Project[]
}


export interface ContentlayerGenTypes {
  documentTypes: DocumentTypes
  documentTypeMap: DocumentTypeMap
  documentTypeNames: DocumentTypeNames
  nestedTypes: NestedTypes
  nestedTypeMap: NestedTypeMap
  nestedTypeNames: NestedTypeNames
  allTypeNames: AllTypeNames
  dataExports: DataExports
}

declare global {
  interface ContentlayerGen extends ContentlayerGenTypes {}
}

export type DocumentTypeMap = {
  Post: Post
  Project: Project
}

export type NestedTypeMap = {

}

 