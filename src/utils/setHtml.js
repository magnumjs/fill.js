import isCached from './isCached'
import isHTMLEle from './isHTMLEle'

export default function setHtml(node, html) {
  if (Array.isArray(html)) {
    //Assuming same length?
    for (var k in html) {
      replaceNode(node, html[k], k);
    }

    return;
  } else if (isHTMLEle(html)) {
    replaceNode(node, html, 0);
    return;
  }

  if (!node || html == null || isCached(node, html)) return;

  node.innerHTML = html;
}