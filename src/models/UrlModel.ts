export interface ShortUrlWithIdModel {
  Id: string;
  shortUrl: string;
  originUrl: string;
}

export type ShortUrlModel = Omit<ShortUrlWithIdModel, 'Id'>;