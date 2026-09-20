import { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import type { IScannerControls } from '@zxing/browser';
import './BarcodeScanner.css';

interface BarcodeScannerProps {
  onDetected: (code: string) => void;
  onClose: () => void;
}

export default function BarcodeScanner({ onDetected, onClose }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
    let cancelled = false;

    reader
      .decodeFromVideoDevice(undefined, videoRef.current ?? undefined, (result, _err, controls) => {
        controlsRef.current = controls;
        if (cancelled) return;
        if (result) {
          const text = result.getText();
          controls.stop();
          onDetected(text);
        }
        // err fires continuously while no barcode is in frame — not a real error, ignore it.
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Could not access camera');
      });

    return () => {
      cancelled = true;
      controlsRef.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="scanner-modal">
      <div className="scanner-modal-inner">
        <div className="scanner-header">
          <h2>Scan barcode</h2>
          <button className="scanner-close" onClick={onClose}>×</button>
        </div>
        {error ? (
          <div className="scanner-error">
            <p>{error}</p>
            <p className="scanner-hint">
              You can also just plug in a USB/Bluetooth barcode scanner and scan into the search box —
              it works like a keyboard, no camera needed.
            </p>
          </div>
        ) : (
          <>
            <video ref={videoRef} className="scanner-video" muted playsInline />
            <p className="scanner-hint">Point the camera at a barcode. Or use a USB/Bluetooth scanner into the search box instead.</p>
          </>
        )}
        <button className="btn-ghost" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
