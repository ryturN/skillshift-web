import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);
export default function Register() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    
    const submitRegister = (e) => {
        e.preventDefault();
        if(username === '' || password === '' || nama === '' || email === '') {
            return mySwal.fire({
                icon: 'error',
                html: (
                    <>
                        <h1 className="text-red-400 font-nunito font-bold text-2xl">
                            Gagal Daftar
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

        if(!email.includes('@gmail.com')) {
            return mySwal.fire({
                icon: 'error',
                html: (
                    <>
                        <h1 className="text-red-400 font-nunito font-bold text-2xl">
                            Gagal Daftar
                        </h1>
                        <p className="text-zinc-700 font-quicksand">
                            Email yang anda masukkan tidak valid.
                        </p>
                    </>
                ),
                timer: 2000,
                confirmButtonColor: '#FBBF24',
            })
        }

        const dataBody = {
            username: username,
            password: password,
            fullName: nama,
            email: email
        }

        mySwal.fire({
            html: (
                <>
                    <h1 className="text-zinc-700 font-bold font-nunito text-2xl">
                        Sedang Memproses Data
                    </h1>
                    <p className="text-zinc-700 font-quicksand">
                        Mohon bersabar, kami sedang memproses data anda.
                    </p>
                </>
            ),
            timer: 10000,
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: async () => {
                try {
                    await axios.post('https://api.skillshift.my.id/api/register', dataBody, {
                        withCredentials: true
                    })
                    // console.log(data);
                    mySwal.fire({
                        width: 400,
                        icon: 'info',
                        input: 'text',
                        inputAttributes: {
                            autoComplete: 'off',
                        },
                        html: (
                            <>
                                <h1 className="text-yellow-600 font-bold font-nunito text-2xl">
                                    Verifikasi Data
                                </h1>
                                <p className="text-zinc-700 font-quicksand">
                                    Kami sudah mengirimkan <span className="text-yellow-400">Verifikasi Token</span> ke email anda.
                                </p>
                            </>
                        ), 
                        preConfirm: async (token) => {
                            try {
                                const verifyBody = {
                                    userVerificationCode: token,
                                    email: email
                                };
                                const response = await axios.post('https://api.skillshift.my.id/api/verifyUser', verifyBody, {
                                    withCredentials: true
                                })
                                if(response.data.status !== 'sucess') {
                                    return mySwal.fire({
                                        icon: 'error',
                                        html: (
                                            <>
                                                <h1 className="text-red-400 font-nunito font-bold text-2xl">
                                                    Gagal Verifikasi
                                                </h1>
                                                <p className="text-zinc-700 font-quicksand">
                                                    Token anda tidak valid!
                                                </p>
                                            </>
                                        ),
                                        timer: 2000,
                                        confirmButtonColor: '#FBBF24',
                                    })
                                }
                                mySwal.fire({
                                    icon: 'success',
                                    html: (
                                        <>
                                            <h1 className="text-green-400 font-nunito font-bold text-2xl">
                                                Berhasil Verifikasi
                                            </h1>
                                            <p className="text-zinc-700 font-quicksand">
                                                Anda akan dialihkan ke halaman utama
                                            </p>
                                        </>
                                    ),
                                    timer: 2000,
                                    confirmButtonColor: '#FBBF24',
                                })
                                localStorage.token = response.data.token;
                                navigate('/login');
                            } catch (error) {
                                return mySwal.fire({
                                    icon: 'error',
                                    html: (
                                        <>
                                            <h1 className="text-red-400 font-nunito font-bold text-2xl">
                                                Gagal Verifikasi
                                            </h1>
                                            <p className="text-zinc-700 font-quicksand">
                                                Token anda tidak valid!
                                            </p>
                                        </>
                                    ),
                                    timer: 2000,
                                    confirmButtonColor: '#FBBF24',
                                })
                            }
                        }
                    })
                } catch (error) {
                    mySwal.fire({
                        icon: 'error',
                        html: (
                            <>
                                <h1 className="text-red-400 font-nunito font-bold text-2xl">
                                    Gagal Daftar
                                </h1>
                                <p className="text-zinc-700 font-quicksand">
                                    {error.response}
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
        <div className="w-full h-screen bg-zinc-100 flex items-center justify-center font-quicksand">
            <div className="w-1/3 rounded-2xl">
                <div className="flex justify-between items-center w-full">
                    <h1 className="text-3xl font-nunito font-extrabold text-zinc-700">
                        Buat Akun Baru<span className="text-yellow-500">.</span>
                    </h1>
                    <img className="w-12" src="/skillshift-logo.png" alt="" />
                </div>
                <hr className="my-2 opacity-0" />
                <div className="flex gap-5 items-center">
                    <p className="font-quicksand text-zinc-700 w-fit">
                        Silahkan isi data-data di bawah ini.
                    </p>
                    <hr className="w-full border-zinc-700" />
                </div>
                <form onSubmit={submitRegister} action="" className="flex flex-col items-center w-full my-5 space-y-5">
                    <div className="relative w-2/3">
                        <input type="text" autoComplete="off" onChange={e => setNama(e.target.value)} className="w-full outline-none rounded-lg h-10 border border-zinc-300 bg-zinc-200 px-5 font-bold focus:border-zinc-500" />
                        <p className="absolute top-0 left-0 w-fit px-2 rounded-lg bg-zinc-200 text-zinc-700 tracking-tighter text-xs font-bold translate-x-3 -translate-y-2.5">
                            Nama Lengkap
                        </p>
                    </div>
                    <div className="relative w-2/3">
                        <input type="text" autoComplete="off" onChange={e => setEmail(e.target.value)} className="w-full outline-none rounded-lg h-10 border border-zinc-300 bg-zinc-200 px-5 font-bold focus:border-zinc-500" />
                        <p className="absolute top-0 left-0 w-fit px-2 rounded-lg bg-zinc-200 text-zinc-700 tracking-tighter text-xs font-bold translate-x-3 -translate-y-2.5">
                            Email
                        </p>
                    </div>
                    <div className="relative w-2/3">
                        <input type="text" autoComplete="off" onChange={e => setUsername(e.target.value)} className="w-full outline-none rounded-lg h-10 border border-zinc-300 bg-zinc-200 px-5 font-bold focus:border-zinc-500" />
                        <p className="absolute top-0 left-0 w-fit px-2 rounded-lg bg-zinc-200 text-zinc-700 tracking-tighter text-xs font-bold translate-x-3 -translate-y-2.5">
                            Username
                        </p>
                    </div>
                    <div className="relative w-2/3">
                        <input type='text' onChange={e => setPassword(e.target.value)} className="w-full outline-none rounded-lg h-10 border border-zinc-300 bg-zinc-200 px-5 font-bold focus:border-zinc-500" />
                        <p className="absolute top-0 left-0 w-fit px-2 rounded-lg bg-zinc-200 text-zinc-700 tracking-tighter text-xs font-bold translate-x-3 -translate-y-2.5">
                            Password
                        </p>
                    </div>
                    <button type="submit" className="w-2/3 rounded-lg bg-yellow-400 hover:bg-yellow-500 py-2 text-zinc-800 font-nunito font-bold flex gap-2 items-center justify-center">
                        <FontAwesomeIcon icon={faPaperPlane} />
                        Daftar
                    </button>
                </form>
                <hr className="my-5 w-full" />
                <div className="flex flex-col w-full items-center gap-5">
                    <p  className="font-quicksand text-zinc-700">
                        Sudah punya akun? <Link to={'/login'} className="text-yellow-500 font-bold hover:text-yellow-600">
                            Masuk disini
                        </Link>
                    </p>
                    <p  className="font-quicksand text-zinc-700">
                        Lupa Password? <Link to={'/forgot'} className="text-yellow-500 font-bold hover:text-yellow-600">
                            Ganti disini
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}