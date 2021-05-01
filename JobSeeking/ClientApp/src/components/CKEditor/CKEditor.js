import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
function MyCKEditor(props) {
  const { field, form, type, label, placeholder, disabled,ChangeRequireWork } = props;
  const { name, value, onChange } = field;
  const {errors,touched} = form;
  const valueRender = value == null ? '' : value;
  const showError = errors[name];
  return (
    <div className="App">
      <CKEditor
        id={name}
        editor={ClassicEditor}
        data={valueRender}
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
      {/* {showError? <p>{errors[name]}</p>:null} */}
    </div>
  );
}


export default MyCKEditor;