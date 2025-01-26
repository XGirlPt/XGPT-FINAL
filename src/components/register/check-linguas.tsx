import { useState, useEffect , useMemo} from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { updateLingua } from "../../actions/ProfileActions";
import { useTranslation } from 'react-i18next'; // Importar o hook useTranslation

interface State {
  [key: string]: boolean;
}



const CheckLinguas: React.FC = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();


  const linguaRedux = useSelector(
    (state: any) => state.profile?.profile?.lingua
  );
  console.log("linguaRedux", linguaRedux);

  const initialState: State = useMemo(() => ({
    [t('portuguese')]: false,
    [t('english')]: false,
    [t('french')]: false,
    [t('spanish')]: false,
    [t('german')]: false,
    [t('italian')]: false,
    [t('russian')]: false,
    [t('arabic')]: false,
  }), [t]);



  const [checkboxes, setCheckboxes] = useState<State>(
    initialState || linguaRedux
  );
  const [selectedLingua, setSelectedLingua] = useState<string[]>(
    linguaRedux || []
  );

  useEffect(() => {
    if (selectedLingua) {
      const updatedCheckboxes = { ...initialState };
      selectedLingua.forEach((lingua) => {
        updatedCheckboxes[lingua] = true;
      });
      setCheckboxes(updatedCheckboxes);
    }
  }, [selectedLingua, initialState]);

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const updatedLingua = checked
      ? [...selectedLingua, name]
      : selectedLingua.filter((lingua) => lingua !== name);

    dispatch(updateLingua(updatedLingua));
    setSelectedLingua(updatedLingua);
  };


  return (
    <div>
      <FormGroup className="text-xs  items-bottom gap-0">
        <div className="grid grid-cols-2 md:grid-cols-3 text-xs items-bottom">
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
                  <div className="flex items-center text-white">{t(`profile.linguas.${key}`)}</div>
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

export default CheckLinguas;
