import { Tabs, Tab } from '@heroui/react'
import { useEffect, useState } from 'react'

interface Linea {
  id: string
  abertura: string
  prefijo: string
  variante: {
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
}

export default function TabsAbertura({
  selectedAbertura,
  getDescripcion,
  getCodigo,
  getImg,
}: tabsProps) {
  const [tagSelected, setTagSelected] = useState('')

  const findImg = (tab: string) => {
    const tagWitchImg = selectedAbertura?.variante.find(
      (item) => item.tab === tab,
    )?.img
    if (tagWitchImg) {
      getImg(tagWitchImg)
    }
  }

  const findDescripcion = (tab: string) => {
    const tagWitchDescripcion = selectedAbertura?.variante.find(
      (item) => item.tab === tab,
    )?.descripcion
    if (tagWitchDescripcion) {
      getDescripcion(tagWitchDescripcion)
    }
  }

  useEffect(() => {
    selectedAbertura
      ? (getDescripcion(selectedAbertura.variante[0].descripcion),
        getCodigo(selectedAbertura.prefijo),
        findImg(tagSelected),
        findDescripcion(tagSelected),
        setTagSelected(selectedAbertura.variante[0].tab))
      : ''
    return () => {
      getDescripcion('')
      getCodigo('')
      getImg('')
    }
  }, [selectedAbertura])

  useEffect(() => {
    if (selectedAbertura) {
      const tabSelectData = selectedAbertura.variante.find(
        (item) => item.tab === tagSelected,
      )
      const newTab = tabSelectData?.tab || selectedAbertura.variante[0].tab
      setTagSelected(newTab)
      findImg(newTab)
      findDescripcion(newTab)
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
