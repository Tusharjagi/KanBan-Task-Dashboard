import { useAppDispatch, useAppSelector } from "@/common/hooks/useRedux";
import { mainActions } from "@/common/store/slices/main";
import { Dialog } from "@/common/ui/dialog";

type DeleteTableModalType = {
  open: boolean;
  onClose: VoidFunction;
  tableIndex: number;
};

export function DeleteTableModal({
  open,
  onClose,
  tableIndex,
}: Readonly<DeleteTableModalType>) {
  const title = useAppSelector((el) => el.mainSlice.tables[tableIndex].title);

  const subtitle = `Are you sure you want to delete the "${title}" board? This action will remove all columns and tasks and cannot be reversed.`;

  const dispatch = useAppDispatch();
  const handleOnConfirm = () => {
    dispatch(mainActions.deleteTable(tableIndex));
  };

  return (
    <Dialog
      title="Delete this board ?"
      subtitle={subtitle}
      confirmText="Delete"
      cancelText="Cancel"
      open={open}
      onClose={onClose}
      onConfirm={handleOnConfirm}
    />
  );
}
