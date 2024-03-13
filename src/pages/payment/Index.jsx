import { Button } from "@mui/material";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MonthSelect from "./components/MonthSelect";
import CustomModal from "../../components/CustomModal";
import TranscForm from "./components/TranscForm";
import TransactionGraphic from "./components/TransactionGraphic";
import useFetch from "../../hooks/useFetch";
import { API_URL, STATIC_MONTH } from "../../constant/global";
import LoadingSpinner from "../../components/LoadingSpinner";
import PaymentInTable from "./components/PaymentInTable";
import PaymentOutTable from "./components/PaymentOutTable";
import { createPaymentType, createTransaction } from "../../lib/payment";
import PaymentTypeTable from "./components/PaymentTypeTable";
import PaymentTypeForm from "./components/PaymentTypeForm";

export default function Payment() {
  const navigate = useNavigate();
  const [isAddTransc, setIsAddTransc] = useState(false);
  const [isAddPayment, setIsAddPayment] = useState(false);
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

  const handleCreatePaymentType = async (state) => {
    setLoading(true);
    // setReqError([]);
    // e.preventDefault();

    const formData = new FormData();
    formData.append("label", state.label);
    formData.append("fee", state.fee);

    const data = await createPaymentType(formData, () => navigate(0));

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
        <div className="w-full flex justify-between">
          <Button
            variant="contained"
            size="large"
            startIcon={<MdOutlineKeyboardBackspace />}
            onClick={() => navigate("/home")}
          >
            Back
          </Button>
          <div className="w-full text-center text-gray-950 font-bold text-5xl">
            Pembayaran
          </div>
          <div></div>
        </div>
        <TransactionGraphic data={yearlyTransc} />

        <div className="space-y-5 px-3">
          <div className="w-full flex justify-end">
            <div className="flex gap-x-5 w-96">
              <MonthSelect
                value={month}
                onChange={(valMonth) => setMonth(valMonth)}
              />
              <Button
                variant="contained"
                size="large"
                startIcon={<IoMdAdd />}
                onClick={() => setIsAddTransc((prev) => true)}
              >
                Buat Transaksi
              </Button>
            </div>
          </div>
          <div className="space-y-8">
            <PaymentInTable data={transaction?.data?.paymentIn} />
            <PaymentOutTable data={transaction?.data?.paymentOut} />
          </div>
        </div>
        <div className="space-y-5 px-3">
          <div className="flex justify-end">
            <Button
              variant="contained"
              size="large"
              startIcon={<IoMdAdd />}
              onClick={() => setIsAddPayment((prev) => true)}
            >
              Tambah Jenis Pembayaran
            </Button>
          </div>
          <PaymentTypeTable data={paymentType?.data} />
        </div>
        <CustomModal open={isAddTransc} onClose={() => setIsAddTransc(false)}>
          <TranscForm
            paymentTypeData={paymentType?.data}
            residentData={residentData?.data}
            onCancel={() => setIsAddTransc(false)}
            onSubmit={(state) => handleCreateTransaction(state)}
          />
        </CustomModal>
        <CustomModal open={isAddPayment} onClose={() => setIsAddPayment(false)}>
          <PaymentTypeForm
            onCancel={() => setIsAddPayment(false)}
            onSubmit={(state) => handleCreatePaymentType(state)}
          />
        </CustomModal>
      </div>
    );
  }
}
