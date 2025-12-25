import { withContentlayer } from 'next-contentlayer2';

import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  output: 'standalone',
  outputFileTracingRoot: resolve(__dirname, '../../'),
};

export default withContentlayer(nextConfig);
