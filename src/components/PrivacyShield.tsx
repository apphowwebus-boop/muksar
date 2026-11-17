import { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';

export function PrivacyShield() {
  const [shieldActive, setShieldActive] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    let noticeTimer: number | undefined;
    let shieldTimer: number | undefined;

    const triggerNotice = (message: string, blackOutScreen = false) => {
      setNotice(message);
      window.clearTimeout(noticeTimer);
      noticeTimer = window.setTimeout(() => {
        setNotice(null);
      }, 2800);

      if (blackOutScreen) {
        setShieldActive(true);
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
          navigator.clipboard.writeText('').catch(() => {});
        }
        window.clearTimeout(shieldTimer);
        shieldTimer = window.setTimeout(() => {
          setShieldActive(false);
        }, 3200);
      }
    };

    const isEditableElement = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      const tag = target.tagName;
      return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
    };

    const handleContextMenu = (e: MouseEvent) => {
      if (isEditableElement(e.target)) return;
      e.preventDefault();
      triggerNotice('Right-click & image downloading are disabled on MUKSAR SPORTS.');
    };

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleCopyOrCut = (e: ClipboardEvent) => {
      if (isEditableElement(e.target)) return;
      e.preventDefault();
      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', '');
      }
      triggerNotice('Copying images or content is disabled.');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const mod = e.ctrlKey || e.metaKey;

      // Screenshot keys: PrintScreen, Cmd+Shift+3/4/5, Win+Shift+S
      if (
        e.key === 'PrintScreen' ||
        (e.metaKey && e.shiftKey && ['3', '4', '5', 's'].includes(key)) ||
        (e.ctrlKey && e.shiftKey && key === 's')
      ) {
        e.preventDefault();
        triggerNotice(
          'Screenshots & screen capture are restricted by MUKSAR SPORTS.',
          true
        );
        return;
      }

      // Print, Save Page, View Source, DevTools
      if (
        (mod && ['s', 'p', 'u'].includes(key)) ||
        e.key === 'F12' ||
        (mod && e.shiftKey && ['i', 'j', 'c'].includes(key))
      ) {
        e.preventDefault();
        triggerNotice(
          key === 'p'
            ? 'Printing & PDF export are disabled.'
            : 'Saving & downloading page assets is disabled.',
          key === 'p'
        );
        return;
      }

      // Copy outside editable inputs
      if (mod && key === 'c' && !isEditableElement(e.target)) {
        e.preventDefault();
        triggerNotice('Copying images or content is disabled.');
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        triggerNotice(
          'Screenshots & screen capture are restricted by MUKSAR SPORTS.',
          true
        );
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setShieldActive(true);
      } else {
        window.setTimeout(() => setShieldActive(false), 180);
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('copy', handleCopyOrCut);
    document.addEventListener('cut', handleCopyOrCut);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.clearTimeout(noticeTimer);
      window.clearTimeout(shieldTimer);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('copy', handleCopyOrCut);
      document.removeEventListener('cut', handleCopyOrCut);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <>
      {/* Full-screen Blackout Curtain on Screenshot / Hidden Tab */}
      {shieldActive && (
        <div
          aria-live="assertive"
          className="fixed inset-0 z-[100] bg-[#0A0A0B]/98 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center text-white"
        >
          <ShieldAlert className="w-12 h-12 text-[#E10600] mb-4" />
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight mb-2">
            Content Protected
          </h2>
          <p className="text-sm text-neutral-300 max-w-md mb-6">
            MUKSAR SPORTS product designs and model photography are protected against screenshots, saving, and unauthorized copying.
          </p>
          <button
            type="button"
            onClick={() => setShieldActive(false)}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-[#E10600] hover:bg-[#C40500] rounded-md cursor-pointer"
          >
            Resume Viewing
          </button>
        </div>
      )}

      {/* Subtle Protection Toast when user attempts right-click / copy / save */}
      {notice && !shieldActive && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 max-w-xs bg-[#0A0A0B] text-white border border-[#E10600]/70 rounded-md px-4 py-3 shadow-xl flex items-center gap-3"
        >
          <ShieldAlert className="w-4 h-4 text-[#E10600] shrink-0" />
          <p className="text-xs font-medium leading-snug">{notice}</p>
        </div>
      )}
    </>
  );
}
