import {ReactNode, useEffect, useRef} from "react";
import classNames from "classnames";
import {createPortal} from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick";

interface Props {
    open: boolean,
    onClose: () => void,
    children: ReactNode
}

export default function Modal(props: Props) {
    const {open, onClose, children} = props;
    const ref: any = useRef(null)
    useEffect(() => {
        const closeOnEscapeKey = (e: any) => e.key === "Escape" ? onClose() : null;
        document?.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document?.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [onClose]);
    useOutsideClick(ref, () => {
        onClose()
    })

    return createPortal(
        <div className={'app-modal'}>
            <div
                className={classNames({
                    'fixed z-50  top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 h-screen w-screen app-back-drop-open': open,
                    'hidden h-0 w-0 overflow-hidden  app-back-drop-close': !open
                })}>
                <div
                    ref={ref}
                    className={classNames({
                        'app-modal-content-open': open,
                        'app-modal-content-close': !open
                    })}>
                    <div
                        className={'bg-white py-3 px-4 rounded-md sm:w-96 w-80  h-fit'}>
                        {children}
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('todo-portal')
    )

}