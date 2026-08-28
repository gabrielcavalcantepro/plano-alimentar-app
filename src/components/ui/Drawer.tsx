import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconClose } from "../icons";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

export function Drawer({
  open,
  onClose,
  children,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: "md" | "lg";
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  // The dialog's own data usually goes back to null the instant `onClose` fires (the
  // caller nils out its state), which would blank the content mid slide-down. Keep
  // showing the last real content while `open` is false and the close animation plays.
  const [displayedChildren, setDisplayedChildren] = useState(children);

  useEffect(() => {
    if (open) setDisplayedChildren(children);
  }, [open, children]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
  }, [open]);

  return (
    // top-auto overrides the UA stylesheet's `dialog:modal { inset: 0 }`, which otherwise
    // leaves `top: 0` active alongside our `bottom-0` and stretches the box full-height,
    // pinning short content to the top instead of the bottom sheet's edge.
    <dialog
      ref={ref}
      onClose={onClose}
      onCancel={(event) => {
        // Prevent the browser's instant close so the slide-down animation can play first;
        // `onClose` updates the caller's `open` state, which AnimatePresence below reacts to.
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      className={`fixed inset-x-0 top-auto bottom-0 m-0 w-full max-w-none bg-transparent p-0 backdrop:bg-espresso-900/45 backdrop:backdrop-blur-[2px] sm:inset-0 sm:m-auto sm:h-fit sm:max-h-[85vh] sm:w-full ${
        size === "lg" ? "sm:max-w-2xl" : "sm:max-w-lg"
      }`}
    >
      <AnimatePresence onExitComplete={() => ref.current?.close()}>
        {open ? (
          <motion.div
            key="drawer-panel"
            initial={{ y: "12%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "12%", opacity: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.26, ease: [0.32, 0.72, 0, 1] }}
            className="relative max-h-[88vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-[var(--shadow-lifted)] sm:max-h-[85vh] sm:rounded-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-espresso-100 text-espresso-500 hover:bg-espresso-200"
            >
              <IconClose className="h-4 w-4" />
            </button>
            {displayedChildren}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </dialog>
  );
}
