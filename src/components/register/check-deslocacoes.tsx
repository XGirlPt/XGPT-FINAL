import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";

const CheckDeslocacoes: React.FC = () => {
  return (
    <div>
      <FormGroup className="flex flex-1 text-xs bg-gray-800 items-bottom gap-5">
        <div className="flex justify-between items-start">
          <div className="flex items-start">
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{ color: "white", "&.Mui-checked": { color: pink[300] } }}
                />
              }
              label={<div className="flex items-center">Recebo</div>}
              className="text-white mr-4"
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{ color: "white", "&.Mui-checked": { color: pink[300] } }}
                />
              }
              label={
                <div className="flex items-center text-white">
                  Faço Deslocações
                </div>
              }
              className="text-white mr-4"
            />
          </div>
        </div>
      </FormGroup>
    </div>
  );
};

export default CheckDeslocacoes;
