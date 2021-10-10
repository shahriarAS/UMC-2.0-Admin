import React from 'react'
import AddChapter from './AddChapter';
import DeleteChapter from './DeleteChapter';
import UpdateChapter from './UpdateChapter';

function ManageChapter() {
    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <div className="container mx-auto px-6 py-8">
                    <h3 className="text-gray-700 text-3xl font-medium">Manage Chapter</h3>
                    <AddChapter />
                    <UpdateChapter />
                    <DeleteChapter />
                </div>
            </main>
        </div>
    )
}

export default ManageChapter
