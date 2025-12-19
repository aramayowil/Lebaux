import { Tabs, Tab } from '@heroui/react'
import { useEffect, useState } from 'react'

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
  getDescripcion: (descripcion: string) => void
  getCodigo: (codigo: string) => void
  getImg: (img: string) => void
  getVariantKey: (variantKey: number) => void
  setTabSelected: number
}

export default function TabsAbertura({
  selectedAbertura,
  getDescripcion,
  getCodigo,
  getImg,
  getVariantKey,
  setTabSelected,
}: tabsProps) {
  //controlador del tab seleccionado
  const [selected, setSelected] = useState(setTabSelected.toString())

  useEffect(() => {
    //cuando cambia la abertura seleccionada, seteo los valores iniciales
    if (selectedAbertura) {
      getCodigo(selectedAbertura.prefijo)
      getImg(selectedAbertura.variantes[0].img)
      getVariantKey(selectedAbertura.variantes[0].variantKey)
      getDescripcion(selectedAbertura.variantes[0].descripcion)
    }
    //limpieza al desmontar o cambiar de abertura
    return () => {
      getDescripcion('')
      getCodigo('')
      getImg('')
      setSelected('0')
    }
  }, [selectedAbertura])

  useEffect(() => {
    if (selectedAbertura) {
      //guardo los campos de la variante seleccionada
      const tabSelectData = selectedAbertura.variantes.find(
        (variante) => variante.variantKey.toString() === selected,
      )

      getImg(tabSelectData ? tabSelectData.img : '')
      getVariantKey(tabSelectData ? tabSelectData.variantKey : 0)
      getCodigo(selectedAbertura.prefijo)
      getDescripcion(tabSelectData ? tabSelectData.descripcion : '')
      getVariantKey(tabSelectData ? tabSelectData.variantKey : 0)
    }
  }, [selected])

  return (
    <div>
      {selectedAbertura && selectedAbertura.variantes.length > 1 && (
        <Tabs
          color='warning'
          fullWidth={true}
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key as typeof selected)}
        >
          {selectedAbertura?.variantes.map((variante) => (
            <Tab key={variante.variantKey} title={variante.tab} />
          ))}
        </Tabs>
      )}
    </div>
  )
}
