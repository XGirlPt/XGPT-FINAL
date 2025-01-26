import { useState, useEffect , useMemo} from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";
import { updateServico } from "../../actions/ProfileActions";
import { useTranslation } from 'react-i18next'; // Importar o hook useTranslation

interface State {
  [key: string]: boolean;
}



interface CheckServicoProps {
  selectedServico: string[];
  setSelectedServico: (selectedServico: string[]) => void;
}



const CheckServico: React.FC<CheckServicoProps> = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const servicoRedux = useSelector(
    (state: any) => state.profile?.profile?.servico
  );
  console.log("servicos selecionados:", servicoRedux);


  const initialState: State = useMemo(() => ({
    [t('69')]: false,
    [t('AnulingusActivo')]: false,
    [t('AnulingusPassivo')]: false,
    [t('Champagne Dourado Activo')]: false,
    [t('Champagne Dourado Passivo')]: false,
    [t('Atende Casais')]: false,
    [t('Dedos Anal')]: false,
    [t('Dedos Vagina')]: false,
    [t('Dominacao soft')]: false,
    [t('Dupla Penetracao')]: false,
    [t('Duo')]: false,
    [t('Ejaculacao Corporal')]: false,
    [t('Ejacular na Facial')]: false,
    [t('Multipla Ejeculacao')]: false,
    [t('Face Sitting')]: false,
    [t('Fetichismo')]: false,
    [t('BeijoFrances')]: false,
    [t('Garganta Profunda')]: false,
    [t('Jogos Eroticos')]: false,
    [t('Lingerie')]: false,
    [t('Massagem Erotica')]: false,
    [t('Masturbacao')]: false,
    [t('Experiencia Porn Star')]: false,
    [t('Servico VIP')]: false,
    [t('Sexo em Grupo')]: false,
    [t('Sex Toys')]: false,
    [t('Sodomia Activa')]: false,
    [t('Sodomia Passiva')]: false,
    [t('Striptease')]: false,
  }), [t]);

  const [checkboxes, setCheckboxes] = useState<State>(
    initialState || servicoRedux
  );
  const [selectedServico, setSelectedServico] = useState<string[]>(
    servicoRedux || []
  );

  // Atualiza os checkboxes quando os métodos de servico selecionados mudam
  useEffect(() => {
    if (selectedServico) {
      const updatedCheckboxes = { ...initialState };
      selectedServico.forEach((payment) => {
        updatedCheckboxes[payment] = true;
      });
      setCheckboxes(updatedCheckboxes);
    }
  }, [selectedServico, initialState]);

  // Função para lidar com a mudança de estado dos checkboxes
  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const updatedServico = checked
      ? [...selectedServico, name]
      : selectedServico.filter((payment) => payment !== name);

    dispatch(updateServico(updatedServico));
    setSelectedServico(updatedServico);
  };

  // Logs para depuração
  console.log("selectedservico:", selectedServico);

  return (
    <div>
      <FormGroup className="text-xs items-bottom gap-0 ">
        <div className="grid md:grid-cols-3 text-xs  items-bottom ">
          {Object.entries(checkboxes).map(([key, value]) => (
            <div key={key}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    sx={{
                      color: "white",
                      "&.Mui-checked": { color: pink[800] },
                    }}
                    onChange={handleCheckChange}
                    name={key}
                    checked={value}
                  />
                }
                label={
                  <div className="flex items-center text-white">{t(`profile.servico.${key}`)}</div>
                }
                className="text-white mr-4"
              />
            </div>
          ))}
        </div>
      </FormGroup>
    </div>
  );
};

export default CheckServico;
