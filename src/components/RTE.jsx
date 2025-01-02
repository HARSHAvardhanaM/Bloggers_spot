import React from 'react'
import {Editor} from "@tinymce/tinymce-react"
import {Controller} from "react-hook-form"
import conf from '../conf/conf'

export default function RTE({defaultValue="",name,label,control}) {
  return (
  <Controller
  name={name || "content"}
  control={control}
  render={({field: {onChange}}) => (
      <Editor 
        apiKey= "vibqo5mbkzj1ac73fe5do1sjlm3wvl8ffcyhk0k9eaclno1j"
        initialValue={defaultValue}
        init={{
            initialValue:{defaultValue},
            height: 500,
          menubar: false,
          plugins: [
            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
            ],
          // plugins: [
          //   // Core editing features
          //   'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
          //   // Your account includes a free trial of TinyMCE premium features
          //   // Try the most popular premium features until Jan 14, 2025:
          //   'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
          // ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onEditorChange={onChange}
      />
    )}
   />)
}


