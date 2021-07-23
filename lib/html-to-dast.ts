import * as dastUtils from "datocms-html-to-structured-text";

export default async function htmlToDast({ html }: { html: string }) {
  const dast = await dastUtils.htmlToStructuredText(html);
  return { dast };
}
