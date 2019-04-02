import fillRun from './main';
import html2dom from '../src/utils/html2dom';

const HTML = `
<ul><li><name/></li></ul>
`;

const JSON = {li: [{name: 'Joe'}, {name: 'Mike'}]};

const node = html2dom(HTML);
fillRun(node, JSON);

document.getElementById('root').appendChild(node);
