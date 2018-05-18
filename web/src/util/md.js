import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ xhtmlOut: true, breaks: true });

export default md;
