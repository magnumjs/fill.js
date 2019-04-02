export default function html2dom(data) {
  let template = document.createElement('div');
  template.innerHTML = data;

  return template.children[0];
}
