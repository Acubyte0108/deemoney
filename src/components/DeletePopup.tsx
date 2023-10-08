import { useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const API_BASE_URL = "http://localhost:4000";

type DeletePopupProps = {
  customerId: string;
  toggle: () => void;
};

const DeletePopup = (props: DeletePopupProps) => {
  const { customerId, toggle } = props;
  const queryClient = useQueryClient();

  const mutation = useMutation<AxiosResponse, Error, string>(
    async (customerId) => {
      const response = await axios.delete(
        API_BASE_URL + "/customers/" + customerId
      );
      return response;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ stale: true });
        toggle();
      },
      onError: (error) => {
        console.log("Error:", error);
      },
    }
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleClick = () => {
    mutation.mutate(customerId)
  }

  return (<div className="fixed bg-gray-800 bg-opacity-75 inset-0 flex items-center justify-center z-10" onClick={toggle}>
            <div className="bg-white p-6 rounded shadow-lg sm:w-[500px] sm:h-[500px] mx-auto" onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}>
                {`Delete ${customerId}`}
            </div>
        </div>) 
};

export default DeletePopup;
