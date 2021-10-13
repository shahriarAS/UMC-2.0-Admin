import React from 'react'
import AddPDF from './AddPDF';
import DeletePdf from './DeletePDF';
import UpdatePdf from './UpdatePDF';

function ManagePDF() {
    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <div className="container mx-auto px-6 py-8">
                    <h3 className="text-gray-700 text-3xl font-medium">Manage PDF</h3>
                    <AddPDF />
                    <UpdatePdf />
                    <DeletePdf />
                </div>
            </main>
        </div>
    )
}

export default ManagePDF
