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
          const binaryData = atob(data)
          const dataArray = new Uint8Array(binaryData.length)
          for (let i = 0; i < binaryData.length; i++) {
            dataArray[i] = binaryData.charCodeAt(i)
          }
          const blob = new Blob([dataArray], { type: `image/${type}` })
          const file = new File([blob], `image.${type}`, { type: `image/${type}` })

          imgTag.setAttribute('src', `${index}.${type}`)
          imageFiles.push({ file, index })
        }

        return imgTag
      })
      rendernPropOnSubmit(html, imageFiles)
    }
  }

  const onChangeHandler = e => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor()
      const htmlString = quill.root.innerHTML
      const html = textToHTML(htmlString)
      const imgTags = html.querySelectorAll('img')

      imgTags.forEach(imgTag => {
        const src = imgTag.getAttribute('src')

        if (src && src.startsWith('data:image/')) {
          const [, type, data] = src.match(/^data:image\/([a-z]+);base64,([\s\S]+)/i)
          const binaryData = atob(data)
          const dataArray = new Uint8Array(binaryData.length)
          for (let i = 0; i < binaryData.length; i++) {
            dataArray[i] = binaryData.charCodeAt(i)
          }
          const blob = new Blob([dataArray], { type: `image/${type}` })
          const file = new File([blob], `image.${type}`, { type: `image/${type}` })
          if (type !== 'webp') {
            // Сюда добавить уведомление при ошибке
            console.error(`The .${type} extension is not supported, Available extensions: .webp`)
            document.querySelector(`img[src='${src}']`)?.remove()
          }
          if (file?.size > 10 * 1024 * 1024) {
            // Сюда добавить уведомление при ошибке
            console.error('The selected files is too large. The maximum size is 10 MB.')
            document.querySelector(`img[src='${src}']`)?.remove()
          }
        }
      })
    }
    setValue(e)
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
        onChange={onChangeHandler}
      />
      <div className='custom-editor__actions'>
        <Button type='submit' size='lg' text='Next to the settings' onClick={onClickHandler} />
      </div>
    </div>
  )
}

export default QuillEditor