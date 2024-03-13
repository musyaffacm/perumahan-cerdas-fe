import { Button } from "@mui/material";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MonthSelect from "./components/MonthSelect";
import CustomModal from "../../components/CustomModal";
import PaymentForm from "./components/PaymentForm";
import TransactionGraphic from "./components/TransactionGraphic";
import useFetch from "../../hooks/useFetch";
import { API_URL, STATIC_MONTH } from "../../constant/global";
import LoadingSpinner from "../../components/LoadingSpinner";
import PaymentInTable from "./components/PaymentInTable";
import PaymentOutTable from "./components/PaymentOutTable";
import { createTransaction } from "../../lib/payment";

export default function Payment() {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState(
    STATIC_MONTH.find((item) => item.id === 3)
  );

  const {
    data: transaction,
    loading: transactionLoading,
    error: transactionError,
  } = useFetch(`${API_URL}/payment/transaction/stat-data/${month.id}/2024`);

  const {
    data: yearlyTransc,
    loading: yearlyTranscLoading,
    error: yearlyTranscError,
  } = useFetch(`${API_URL}/payment/transaction/stat-data`);

  const {
    data: residentData,
    loading: residentLoading,
    error: residentError,
  } = useFetch(`${API_URL}/resident`);

  const {
    data: paymentType,
    loading: paymentTypeLoading,
    error: paymentTypeError,
  } = useFetch(`${API_URL}/payment`);

  const handleCreateTransaction = async (state) => {
    setLoading(true);
    // setReqError([]);
    // e.preventDefault();

    const formData = new FormData();
    formData.append("payment_id", state.paymentType.id);
    formData.append("resident_id", state.resident.id);
    formData.append("nominal", state.nominal);

    const data = await createTransaction(formData, () => navigate(0));

    setLoading(false);
  };

  if (
    transactionLoading ||
    yearlyTranscLoading ||
    residentLoading ||
    paymentTypeLoading
  ) {
    return <LoadingSpinner />;
  }

  if (
    transaction?.data &&
    yearlyTransc &&
    residentData?.data &&
    paymentType?.data
  ) {
    return (
      <div className="space-y-8">
        <div className="w-full text-center text-gray-950 font-bold text-5xl">
          Pembayaran
        </div>
        <TransactionGraphic data={yearlyTransc} />
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
              <MonthSelect
                value={month}
                onChange={(valMonth) => setMonth(valMonth)}
              />
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
          <div className="space-y-8">
            <PaymentInTable data={transaction?.data?.paymentIn} />
            <PaymentOutTable data={transaction?.data?.paymentOut} />
          </div>
        </div>
        <CustomModal open={isOpenModal} onClose={() => setIsOpenModal(false)}>
          <PaymentForm
            paymentTypeData={paymentType?.data}
            residentData={residentData?.data}
            onCancel={() => setIsOpenModal(false)}
            onSubmit={(state) => handleCreateTransaction(state)}
          />
        </CustomModal>
      </div>
    );
  }
}
