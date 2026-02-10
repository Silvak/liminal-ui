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
      type: 'string',
      required: false,
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
      resolve: (doc) => {
        const component = doc.component;
        if (!component) return false;
        // Normalizar strings con retorno de carro o espacios
        const normalized = String(component).trim().replace(/\r/g, '').toLowerCase();
        return normalized === 'true' || normalized === '1';
      },
    },
  },
}));

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Doc],
  disableImportAliasWarning: true,
});
