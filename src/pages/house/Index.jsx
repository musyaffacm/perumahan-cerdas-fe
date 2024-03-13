import { Button } from "@mui/material";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HouseTable from "./components/HouseTable";
import useFetch from "../../hooks/useFetch";
import { API_URL } from "../../constant/global";
import LoadingSpinner from "../../components/LoadingSpinner";
import { addHouse, updateHouseResident } from "../../lib/house";
import CustomModal from "../../components/CustomModal";
import HouseForm from "./components/HouseForm";
import ResidentHistoryTable from "./components/ResidentHistoryTable";
import PaymentHistory from "./components/PaymentHistoryTable";
import PaymentStatus from "./components/PaymentStatus";

export default function House() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [idHistory, setIdHistory] = useState(null);
  const [idPaymentHistory, setIdPaymentHistory] = useState(null);
  const [idPaymentStatus, setIdPaymentStatus] = useState(null);

  const {
    data: houseData,
    loading: houseLoading,
    error: houseError,
    revalidate: houseRevalidate,
  } = useFetch(`${API_URL}/house`);

  const {
    data: residentData,
    loading: residentLoading,
    error: residentError,
  } = useFetch(`${API_URL}/resident`);

  const { data: residentHistory } = useFetch(
    API_URL + `/house/resident/history?house=` + idHistory
  );

  const {
    data: paymentHistory,
    loading: paymentHistoryLoading,
    error: paymentHistoryError,
  } = useFetch(`${API_URL}/house/payment-history/${idPaymentHistory}`);

  const {
    data: paymentStatus,
    loading: paymentStatusLoading,
    error: paymentStatusError,
  } = useFetch(`${API_URL}/house/payment-status/${idPaymentStatus}`);

  const handleCreate = async (state) => {
    setLoading(true);

    const data = await addHouse(() => houseRevalidate());

    setLoading(false);
  };

  const handleUpdate = async (state) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("house_id", idEdit);
    formData.append("resident_id", state.resident.id);
    formData.append("inhabit_status", state.inhabitStatus.value);

    const onSuccess = () => {
      setIdEdit(null);
      houseRevalidate();
    };

    const data = await updateHouseResident(formData, () => onSuccess());
    setLoading(false);
  };

  if (houseLoading || residentLoading) {
    return <LoadingSpinner />;
  }

  if (houseData?.data && residentData?.data) {
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
          <HouseTable
            data={houseData?.data}
            onClickEdit={(houseId) => setIdEdit(houseId)}
            onClickHistory={(houseId) => setIdHistory(houseId)}
            onClickPaymentHistory={(residentId) =>
              setIdPaymentHistory(residentId)
            }
            onClickPaymentStatus={(residentId) =>
              setIdPaymentStatus(residentId)
            }
          />
        </div>
        <CustomModal open={idEdit !== null} onClose={() => setIdEdit(null)}>
          <HouseForm
            onCancel={() => setIdEdit(null)}
            residentData={residentData?.data}
            onSubmit={(state) => handleUpdate(state)}
            loading={loading}
          />
        </CustomModal>
        {residentHistory?.data && (
          <CustomModal
            open={idHistory !== null}
            onClose={() => setIdHistory(null)}
          >
            <ResidentHistoryTable residentHistory={residentHistory?.data} />
          </CustomModal>
        )}

        {paymentHistory?.data && (
          <CustomModal
            open={idPaymentHistory !== null}
            onClose={() => setIdPaymentHistory(null)}
          >
            <PaymentHistory
              onCancel={() => setIdPaymentHistory(null)}
              data={paymentHistory?.data}
            />
          </CustomModal>
        )}

        {paymentStatus?.data && (
          <CustomModal
            open={idPaymentStatus !== null}
            onClose={() => setIdPaymentStatus(null)}
          >
            <PaymentStatus
              onCancel={() => setIdPaymentStatus(null)}
              data={paymentStatus?.data}
            />
          </CustomModal>
        )}
      </div>
    );
  }
}
