import { faEye, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);
export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const submitLogin = (e) => {
        e.preventDefault();
        if(username === '' || password === '') {
            return mySwal.fire({
                icon: 'error',
                html: (
                    <>
                        <h1 className="text-red-400 font-nunito font-bold text-2xl">
                            Gagal Login
                        </h1>
                        <p className="text-zinc-700 font-quicksand">
                            Anda harus mengisi Username atau Password terlebih dahulu.
                        </p>
                    </>
                ),
                timer: 2000,
                confirmButtonColor: '#FBBF24',
            })
        }

        const dataBody = {
            username: username,
            password: password
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
                    const { data } = await axios.post('https://api.skillshift.my.id/api/loginUsers', dataBody, {
                        withCredentials: true
                    })
                    console.clear();
                    mySwal.fire({
                        icon: 'success',
                        html: (
                            <>
                                <h1 className="text-green-400 font-nunito font-bold text-2xl">
                                    Berhasil Login
                                </h1>
                                <p className="text-zinc-700 font-quicksand">
                                    Anda akan dialihkan ke halaman utama
                                </p>
                            </>
                        ),
                        timer: 2000,
                        confirmButtonColor: '#FBBF24',
                    })
                    localStorage.token = data.data.token;
                    navigate('/');
                } catch (error) {
                    console.clear()
                    return mySwal.fire({
                        icon: 'error',
                        html: (
                            <>
                                <h1 className="text-red-400 font-nunito font-bold text-2xl">
                                    Proses Data Gagal
                                </h1>
                                <p className="text-zinc-700 font-quicksand">
                                    Username atau Password anda salah
                                </p>
                            </>
                        ),
                        timer: 2000,
                        confirmButtonColor: '#FBBF24',
                    })
                }
            }
        })
    }
    
    return (
        <div className="w-full h-screen bg-zinc-100 flex items-center justify-center dark:bg-zinc-900 font-quicksand">
            <div className="w-1/3 rounded-2xl">
                <div className="flex justify-between items-center w-full">
                    <h1 className="text-3xl font-nunito font-extrabold text-zinc-700">
                        Selamat Datang<span className="text-yellow-500">.</span>
                    </h1>
                    <img className="w-12" src="/skillshift-logo.png" alt="" />
                </div>
                <hr className="my-2 opacity-0" />
                <div className="flex gap-5 items-center">
                    <p className="font-quicksand text-zinc-700 w-fit">
                        Silahkan gunakan akun anda untuk masuk.
                    </p>
                    <hr className="w-full border-zinc-700" />
                </div>
                <form onSubmit={submitLogin} action="" className="flex flex-col items-center w-full my-5 space-y-5">
                    <div className="relative w-2/3">
                        <input type="text" autoComplete="off" onChange={e => setUsername(e.target.value)} className="w-full outline-none rounded-lg h-10 border border-zinc-300 bg-zinc-200 px-5 font-bold focus:border-zinc-500" />
                        <p className="absolute top-0 left-0 w-fit px-2 rounded-lg bg-zinc-200 text-zinc-700 tracking-tighter text-xs font-bold translate-x-3 -translate-y-2.5">
                            Username
                        </p>
                    </div>
                    <div className="relative w-2/3">
                        <input type={showPassword ? 'text' : 'password'} onChange={e => setPassword(e.target.value)} className="w-full outline-none rounded-lg h-10 border border-zinc-300 bg-zinc-200 px-5 font-bold focus:border-zinc-500" />
                        <p className="absolute top-0 left-0 w-fit px-2 rounded-lg bg-zinc-200 text-zinc-700 tracking-tighter text-xs font-bold translate-x-3 -translate-y-2.5">
                            Password
                        </p>
                        <div className="absolute top-0 right-0 w-10 h-full flex items-center justify-center">
                            <button type="button" onClick={() => setShowPassword(state => !state)} className="hover:bg-zinc-400/80 p-1 rounded-md w-8 h-8 text-zinc-700">
                               <FontAwesomeIcon icon={faEye} />
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="w-2/3 rounded-lg bg-yellow-400 hover:bg-yellow-500 py-2 text-zinc-800 font-nunito font-bold flex gap-2 items-center justify-center">
                        <FontAwesomeIcon icon={faPaperPlane} />
                        Masuk
                    </button>
                </form>
                <hr className="my-5 w-full" />
                <div className="flex flex-col w-full items-center gap-5">
                    <p className="font-quicksand text-zinc-700">
                        Belum punya akun? <Link to={'/register'} className="text-yellow-500 font-bold hover:text-yellow-600">
                            Daftar disini
                        </Link>
                    </p>
                    <p className="font-quicksand text-zinc-700">
                        Lupa Password? <Link to={'/forgot'} className="text-yellow-500 font-bold hover:text-yellow-600">
                            Ganti disini
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}