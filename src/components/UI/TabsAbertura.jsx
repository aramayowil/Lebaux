import { Tabs, Tab } from '@heroui/react'
import { use, useEffect, useState } from 'react'

export default function TabsAberturas({
  selectedAbertura,
  getDescripcion,
  getImg,
}) {
  const [tagSelected, setTagSelected] = useState('')

  const handleTagSelected = (event) => {
    setTagSelected(event)
  }

  const findImg = (tab) => {
    const tagWitchImg = selectedAbertura.variante.find(
      (item) => item.tab === tab
    )?.img
    if (tagWitchImg) {
      getImg(tagWitchImg)
    }
  }

  const findDescripcion = (tab) => {
    const tagWitchDescripcion = selectedAbertura.variante.find(
      (item) => item.tab === tab
    )?.descripcion
    if (tagWitchDescripcion) {
      getDescripcion(tagWitchDescripcion)
    }
  }

  useEffect(() => {
    getDescripcion(selectedAbertura.variante[0].descripcion)
    getImg(selectedAbertura.variante[0].img)
    findImg(tagSelected)
    findDescripcion(tagSelected)
    return () => {
      getDescripcion('')
      getImg('')
    }
  }, [tagSelected, selectedAbertura])

  return (
    <div>
      {selectedAbertura.variante.length > 1 && (
        <Tabs
          className="dark"
          color="warning"
          fullWidth={true}
          value={tagSelected}
          onSelectionChange={handleTagSelected}
        >
          {selectedAbertura.variante.map((item) => (
            <Tab key={item.tab} title={item.tab} />
          ))}
        </Tabs>
      )}
    </div>
  )
}
