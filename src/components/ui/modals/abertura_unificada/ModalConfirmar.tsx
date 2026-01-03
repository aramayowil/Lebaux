import { useEffect, useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Accordion,
  AccordionItem,
  Chip,
  Divider,
  Select,
  SelectItem,
  Input,
} from '@heroui/react'
import {
  HiOutlineDatabase,
  HiOutlineCube,
  HiOutlineTag,
  HiOutlineColorSwatch,
  HiOutlineSparkles, // Icono para Vidrio
} from 'react-icons/hi'
import { SiGitforwindows } from 'react-icons/si'
import ViewDesignCompuesto from './ViewDesignCompuesto'
import { colors } from '@/models/IColors'
import { vidrios } from '@/models/IVidrios'

// --- INTERFACES ---
interface Modulo {
  id: string
  x: number
  y: number
  linea: string
  abertura: string
  descripcion: string
  ancho: number
  alto: number
  imgSrc: string
  color: string
  vidrio: string
  cantidad: number
  precio: number
  mosquitero: { checked: boolean; precio: number }
  premarco: { checked: boolean; precio: number }
}

const STORAGE_KEY = 'diseno_modulos_compuesta'

export default function ModalResumenDiseno() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [datos, setDatos] = useState<Modulo[]>([])

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setDatos(JSON.parse(saved))
    }
  }, [isOpen])

  const actualizarModulo = (id: string, campo: keyof Modulo, valor: any) => {
    const nuevosDatos = datos.map((mod) => {
      if (mod.id === id) {
        return { ...mod, [campo]: valor }
      }
      return mod
    })
    setDatos(nuevosDatos)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevosDatos))
  }

  const totalGeneral = datos.reduce((acc, mod) => {
    const subtotal =
      (mod.precio +
        (mod.mosquitero.checked ? mod.mosquitero.precio : 0) +
        (mod.premarco.checked ? mod.premarco.precio : 0)) *
      mod.cantidad
    return acc + subtotal
  }, 0)

  return (
    <>
      <Button
        onPress={onOpen}
        color='primary'
        variant='shadow'
        className='font-bold'
      >
        Ver Resumen de Composición
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size='5xl'
        scrollBehavior='inside'
      >
        <ModalContent className='bg-[#0c0c0e] text-zinc-100 border border-zinc-800'>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1 border-b border-zinc-800'>
                <div className='flex items-center gap-2'>
                  <HiOutlineCube className='text-blue-500' size={24} />
                  <span className='text-xl font-bold'>
                    Resumen Técnico de Composición
                  </span>
                </div>
              </ModalHeader>

              <ModalBody className='p-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 h-137.5'>
                  {/* COLUMNA 1: LISTADO EDITABLE */}
                  <div className='flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar'>
                    <div className='flex items-center justify-between text-zinc-400 mb-2'>
                      <div className='flex items-center gap-2'>
                        <HiOutlineDatabase size={14} />
                        <span className='text-[10px] font-bold uppercase tracking-widest'>
                          Configuración Detallada
                        </span>
                      </div>
                    </div>

                    {datos.length === 0 ? (
                      <div className='text-zinc-600 italic text-center py-10'>
                        No hay módulos guardados.
                      </div>
                    ) : (
                      datos.map((mod, index) => (
                        <Accordion
                          key={mod.id || index}
                          variant='splitted'
                          isCompact
                          className='px-0'
                        >
                          <AccordionItem
                            aria-label={mod.abertura}
                            title={
                              <div className='flex flex-col'>
                                <span className='text-sm font-bold text-zinc-200'>
                                  {mod.descripcion}
                                </span>
                                <span className='text-[10px] text-zinc-500 uppercase'>
                                  {mod.linea} • {mod.ancho} x {mod.alto} mm
                                </span>
                              </div>
                            }
                            startContent={
                              <div className='p-2 bg-blue-500/10 rounded-lg text-blue-400'>
                                <HiOutlineCube size={18} />
                              </div>
                            }
                            className='bg-zinc-900/40 border border-zinc-800/50 mb-2 overflow-hidden'
                          >
                            <div className='flex flex-col gap-4 pb-4 px-1'>
                              <Divider className='bg-zinc-800/50' />

                              {/* SELECTS E INPUTS CON ICONOS */}
                              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                                <Select
                                  label='Color del Perfil'
                                  placeholder='Selecciona color'
                                  size='sm'
                                  variant='flat'
                                  startContent={
                                    <HiOutlineColorSwatch className='text-blue-500' />
                                  }
                                  disallowEmptySelection
                                  selectedKeys={mod.color ? [mod.color] : []}
                                  onSelectionChange={(keys) =>
                                    actualizarModulo(
                                      mod.id,
                                      'color',
                                      Array.from(keys)[0], // Tomamos el primer (y único) valor del Set
                                    )
                                  }
                                >
                                  {colors.map((color) => (
                                    <SelectItem key={color.key}>
                                      {color.label}
                                    </SelectItem>
                                  ))}
                                </Select>

                                <Select
                                  label='Tipo de Vidrio'
                                  placeholder='Selecciona vidrio'
                                  size='sm'
                                  variant='flat'
                                  disallowEmptySelection
                                  startContent={
                                    <HiOutlineSparkles className='text-cyan-400' />
                                  }
                                  selectedKeys={mod.vidrio ? [mod.vidrio] : []}
                                  onSelectionChange={(keys) =>
                                    actualizarModulo(
                                      mod.id,
                                      'vidrio',
                                      Array.from(keys)[0],
                                    )
                                  }
                                >
                                  {vidrios.map((vidrio) => (
                                    <SelectItem key={vidrio.key}>
                                      {vidrio.label}
                                    </SelectItem>
                                  ))}
                                </Select>

                                <Input
                                  type='number'
                                  label='Precio Unitario'
                                  size='sm'
                                  variant='flat'
                                  startContent={
                                    <HiOutlineTag className='text-emerald-500' />
                                  }
                                  value={mod.precio.toString()}
                                  onValueChange={(val) =>
                                    actualizarModulo(
                                      mod.id,
                                      'precio',
                                      Number(val),
                                    )
                                  }
                                />

                                <div className='flex items-center gap-3 px-3 bg-white/5 rounded-xl border border-white/10'>
                                  <SiGitforwindows className='text-zinc-500' />
                                  <div className='flex flex-col'>
                                    <span className='text-[10px] text-zinc-500 uppercase font-bold'>
                                      Medidas
                                    </span>
                                    <span className='text-sm font-mono text-zinc-300'>
                                      {mod.ancho}x{mod.alto} mm
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* ADICIONALES */}
                              <div className='flex flex-wrap gap-2'>
                                <Chip
                                  size='sm'
                                  variant='dot'
                                  color={
                                    mod.mosquitero.checked
                                      ? 'success'
                                      : 'default'
                                  }
                                  className={`cursor-pointer transition-opacity ${!mod.mosquitero.checked && 'opacity-40'}`}
                                  onClick={() =>
                                    actualizarModulo(mod.id, 'mosquitero', {
                                      ...mod.mosquitero,
                                      checked: !mod.mosquitero.checked,
                                    })
                                  }
                                >
                                  Mosquitero{' '}
                                  {mod.mosquitero.checked &&
                                    `+$${mod.mosquitero.precio}`}
                                </Chip>

                                <Chip
                                  size='sm'
                                  variant='dot'
                                  color={
                                    mod.premarco.checked ? 'primary' : 'default'
                                  }
                                  className={`cursor-pointer transition-opacity ${!mod.premarco.checked && 'opacity-40'}`}
                                  onClick={() =>
                                    actualizarModulo(mod.id, 'premarco', {
                                      ...mod.premarco,
                                      checked: !mod.premarco.checked,
                                    })
                                  }
                                >
                                  Premarco{' '}
                                  {mod.premarco.checked &&
                                    `+$${mod.premarco.precio}`}
                                </Chip>

                                <Chip
                                  size='sm'
                                  variant='flat'
                                  className='ml-auto bg-zinc-800 text-zinc-300'
                                >
                                  Cant: {mod.cantidad}
                                </Chip>
                              </div>

                              <div className='bg-blue-600/10 p-3 rounded-xl flex justify-between items-center border border-blue-500/20'>
                                <span className='text-[10px] text-blue-400 font-bold uppercase tracking-widest'>
                                  Subtotal Item
                                </span>
                                <span className='text-md font-bold text-blue-400'>
                                  ${' '}
                                  {(
                                    (mod.precio +
                                      (mod.mosquitero.checked
                                        ? mod.mosquitero.precio
                                        : 0) +
                                      (mod.premarco.checked
                                        ? mod.premarco.precio
                                        : 0)) *
                                    mod.cantidad
                                  ).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </AccordionItem>
                        </Accordion>
                      ))
                    )}
                  </div>

                  {/* COLUMNA 2: VISUALIZACIÓN */}
                  <div className='bg-black/40 rounded-2xl border border-zinc-800 flex flex-col items-center justify-center overflow-hidden'>
                    <ViewDesignCompuesto datos={datos} />
                  </div>
                </div>
              </ModalBody>

              <ModalFooter className='border-t border-zinc-800 flex justify-between items-center bg-zinc-900/20'>
                <div className='flex flex-col'>
                  <span className='text-[10px] text-zinc-500 uppercase font-bold tracking-widest'>
                    Total Estimado
                  </span>
                  <span className='text-3xl font-black text-emerald-400'>
                    $ {totalGeneral.toLocaleString()}
                  </span>
                </div>
                <div className='flex gap-3'>
                  <Button
                    variant='light'
                    onPress={onClose}
                    className='text-zinc-400 font-medium'
                  >
                    Cerrar
                  </Button>
                  <Button
                    color='primary'
                    className='font-bold px-8'
                    variant='shadow'
                  >
                    Confirmar y Exportar
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
