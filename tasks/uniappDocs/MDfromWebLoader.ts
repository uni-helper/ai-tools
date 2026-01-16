import type { SitemapLoaderParams } from '@langchain/community/document_loaders/web/sitemap'
import type { DocumentInterface } from '@langchain/core/documents'
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio'
import { SitemapLoader } from '@langchain/community/document_loaders/web/sitemap'
import { Document } from 'langchain'
import TurndownService from 'turndown'

interface SiteMapElement {
  loc: string
  changefreq?: string
  lastmod?: string
  priority?: string
}

export class WebToMarkdownLoader extends SitemapLoader implements SitemapLoaderParams {
  private turndownService: TurndownService

  constructor(
    webPath: string,
    params: SitemapLoaderParams = {},
  ) {
    super(webPath, params)
    this.turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
    })
  }

  override async _loadSitemapUrls(
    elements: Array<SiteMapElement>,
  ): Promise<DocumentInterface[]> {
    const all = await CheerioWebBaseLoader.scrapeAll(
      elements.map(ele => ele.loc),
      this.caller,
      this.timeout,
      this.textDecoder,
    )
    const documents: Array<DocumentInterface> = all.map(($, i) => {
      if (!elements[i]) {
        throw new Error('Scraped docs and elements not in sync')
      }
      const html = $(this.selector).html()
      const md = this.turndownService.turndown(html)
      const { loc: source, ...metadata } = elements[i]

      // extract page metadata
      const description = $('meta[name=\'description\']').attr('content')
      const title = $('meta[property=\'og:title\']').attr('content')
      const lang = $('meta[property=\'og:locale\']').attr('content')

      return new Document({
        pageContent: md,
        metadata: {
          ...metadata,
          description,
          title,
          lang,
          source: source.trim(),
        },
      })
    })
    return documents
  }
}
