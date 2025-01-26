import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {FaUser} from "react-icons/fa";
import {logout} from "@/actions/ProfileActions";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalConfirmation from "./ModalConfirmation";
import {profileDataService} from "@/services/profileDataService";

const AccountSettings: React.FC = () => {
	const dispatch = useDispatch();
	const userUID = useSelector((state: any) => state.profile?.profile.userUID);
	const [status, setStatus] = useState(true);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showSuspendModal, setShowSuspendModal] = useState(false);

	const deleteAccount = async () => {
		if (!userUID) {
			console.error("User is not logged in or user ID is not available.");
			return;
		}

		try {
			await profileDataService.deleteAccount(userUID);
			toast.success("Your account has been permanently deleted successfully.");
			dispatch(logout());
			window.location.replace("/login");
		} catch (error) {
			toast.error("Error deleting account or profile.");
			console.error("Error deleting account or profile:", error);
		}
	};

	const toggleStatus = async () => {
		try {
			const newStatus = !status;
			await profileDataService.updateProfileStatus(userUID, newStatus);
			setStatus(newStatus);
			const message = newStatus ? "Your Profile has been Successfully Reactivated." : "Your Profile has been Temporarily Suspended Successfully.";
			toast.success(message);
		} catch (error) {
			toast.error("Error updating status.");
			console.error("Error updating status:", error);
		}
	};

	useEffect(() => {
		const fetchStatus = async () => {
			try {
				const currentStatus = await profileDataService.fetchProfileStatus(userUID);
				setStatus(currentStatus);
			} catch (error) {
				console.error("Error fetching status:", error);
			}
		};

		if (userUID) {
			fetchStatus();
		}
	}, [userUID]);

	const toggleAccountStatus = async () => {
		try {
			await toggleStatus();
			setShowSuspendModal(false);
		} catch (error) {
			toast.error("An error occurred while changing the account status.");
		}
	};

	return (
		<div className='max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg'>
			<ToastContainer />
			<h2 className='text-2xl font-semibold mb-6 text-pink-500 flex items-center'>
				<FaUser className='mr-2 text-3xl' /> Configurações da Conta
			</h2>

			<p className='text-gray-300 mb-6'>Gerencie sua conta e suas preferências. Você pode suspender temporariamente ou eliminar sua conta definitivamente.</p>

			<div className='space-y-6'>
				<div className='bg-gray-700 p-4 rounded-lg flex items-center justify-between'>
					<div>
						<h3 className='text-lg font-semibold text-white'>{status ? "Suspender Conta Temporariamente" : "Reativar Conta"}</h3>
						<p className='text-gray-400 text-sm'>
							{status ? "Você poderá reativar sua conta a qualquer momento." : "Sua conta está suspensa. Clique para reativar."}
						</p>
					</div>
					<button
						onClick={() => setShowSuspendModal(true)}
						className={`py-2 px-4 rounded-lg transition-all ${
							status ? "bg-pink-800 text-white hover:bg-pink-600" : "bg-green-700 text-white hover:bg-green-900"
						}`}
					>
						{status ? "Suspender" : "Reativar"}
					</button>
				</div>

				<div className='bg-red-800 p-4 rounded-lg flex items-center justify-between'>
					<div>
						<h3 className='text-lg font-semibold text-white'>Eliminar Conta Definitivamente</h3>
						<p className='text-gray-200 text-sm'>Esta ação é irreversível. Todos os dados serão permanentemente removidos.</p>
					</div>
					<button onClick={() => setShowDeleteModal(true)} className='mt-4 px-4 py-2 bg-red-300 text-white rounded-md hover:bg-red-700 transition-colors'>
						Eliminar Conta
					</button>
				</div>

				<ModalConfirmation
					show={showSuspendModal}
					title={status ? "Suspender Conta" : "Reativar Conta"}
					message={
						status ? "Tem certeza de que deseja suspender sua conta? Você pode reativá-la a qualquer momento." : "Tem certeza de que deseja reativar sua conta?"
					}
					onConfirm={toggleAccountStatus}
					onCancel={() => setShowSuspendModal(false)}
				/>

				<ModalConfirmation
					show={showDeleteModal}
					title='Tem certeza que deseja eliminar sua conta?'
					message='Todos os seus dados serão permanentemente removidos.'
					onConfirm={deleteAccount}
					onCancel={() => setShowDeleteModal(false)}
				/>
			</div>
		</div>
	);
};
export default AccountSettings;
