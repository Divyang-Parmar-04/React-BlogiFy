import React, { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import {config} from '../env/config'
import api from '../utils/api'

export default function RTE(props) {
   const content = props.content
   const onSetContent = props.onSetContent

  return (
    <div className="RTE-editor">
      <Editor
        apiKey="by2xze4jtrt279zixtv8sllqcwjy0zrdnk6kjc3nepfww82l"
        value={content}
        onEditorChange={(newValue) => onSetContent(newValue)}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "image",
            "advlist",
            "autolink",
            "lists",
            "link",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          images_upload_handler: (blobInfo, progress) => new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', blobInfo.blob());
            formData.append('upload_preset', config.cloudineryUploadPreset);
          
            try {
              fetch(`https://api.cloudinary.com/v1_1/${config.cloudineryCloudName}/image/upload`, {
                method: 'POST',
                body: formData,
              })
                .then(res => {
                  if (!res.ok) {
                    throw new Error(`HTTP Error: ${res.status}`);
                  }
                  return res.json();
                })
                .then(data => {
                  console.log('Full Cloudinary Response:', data);
                  if (data.secure_url) {
                    console.log('Uploading URL to TinyMCE:', data.secure_url);
                    resolve(data.secure_url); // Resolve with the URL string
                  } else {
                    reject({ message: 'No secure_url returned', remove: true });
                  }
                })
                .catch(err => {
                  console.error('Upload Error:', err);
                  reject({ message: `Image upload failed: ${err.message}`, remove: true });
                });
          
              // Optional: Simulate progress (Cloudinary doesn't provide real-time progress via fetch)
              let loaded = 0;
              const interval = setInterval(() => {
                loaded += 10;
                if (loaded <= 100) progress(loaded);
                else clearInterval(interval);
              }, 200);
            } catch (err) {
              console.error('Initial Error:', err);
              reject({ message: `Image upload failed: ${err.message}`, remove: true });
            }
          }),
          
        }}
      />
    </div>
  )
}
