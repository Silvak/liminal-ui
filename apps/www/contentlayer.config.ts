import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import remarkGfm from 'remark-gfm';
import { extractHeadingsFromRawMdx } from './lib/docs';

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `docs/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    component: {
      type: 'boolean',
      required: false,
      default: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
    isComponent: {
      type: 'boolean',
      resolve: (doc) => Boolean(doc.component),
    },
    headings: {
      type: 'json',
      resolve: (doc) => extractHeadingsFromRawMdx(doc.body.raw),
    },
  },
}));

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    author: {
      type: 'string',
      required: true,
    },
    image: {
      type: 'string',
      required: false,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace(/^blog\//, '')}`,
    },
    slugAsParams: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/^blog\//, ''),
    },
    readingTime: {
      type: 'number',
      resolve: (doc) => {
        const raw = (doc as { body?: { raw?: string } }).body?.raw ?? '';
        const words = raw.split(/\s+/).filter(Boolean).length;
        return Math.max(1, Math.ceil(words / 200));
      },
    },
  },
}));

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Doc, Post],
  disableImportAliasWarning: true,
  mdx: {
    remarkPlugins: [remarkGfm],
  },
});
