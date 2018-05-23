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

const uploadImageCallBack = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve({ data: { link: e.target.result } });
    reader.onerror = e => reject(e);
    reader.readAsDataURL(file);
  });

export const EDITOR_CONFIG = {
  options: [
    'inline',
    'blockType',
    'fontSize',
    'emoji',
    'image',
    'list',
    'link'
  ],
  inline: {
    options: ['bold', 'italic', 'underline']
  },
  emoji: {
    emojis: [
      '😀',
      '😉',
      '😎',
      '👈',
      '👉',
      '👉',
      '👆',
      '👌',
      '👍',
      '👎',
      '💰',
      '📅',
      '✅',
      '❎'
    ]
  },
  image: {
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: false,
    uploadCallback: uploadImageCallBack,
    previewImage: true,
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
