'use client'

interface ConfirmModalProps {
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmModal({
                                       title,
                                       description,
                                       confirmText = "Confirmar",
                                       cancelText = "Cancelar",
                                       loading = false,
                                       onConfirm,
                                       onCancel,
                                     }: ConfirmModalProps) {
  return (
    <div className="w-[100vw] h-[100vh] fixed inset-0 z-[9999] flex items-center justify-center select-none font-stardewSimple">
      <div className="bg-[var(--card-background)] border-2 border-[var(--card-background-3)] rounded-[12px] shadow-lg p-[24px] w-[420px] max-w-[90%] flex flex-col gap-6 text-center">
        <h2 className="text-[1.6rem] mb-[16px]">{title}</h2>
        <p className="text-[1rem] mb-[16px]">{description}</p>

        <div className="flex justify-center gap-[16px]">
          <button
            onClick={onCancel}
            disabled={loading}
            className="cursor-pointer text-[] p-[10px] bg-[#FFF] border-2 border-[var(--card-background-4)] rounded-[4px] font-stardewSimple hover:scale-105 transition-transform disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="cursor-pointer p-[10px] bg-[#FF0000] border-2 border-[var(--card-background-4)] rounded-[4px] font-stardewSimple hover:scale-105 transition-transform flex items-center justify-center gap-[8px] disabled:opacity-50 text-[#FFFFFF]"
          >
            {loading && (
              <span className="w-[10px] h-[10px] border-2 border-[#FFF] border-t-transparent rounded-full animate-spin"></span>
            )}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
