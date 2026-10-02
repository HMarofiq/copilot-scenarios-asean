export const PUBLISH_ALL = process.env.PUBLISH_ALL === '1';

export const isPublished = (status, publishDraft = false, publishAll = PUBLISH_ALL) =>
  publishAll || status === 'validated' || (status === 'draft' && publishDraft === true);
