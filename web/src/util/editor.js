/* eslint-disable import/prefer-default-export */

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
