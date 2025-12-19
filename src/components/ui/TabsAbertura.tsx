import { Tabs, Tab } from '@heroui/react'
import { useEffect, useState } from 'react'

interface Linea {
  id: string
  abertura: string
  prefijo: string
  variante: {
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
  const [tagSelected, setTagSelected] = useState('')

  useEffect(() => {
    selectedAbertura
      ? (getCodigo(selectedAbertura.prefijo),
        getImg(selectedAbertura.variante[setTabSelected].img),
        getVariantKey(selectedAbertura.variante[setTabSelected].variantKey),
        getDescripcion(selectedAbertura.variante[setTabSelected].descripcion),
        setTagSelected(selectedAbertura.variante[setTabSelected].tab))
      : ''
    return () => {
      getDescripcion('')
      getCodigo('')
      getImg('')
      getVariantKey(setTabSelected)
    }
  }, [selectedAbertura])

  useEffect(() => {
    if (selectedAbertura) {
      const tabSelectData = selectedAbertura.variante.find(
        (item) => item.tab === tagSelected,
      )
      getImg(tabSelectData ? tabSelectData.img : '')
      getVariantKey(tabSelectData ? tabSelectData.variantKey : 0)
      getCodigo(selectedAbertura.prefijo)
      getDescripcion(tabSelectData ? tabSelectData.descripcion : '')
    }
  }, [tagSelected])

  return (
    <div>
      {selectedAbertura && selectedAbertura.variante.length > 1 && (
        <Tabs
          color='warning'
          fullWidth={true}
          selectedKey={tagSelected}
          onSelectionChange={(key) => setTagSelected(key as typeof tagSelected)}
        >
          {selectedAbertura?.variante.map((item) => (
            <Tab key={item.tab} title={item.tab} />
          ))}
        </Tabs>
      )}
    </div>
  )
}
