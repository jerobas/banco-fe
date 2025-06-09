import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ModalEntry = {
    id: string;
    // component: React.FC<{ onClose: () => void }>;
    component: React.FC;
};

export const useModalRoot = (id = "modal-root") => {
    const [ready, setReady] = useState(false);
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        let el = document.getElementById(id);

        if (!el) {
            el = document.createElement("div");
            el.id = id;
            document.body.appendChild(el);
        }

        ref.current = el;
        setReady(true);

        return () => {
            el?.parentNode?.removeChild(el);
        };
    }, [id]);

    return { ref, ready };
}

export const useModal = (ModalComponent: React.FC) => {
    const [isVisible, setIsVisible] = useState(false);
    const { ref, ready } = useModalRoot();

    const queued = useRef(false);
    const toggle = () => {
        if (!ready) {
            queued.current = true;
            return;
        }
        setIsVisible((v) => {
            if (ref.current) ref.current.classList.toggle("active", !v)
            return !v
        });
    };

    useEffect(() => {
        if (ready && queued.current) {
            setIsVisible(true);
            if (ref.current) ref.current.classList.add("active")
            queued.current = false;
        }
    }, [ready]);

    return {
        modal: isVisible && ready && ref.current ? createPortal(<ModalComponent />, ref.current!) : <></>,
        toggle
    }
}

export const useModals = (entries: ModalEntry[], { mutuallyExclusive = true }) => {
    const [visibleMap, setVisibleMap] = useState<Record<string, boolean>>({});
    const { ref, ready } = useModalRoot();

    const toggle = (id: string) => {
        setVisibleMap((prev) => {
            let next: typeof prev;

            if (mutuallyExclusive) {
                next = Object.keys(prev).reduce((acc, key) => {
                    acc[key] = false;
                    return acc;
                }, {} as Record<string, boolean>);
                next[id] = !prev[id];
            } else {
                next = { ...prev, [id]: !prev[id] };
            }

            if (ready && ref.current) ref.current.classList.toggle("active", Object.values(next).some(Boolean));
            return next;
        });
    };

    const modals = entries.map(({ id, component: Component }) =>
        visibleMap[id]
            // ? createPortal(<Component onClose={() => toggle(id)} />, modalRoot.current!)
            ? createPortal(<Component />, ref.current!)
            : <></>
    );

    return { modals, toggle };
};