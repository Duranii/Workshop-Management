declare module 'react-modal' {
    import * as React from 'react';
  
    export interface Props {
      isOpen: boolean;
      onRequestClose?: (event: React.MouseEvent | React.KeyboardEvent) => void;
      onAfterOpen?: () => void;
      onAfterClose?: () => void;
      shouldCloseOnOverlayClick?: boolean;
      shouldCloseOnEsc?: boolean;
      shouldReturnFocusAfterClose?: boolean;
      parentSelector?: () => HTMLElement;
      overlayClassName?: string | object;
      className?: string | object;
      bodyOpenClassName?: string;
      htmlOpenClassName?: string;
      ariaHideApp?: boolean;
      appElement?: HTMLElement;
      style?: {
        content?: object;
        overlay?: object;
      };
      contentLabel?: string;
      role?: string;
      aria?: object;
      data?: object;
      closeTimeoutMS?: number;
      portalClassName?: string;
      overlayRef?: (node: HTMLElement | null) => void;
      contentRef?: (node: HTMLElement | null) => void;
      testId?: string;
    }
  
    export default class Modal extends React.Component<Props> {}
  }
  