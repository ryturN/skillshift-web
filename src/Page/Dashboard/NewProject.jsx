import { faCancel, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import anime from "animejs";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);
export default function NewProject({newPage, setNewPage, getProject}) {

    const [name, setName] = useState('');
    const [kategori, setKategori] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [deadline, setDeadline] = useState('');
    const [categories, setCategories] = useState();

    const getCategories = async () => {
        try {
            const { data } = await axios.get('https://api.skillshift.my.id/api/category', {
                withCredentials: true
            })
            setCategories(data.data);
        } catch (error) {
            console.log(error.response);
        }
    }
    
    const closePage = () => {
        anime.timeline({
            targets: '#newpage_body',
            opacity: [1, 0],
            translateY: [0, 50],
            duration: 700,
            easing: 'easeInOutQuad'
        }).add({
            targets: '#newpage',
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInOutQuad'
        }).finished.then(() => {
            setNewPage(false);
        })
    
    }

    useEffect(() => {
        getCategories();
    }, [])

    useEffect(() => {
        if(newPage) {
            anime.timeline({
                targets: '#newpage',
                opacity: [0, 1],
                duration: 300,
                easing: 'easeInOutQuad'
            }).add({
                targets: '#newpage_body',
                opacity: [0, 1],
                translateY: [50, 0],
                duration: 700,
                easing: 'easeInOutQuad'
            })
        }
    }, [newPage])

    const submitNewProject = (e) => {
        e.preventDefault();
        if(name === '' || kategori === '' || deskripsi === '' || deadline === '') {
            return mySwal.fire({
                icon: 'error',
                html: (
                    <>
                        <h1 className="text-red-400 font-nunito font-bold text-2xl">
                            Gagal Membuat Proyek
                        </h1>
                        <p className="text-zinc-700 font-quicksand">
                            Anda harus mengisi semua data terlebih dahulu.
                        </p>
                    </>
                ),
                timer: 2000,
                confirmButtonColor: '#FBBF24',
            })
        }

        if(deadline < new Date().toISOString().slice(0, 10)) {
            return mySwal.fire({
                icon: 'error',
                html: (
                    <>
                        <h1 className="text-red-400 font-nunito font-bold text-2xl">
                            Gagal Membuat Proyek
                        </h1>
                        <p className="text-zinc-700 font-quicksand">
                            Tanggal Deadline tidak boleh kurang dari hari ini.
                        </p>
                    </>
                ),
                timer: 2000,
                confirmButtonColor: '#FBBF24',
            })
        }

        const dataBody = {
            project_name: name,
            project_category: kategori,
            project_desc: deskripsi,
            deadline: deadline
        }

        return mySwal.fire({
            html: (
                <>
                    <h1 className="text-yellow-500 font-nunito font-bold text-2xl">
                        Memproses data
                    </h1>
                    <p className="text-zinc-700 font-quicksand">
                        Mohon bersabar, kami sedang memproses data anda
                    </p>
                </>
            ),
            timer: 10000,
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: async () => {
                try {
                    await axios.post('https://api.skillshift.my.id/api/newProject', dataBody, {
                        withCredentials: true
                    })
                    console.clear();
                    mySwal.fire({
                        icon: 'success',
                        html: (
                            <>
                                <h1 className="text-green-400 font-nunito font-bold text-2xl">
                                    Berhasil Membuat Proyek
                                </h1>
                                <p className="text-zinc-700 font-quicksand">
                                    Anda akan dialihkan ke halaman utama
                                </p>
                            </>
                        ),
                        timer: 2000,
                        confirmButtonColor: '#FBBF24',
                    }).then(() => {
                        getProject();
                        closePage();
                    })
                } catch (error) {
                    console.log(error.response);
                }
            }
        })
    }


    return newPage && (
        <div id='newpage' className="fixed top-0 left-0 w-full h-screen backdrop-blur-lg flex items-center justify-center z-50 font-nunito">
            <div id='newpage_body' className="w-1/3 p-5 bg-white rounded-2xl">
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-zinc-700 font-nunito font-bold text-2xl">
                        Buat Proyek Baru
                    </h1>
                    <button onClick={() => closePage()} className="hover:bg-zinc-300 rounded-lg p-1 w-10 h-10 flex items-center justify-center">
                        <FontAwesomeIcon icon={faCancel} className="text-red-600 w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={e => submitNewProject(e)} action="" className="flex flex-col items-center w-full space-y-5">
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
                            {categories && categories.map((item, index) => (
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