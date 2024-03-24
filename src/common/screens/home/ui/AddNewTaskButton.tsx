import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { CreateTaskModal } from "@/common/features/task";
import { useMediaQuery } from "@/common/hooks/useMediaQuery";
import { useToggler } from "@/common/hooks/useToggler";
import { TableType } from "@/common/types/TableType";
import { Button } from "@/common/ui/button";
import { bool2string } from "@/common/utils";

type AddNewTaskButtonType = {
  table: TableType;
  tableIndex: number;
};

export function AddNewTaskButton({
  table,
  tableIndex,
}: Readonly<AddNewTaskButtonType>) {
  const [open, toggleOpen] = useToggler(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [mounted, , setMounted] = useToggler(false);

  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const content: Record<"true" | "false", JSX.Element | string> = {
    true: "Add new task",
    false: <AiOutlinePlus className="text-white" />,
  };

  return (
    <>
      <Button onClick={toggleOpen}>
        {content[bool2string(isDesktop && mounted)]}
      </Button>
      {open ? (
        <CreateTaskModal
          open={open}
          onClose={toggleOpen}
          columns={table.columns}
          tableIndex={tableIndex}
        />
      ) : null}
    </>
  );
}
