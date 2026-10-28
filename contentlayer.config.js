import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
}

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
    },
    date: {
      type: 'date',
      required: true,
    },
    updated: {
      type: 'date',
      required: false,
    },
    published: {
      type: 'boolean',
      default: false,
    },
    image: {
      type: 'string',
      required: true,
    },
    authors: {
      // Reference types are not embedded.
      // Until this is fixed, we can use a simple list.
      // type: "reference",
      // of: Author,
      type: 'list',
      of: { type: 'string' },
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
    },
  },
  computedFields,
}))

export const Author = defineDocumentType(() => ({
  name: 'Author',
  filePathPattern: `authors/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
    avatar: {
      type: 'string',
      required: true,
    },
    twitter: {
      type: 'string',
      required: true,
    },
  },
  computedFields,
}))

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `pages/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
  },
  computedFields,
}))

function rehypeInlineAds() {
  return (tree) => {
    if (!Array.isArray(tree.children)) return
    let headingCount = 0
    const next = []
    for (const child of tree.children) {
      next.push(child)
      if (child.type === 'element' && child.tagName === 'h2') {
        headingCount += 1
        if (headingCount % 3 === 0) {
          next.push({
            type: 'element',
            tagName: 'ad-slot',
            properties: { placement: 'post-inline' },
            children: [],
          })
        }
      }
    }
    tree.children = next
  }
}

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Page, Post, Author],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeInlineAds,
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['subheading-anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
    ],
  },
})
