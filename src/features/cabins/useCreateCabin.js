import { createCabin as createCabinApi } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  //Control request to API
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: () => {
      toast.success("New cabin successfully created!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message)
  });

  return { createCabin, isCreating };
}
