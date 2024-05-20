export interface ShortUrlWithIdModel {
  Id: string;
  shortUrl: string;
  fullShortUrl: string;
  originUrl: string;
  createTime: string;
  previewImage: string;
  title: string;
}

export interface ShortUrl {
  id: string;
  createTime: string;
  originUrl: string;
  previewImage: string;
  shortUrl: string;
  title: string;
  user: string;
}

export interface pageModel {
  page: number;
  size: number;
  hasNext: boolean;
  pageCount: number;
}

export interface ShortUrlPageMode {
  content: Array<ShortUrl>;
  pagination: pageModel
}
export type ShortUrlModel = Omit<ShortUrlWithIdModel, 'Id'>;