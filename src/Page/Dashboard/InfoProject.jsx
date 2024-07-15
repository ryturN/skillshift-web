import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function InfoProject({activeProject, infoProjectAktif, setInfoProjectAktif}) {

    console.log(activeProject);

    return infoProjectAktif && (
        <div className="fixed top-0 left-0 w-full h-screen backdrop-blur-lg flex items-center justify-center z-50 font-nunito">
            { activeProject.map((item, index) => (
                <div className="w-1/3 bg-white p-5 rounded-2xl">
                    <div className="flex justify-between w-full items-center">
                        <h1 className="font-bold text-2xl text-zinc-700">
                            Proyek Aktif
                        </h1>
                        <button type="button" onClick={() => setInfoProjectAktif(state => !state)} className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-zinc-100 text-red-500">
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    <hr className="my-3 w-full" />
                    <h1 className="text-zinc-700 font-bold text-2xl">
                        {item.project_name}
                    </h1>
                    <p className="w-fit px-2 rounded-full bg-zinc-700 text-yellow-300 font-bold text-sm py-1">
                        {item.project_category}
                    </p>
                    <p className="my-3 text-sm font-quicksand text-zinc-700 font-medium">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, error nobis cumque possimus id quibusdam soluta ipsam aspernatur sequi vero exercitationem, expedita ad architecto quis est doloremque reiciendis. Non, quas!
                    </p>
                    <div className="flex justify-between items-center w-full">
                        <p className="w-fit px-2 py-1 bg-zinc-200 text-zinc-700 font-bold text-sm rounded-full">
                            12/12/2021
                        </p>
                        <p className="w-fit px-2 py-1 bg-zinc-200 text-zinc-700 font-bold text-sm rounded-full flex gap-2 items-center">
                            Freelancer 
                            <FontAwesomeIcon icon={faUser} />
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}