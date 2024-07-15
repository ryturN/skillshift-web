import { faCancel, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);
export default function EditProfilePage({ editProfile, setEditProfile, user, getUser }) {
    const [imagePreview, setImagePreview] = useState(null);
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();
    const [nik, setNik] = useState();

    const uploadPhoto = async (e) => {
        try {
            e.preventDefault();
            
            const formData = new FormData();
            formData.append('file', e.target[0].files[0]);
            const { data } = await axios.post('https://api.skillshift.my.id/api/profile/uploadphoto', formData, {
                withCredentials: true
            })
            
            console.log(data);
            // console.log(data);
            mySwal.fire({
                icon: 'success',
                html: (
                    <h1 className="text-zinc-700 font-bold font-nunito text-2xl">
                        Berhasil Mengubah Foto Profile
                    </h1>
                ),
                confirmButtonText: 'Oke',
                confirmButtonColor: '#FBBF24',
                timer: 2000
            })
            setEditProfile(state => !state);
            setImagePreview(null);
            getUser();
        } catch (error) {
            console.log(error.response);
        }
    }


    const handlePreview = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Check if the file is an image
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
        
                reader.onloadend = () => {
                    setImagePreview(state => state = reader.result);
                };
        
                reader.readAsDataURL(file);
            } else {
                // Display an error if the selected file is not an image
                e.target.value = null;
                return mySwal.fire({
                    icon: 'error',
                    html: (
                        <h1 className="text-zinc-700 font-bold font-nunito text-2xl">
                            File yang Anda Pilih Bukan Gambar
                        </h1>
                    ),
                    confirmButtonText: 'Oke',
                    confirmButtonColor: '#FBBF24',
                    timer: 2000
                })
                
            }
          }
    }

    const closeEditProfile = () => {
        setEditProfile(state => !state);
        setImagePreview(null);
    }

    const submitEditProfil = async (e) => {
        try {
            e.preventDefault();

            if(name === '' || password === '' || phone === '' || nik === '') {
                return mySwal.fire({
                    icon: 'error',
                    html: (
                        <>
                            <h1 className="text-red-400 font-nunito font-bold text-2xl">
                                Gagal Mengubah Profile
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

            if(nik.length !== 16) {
                return mySwal.fire({
                    icon: 'error',
                    html: (
                        <>
                            <h1 className="text-red-400 font-nunito font-bold text-2xl">
                                Gagal Mengubah Profile
                            </h1>
                            <p className="text-zinc-700 font-quicksand">
                                NIK harus 16 digit.
                            </p>
                        </>
                    ),
                    timer: 2000,
                    confirmButtonColor: '#FBBF24',
                })
            }

            if(phone.length !== 12) {
                return mySwal.fire({
                    icon: 'error',
                    html: (
                        <>
                            <h1 className="text-red-400 font-nunito font-bold text-2xl">
                                Gagal Mengubah Profile
                            </h1>
                            <p className="text-zinc-700 font-quicksand">
                                Nomor Telepon harus 12 digit.
                            </p>
                        </>
                    ),
                    timer: 2000,
                    confirmButtonColor: '#FBBF24',
                })
            }

            const dataBody = {
                fullName: name,
                password: password,
                telephoneNumber: phone,
                nationalId: nik
            }

            await axios.post('https://api.skillshift.my.id/api/profile/edit', dataBody, {
                withCredentials: true
            })

            mySwal.fire({
                icon: 'success',
                html: (
                    <h1 className="text-zinc-700 font-bold font-nunito text-2xl">
                        Berhasil Mengubah Profile
                    </h1>
                ),
                confirmButtonText: 'Oke',
                confirmButtonColor: '#FBBF24',
                timer: 2000
            }).then(() => {
                getUser();
                setEditProfile(state => !state);
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    return editProfile && (
        <div id='editprofile_body' className="fixed top-0 left-0 w-full h-screen backdrop-blur-lg z-50 flex items-center justify-center font-nunito text-zinc-700">
            <div id='editprofile_content' className="w-1/3 p-5 rounded-2xl bg-white">
                <div className="flex justify-between items-center w-full">
                    <h1 className="font-bold text-2xl">
                        Ubah Profile
                    </h1>
                    <button type="button" onClick={() => closeEditProfile()} className="w-8 h-8 flex items-center justify-center text-red-500 rounded-lg hover:bg-zinc-100">
                        <FontAwesomeIcon icon={faCancel} />
                    </button>
                </div>
                <hr className="my-2" />
                <div className="flex gap-2 items-center">
                    <div className="w-1/3">
                        <img className="w-40 h-40 object-cover rounded-full" src={imagePreview ? imagePreview : user.profile} alt="" />
                    </div>
                    <form onSubmit={uploadPhoto} className="w-2/3 flex flex-col">
                        <input type="file" name="file" onChange={(e) => handlePreview(e)} id=""  className="w-full" />
                        {/* {imagePreview && ( */}
                            <button type="submit" className="w-full rounded-lg bg-zinc-700 text-white my-2 py-2 font-bold font-nunito hover:bg-zinc-900">
                                Simpan Foto
                            </button>
                        {/* )} */}
                    </form>
                </div>
                <hr className="my-5 w-full" />
                <form onSubmit={(e) => submitEditProfil(e)} action="" className='space-y-5'>
                    <div className="relative w-full">
                        <input type="text" autoComplete="off" onChange={e => setName(e.target.value)} className="w-full outline-none rounded-lg h-10 border border-zinc-300 bg-zinc-200 px-5 font-bold focus:border-zinc-500" />
                        <p className="absolute top-0 left-0 w-fit px-2 rounded-lg bg-zinc-200 text-zinc-700 tracking-tighter text-xs font-bold translate-x-3 -translate-y-2.5">
                            Nama Lengkap
                        </p>
                    </div>
                    <div className="relative w-full mt-5">
                        <input type="text" autoComplete="off" onChange={e => setPassword(e.target.value)}  className="w-full outline-none rounded-lg h-10 border border-zinc-300 bg-zinc-200 px-5 font-bold focus:border-zinc-500" />
                        <p className="absolute top-0 left-0 w-fit px-2 rounded-lg bg-zinc-200 text-zinc-700 tracking-tighter text-xs font-bold translate-x-3 -translate-y-2.5">
                            Password
                        </p>
                    </div>
                    <div className="relative w-full mt-5">
                        <input type="text" autoComplete="off" onChange={e => setPhone(e.target.value)}  className="w-full outline-none rounded-lg h-10 border border-zinc-300 bg-zinc-200 px-5 font-bold focus:border-zinc-500" />
                        <p className="absolute top-0 left-0 w-fit px-2 rounded-lg bg-zinc-200 text-zinc-700 tracking-tighter text-xs font-bold translate-x-3 -translate-y-2.5">
                            Nomor Telepon
                        </p>
                    </div>
                    <div className="relative w-full mt-5">
                        <input type="text" autoComplete="off" onChange={e => setNik(e.target.value)}  className="w-full outline-none rounded-lg h-10 border border-zinc-300 bg-zinc-200 px-5 font-bold focus:border-zinc-500" />
                        <p className="absolute top-0 left-0 w-fit px-2 rounded-lg bg-zinc-200 text-zinc-700 tracking-tighter text-xs font-bold translate-x-3 -translate-y-2.5">
                            No Induk Kependudukan
                        </p>
                    </div>
                    <button type="submit" className="flex items-center gap-3 w-full rounded-lg bg-zinc-700 text-yellow-300 font-bold justify-center py-2 hover:bg-zinc-900">
                        <FontAwesomeIcon icon={faPaperPlane} />
                        Simpan Data
                    </button>
                </form>
            </div>
        </div>
    )
}