import { faCancel, faCheckSquare, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import anime from "animejs"
import axios from "axios"
import React, { useEffect, useState } from "react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const mySwal = withReactContent(Swal);

export default function OffersPage({ offerPage, setOfferPage, getProject, projects }) {

    const [offers, setOffers] = useState();
    let formatter = new Intl.NumberFormat('id-ID')
    const getOffers = async (project_id) => {
        try {
            const { data } = await axios.get(`https://api.skillshift.my.id/api/allOffer?project_id=${project_id}`, {
                withCredentials: true
            })
            setOffers(data.result.project);
        } catch (error) {
            console.log(error.response);
        }
    }

    const closeOfferPage = () => {
        anime.timeline({
            targets: '#offerpage_body',
            opacity: [1, 0],
            translateY: [0, 50],
            duration: 900,
            easing: 'easeInOutQuad'
        }).add({
            targets: '#offerpage_content',
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInOutQuad'
        }).finished.then(() => {
            setOffers();
            setOfferPage(state => !state);
        })
    }

    useEffect(() => {
        if(offerPage) {
            anime.timeline({
                targets: '#offerpage_body',
                opacity: [0, 1],
                duration: 300,
                easing: 'easeInOutQuad'
            }).add({
                targets: '#offerpage_content',
                opacity: [0, 1],
                translateY: [50, 0],
                duration: 900,
                easing: 'easeInOutQuad'
            })
        }
    }, [offerPage])

    useEffect(() => {
        if(offers){
            anime({
                targets: '#offer_list',
                opacity: [0, 1],
                translateX: [-50, 0],
                duration: 500,
                easing: 'easeInOutExpo',
                delay: (el, i, l) => 100 * (i+1)
            })
        }
    }, [offers])

    const offerProject = async (project_id, freelancer_id, offer_price) => {
        mySwal.fire({
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
                    await axios.post(`https://api.skillshift.my.id/api/acceptOffer?project_id=${project_id}&freelancer_id=${freelancer_id}&price=${offer_price}`,{}, {
                        withCredentials: true
                    })
                    // getOffers(project_id);
                    mySwal.fire({
                        icon: 'success',
                        html: (
                            <h1 className="text-zinc-700 font-bold font-nunito text-2xl">
                                Berhasil Mengirim Penawaran
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
    }


    return offerPage && (
        <div id="offerpage_body" className="fixed top-0 left-0 backdrop-blur-lg w-full h-screen flex items-center justify-center z-50 font-nunito">
            <div id='offerpage_content' className="w-2/3 bg-white p-5 rounded-2xl">
                <div className="flex justify-between items-center w-full my-2">
                    <h1 className="font-bold text-zinc-700 text-2xl">
                        Daftar Penawaran
                    </h1>
                    <button type="button" onClick={() => closeOfferPage()} className="hover:bg-zinc-300 rounded-lg w-8 h-8 flex items-center justify-center text-red-500">
                        <FontAwesomeIcon icon={faCancel} />
                    </button>
                </div>
                <hr className="w-full border-zinc-200" />
                <div className="flex w-full divide-x">
                    <div className="w-2/6 space-y-5 relative overflow-auto h-[600px] p-2">
                        { projects && projects.map((item, index) => (
                            <button key={index} type="button" onClick={() => getOffers(item.project_id)} className="w-full text-start border rounded-2xl p-3 hover:bg-zinc-50">
                                <div className="w-full">
                                    <p className="text-xs text-zinc-500">
                                        {item.project_id}
                                    </p>
                                    <h1 className="font-quicksand font-extrabold text-lg text-zinc-700">
                                        {item.project_name}
                                    </h1>
                                    <p className="px-2 py-0.5 rounded-full bg-zinc-700 w-fit text-xs font-bold text-yellow-300">
                                        {item.project_category}
                                    </p>
                                    <p className="my-3 font-quicksand text-sm text-zinc-700 font-medium">
                                        {item.project_desc}
                                    </p>
                                    <p className="w-fit px-2 py-1 bg-zinc-200 text-zinc-700 font-bold text-sm rounded-full">
                                        {item.deadline}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                    <div className="w-4/6 relative overflow-auto h-[600px] p-2 space-y-5 bg-gradient-to-r from-zinc-200 to-white">
                        { offers && offers.map((item, index) => (
                            <div key={index} id='offer_list' className="flex p-2 rounded-2xl border group bg-white">
                                <div className="w-1/6 flex justify-center">
                                    <img className="w-20 h-20 rounded-full object-cover" src={item.imgUrl} alt="" />
                                </div>
                                <div className="w-4/6">
                                    <h1 className="font-bold text-zinc-700 text-2xl">
                                        {item.freelancerName}
                                    </h1>
                                    <p className="text-zinc-700 font-quicksand">
                                        {item.offer_desc}
                                    </p>
                                    <p className="flex items-center gap-2 w-fit px-2 py-0.5 text-xs rounded-full bg-zinc-700 text-green-400 font-bold">
                                        <FontAwesomeIcon icon={faMoneyBillWave} />
                                        Rp {formatter.format(item.offer_price)}
                                    </p>
                                </div>
                                <button onClick={() => offerProject(item.project_id, item.freelancerId, item.offer_price)} type="button" className="w-1/6 rounded-lg hover:bg-green-100 flex flex-col items-center justify-center text-green-700 opacity-0 group-hover:opacity-100 font-bold">
                                    <FontAwesomeIcon icon={faCheckSquare} />
                                    Terima
                                </button>
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}