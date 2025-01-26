interface FiltroAgeProps {
	buttonPadding?: string;
	rounded?: string;
	setFiltros: Dispatch<SetStateAction<FiltrosState>>;
}

import React, {Dispatch, SetStateAction} from "react";
import {useDispatch, useSelector} from "react-redux";

import CommonFilter from "./common-filter";
import {useTranslation} from "react-i18next";


interface FiltrosState {
	age?: number[];
}

interface FiltroAgeProps {
	setFiltros: Dispatch<SetStateAction<FiltrosState>>;
}
const ageOptions = [
	{id: 1, name: "18-20", unavailable: false},
	{id: 2, name: "21-25", unavailable: false},
	{id: 3, name: "26-30", unavailable: false},
	{id: 4, name: "31-40", unavailable: true},
	{id: 5, name: "+41", unavailable: true},
];

const FiltroAge = ({setFiltros}: FiltroAgeProps) => {
	const dispatch = useDispatch();
	const ageRedux = useSelector((state: any) => state.profile?.profile?.age || null);
	const {t, i18n} = useTranslation();

	const handleAgeChange = (newValue: string) => {
		const selectedOption = ageOptions.filter(option => option.name === newValue);
		const selectedOptionId = selectedOption[0].id;

		setFiltros(prev => ({
			...prev,
			age: [selectedOptionId],
		}));
		console.log("Idade selecionada:", newValue);
	};

	return <CommonFilter label={t('filter.age')} options={ageOptions} value={ageRedux} onChange={handleAgeChange} placeholder={t('filter.select_age')} />;
};

export default FiltroAge;
