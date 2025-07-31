import React from 'react'
import Loader from '../components/loader'
const { Suspense } = require('react')

const LoaderWrap = () => (
  <div className='tw-w-full tw-h-[100vh] tw-flex tw-flex-col tw-items-center tw-justify-center'>
    <Loader size={8} />
  </div>
)

const ComponentLoader = (Component) => (props) =>
  (
    <Suspense fallback={<LoaderWrap />}>
      <Component {...props} />
    </Suspense>
  )

export default ComponentLoader
