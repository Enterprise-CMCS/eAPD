import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export const htmlToEditor = html => {
  if (!html) return EditorState.createEmpty();

  const { contentBlocks, entityMap } = htmlToDraft(html);
  const content = ContentState.createFromBlockArray(contentBlocks, entityMap);
  return EditorState.createWithContent(content);
};

export const editorToHtml = editorState => {
  const content = convertToRaw(editorState.getCurrentContent());
  return draftToHtml(content);
};

export const EDITOR_CONFIG = {
  options: ['inline', 'blockType', 'fontSize', 'image', 'list', 'link'],
  inline: {
    options: ['bold', 'italic', 'underline']
  },
  image: {
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: true,
    uploadCallback: undefined,
    previewImage: false,
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: 'auto',
      width: 'auto'
    }
  },
  list: {
    options: ['unordered', 'ordered']
  }
};
