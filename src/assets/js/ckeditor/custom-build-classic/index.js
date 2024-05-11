import ClassicEditor from './ckeditor5/build/ckeditor';

ClassicEditor.defaultConfig = {
  alignment: {
    options: ['left', 'right', 'center', 'justify'],
  },
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'alignment',
      '|',
      'indent',
      'outdent',
      '|',
      'imageUpload',
      'horizontalLine',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
    ],
  },
  image: {
    toolbar: [
      'imageStyle:full',
      'imageStyle:side',
      '|',
      'imageTextAlternative',
    ],
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
  // This value must be kept in sync with the language defined in webpack.config.js.
  language: 'en',
};

export default ClassicEditor;
