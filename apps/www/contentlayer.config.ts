import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import remarkGfm from 'remark-gfm';
import { extractHeadingsFromRawMdx } from './lib/docs';

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `**/*.mdx`,
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

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Doc],
  disableImportAliasWarning: true,
  mdx: {
    remarkPlugins: [remarkGfm],
  },
});
