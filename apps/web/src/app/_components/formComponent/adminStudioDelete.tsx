"use clinet";
import BackEndForm from "./backEndForm";
type Props = {
  studioId: number;
  studioName: string;
  onSuccess: (e: any) => void;
  closeModal: () => void;
};

export default function AdminStudioDelete({
  onSuccess,
  studioId,
  studioName,
  closeModal,
}: Props) {
  return (
    <BackEndForm
      action={`/branch/b2/${studioId}`}
      data={{}}
      method="delete"
      onSuccess={(r) => {
        onSuccess(r);
        closeModal();
      }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white p-5 rounded">
        <p>Are you sure to delete {studioName} ?</p>
        <div className="flex justify-end mt-4">
          <button
            className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => closeModal()}
          >
            Cancel
          </button>
          <input
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            value={"Delete"}
          />
        </div>
      </div>
    </BackEndForm>
  );
}
