import { retrieveFromDb, saveToDb } from './dbOperations';
import { defaultText } from './introText';

export default class Editor {
  constructor() {
    const savedLocalData = localStorage.getItem('editorContent');

    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror library is not loaded');
    }

    this.codeEditor = CodeMirror(document.querySelector('#editor'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    retrieveFromDb().then((dbData) => {
      console.info('Fetched data from IndexedDB, injecting into editor');
      const dbContent = dbData.length > 0 ? dbData[0].jate : null;
      this.codeEditor.setValue(dbContent || savedLocalData || defaultText);
    });

    this.codeEditor.on('change', () => {
      localStorage.setItem('editorContent', this.codeEditor.getValue());
    });

    this.codeEditor.on('blur', () => {
      console.log('The code editor has lost focus');
      saveToDb(localStorage.getItem('editorContent'));
    });
  }
}
