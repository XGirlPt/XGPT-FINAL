import React from "react";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ModalConfirmationProps {
	show: boolean;
	title: string;
	message: string;
	onConfirm: () => void;
	onCancel: () => void;
}

const ModalConfirmation: React.FC<ModalConfirmationProps> = ({show, title, message, onConfirm, onCancel}) => {
	if (!show) return null;

	return (

		<Dialog open={show} onOpenChange={onCancel}>
			<DialogContent>
			<DialogTitle className='text-2xl font-semibold text-white mb-4'>{title}</DialogTitle>
				<p className='text-gray-400 mb-6'>{message}</p>
				<div className='flex justify-end space-x-4'>
					<button
						onClick={onCancel}
						className='px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
					>
						Cancelar
					</button>
					<button
						onClick={onConfirm}
						className='px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
					>
						Confirmar
					</button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ModalConfirmation;
