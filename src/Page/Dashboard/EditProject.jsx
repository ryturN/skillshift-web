import { faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";

export default function EditProject({editProject, setEditProject, getProject, project}) {
    const [kategori, setKategori] = useState();
    const [name, setName] = useState();
    const [deskripsi, setDeskripsi] = useState();
    const [deadline, setDeadline] = useState();

    const getCategories = async () => {
        try {
            const { data } = await axios.get('https://api.skillshift.my.id/api/category', {
                withCredentials: true
            })
            setKategori(data.data);
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        getCategories();
    }, [])

    const submitEditProject = async (e) => {

    }
    return editProject && (
        <div className="fixed top-0 left-0 w-full h-screen backdrop-blur-lg flex items-center justify-center z-50 font-nunito">
            <div className="w-1/3 p-5 rounded-2xl bg-white">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-2xl text-zinc-700">
                        Ubah Project
                    </h1>
                    <button onClick={() => setEditProject(state => !state)} className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-zinc-100">
                        <FontAwesomeIcon icon={faXmark} className="text-red-500" />
                    </button>
                </div>
                <form onSubmit={e => submitEditProject(e)} action="" className="flex flex-col items-center w-full space-y-5">
                    <div className="relative w-2/3 mt-5">
                        <input type="text" onChange={e => setName(e.target.value)} autoComplete="off"  className="w-full outline-none rounded-lg h-10 border border-zinc-300 bg-zinc-200 px-5 font-bold focus:border-zinc-500" />
                        <p className="absolute top-0 left-0 w-fit px-2 rounded-lg bg-zinc-200 text-zinc-700 tracking-tighter text-xs font-bold translate-x-3 -translate-y-2.5">
                            Nama
                        </p>
                    </div>
                    <div className="relative w-2/3 mt-5">
                        <textarea type="text" onChange={e => setDeskripsi(e.target.value)} autoComplete="off"  className="w-full outline-none rounded-lg min-h-[40px] max-h-[200px] pt-2 border border-zinc-300 bg-zinc-200 px-5 font-bold focus:border-zinc-500"></textarea>
                        <p className="absolute top-0 left-0 w-fit px-2 rounded-lg bg-zinc-200 text-zinc-700 tracking-tighter text-xs font-bold translate-x-3 -translate-y-2.5">
                            Deskripsi
                        </p>
                    </div>
                    <div className="relative w-2/3 mt-5">
                        <select type="text" onChange={e => setKategori(e.target.value)} autoComplete="off"  className="w-full outline-none rounded-lg h-10 border border-zinc-300 bg-zinc-200 px-5 font-bold focus:border-zinc-500" >
                            <option value="choose">-- PILIH KATEGORI ANDA --</option>
                            {kategori && kategori.map((item, index) => (
                                <option key={index} value={item.CATEGORY}>{item.CATEGORY}</option>
                            ))}
                        </select>
                        <p className="absolute top-0 left-0 w-fit px-2 rounded-lg bg-zinc-200 text-zinc-700 tracking-tighter text-xs font-bold translate-x-3 -translate-y-2.5">
                            Kategori
                        </p>
                    </div>
                    <div className="relative w-2/3 mt-5">
                        <input type="date" onChange={e => setDeadline(e.target.value)} autoComplete="off"  className="w-full outline-none rounded-lg h-10 border border-zinc-300 bg-zinc-200 px-5 font-bold focus:border-zinc-500" />
                        <p className="absolute top-0 left-0 w-fit px-2 rounded-lg bg-zinc-200 text-zinc-700 tracking-tighter text-xs font-bold translate-x-3 -translate-y-2.5">
                            Tanggal Deadline
                        </p>
                    </div>
                    <button type="submit" className="w-full rounded-lg bg-yellow-400 hover:bg-yellow-500 text-zinc-800 font-nunito font-bold flex items-center justify-center h-10 gap-3">
                        <FontAwesomeIcon icon={faPaperPlane} />
                        Buat Proyek
                    </button>
                </form>
            </div>
        </div>
    )
}