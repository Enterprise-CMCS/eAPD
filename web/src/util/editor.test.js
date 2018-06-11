import { htmlToEditor, editorToHtml, EDITOR_CONFIG } from './editor';

describe('rich text editor utils', () => {
  test('converts HTML to editor state', () => {
    expect(typeof htmlToEditor()).toBe('object');
    expect(typeof htmlToEditor('<p>hello <strong>world</strong></p>')).toBe(
      'object'
    );
  });

  test('converts editor state to HTML', () => {
    const state = htmlToEditor('<p>hi</p>');
    expect(typeof state).toBe('object');
    expect(editorToHtml(state).trim()).toBe('<p>hi</p>');
  });

  describe('provides a default image upload callback', () => {
    const callback = EDITOR_CONFIG.image.uploadCallback;

    it('returns a promise', () => {
      const out = callback();
      expect(typeof out.then).toBe('function');
      expect(typeof out.catch).toBe('function');
    });
  });
});
