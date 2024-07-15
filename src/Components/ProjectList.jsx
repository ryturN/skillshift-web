import React, { useState } from 'react';
import { faClock, faCogs, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const mySwal = withReactContent(Swal);
export default function ProjectList({projects, getProject, selectedProject, setSelectedProject, editProject, setEditProject}) {
    const deleteProject = async (id) => {
        try {
            return mySwal.fire({
                icon: 'warning',
                html: (
                    <h1 className="text-zinc-700 font-bold font-nunito text-2xl">
                        Apakah Anda Yakin?
                    </h1>
                ),
                confirmButtonText: 'Ya, Saya Yakin',
                confirmButtonColor: '#FBBF24',
                showCancelButton: true,
                cancelButtonColor: '#EF4444',
                cancelButtonText: 'Batal',
            }).then(async (result) => {
                if(result.isConfirmed){
                    try {
                        await axios.delete(`https://api.skillshift.my.id/api/deleteProject?project_id=${id}`, {
                            withCredentials: true
                        })
                        getProject();
                        mySwal.fire({
                            icon: 'success',
                            html: (
                                <h1 className="text-zinc-700 font-bold font-nunito text-2xl">
                                    Berhasil Menghapus Proyek
                                </h1>
                            ),
                            confirmButtonText: 'Oke',
                            confirmButtonColor: '#FBBF24',
                        })
                    } catch (error) {
                        console.log(error.response);
                    }
                }
            })
            
        } catch (error) {
            console.log(error.response);
        }
    }

    const selectProject = (item) => {
        setSelectedProject(state => state = item);
        setEditProject(state => !state)
    }



    return projects ? (
        <>
            {projects.map((item, index) => (
                <div key={index} className="w-full flex rounded-lg p-2 items-center hover:bg-zinc-200 gap-5 group">
                    <p className="flex items-center gap-2 w-1/6 font-quicksand text-sm text-zinc-700">
                        <FontAwesomeIcon icon={faClock} />
                        {item.deadline}
                    </p>
                    <p className="font-bold text-zinc-700 font-nunito text-sm w-3/6">
                        {item.project_name}
                    </p>
                    <p className="w-1/6 font-bold text-zinc-700 font-nunito text-sm">
                        {item.project_category}
                    </p>
                    <div className="w-1/6 flex justify-center items-center opacity-0 group-hover:opacity-100">
                        <button type='button' onClick={() => selectProject(item)}  className="hover:bg-zinc-300 rounded-lg p-1 w-10 h-10 flex items-center justify-center">
                            <FontAwesomeIcon icon={faCogs} className="text-yellow-600 w-6 h-6" />
                        </button>
                        <button type='button' onClick={() => deleteProject(item.project_id)} className="hover:bg-zinc-300 rounded-lg p-1 w-10 h-10 flex items-center justify-center">
                            <FontAwesomeIcon icon={faTrash} className="text-red-600 w-5 h-5" />
                        </button>
                    </div>
                </div>
             ))} 
        </>
    ) : (
        <div className="flex justify-center w-full">
            <h1 className="text-zinc-500">
                Kamu belum memiliki proyek.
            </h1>
        </div>
    )
}