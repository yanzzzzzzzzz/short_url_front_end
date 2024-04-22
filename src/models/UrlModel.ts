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

export type ShortUrlModel = Omit<ShortUrlWithIdModel, 'Id'>;