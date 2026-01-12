import { Tabs, Tab } from '@heroui/react'
import { useEffect, useState } from 'react'

// 1. Definimos y exportamos el tipo exacto de lo que el componente emite
export interface VarianteUpdate {
  descripcion_abertura: string
  cod_abertura: string
  img: string
  variantKey: number
}

interface Linea {
  id: string
  abertura: string
  prefijo: string
  variantes: {
    variantKey: number
    tab: string
    descripcion: string
    img: string
  }[]
}

type tabsProps = {
  selectedAbertura: Linea | undefined
  onVarianteChange: (data: VarianteUpdate) => void // Usamos el tipo aquí
  setTabSelected: number
}

export default function TabsAberturaComp({
  selectedAbertura,
  onVarianteChange,
  setTabSelected,
}: tabsProps) {
  const [selected, setSelected] = useState(setTabSelected.toString())

  useEffect(() => {
    setSelected(setTabSelected.toString())
  }, [setTabSelected])

  useEffect(() => {
    if (selectedAbertura) {
      const tabSelectData =
        selectedAbertura.variantes.find(
          (v) => v.variantKey.toString() === selected,
        ) || selectedAbertura.variantes[0]

      if (tabSelectData) {
        onVarianteChange({
          descripcion_abertura: tabSelectData.descripcion,
          cod_abertura: selectedAbertura.prefijo,
          img: tabSelectData.img,
          variantKey: tabSelectData.variantKey,
        })
      }
    }
    // IMPORTANTE: Solo reaccionar cuando cambia el ID de la abertura o la pestaña.
    // No incluyas onVarianteChange aquí para evitar bucles.
  }, [selected, selectedAbertura?.id])

  return (
    <div className='w-full flex flex-col gap-2'>
      {selectedAbertura && selectedAbertura.variantes.length > 1 && (
        <Tabs
          color='warning'
          fullWidth={true}
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key.toString())}
        >
          {selectedAbertura.variantes.map((variante) => (
            <Tab key={variante.variantKey} title={variante.tab} />
          ))}
        </Tabs>
      )}
    </div>
  )
}
