// src/context/modal.tsx

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';

export type ModalType = 'alert' | 'confirm' | 'error' | 'help';

type ModalData = {
  type: ModalType;
  title?: string;
  description?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  oneButton?: boolean;
  textConfirm?: string;
  textCancel?: string;
  buttonColorConfirm?: string;
  buttonColorCancel?: string;
};

export interface ModalContextType {
  modalVisible: boolean;
  modalType?: ModalType;
  modalTitle: string;
  modalDescription: string;
  textConfirm: string;
  textCancel: string;
  buttonColorConfirm: string;
  buttonColorCancel: string;
  oneButton: boolean;
  showModal: (data: ModalData) => void;
  hideModal: () => void;
  onConfirmAction: () => void;
  onCancelAction: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalType>();
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [textConfirm, setTextConfirm] = useState('Confirm');
  const [textCancel, setTextCancel] = useState('Cancel');
  const [buttonColorConfirm, setButtonColorConfirm] = useState('defaultColor');
  const [buttonColorCancel, setButtonColorCancel] = useState('defaultColor');
  const [onConfirmAction, setOnConfirmAction] = useState<() => void>(() => () => {});
  const [onCancelAction, setOnCancelAction] = useState<() => void>(() => () => {});
  const [oneButton, setOneButton] = useState(false);

  const showModal = ({
    type,
    title,
    description,
    onConfirm,
    onCancel,
    oneButton: mb,
    textConfirm: tc,
    textCancel: tca,
    buttonColorConfirm: bcc,
    buttonColorCancel: bcca,
  }: ModalData) => {
    setModalType(type);
    setModalTitle(title || '');
    setModalDescription(description || '');
    setOnConfirmAction(() => onConfirm || (() => {}));
    setOnCancelAction(() => onCancel || (() => {}));
    setOneButton(!!mb);
    setTextConfirm(tc || 'Confirm');
    setTextCancel(tca || 'Cancel');
    setButtonColorConfirm(bcc || 'defaultColor');
    setButtonColorCancel(bcca || 'defaultColor');
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setOnConfirmAction(() => () => {});
    setOnCancelAction(() => () => {});
  };

  const value = useMemo(
    () => ({
      modalVisible,
      modalType,
      modalTitle,
      modalDescription,
      textConfirm,
      textCancel,
      buttonColorConfirm,
      buttonColorCancel,
      oneButton,
      showModal,
      hideModal,
      onConfirmAction,
      onCancelAction,
    }),
    [
      modalVisible,
      modalType,
      modalTitle,
      modalDescription,
      textConfirm,
      textCancel,
      buttonColorConfirm,
      buttonColorCancel,
      oneButton,
      onConfirmAction,
      onCancelAction,
    ]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

export function useModalAll() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModalAll must be used within ModalProvider');
  return { showModal: ctx.showModal };
}

export function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModalContext must be used within ModalProvider');
  return ctx;
}