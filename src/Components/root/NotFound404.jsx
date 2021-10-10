import React from 'react'

function NotFound404() {
    return (
        <>
            <div className="h-screen bg-gray-600 flex flex-col text-center justify-center content-center flex-wrap">
                <p className="font-sans text-white text-6xl font-black tracking-wider">404</p>
                <p className="font-sans text-white text-4xl">Sorry, Page Not Found.</p>
                <p className="font-sans text-white text-md mt-4">Please once again check your URL carefully.</p>
            </div>
        </>

    )
}

export default NotFound404
