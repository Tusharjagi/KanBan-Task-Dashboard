import { FormEvent, useState } from "react";
import tw from "tailwind-styled-components";

import { Modal, ModalTitle } from "@/common/ui/modal";
import { Button } from "@/common/ui/button";
import { useAppDispatch } from "@/common/hooks/useRedux";
import { mainActions } from "@/common/store/slices/main";
import { TableColumnType } from "@/common/types/TableColumnType";
import { TableTitleField } from "./ui/TableTitleField";
import { TableColumns } from "./ui/TableColumns";
import { TableType } from "@/common/types/TableType";

interface IProps {
  open: boolean;
  onClose: VoidFunction;
  table: TableType;
  tableIndex: number;
}

export function EditTableModal({
  open,
  onClose: handleClose,
  table,
  tableIndex,
}: Readonly<IProps>) {
  const modalProps = { open, onClose: handleClose };

  const [title, setTitle] = useState(table.title);
  const [columns, setColumns] = useState<TableColumnType[]>(table.columns);
  const [showError, setShowError] = useState(false);

  const dispatch = useAppDispatch();

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.length > 0) {
      dispatch(
        mainActions.updateTable({
          index: tableIndex,
          newTable: {
            ...table,
            title,
            columns,
          },
        }),
      );
      handleClose();
    } else {
      setShowError(true);
    }
  };

  const handleOnChange = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLInputElement;
    target.value.length > 0 && setShowError(false);
  };

  return (
    <Modal {...modalProps}>
      <form onSubmit={handleOnSubmit} onChange={handleOnChange}>
        <ModalTitle className="mb-7">{`Edit ${title} Table`}</ModalTitle>
        {showError && (
          <div className="text-white flex justify-center items-center text-sm my-1 mx-10 bg-red-600 rounded-2xl">
            {`Board Name shouldn't be empty`}
          </div>
        )}
        <TableTitleField title={title} setTitle={setTitle} />
        <ColumnsTitle>Table columns</ColumnsTitle>
        <TableColumns columns={columns} setColumns={setColumns} />
        <Button type="submit" className="w-full mt-8" button_type="primary">
          Edit table
        </Button>
      </form>
    </Modal>
  );
}

const ColumnsTitle = tw.div`
text-white
text-base
font-bold
mb-2
`;
