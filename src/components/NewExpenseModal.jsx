
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './NewExpenseModal.css';

export default function NewExpenseModal({ isOpen, onClose }) {
  const dialogRef = useRef(null);

  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Abrir y cerrar el modal
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const limpiarFormulario = () => {
    setNombre('');
    setMonto('');
    setCategoria('');
    setMensaje('');
  };

  const cancelar = () => {
    limpiarFormulario();
    onClose();
  };

  const guardarGasto = (event) => {
    event.preventDefault();

    if (!nombre.trim() || !monto.trim() || !categoria.trim()) {
      setMensaje('Por favor, completa todos los campos.');
      return;
    }

    const montoNumerico = Number(monto.replace(',', '.'));

    if (!Number.isFinite(montoNumerico) || montoNumerico <= 0) {
      setMensaje('Ingresa un monto mayor que cero.');
      return;
    }

    console.log('Gasto ingresado:', {
      nombre,
      monto: montoNumerico,
      categoria,
    });

    window.alert(
      `¡Listo!\nGasto: ${nombre}\nMonto: $${monto}\nCategoría: ${categoria}`
    );

    limpiarFormulario();
    onClose();
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      className="expense-modal"
      onClose={() => {
        limpiarFormulario();
        onClose();
      }}
      onCancel={(event) => {
        event.preventDefault();
        cancelar();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          cancelar();
        }
      }}
    >
      <div className="expense-modal-content">
        <div className="modal-handle" />

        <h2>Nuevo gasto</h2>
        <p>Completa los datos de tu gasto.</p>

        <form onSubmit={guardarGasto} noValidate>
          <label htmlFor="nombre">Nombre del gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Ej. Supermercado"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
          />

          <label htmlFor="monto">Monto</label>
          <input
            id="monto"
            type="text"
            inputMode="decimal"
            placeholder="Ej. 25000"
            value={monto}
            onChange={(event) => setMonto(event.target.value)}
          />

          <label htmlFor="categoria">Categoría</label>
          <input
            id="categoria"
            type="text"
            placeholder="Ej. Alimentación"
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
          />

          {mensaje && (
            <p className="modal-error" role="alert">
              {mensaje}
            </p>
          )}

          <div className="modal-actions">
            <button type="button" onClick={cancelar}>
              Cancelar
            </button>

            <button type="submit" className="btn-guardar">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </dialog>,
    document.body
  );
}
