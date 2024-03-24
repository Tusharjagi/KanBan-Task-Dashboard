import { DetailedHTMLProps, HTMLAttributes, ReactNode, useEffect } from "react";
import tw from "tailwind-styled-components";

import { Portal } from "../portal";
import { Backdrop } from "../backdrop";

type WrappedComponentType = {
  open: boolean;
  onClose: VoidFunction;
  children?: ReactNode | ((props: { onClose: VoidFunction }) => ReactNode);
};

function WrappedComponent({
  open,
  onClose,
  children,
}: Readonly<WrappedComponentType>) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Portal>
      <Wrapper open={open} onClick={handleClose} onClose={onClose}>
        <ModalWrapper onClick={(event) => event.stopPropagation()}>
          {typeof children === "function"
            ? children({ onClose: handleClose })
            : children}
        </ModalWrapper>
      </Wrapper>
    </Portal>
  );
}

export function Modal({
  open,
  children,
  ...rest
}: Readonly<WrappedComponentType>) {
  if (!open) {
    return null;
  }

  return (
    <WrappedComponent open={open} {...rest}>
      {children}
    </WrappedComponent>
  );
}

type ModalTitleType = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export function ModalTitle({ children, ...rest }: ModalTitleType) {
  return <Title {...rest}>{children}</Title>;
}

const Wrapper = tw(Backdrop)<{ open: boolean; onClose: VoidFunction }>`
  flex
  items-center
  justify-center
  z-50
  bg-black/60
  ${(props) => (props.open ? "overflow-y-hidden" : "")}
`;

const ModalWrapper = tw.div`
  relative
  p-7
  max-w-416
  w-full
  max-h-[90vh]
  overflow-y-auto
  rounded-md
  bg-white
  dark:bg-gunmetal
  z-50
  shadow-lg
  dark:shadow-black-sapphire/50
`;

const Title = tw.h2`
  text-gray-800
  dark:text-white
  text-2xl
  font-bold
`;
