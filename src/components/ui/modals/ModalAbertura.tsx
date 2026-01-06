import { catalogo } from '@/data'
import {
  Card,
  CardBody,
  ScrollShadow,
  Modal as ModalHeroUI,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  Form,
  addToast,
} from '@heroui/react'
import { useState, useRef, useEffect } from 'react'
import TabsAbertura from '../TabsAbertura'
import Abertura from '@/class/Abertura.class'
import useAberturasStore from '@/stores/useAberturasStore'
import ViewDesign, { ViewDesignHandle } from '@/components/ui/ViewDesign'
import SeccionAccesorios from '../inputs/SeccionAccesorios'
import PropiedadesAbertura from '../inputs/PropiedadesAbertura'
import SeccionDetalles from '../inputs/SeccionDetalles'
import SelectorCatalogo from '../inputs/SelectorCatalogo'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  aberturaKey: string
}

const INITIAL_FORM_STATE = {
  linea: 'modena',
  abertura: '',
  ancho: NaN,
  altura: NaN,
  color: 'blanco',
  vidrio: 'float4mm',
  cantidad: 1,
  precio: NaN,
  codigo: '',
  descripcion: '',
  mosquitero: { checked: false, precio: NaN },
  premarco: { checked: false, precio: NaN },
  imgSrc: '',
  variantKey: 0,
}

export default function ModalAbertura({
  isOpen,
  onClose,
  aberturaKey,
}: ModalProps) {
  const designRef = useRef<ViewDesignHandle>(null)
  const {
    aberturas,
    agregarAbertura: agregarAberturaStore,
    actualizarAbertura: actualizarAberturaStore,
  } = useAberturasStore()

  const [form, setForm] = useState(INITIAL_FORM_STATE)
  const isEditMode = aberturaKey.trim() !== ''

  useEffect(() => {
    if (isOpen) {
      if (isEditMode) {
        const aberturaToEdit = aberturas.find((a) => a.key === aberturaKey)
        if (aberturaToEdit) {
          setForm({
            linea: aberturaToEdit.linea,
            abertura: aberturaToEdit.type_aberturaID,
            ancho: aberturaToEdit.medidas.base,
            altura: aberturaToEdit.medidas.altura,
            color: aberturaToEdit.color,
            vidrio: aberturaToEdit.vidrio,
            cantidad: aberturaToEdit.cantidad,
            precio: aberturaToEdit.precio,
            codigo: aberturaToEdit.codigo,
            descripcion: aberturaToEdit.descripcion_abertura,
            mosquitero: {
              checked: (aberturaToEdit.accesorios.mosquitero || 0) > 0,
              precio: aberturaToEdit.accesorios.mosquitero || NaN,
            },
            premarco: {
              checked: (aberturaToEdit.accesorios.premarco || 0) > 0,
              precio: aberturaToEdit.accesorios.premarco || NaN,
            },
            imgSrc: aberturaToEdit.img,
            variantKey: aberturaToEdit.variantKey,
          })
        }
      } else {
        setForm(INITIAL_FORM_STATE)
      }
    }
  }, [isOpen, aberturaKey, aberturas, isEditMode])

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const cerrarModalYLimpiar = () => {
    onClose()
    setForm(INITIAL_FORM_STATE)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const capturedImage = designRef.current?.save()
    const data = catalogo[form.linea]?.find((i) => i.id === form.abertura)

    if (data) {
      const newAbertura = new Abertura(
        form.linea,
        data.id,
        data.abertura,
        form.descripcion,
        form.codigo,
        form.variantKey,
        { base: form.ancho, altura: form.altura },
        {
          mosquitero: form.mosquitero.checked ? form.mosquitero.precio : 0,
          premarco: form.premarco.checked ? form.premarco.precio : 0,
        },
        form.color,
        form.vidrio,
        form.imgSrc,
        capturedImage || form.imgSrc,
        form.cantidad,
        form.precio,
      )

      if (isEditMode) {
        actualizarAberturaStore(aberturaKey, newAbertura)
        addToast({ color: 'success', title: 'Abertura actualizada' })
      } else {
        agregarAberturaStore(newAbertura)
        addToast({ color: 'success', title: 'Abertura agregada' })
      }
      cerrarModalYLimpiar()
    }
  }

  const isDisabled = !form.linea || !form.abertura

  return (
    <ModalHeroUI
      size='4xl'
      isOpen={isOpen}
      onOpenChange={cerrarModalYLimpiar}
      scrollBehavior='inside'
      isDismissable={false}
      backdrop='opaque'
      classNames={{
        base: 'bg-[#18181b] border border-white/10 shadow-2xl max-h-[90vh]',
        header: 'border-b border-white/5',
        footer: 'border-t border-white/5',
        closeButton: 'hover:bg-white/10 active:bg-white/20 transition-colors',
      }}
    >
      <ModalContent>
        <Form
          onSubmit={onSubmit}
          validationBehavior='native'
          className='w-full flex flex-col items-stretch'
        >
          <ModalHeader className='justify-center uppercase text-tiny font-bold text-default-600'>
            {isEditMode ? 'Editar Abertura' : 'Agregar Abertura'}
          </ModalHeader>
          <ModalBody>
            <div className='flex flex-col md:flex-row gap-2 w-full '>
              <Card className='flex-1 bg-default-50/50 shadow-sm border-none'>
                <CardBody>
                  <ScrollShadow className='h-87.5' hideScrollBar>
                    <div className='grid grid-cols-6 gap-2'>
                      {/* Selección de linea y abertura */}
                      <SelectorCatalogo form={form} onChange={handleChange} />

                      <div className='col-span-6'>
                        {form.abertura && (
                          <TabsAbertura
                            selectedAbertura={catalogo[form.linea].find(
                              (i) => i.id === form.abertura,
                            )}
                            getDescripcion={(v) =>
                              handleChange('descripcion', v)
                            }
                            getCodigo={(v) => handleChange('codigo', v)}
                            getImg={(v) => handleChange('imgSrc', v)}
                            getVariantKey={(v) => handleChange('variantKey', v)}
                            setTabSelected={form.variantKey}
                          />
                        )}
                      </div>

                      <Divider className='col-span-6 mb-2' />

                      <PropiedadesAbertura
                        form={form}
                        onChange={handleChange}
                        isDisabled={isDisabled}
                      />

                      <Divider className='col-span-6 my-2' />

                      <SeccionAccesorios
                        form={form}
                        onChange={handleChange}
                        isDisabled={isDisabled}
                      />

                      <SeccionDetalles
                        form={form}
                        onChange={handleChange}
                        isDisabled={isDisabled}
                      />
                    </div>
                  </ScrollShadow>
                </CardBody>
              </Card>

              <ViewDesign
                ref={designRef}
                width={form.ancho || 0}
                height={form.altura || 0}
                imgSrc={form.imgSrc}
              />
            </div>
          </ModalBody>
          <ModalFooter className='flex justify-end items-center gap-3'>
            <Button
              variant='flat'
              color='default'
              onPress={cerrarModalYLimpiar}
            >
              Cancelar
            </Button>
            <Button color='warning' type='submit' className='font-medium'>
              {isEditMode ? 'Guardar Cambios' : 'Guardar Abertura'}
            </Button>
          </ModalFooter>
        </Form>
      </ModalContent>
    </ModalHeroUI>
  )
}
