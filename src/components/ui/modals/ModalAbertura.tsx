import { useState, useRef, useEffect } from 'react'
import {
  Modal as ModalHeroUI,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  addToast,
  ScrollShadow,
  Select,
  SelectItem,
  NumberInput,
} from '@heroui/react'

// --- ICONOS ---
import {
  LuLayoutGrid,
  LuSettings,
  LuSave,
  LuLayers,
  LuTruck,
} from 'react-icons/lu'
import { HiAdjustments, HiCheckCircle, HiX } from 'react-icons/hi'
import { RxWidth, RxHeight } from 'react-icons/rx'
import { MdAttachMoney } from 'react-icons/md'

// --- DATA Y CLASES ---
import { catalogo } from '@/data'
import { lineas } from '@/models/ILineas'
import Abertura from '@/class/Abertura.class'
import useAberturasStore from '@/stores/useAberturasStore'
import { colors } from '@/models/IColors'
import { vidrios } from '@/models/IVidrios'

// --- COMPONENTES AUXILIARES ---
import TabsAbertura from '../TabsAbertura'
import ViewDesign, { ViewDesignHandle } from '@/components/ui/ViewDesign'
import SeccionAccesorios from '../inputs/SeccionAccesorios'
import SeccionDetalles from '../inputs/SeccionDetalles'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  aberturaKey: string
}

const INITIAL_FORM_STATE = {
  linea: 'modena',
  abertura_id: '',
  ancho: NaN,
  altura: NaN,
  color: 'blanco',
  vidrio: 'float4mm',
  cantidad: 1,
  precio: NaN,
  colocacion: NaN,
  codigo: '',
  descripcion: '',
  mosquitero: { checked: false, precio: NaN },
  premarco: { checked: false, precio: NaN },
  persiana: { checked: false, precio: NaN },
  imgSrc: '',
  variantKey: 0,
}

export default function ModalAbertura({
  isOpen,
  onClose,
  aberturaKey,
}: ModalProps) {
  const designRef = useRef<ViewDesignHandle>(null)
  const { aberturas, agregarAbertura, actualizarAbertura } = useAberturasStore()

  const [form, setForm] = useState(INITIAL_FORM_STATE)
  const isEditMode = aberturaKey.trim() !== ''

  // --- EFECTOS ---
  useEffect(() => {
    if (isOpen) {
      if (isEditMode) {
        const editItem = aberturas.find((a) => a.key === aberturaKey)
        if (editItem) {
          setForm({
            linea: editItem.linea,
            abertura_id: editItem.abertura_id,
            ancho: editItem.medidas.base,
            altura: editItem.medidas.altura,
            color: editItem.color,
            vidrio: editItem.vidrio,
            cantidad: editItem.cantidad,
            precio: editItem.precio,
            colocacion: editItem.precioColocacion || 0,
            codigo: editItem.cod_abertura,
            descripcion: editItem.descripcion_abertura,
            mosquitero: {
              checked: (editItem.accesorios.mosquitero || 0) > 0,
              precio: editItem.accesorios.mosquitero || NaN,
            },
            premarco: {
              checked: (editItem.accesorios.premarco || 0) > 0,
              precio: editItem.accesorios.premarco || NaN,
            },
            persiana: {
              checked: (editItem.accesorios.persiana || 0) > 0,
              precio: editItem.accesorios.persiana || NaN,
            },
            imgSrc: editItem.img,
            variantKey: editItem.variantKey,
          })
        }
      } else {
        setForm(INITIAL_FORM_STATE)
      }
    }
  }, [isOpen, aberturaKey, aberturas, isEditMode])

  // --- MANEJADORES ---
  const handleChange = (field: string, value: any) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value }
      if (field === 'linea') next.abertura_id = ''
      return next
    })
  }

  const incrementarCant = () =>
    handleChange('cantidad', (form.cantidad || 0) + 1)
  const decrementarCant = () =>
    form.cantidad > 1 && handleChange('cantidad', form.cantidad - 1)

  const handleGuardar = () => {
    const capturedImage = designRef.current?.save()
    const data = catalogo[form.linea]?.find((i) => i.id === form.abertura_id)

    if (data) {
      const item = new Abertura(
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
          persiana: form.persiana.checked ? form.persiana.precio : 0,
        },
        form.color,
        form.vidrio,
        form.imgSrc,
        capturedImage || form.imgSrc,
        Number.isNaN(form.colocacion) ? 0 : form.colocacion,
        form.cantidad,
        form.precio,
        totalFinal,
      )

      if (isEditMode) {
        actualizarAbertura(aberturaKey, item)
        addToast({ color: 'success', title: 'Registro actualizado' })
      } else {
        agregarAbertura(item)
        addToast({ color: 'success', title: 'Registro guardado' })
      }
      onClose()
      setForm(INITIAL_FORM_STATE)
    }
  }

  const isDisabled = !form.linea || !form.abertura_id

  const isDisabledGuardar =
    !form.linea ||
    !form.abertura_id ||
    !form.altura ||
    !form.ancho ||
    !form.precio
  const totalUnitario =
    (form.precio || 0) +
    (form.colocacion || 0) +
    (form.mosquitero.checked ? form.mosquitero.precio : 0) +
    (form.persiana.checked ? form.persiana.precio : 0) +
    (form.premarco.checked ? form.premarco.precio : 0)
  const totalFinal = totalUnitario * (form.cantidad || 1)

  // Efecto para autoseleccionar datos cuando solo hay una variante
  // Efecto para autoseleccionar datos cuando solo hay una variante
  useEffect(() => {
    if (form.linea && form.abertura_id) {
      const itemEnCatalogo = catalogo[form.linea]?.find(
        (i) => i.id === form.abertura_id,
      )

      const variantes = itemEnCatalogo?.variantes || []

      if (itemEnCatalogo && variantes.length === 1) {
        const unicaVariante = variantes[0]

        setForm((prev) => ({
          ...prev,
          descripcion: unicaVariante.descripcion || itemEnCatalogo.abertura,
          imgSrc: unicaVariante.img || '',
          codigo: itemEnCatalogo.prefijo || '',
          variantKey: 0,
        }))
      }
    }
  }, [form.abertura_id, form.linea])

  return (
    <ModalHeroUI
      isOpen={isOpen}
      onOpenChange={onClose}
      size='full'
      classNames={{ base: 'bg-[#0c0c0e]' }}
      hideCloseButton
    >
      <ModalContent>
        {/* --- HEADER: COMPOSICIÓN TÉCNICA --- */}
        <ModalHeader className='p-0 shrink-0 border-none'>
          <div className='h-16 w-full flex justify-between items-center px-10 border-b border-zinc-800/50 bg-black/40 backdrop-blur-md z-50'>
            <div className='flex items-center gap-4'>
              <HiAdjustments className='text-zinc-500' size={22} />
              <h2 className='text-xs font-bold tracking-widest text-zinc-200 uppercase'>
                Composición Técnica
              </h2>
              {isEditMode && (
                <div className='flex items-center gap-1 text-[9px] text-warning font-bold animate-pulse'>
                  <HiCheckCircle size={14} /> MODO EDICIÓN
                </div>
              )}
            </div>

            <div className='flex items-center gap-6'>
              {/* SELECT COLOR */}
              <div className='flex flex-col gap-1'>
                <span className='text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em] leading-none ml-1'>
                  Color de Pintado
                </span>
                <Select
                  size='sm'
                  variant='bordered'
                  aria-label='Seleccionar color de pintado'
                  className='w-40'
                  disallowEmptySelection
                  selectedKeys={[form.color]}
                  onSelectionChange={(keys) =>
                    handleChange('color', Array.from(keys)[0])
                  }
                  classNames={{
                    trigger: 'h-8 border-zinc-800 bg-zinc-900/50',
                    value: 'text-[10px] font-black uppercase text-zinc-200',
                  }}
                >
                  {colors.map((c) => (
                    <SelectItem key={c.key} textValue={c.label}>
                      <div className='flex items-center gap-2'>
                        <div
                          className={`w-2 h-2 rounded-full border border-white/10 ${c.key === 'blanco' ? 'bg-white' : c.key === 'negro' ? 'bg-black' : 'bg-zinc-500'}`}
                        />
                        <span className='text-[10px] font-bold uppercase text-zinc-300'>
                          {c.label}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </Select>
              </div>

              {/* SELECT VIDRIO */}
              <div className='flex flex-col gap-1'>
                <span className='text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em] leading-none ml-1'>
                  Configuración Vidrio
                </span>
                <Select
                  size='sm'
                  variant='bordered'
                  aria-label='Seleccionar configuración de vidrio'
                  className='w-44'
                  disallowEmptySelection
                  selectedKeys={[form.vidrio]}
                  startContent={
                    <LuLayers className='text-zinc-500' size={14} />
                  }
                  onSelectionChange={(keys) =>
                    handleChange('vidrio', Array.from(keys)[0])
                  }
                  classNames={{
                    trigger: 'h-8 border-zinc-800 bg-zinc-900/50',
                    value: 'text-[10px] font-black uppercase text-zinc-200',
                  }}
                >
                  {vidrios.map((v) => (
                    <SelectItem
                      key={v.key}
                      textValue={v.label}
                      className='text-[10px] uppercase font-bold text-zinc-300'
                    >
                      {v.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <Divider orientation='vertical' className='h-8 bg-zinc-800' />

              <div className='flex items-center gap-3'>
                <Button
                  isIconOnly
                  variant='flat'
                  className='bg-zinc-900 text-zinc-500 hover:text-danger'
                  onPress={onClose}
                >
                  <HiX size={20} />
                </Button>
              </div>
            </div>
          </div>
        </ModalHeader>

        {/* --- BODY: 3 COLUMNAS --- */}
        <ModalBody className='flex flex-row overflow-hidden p-0'>
          {/* COL 1: CONFIGURACIÓN DE CATÁLOGO */}
          <div className='w-[30%] border-r border-zinc-800/50 bg-[#0c0c0e] flex flex-col'>
            <ScrollShadow className='flex-1 px-8 py-8'>
              <div className='space-y-6'>
                <section className='space-y-4'>
                  <div className='flex items-center gap-2 mb-2 text-zinc-500'>
                    <LuLayoutGrid size={18} />
                    <h3 className='text-[11px] font-black uppercase tracking-[2px]'>
                      Línea y Modelo
                    </h3>
                  </div>

                  {/* SELECTORES DE CATÁLOGO INTEGRADOS */}
                  <div className='flex flex-col gap-3'>
                    <Select
                      label='Línea de Carpintería'
                      variant='bordered'
                      isRequired
                      selectedKeys={form.linea ? [form.linea] : []}
                      onSelectionChange={(keys) =>
                        handleChange('linea', Array.from(keys)[0]?.toString())
                      }
                      classNames={{
                        trigger: 'border-zinc-800 bg-zinc-900/50',
                        label: 'text-zinc-500',
                      }}
                    >
                      {lineas.map((i) => (
                        <SelectItem key={i.key} textValue={i.label}>
                          {i.label}
                        </SelectItem>
                      ))}
                    </Select>

                    <Select
                      label='Tipo de abertura'
                      variant='bordered'
                      isRequired
                      isDisabled={!form.linea}
                      selectedKeys={form.abertura_id ? [form.abertura_id] : []}
                      onSelectionChange={(keys) =>
                        handleChange(
                          'abertura_id',
                          Array.from(keys)[0]?.toString(),
                        )
                      }
                      classNames={{
                        trigger: 'border-zinc-800 bg-zinc-900/50',
                        label: 'text-zinc-500',
                      }}
                    >
                      {(catalogo[form.linea] || []).map((i) => (
                        <SelectItem key={i.id} textValue={i.abertura}>
                          {i.abertura}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  {form.abertura_id &&
                    (catalogo[form.linea]?.find(
                      (i) => i.id === form.abertura_id,
                    )?.variantes?.length || 0) > 1 && (
                      <div className='mt-6 p-1 bg-zinc-900/30 rounded-xl border border-zinc-800'>
                        <TabsAbertura
                          selectedAbertura={catalogo[form.linea].find(
                            (i) => i.id === form.abertura_id,
                          )}
                          getDescripcion={(v) => handleChange('descripcion', v)}
                          getCodigo={(v) => handleChange('codigo', v)}
                          getImg={(v) => handleChange('imgSrc', v)}
                          getVariantKey={(v) => handleChange('variantKey', v)}
                          setTabSelected={form.variantKey}
                        />
                      </div>
                    )}
                </section>

                <Divider className='bg-zinc-800/50' />

                <section className='space-y-6'>
                  <div className='flex items-center gap-2 mb-4 text-zinc-500'>
                    <LuSettings size={18} />
                    <h3 className='text-[11px] font-black uppercase tracking-[2px]'>
                      Geometría
                    </h3>
                  </div>
                  <div className='grid grid-cols-2 gap-2'>
                    <NumberInput
                      label='ANCHO'
                      variant='bordered'
                      value={form.ancho}
                      minValue={0}
                      isDisabled={isDisabled}
                      onValueChange={(v) => handleChange('ancho', v)}
                      startContent={
                        <RxWidth size={20} className='text-warning' />
                      }
                      classNames={{
                        inputWrapper: 'border-zinc-800 bg-zinc-900/50 h-14',
                      }}
                    />
                    <NumberInput
                      label='ALTURA'
                      variant='bordered'
                      minValue={0}
                      value={form.altura}
                      isDisabled={isDisabled}
                      onValueChange={(v) => handleChange('altura', v)}
                      startContent={
                        <RxHeight size={20} className='text-warning' />
                      }
                      classNames={{
                        inputWrapper: 'border-zinc-800 bg-zinc-900/50 h-14',
                      }}
                    />
                  </div>
                </section>
              </div>
            </ScrollShadow>
          </div>

          {/* COL 2: PREVIEW CENTRAL */}
          <div className='w-[40%] bg-black relative flex items-center justify-center p-12'>
            <div
              className='absolute inset-0 opacity-5 pointer-events-none'
              style={{
                backgroundImage:
                  'radial-gradient(#ffffff 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <ViewDesign
              key={`${form.abertura_id}-${form.variantKey}`}
              ref={designRef}
              width={form.ancho || 0}
              height={form.altura || 0}
              imgSrc={form.imgSrc}
            />
          </div>

          {/* COL 3: ADICIONALES Y SERVICIOS */}
          <div className='w-[30%] bg-[#0c0c0e] border-l border-zinc-800/50 flex flex-col'>
            <ScrollShadow className='flex-1 px-6 py-6'>
              <div className='space-y-4'>
                {/* NUEVA SECCIÓN: PRECIO UNITARIO */}
                <section className='p-5 rounded-2xl bg-success/5 border border-success/20 mb-4'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='p-2 rounded-lg bg-success/10 text-success'>
                      <MdAttachMoney size={20} />
                    </div>
                    <h3 className='text-[10px] font-black uppercase tracking-[2px] text-zinc-100'>
                      Valor de Fabricación
                    </h3>
                  </div>
                  <NumberInput
                    label='PRECIO UNITARIO'
                    aria-label='Precio unitario de la abertura'
                    labelPlacement='outside'
                    variant='bordered'
                    minValue={0}
                    value={form.precio}
                    isDisabled={isDisabled}
                    onValueChange={(v) => handleChange('precio', v)}
                    startContent={
                      <span className='text-success font-bold'>$</span>
                    }
                    classNames={{
                      label: 'text-[10px] font-bold text-zinc-400 mb-2',
                      inputWrapper: 'border-zinc-800 bg-zinc-900/50 h-12',
                      input: 'text-xl font-black text-zinc-100',
                    }}
                  />
                </section>
                {/* SECCIÓN: SERVICIO DE INSTALACIÓN */}
                <section className='p-5 rounded-2xl bg-zinc-900/20 border border-zinc-800/50'>
                  <div className='flex items-center gap-3 mb-5'>
                    <div className='p-2 rounded-lg bg-warning/10 text-warning'>
                      <LuTruck size={20} />
                    </div>
                    <div>
                      <h3 className='text-[10px] font-black uppercase tracking-[3px] text-zinc-100'>
                        Servicio
                      </h3>
                      <p className='text-[9px] text-zinc-500 font-bold uppercase'>
                        Instalación y Logística
                      </p>
                    </div>
                  </div>

                  <NumberInput
                    label='COSTO DE COLOCACIÓN'
                    aria-label='Costo por servicio de colocación'
                    labelPlacement='outside'
                    placeholder='0.00'
                    minValue={0}
                    variant='bordered'
                    value={form.colocacion}
                    onValueChange={(v) => handleChange('colocacion', v)}
                    startContent={
                      <span className='text-zinc-500 font-bold'>$</span>
                    }
                    classNames={{
                      label: 'text-[10px] font-bold text-zinc-400 mb-2',
                      inputWrapper:
                        'border-zinc-800 bg-zinc-900/50 h-12 hover:border-zinc-600 transition-colors',
                      input: 'font-mono',
                    }}
                  />
                </section>

                <div className='px-2'>
                  <Divider className='bg-zinc-800/30' />
                </div>

                {/* SECCIÓN: COMPLEMENTOS (Accesorios) */}
                <section className='px-2'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='p-2 rounded-lg bg-blue-500/10 text-blue-400'>
                      <LuSettings size={20} />
                    </div>
                    <h3 className='text-[10px] font-black uppercase tracking-[3px] text-zinc-100'>
                      Complementos
                    </h3>
                  </div>

                  <div className='space-y-4'>
                    <SeccionAccesorios
                      form={form}
                      onChange={handleChange}
                      isDisabled={isDisabled}
                    />
                  </div>
                </section>

                <div className='px-2'>
                  <Divider className='bg-zinc-800/30' />
                </div>

                {/* SECCIÓN: ESPECIFICACIONES (Detalles) */}
                <section className='px-2'>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='p-2 rounded-lg bg-purple-500/10 text-purple-400'>
                      <LuLayers size={20} />
                    </div>
                    <h3 className='text-[10px] font-black uppercase tracking-[3px] text-zinc-100'>
                      Especificaciones
                    </h3>
                  </div>

                  <div className='bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/50'>
                    <SeccionDetalles
                      form={form}
                      onChange={handleChange}
                      isDisabled={isDisabled}
                    />
                  </div>
                </section>
              </div>
            </ScrollShadow>
          </div>
        </ModalBody>

        {/* --- FOOTER: RESUMEN --- */}
        <ModalFooter className='h-24 border-t border-zinc-800/50 bg-black/60 px-10 flex justify-between items-center shrink-0'>
          <div className='flex gap-12 items-center'>
            <div className='flex flex-col gap-1'>
              <span className='text-[10px] text-zinc-500 font-bold uppercase tracking-widest'>
                Cantidad
              </span>
              <div className='flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-1 rounded-xl'>
                <Button
                  isIconOnly
                  size='sm'
                  variant='light'
                  className='text-zinc-400 font-bold'
                  aria-label='Decrementar cantidad'
                  onPress={decrementarCant}
                >
                  -
                </Button>
                <span className='text-zinc-200 font-mono font-bold w-6 text-center'>
                  {form.cantidad}
                </span>
                <Button
                  isIconOnly
                  size='sm'
                  variant='light'
                  className='text-zinc-400 font-bold'
                  aria-label='Incrementar cantidad'
                  onPress={incrementarCant}
                >
                  +
                </Button>
              </div>
            </div>
            <div className='flex flex-col'>
              <span className='text-[10px] text-zinc-500 uppercase font-bold tracking-widest'>
                Total Estimado
              </span>
              <span className='text-3xl font-black text-warning'>
                $ {totalFinal.toLocaleString('es-AR')}
              </span>
            </div>
          </div>

          <div className='flex gap-3'>
            <Button
              variant='light'
              className='text-zinc-500 font-bold text-[10px]'
              onPress={onClose}
            >
              DESCARTAR
            </Button>
            <Button
              color='warning'
              onPress={handleGuardar}
              isDisabled={isDisabledGuardar}
              className='bg-warning hover:bg-warning-400 text-black font-black px-10 h-12 rounded-2xl shadow-lg text-xs'
              endContent={<LuSave size={18} />}
            >
              {isEditMode ? 'ACTUALIZAR REGISTRO' : 'FINALIZAR COMPOSICIÓN'}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </ModalHeroUI>
  )
}
