import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: true, xhtmlOut: true, breaks: true });

export default md;
