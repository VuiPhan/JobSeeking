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
        }}
        onBlur={(event, editor) => {
        }}
        onFocus={(event, editor) => {
        }
        }
      />
    </div>
  );
}


export default MyCKEditor;