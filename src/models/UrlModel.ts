export interface ShortUrlWithIdModel {
  Id: string;
  shortUrl: string;
  fullShortUrl: string;
  originUrl: string;
  createTime: string;
  previewImage: string;
  title: string;
}

export type ShortUrlModel = Omit<ShortUrlWithIdModel, 'Id'>;