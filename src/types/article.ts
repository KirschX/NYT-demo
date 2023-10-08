export interface Article {
  abstract: string;
  byline: {
    organization: string;
    original: string;
    person: [];
  };
  document_type: string;
  headline: {
    content_kicker: string;
    kicker: string;
    main: string;
    name: string;
    print_headline: string;
    seo: string;
    sub: string;
  };
  keywords: [];
  lead_paragraph: string;
  multimedia: [];
  news_desk: string;
  print_page: string;
  print_section: string;
  pub_date: string;
  section_name: string;
  snippet: string;
  source: string;
  subsection_name: string;
  type_of_material: string;
  uri: string;
  web_url: string;
  word_count: number;
  _id: string;
  isClipped?: boolean;
}

interface MetaData {
  hits: number;
  offset: number;
}

export interface ArticleResponse {
  status: string;
  response: {
    docs: Article[];
    meta: MetaData;
  };
}

export interface QueryResponse {
  pages: Array<{
    response: {
      docs: Article[];
      meta: MetaData;
    };
  }>;
  pageParams: [];
}

export interface LocalQueryResponse {
  pages: Article[][];
  pageParams: [];
}
