import { Button } from "@mui/material";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PaymentTable from "./components/PaymentTable";
import MonthSelect from "./components/MonthSelect";
import CustomModal from "../../composnents/CustomModal";
import PaymentForm from "./components/PaymentForm";
import TransactionGraphic from "./components/TransactionGraphic";

export default function Payment() {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div className="space-y-8">
      <div className="w-full text-center text-gray-950 font-bold text-5xl">
        Pembayaran
      </div>
      <TransactionGraphic />
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
          <div className="flex gap-x-5 w-96">
            <MonthSelect />
            <Button
              variant="contained"
              size="large"
              startIcon={<IoMdAdd />}
              onClick={() => setIsOpenModal((prev) => true)}
            >
              Tambah Pembayaran
            </Button>
          </div>
        </div>
        <PaymentTable />
      </div>
      <CustomModal open={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <PaymentForm onCancel={() => setIsOpenModal(false)} />
      </CustomModal>
    </div>
  );
}
