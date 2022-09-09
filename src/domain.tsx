export interface Feed {
  url: string;
  title: string;
  icon: string;
}
export interface Article {
  title: string;
  creator: string;
  link: string | undefined;
  pubDate: string | undefined;
  content: string | undefined;
  contentSnippet: string | undefined;
  guid: string | undefined;
  isoDate: string | undefined;
}
