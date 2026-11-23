'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Icono from './Icono';
import type { DemoVideo } from '../data/rubros/tipos';
import type { PaginaCopy } from '../data/paginas';
import './videos.css';

// Carga al tocar: nada se descarga ni se reproduce hasta que la persona lo pide.
function Demo({ v }: { v: DemoVideo }) {
  const [cargado, setCargado] = useState(false);
  const [aviso, setAviso] = useState(false);
  const media = useRef<HTMLVideoElement & HTMLIFrameElement>(null);
  const esArchivo = /\.(mp4|webm)(\?|$)/i.test(v.url);
  const titulo = `Cargar el video: ${v.titulo}`;

  useEffect(() => {
    if (!cargado) return;
    media.current?.focus?.();
    if (media.current instanceof HTMLVideoElement) media.current.play().catch(() => {}); // acción directa del toque
  }, [cargado]);

  return (
    <figure className="vid">
      <div className="vid__caja">
        {cargado ? (
          esArchivo ? (
            <video ref={media} className="vid__media" src={v.url} controls playsInline preload="metadata" />
          ) : (
            <iframe ref={media} className="vid__media" src={v.url} title={titulo} allow="encrypted-media; picture-in-picture" allowFullScreen />
          )
        ) : (
          <button type="button" className="vid__marco" aria-label={titulo} onClick={() => (v.url ? setCargado(true) : setAviso(true))}>
            <Image src={v.poster.src} alt="" width={v.poster.width} height={v.poster.height} sizes="(min-width: 48rem) 50vw, 100vw" loading="lazy" />
            <span className="vid__play"><Icono nombre="play" tam={28} /></span>
          </button>
        )}
        <span className="vid__chip etiqueta">Demo de MAD · {v.duracion}</span>
      </div>
      <figcaption>
        <span className="etiqueta vid__tipo">{v.etiqueta}</span>
        <h3>{v.titulo}</h3>
        <p>{v.texto}</p>
        <p className="vid__aviso" hidden={!aviso}>[Video por subir] Pega la URL en src/data/videos.ts.</p>
      </figcaption>
    </figure>
  );
}

export default function Videos({ copy }: { copy: PaginaCopy['videos'] }) {
  return (
    <section className="seccion tono-oscuro" id="videos">
      <div className="cont">
        <header className="seccion__cab">
          <p className="etiqueta">{copy.etiqueta}</p>
          <h2>{copy.titulo}</h2>
          <p className="lead">{copy.lead}</p>
        </header>
        <div className="vid-grid">
          {copy.items.map((v) => <Demo key={v.id} v={v} />)}
        </div>
      </div>
    </section>
  );
}
