import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";
import { FaWhatsapp } from "react-icons/fa";
import { FaSms } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaStar } from "react-icons/fa";

const CheckContacto: React.FC = () => {
  return (
    <div className="grid grid-cols-2 ">
      <FormGroup className="grid grid-cols-2 text-xs bg-gray-800 items-center gap-2">
        <div className="flex justify-between gap-10">
          <div className="flex items-start">
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{ color: "white", "&.Mui-checked": { color: pink[300] } }}
                />
              }
              label={
                <div className="flex items-center">
                  <MdOutlineEmail className="text-white mr-1" />
                  Recebo
                </div>
              }
              className="text-white mr-4"
            />
          </div>

          <div>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{ color: "gray", "&.Mui-checked": { color: pink[300] } }}
                />
              }
              label={
                <div className="flex items-center text-gray-300">
                  <FaWhatsapp className="text-gray-300 mr-1" />
                  Desloco-me
                </div>
              }
              className="text-white mr-4"
            />
          </div>

          <div>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{ color: "gray", "&.Mui-checked": { color: pink[300] } }}
                />
              }
              label={
                <div className="flex items-center text-gray-300">
                  <FaSms className="text-gray-300 mr-1" />
                  Hoteis
                </div>
              }
              className="text-white mr-4"
            />
          </div>

          <div>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{ color: "gray", "&.Mui-checked": { color: pink[300] } }}
                />
              }
              label={
                <div className="flex items-center text-gray-300">
                  <FaStar className="text-gray-300 mr-1" />
                  Acompanhamento de Luxo
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

export default CheckContacto;
