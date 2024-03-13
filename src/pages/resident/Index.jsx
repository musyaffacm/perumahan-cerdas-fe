import { Button } from "@mui/material";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddResidentModal from "./components/AddResidentModal";
import ResidentTable from "./components/ResidentTable";
import useFetch from "../../hooks/useFetch";
import { API_URL } from "../../constant/global";
import LoadingSpinner from "../../components/LoadingSpinner";
import { addResident, updateResident } from "../../lib/resident";
import CustomModal from "../../components/CustomModal";
import ResidentForm from "./components/ResidentForm";

export default function Resident() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [idEdit, setIdEdit] = useState(null);

  const {
    data: residentData,
    loading: residentLoading,
    error: residentError,
  } = useFetch(`${API_URL}/resident`);

  const {
    data: detail,
    loading: detailLoading,
    error: detailError,
  } = useFetch(API_URL + `/resident/` + idEdit);

  const handleCreate = async (state) => {
    setLoading(true);
    // setReqError([]);
    // e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", state.fullname);
    formData.append("identity_photo", state.identityPhoto);
    formData.append("phone_number", state.phoneNumber);
    formData.append("is_married", state.isMarried);

    const data = await addResident(formData, navigate(0));

    setLoading(false);
  };

  const handleUpdate = async (state, residentId) => {
    setLoading(true);
    // setReqError([]);
    // e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", state.fullname);
    formData.append("identity_photo", state.identityPhoto);
    formData.append("phone_number", state.phoneNumber);
    formData.append("is_married", state.isMarried);

    const data = await updateResident(residentId, formData, navigate(0));

    setLoading(false);
  };

  if (residentLoading) {
    return <LoadingSpinner />;
  }

  if (residentData?.data) {
    return (
      <div className="space-y-8">
        <div className="w-full text-center text-gray-950 font-bold text-5xl">
          Penghuni
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
              Tambah Penghuni
            </Button>
          </div>
          <ResidentTable data={residentData.data} onClickEdit={setIdEdit} />
          <AddResidentModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            onSubmit={(state) => handleCreate(state)}
            loading={loading}
          />
          {detail?.data && (
            <CustomModal open={idEdit !== null} onClose={() => setIdEdit(null)}>
              <ResidentForm
                value={detail?.data}
                open={openModal}
                onClose={() => setIdEdit(null)}
                onSubmit={(state) => handleUpdate(state, idEdit)}
                loading={loading}
              />
            </CustomModal>
          )}
        </div>
      </div>
    );
  }
}
