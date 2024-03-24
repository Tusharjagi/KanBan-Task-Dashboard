import { FormEvent, useRef, useState } from "react";
import { useAppDispatch } from "@/common/hooks/useRedux";

import { Modal, ModalTitle } from "@/common/ui/modal";
import tw from "tailwind-styled-components";
import { Button } from "@/common/ui/button";
import { DEFAULT_COLUMNS_VALUES } from "@/common/data/constants";
import { mainActions } from "@/common/store/slices/main";
import { ITableColumn } from "@/common/models/ITableColumn";
import { TableTitleField } from "./ui/TableTitleField";
import { TableColumns } from "./ui/TableColumns";
import { v4 as uuid } from "uuid";

interface IProps {
  open: boolean;
  onClose: VoidFunction;
}

export function CreateTableModal(props: Readonly<IProps>) {
  const ref = useRef<HTMLFormElement>(null);

  const [title, setTitle] = useState("");
  const [columns, setColumns] = useState<ITableColumn[]>(DEFAULT_COLUMNS_VALUES);
  const [showError, setShowError] = useState(false);

  const dispatch = useAppDispatch();

  const { onClose: handleClose } = props;

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.length > 0) {
      dispatch(
        mainActions.addTable({
          id: uuid(),
          title,
          columns,
        }),
      );
      ref.current!.reset();
      setTitle("");
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
    <Modal {...props}>
      <form ref={ref} onSubmit={handleOnSubmit} onChange={handleOnChange}>
        <ModalTitle className="mb-7">Add new table</ModalTitle>
        {showError && (
          <div className="text-white flex justify-center items-center text-sm my-1 mx-10 bg-red-600 rounded-2xl">
            {`Board Name shouldn't be empty`}
          </div>
        )}
        <TableTitleField title={title} setTitle={setTitle} />
        <ColumnsTitle>Table columns</ColumnsTitle>
        <TableColumns columns={columns} setColumns={setColumns} />
        <Button type="submit" className="w-full mt-8" button_type="primary">
          Create new table
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
