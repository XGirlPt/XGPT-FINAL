import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonFilter from './common-filter';
import { updateDistrito } from '../../backend/actions/ProfileActions';

const distritoOptions = [
  { id: 1, name: 'Lisboa', unavailable: false },
  { id: 2, name: 'Porto', unavailable: false },
  { id: 3, name: 'Aveiro', unavailable: false },
  { id: 4, name: 'Beja', unavailable: false },
  { id: 5, name: 'Bragança', unavailable: false },
  { id: 6, name: 'Braga', unavailable: false },
  { id: 7, name: 'Castelo Branco', unavailable: false },
  { id: 8, name: 'Coimbra', unavailable: false },
  { id: 9, name: 'Évora', unavailable: false },
  { id: 10, name: 'Guarda', unavailable: false },
  { id: 11, name: 'Leiria', unavailable: false },
  { id: 12, name: 'Santarém', unavailable: false },
  { id: 13, name: 'Setúbal', unavailable: false },
  { id: 14, name: 'Viana do Castelo', unavailable: false },
  { id: 15, name: 'Vila Real', unavailable: false },
  { id: 16, name: 'Viseu', unavailable: false },
  { id: 17, name: 'Madeira', unavailable: false },
  { id: 18, name: 'Açores', unavailable: false },
];

const FiltroDistrito: React.FC = () => {
  const dispatch = useDispatch();
  const distritoRedux = useSelector(
    (state: any) => state.profile?.profile?.distrito || null
  );

  const handleDistritoChange = (newValue: string) => {
    dispatch(updateDistrito(newValue));
  };

  return (
    <CommonFilter
      label="Distrito"
      options={distritoOptions}
      value={distritoRedux}
      onChange={handleDistritoChange}
      placeholder="Distrito"
    />
  );
};

export default FiltroDistrito;
