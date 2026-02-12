import { defineDocumentType, makeSource } from 'contentlayer2/source-files';

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
  },
}));

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Doc],
  disableImportAliasWarning: true,
});
