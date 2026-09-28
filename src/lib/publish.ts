// Which scenarios the public site shows. Validation status is internal: only fully
// validated scenarios are published, and the status itself is never rendered.
// Preview everything locally with:  PUBLISH_ALL=1 npm run dev
export const PUBLISH_ALL = process.env.PUBLISH_ALL === '1';
export const isPublished = (status: string) => PUBLISH_ALL || status === 'validated';
