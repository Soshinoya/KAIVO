import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home/Home'
import Category from './pages/Category/Category'
import SinglePostPage from './pages/SinglePostPage/SinglePostPage'
import Profile from './pages/Profile/Profile'
import UserPosts from './pages/UserPosts/UserPosts'
import EditorPage from './pages/EditorPage/EditorPage'
import LogIn from './pages/LogIn/LogIn'
import Register from './pages/Register/Register'
import NotFound from './pages/NotFound/NotFound'
import Search from './pages/Search/Search'
import SearchResults from './pages/SearchResults/SearchResults'

import BasicLayout from './layouts/BasicLayout/BasicLayout'

import './styles/main.scss'

const categories = [
  { name: 'livery', path: 'livery' },
  { name: 'photo', path: 'photo' },
  { name: 'tuning', path: 'tuning' },
  { name: 'blueprint', path: 'blueprint' },
]

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<BasicLayout />}>
            <Route index element={<Home />} />

            <Route path='/search' element={<Search />} />

            <Route path='/search/:dataType' element={<SearchResults />} />

            <Route path='/users/:id' element={<Profile />} />
            {categories.map((category) => (
              <Route
                key={category.name}
                path='/users/:id/:categoryName'
                element={<UserPosts />}
              />
            ))}

            <Route path='/category' element={<Category category='livery' />} />
            {categories.map((category) => (
              <React.Fragment key={category.name}>
                <Route path={`/category/${category.path}`} element={<Category category={category.name} />} />
                <Route path={`/category/${category.path}/:id`} element={<SinglePostPage />} />
              </React.Fragment>
            ))}

            <Route path='/editor' element={<EditorPage />} />

          </Route>
          <Route path='/*' element={<NotFound />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        <div className='blur-bg'></div>
      </div>
    </BrowserRouter>
  )
}

export default App