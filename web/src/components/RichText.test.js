import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as RichText,
  fileButtonOnClick,
  mapDispatchToProps,
  setupTinyMCE,
  uploadImage
} from './RichText';
import { uploadFile } from '../actions/editApd';

describe('RichText component', () => {
  test('renders as expected', () => {
    expect(
      shallow(
        <RichText content="initial rich text value" uploadFile={jest.fn()} />
      )
    ).toMatchSnapshot();
  });

  test('calls the change handler when the content changes', () => {
    const onSync = jest.fn();
    const component = shallow(
      <RichText onSync={onSync} uploadFile={jest.fn()} />
    ).find('Editor');
    component.prop('onEditorChange')('this is the new stuff');
    expect(onSync).toHaveBeenCalledWith('this is the new stuff');
  });

  it('sets up the TinyMCE editor with a file button', () => {
    const upload = 'this is the upload fn';
    const editor = {
      ui: {
        registry: {
          addButton: jest.fn()
        }
      }
    };

    setupTinyMCE(upload)(editor);

    expect(editor.ui.registry.addButton).toHaveBeenCalledWith(
      'eapdImageUpload',
      {
        icon: 'image',
        tooltip: 'Insert an image',
        onAction: expect.any(Function)
      }
    );

    const { onAction } = editor.ui.registry.addButton.mock.calls[0][1];

    global.document.createElement = jest.fn();
    const element = {
      addEventListener: jest.fn(),
      click: jest.fn(),
      setAttribute: jest.fn()
    };
    global.document.createElement.mockReturnValue(element);

    onAction();

    expect(global.document.createElement).toHaveBeenCalledWith('input');
    expect(element.setAttribute).toHaveBeenCalledWith('type', 'file');
    expect(element.setAttribute).toHaveBeenCalledWith('accept', 'image/*');
    expect(element.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
      false
    );
    expect(element.click).toHaveBeenCalled();
  });

  describe('handles uploading an image with the file button', () => {
    const button = {
      files: ['this is the file']
    };
    const editor = {
      getContent: jest.fn(),
      insertContent: jest.fn(),
      setContent: jest.fn()
    };
    const upload = jest.fn();

    beforeEach(() => {
      button.files[0] = 'this is the file';
      editor.getContent.mockReset();
      editor.insertContent.mockReset();
      editor.setContent.mockReset();
      upload.mockReset();
    });

    it('does not do anything if there is no file', async () => {
      button.files[0] = null;

      await fileButtonOnClick(button, editor, upload)();

      expect(editor.insertContent).not.toHaveBeenCalledWith();
      expect(editor.setContent).not.toHaveBeenCalledWith();
      expect(upload).not.toHaveBeenCalledWith();
    });

    it('adds placeholder text, uploads the file, and the replaces placeholder with an image tag', async () => {
      let uploadResolve;
      const uploadPromise = new Promise(resolve => {
        uploadResolve = resolve;
      });

      upload.mockReturnValue(uploadPromise);

      fileButtonOnClick(button, editor, upload)().then(() => {
        expect(editor.insertContent).toHaveBeenCalledWith(
          expect.stringMatching(/\[uploading image {[0-9a-f]{8}}\]/)
        );
        expect(editor.setContent).toHaveBeenCalledWith(
          'text text text <img src="image url"> text text text'
        );
        expect(upload).toHaveBeenCalledWith('this is the file');
      });

      const inserted = editor.insertContent.mock.calls[0][0];
      editor.getContent.mockReturnValue(
        `text text text ${inserted} text text text`
      );

      uploadResolve('image url');
    });
  });

  describe('handles uploading an image with drag-and-drop', () => {
    const upload = jest.fn();
    const blob = { blob: jest.fn() };
    const success = jest.fn();
    const failure = jest.fn();

    beforeEach(() => {
      upload.mockReset();
      blob.blob.mockReset();
      success.mockReset();
      failure.mockReset();
    });

    it('returns a url if the upload is successful', async () => {
      upload.mockResolvedValue('this is a url');
      await uploadImage(upload)(blob, success, failure);

      expect(success).toHaveBeenCalledWith('this is a url');
      expect(failure).not.toHaveBeenCalled();
    });

    it('calls the failure callback if the upload is not successful', async () => {
      upload.mockReturnValue(Promise.reject());
      await uploadImage(upload)(blob, success, failure);

      expect(success).not.toHaveBeenCalled();
      expect(failure).toHaveBeenCalled();
    });
  });

  test('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({ uploadFile });
  });
});
