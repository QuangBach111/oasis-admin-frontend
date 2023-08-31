import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editSettings as editSettingApi } from "../../services/apiSettings";
import { toast } from "react-hot-toast";

export function useEditSetting() {
  const queryClient = useQueryClient();
  const { mutate: editSetting, isLoading: isEditing } = useMutation({
    mutationFn: editSettingApi,
    onSuccess: () => {
      toast.success("Edited successed!");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => toast.error(err.message)
  });

  return { editSetting, isEditing };

}