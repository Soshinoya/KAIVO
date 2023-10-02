import React, { useRef, useState } from 'react'
import ReactQuill from 'react-quill'

import 'react-quill/dist/quill.snow.css'

import { textToHTML } from '../../../utils/parser'

import Button from '../../atoms/Button'

const QuillEditor = ({ rendernPropOnSubmit }) => {

  const quillRef = useRef(null)

  const [value, setValue] = useState('')

  const onClickHandler = e => {
    e.preventDefault()
    let isValid = true

    if (quillRef.current) {
      const quill = quillRef.current.getEditor()
      const htmlString = quill.root.innerHTML
      const html = textToHTML(htmlString)
      const imgTags = html.querySelectorAll('img')
      const imageFiles = []

      imgTags.forEach((imgTag, index) => {
        const src = imgTag.getAttribute('src')

        if (src && src.startsWith('data:image/')) {
          const [, type, data] = src.match(/^data:image\/([a-z]+);base64,([\s\S]+)/i)
          const fileExtension = type === 'jpeg' ? 'jpg' : type
          const binaryData = atob(data)
          const dataArray = new Uint8Array(binaryData.length)
          for (let i = 0; i < binaryData.length; i++) {
            dataArray[i] = binaryData.charCodeAt(i)
          }
          const blob = new Blob([dataArray], { type: `image/${fileExtension}` })
          const file = new File([blob], `image.${fileExtension}`, { type: `image/${fileExtension}` })

          imgTag.setAttribute('src', `${index}.${fileExtension}`)
          imageFiles.push({ file, index })
        }

        return imgTag
      })

      imageFiles.forEach(({ file }) => {
        if (file?.size > 10 * 1024 * 1024) {
          // Сюда добавить уведомление при ошибке
          console.log('The selected files is too large. The maximum size is 10 MB.')
          isValid = false
        }
      })

      isValid && rendernPropOnSubmit(html, imageFiles)
    }
  }

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image']
    ],
  }

  const formats = [
    'header',
    'list', 'bullet',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'link', 'image'
  ]

  return (
    <div className='custom-editor'>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={setValue}
      />
      <div className='custom-editor__actions'>
        <Button type='submit' size='lg' text='Next to the settings' onClick={onClickHandler} />
      </div>
    </div>
  )
}

export default QuillEditor