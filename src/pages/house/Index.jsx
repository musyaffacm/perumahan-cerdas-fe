import { Button } from "@mui/material";
import CustomTable from "../../components/CustomTable";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HouseTable from "./components/HouseTable";

export default function House() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="space-y-8">
      <div className="w-full text-center text-gray-950 font-bold text-5xl">
        Rumah
      </div>
      <div className="w-full">
        <div className="w-full flex justify-between mb-5">
          <Button
            variant="contained"
            size="large"
            startIcon={<MdOutlineKeyboardBackspace />}
            onClick={() => navigate("/home")}
          >
            Back
          </Button>
          <Button
            variant="contained"
            size="large"
            startIcon={<IoMdAdd />}
            onClick={() => setOpenModal((prev) => true)}
          >
            Tambah Rumah
          </Button>
        </div>
        <HouseTable />
      </div>
    </div>
  );
}
