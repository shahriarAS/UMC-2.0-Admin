import React from 'react'
import AddClass from './AddClass';
import DeleteClass from './DeleteClass';
import UpdateClass from './UpdateClass';

function ManageClass() {

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <div className="container mx-auto px-6 py-8">
                    <h3 className="text-gray-700 text-3xl font-medium">Manage Class</h3>
                    <AddClass />
                    <UpdateClass />
                    <DeleteClass />
                </div>
            </main>
        </div>
    )
}

export default ManageClass
