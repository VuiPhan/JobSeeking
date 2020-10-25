import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PropTypes from 'prop-types';

function MyCKEditor(props) {
  const { field, form, type, label, placeholder, disabled,ChangeRequireWork } = props;
  const { name, value, onChange } = field;
  return (
    <div className="App">
      <CKEditor
        id={name}
        editor={ClassicEditor}
        data=""
        onInit={editor => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          //ChangeRequireWork(data);
          const changeEvent = {
            target: {
                name: name,
                value: data
            },
        }
        field.onChange(changeEvent);
         // console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          // console.log( 'Blur.', editor );
        }}
        onFocus={(event, editor) => {
          // console.log( 'Focus.', editor );
        }
        }
      />
    </div>
  );
}


export default MyCKEditor;