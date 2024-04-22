import { ShortUrl, ShortUrlModel, ShortUrlWithIdModel } from '../models/UrlModel';

export const transferIdModel = (urlObject: ShortUrl | ShortUrlWithIdModel): ShortUrlModel => {
  return {
    shortUrl: urlObject.shortUrl,
    originUrl: urlObject.originUrl,
    fullShortUrl: `${window.location.origin}/api/url/${urlObject.shortUrl}`,
    previewImage: urlObject.previewImage,
    createTime: urlObject.createTime,
    title: urlObject.title
  };
};