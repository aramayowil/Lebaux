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
  HiOutlineSparkles,
} from 'react-icons/hi'
import { SiGitforwindows } from 'react-icons/si'
import ViewDesignCompuesto from './ViewDesignCompuesto'
import { colors } from '@/models/IColors'
import { vidrios } from '@/models/IVidrios'
import Abertura_Compuesta from '@/class/Abertura_Compuesta.class'

// --- INTERFACES ACTUALIZADAS ---
interface Modulo {
  id: string
  x: number
  y: number
  abertura: {
    linea: string
    abertura: string
    descripcion: string
    ancho: number
    altura: number
    imgSrc: string
    color: string
    vidrio: string
    cantidad: number
    precio: number
    mosquitero: { checked: boolean; precio: number }
    premarco: { checked: boolean; precio: number }
  }
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

  // --- MANEJADORES CORREGIDOS ---

  const actualizarModulo = (id: string, campo: string, valor: any) => {
    const nuevosDatos = datos.map((mod) => {
      if (mod.id === id) {
        // Actualizamos dentro del objeto anidado 'abertura'
        return {
          ...mod,
          abertura: { ...mod.abertura, [campo]: valor },
        }
      }
      return mod
    })
    setDatos(nuevosDatos)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevosDatos))
  }

  const totalGeneral = datos.reduce((acc, mod) => {
    const ab = mod.abertura
    const subtotal =
      (ab.precio +
        (ab.mosquitero.checked ? ab.mosquitero.precio : 0) +
        (ab.premarco.checked ? ab.premarco.precio : 0)) *
      ab.cantidad
    return acc + (subtotal || 0)
  }, 0)

  const createAberturaCompuesta = () => {
    if (datos.length === 0) return

    const anchoTotal = Math.max(...datos.map((m) => m.x + m.abertura.ancho))
    const alturaTotal = Math.max(...datos.map((m) => m.y + m.abertura.altura))

    const nuevaAberturaCompuesta = new Abertura_Compuesta(
      'Abertura compuesta',
      `Composición de ${datos.length} módulos`,
      `COMP-${Date.now()}`,
      { base: anchoTotal, altura: alturaTotal },
      '',
      '',
      {
        aberturas: datos as any,
        x: anchoTotal,
        y: alturaTotal,
      },
      1,
      totalGeneral,
    )

    alert('¡Composición generada con éxito!')
  }

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
                        No hay módulos.
                      </div>
                    ) : (
                      datos.map((mod) => (
                        <Accordion
                          key={mod.id}
                          variant='splitted'
                          isCompact
                          className='px-0'
                        >
                          <AccordionItem
                            title={
                              <div className='flex flex-col'>
                                <span className='text-sm font-bold text-zinc-200'>
                                  {mod.abertura.descripcion}
                                </span>
                                <span className='text-[10px] text-zinc-500 uppercase'>
                                  {mod.abertura.linea} • {mod.abertura.ancho} x{' '}
                                  {mod.abertura.altura} mm
                                </span>
                              </div>
                            }
                            startContent={
                              <div className='p-2 bg-blue-500/10 rounded-lg text-blue-400'>
                                <HiOutlineCube size={18} />
                              </div>
                            }
                            className='bg-zinc-900/40 border border-zinc-800/50 mb-2'
                          >
                            <div className='flex flex-col gap-4 pb-4 px-1'>
                              <Divider className='bg-zinc-800/50' />

                              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                                <Select
                                  label='Color'
                                  size='sm'
                                  startContent={
                                    <HiOutlineColorSwatch className='text-blue-500' />
                                  }
                                  selectedKeys={[mod.abertura.color]}
                                  onSelectionChange={(keys) =>
                                    actualizarModulo(
                                      mod.id,
                                      'color',
                                      Array.from(keys)[0],
                                    )
                                  }
                                >
                                  {colors.map((c) => (
                                    <SelectItem key={c.key}>
                                      {c.label}
                                    </SelectItem>
                                  ))}
                                </Select>

                                <Select
                                  label='Vidrio'
                                  size='sm'
                                  startContent={
                                    <HiOutlineSparkles className='text-cyan-400' />
                                  }
                                  selectedKeys={[mod.abertura.vidrio]}
                                  onSelectionChange={(keys) =>
                                    actualizarModulo(
                                      mod.id,
                                      'vidrio',
                                      Array.from(keys)[0],
                                    )
                                  }
                                >
                                  {vidrios.map((v) => (
                                    <SelectItem key={v.key}>
                                      {v.label}
                                    </SelectItem>
                                  ))}
                                </Select>

                                <Input
                                  type='number'
                                  label='Precio Unitario'
                                  size='sm'
                                  startContent={
                                    <HiOutlineTag className='text-emerald-500' />
                                  }
                                  value={mod.abertura.precio.toString()}
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
                                      {mod.abertura.ancho}x{mod.abertura.altura}
                                      mm
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className='flex flex-wrap gap-2'>
                                <Chip
                                  size='sm'
                                  variant='dot'
                                  color={
                                    mod.abertura.mosquitero.checked
                                      ? 'success'
                                      : 'default'
                                  }
                                  className='cursor-pointer'
                                  onClick={() =>
                                    actualizarModulo(mod.id, 'mosquitero', {
                                      ...mod.abertura.mosquitero,
                                      checked: !mod.abertura.mosquitero.checked,
                                    })
                                  }
                                >
                                  Mosquitero
                                </Chip>
                                <Chip
                                  size='sm'
                                  variant='dot'
                                  color={
                                    mod.abertura.premarco.checked
                                      ? 'primary'
                                      : 'default'
                                  }
                                  className='cursor-pointer'
                                  onClick={() =>
                                    actualizarModulo(mod.id, 'premarco', {
                                      ...mod.abertura.premarco,
                                      checked: !mod.abertura.premarco.checked,
                                    })
                                  }
                                >
                                  Premarco
                                </Chip>
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
                    className='text-zinc-400'
                  >
                    Cerrar
                  </Button>
                  <Button
                    color='primary'
                    className='font-bold px-8'
                    onPress={createAberturaCompuesta}
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
