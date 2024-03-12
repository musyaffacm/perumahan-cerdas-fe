import { Button } from "@mui/material";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HouseTable from "./components/HouseTable";
import useFetch from "../../hooks/useFetch";
import { API_URL } from "../../constant/global";
import LoadingSpinner from "../../components/LoadingSpinner";
import { addHouse } from "../../lib/house";

export default function House() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    data: houseData,
    loading: houseLoading,
    error: houseError,
    revalidate: houseRevalidate,
  } = useFetch(`${API_URL}/house`);

  const handleCreate = async (state) => {
    setLoading(true);

    const data = await addHouse(() => houseRevalidate());

    setLoading(false);
  };

  if (houseLoading) {
    return <LoadingSpinner />;
  }

  if (houseData?.data) {
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
              onClick={() => handleCreate()}
            >
              Tambah Rumah
            </Button>
          </div>
          <HouseTable data={houseData?.data} />
        </div>
      </div>
    );
  }
}
