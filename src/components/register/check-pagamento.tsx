import { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";
import { updatePagamento } from "../../actions/ProfileActions";

interface State {
  [key: string]: boolean;
}

const initialState: State = {
  Euro: false,
  Dollars: false,
  Mbway: false,
  Visa: false,
  Mastercard: false,
  Paypall: false,
  Maestro: false,
  Bitcoin: false,
};

const CheckPagamento: React.FC = () => {
  const dispatch = useDispatch();

  const pagamentoRedux = useSelector(
    (state: any) => state.profile?.profile?.pagamento
  );
  console.log("pagamentoRedux", pagamentoRedux);

  const [checkboxes, setCheckboxes] = useState<State>(
    initialState || pagamentoRedux
  );
  const [selectedPagamento, setSelectedPagamento] = useState<string[]>(
    pagamentoRedux || []
  );

  useEffect(() => {
    if (selectedPagamento) {
      const updatedCheckboxes = { ...initialState };
      selectedPagamento.forEach((payment) => {
        updatedCheckboxes[payment] = true;
      });
      setCheckboxes(updatedCheckboxes);
    }
  }, [selectedPagamento]);

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const updatedPagamento = checked
      ? [...selectedPagamento, name]
      : selectedPagamento.filter((payment) => payment !== name);

    dispatch(updatePagamento(updatedPagamento));
    setSelectedPagamento(updatedPagamento);
  };

  console.log("selectedPagamento:", selectedPagamento);

  return (
    <div>
      <FormGroup className="text-xs items-bottom gap-0 ">
        <div className="grid grid-cols-2 md:grid-cols-3 text-xs  items-bottom ">
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
                  <div className="flex items-center text-white">{key}</div>
                }
                className="text-white  mr-4"
              />
            </div>
          ))}

        </div>
      </FormGroup>
    </div>
  );
};

export default CheckPagamento;
