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
} from '@heroui/react'
import { Stage, Layer, Rect, Group, Text } from 'react-konva'
import { HiOutlineDatabase, HiOutlineEye, HiOutlineCube } from 'react-icons/hi'

// --- INTERFACES ---
interface Modulo {
  id: string
  x: number // Posición lógica en la grilla
  y: number // Posición lógica en la grilla
  linea: string
  abertura: string
  descripcion: string
  ancho: number // Medida real en mm
  alto: number // Medida real en mm
  imgSrc: string
  color: string
  vidrio: string
  cantidad: number
  precio: number
  mosquitero: { checked: boolean; precio: number }
  premarco: { checked: boolean; precio: number }
}

const STORAGE_KEY = 'diseno_modulos_compuesta'
const PREVIEW_SCALE = 0.05 // Escala mucho más pequeña para el resumen

export default function ModalResumenDiseno() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [datos, setDatos] = useState<Modulo[]>([])

  // Cargar datos del LocalStorage al abrir
  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setDatos(JSON.parse(saved))
    }
  }, [isOpen])

  // Cálculo de posición visual para la previsualización
  const obtenerPosVisual = (m: Modulo) => {
    // Simplificado para la preview: usamos coordenadas lógicas * escala
    return {
      x: m.x * (m.ancho * PREVIEW_SCALE + 5),
      y: m.y * (m.alto * PREVIEW_SCALE + 5),
    }
  }
  const defaultContent =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
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
                  <HiOutlineCube className='text-blue-500' />
                  <span>Resumen Técnico de Composición</span>
                </div>
                <p className='text-xs text-zinc-500 font-normal'>
                  Verificación de datos en LocalStorage y renderizado de
                  control.
                </p>
              </ModalHeader>

              <ModalBody className='p-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 h-125'>
                  {/* COLUMNA 1: LECTURA DE DATOS */}
                  <div className='flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar'>
                    <div className='flex items-center gap-2 text-zinc-400 mb-2'>
                      <HiOutlineDatabase />
                      <span className='text-xs font-bold uppercase tracking-widest'>
                        Datos Guardados
                      </span>
                    </div>

                    {datos.length === 0 ? (
                      <div className='text-zinc-600 text-sm italic'>
                        No hay módulos guardados.
                      </div>
                    ) : (
                      datos.map((mod, index) => (
                        <div className='flex justify-between items-start'>
                          <Accordion variant='splitted' isCompact>
                            <AccordionItem
                              key={index}
                              aria-label='Accordion 1'
                              title={`${mod.descripcion} ${mod.linea.charAt(0).toUpperCase() + mod.linea.slice(1)} ${mod.ancho} x ${mod.alto}`}
                            >
                              {defaultContent}
                            </AccordionItem>
                          </Accordion>
                        </div>
                      ))
                    )}
                  </div>

                  {/* COLUMNA 2: VISUALIZACIÓN */}
                  <div className='bg-black/40 rounded-2xl border border-zinc-800 flex flex-col relative overflow-hidden'>
                    <div className='absolute top-4 left-4 z-10 flex items-center gap-2 text-zinc-400'>
                      <HiOutlineEye size={14} />
                      <span className='text-[10px] font-bold uppercase tracking-widest'>
                        Vista Previa Automática
                      </span>
                    </div>

                    <div className='flex-1 flex items-center justify-center bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] bg-size-[20px_20px]'>
                      <Stage width={400} height={400}>
                        <Layer x={100} y={100}>
                          {' '}
                          {/* Offset para centrar preview */}
                          {datos.map((m) => {
                            const pos = obtenerPosVisual(m)
                            return (
                              <Group key={m.id} x={pos.x} y={pos.y}>
                                <Rect
                                  width={m.ancho * PREVIEW_SCALE}
                                  height={m.alto * PREVIEW_SCALE}
                                  fill='#18181b'
                                  stroke='#3b82f6'
                                  strokeWidth={1}
                                />
                                <Text
                                  text={`${m.ancho}\nx\n${m.alto}`}
                                  width={m.ancho * PREVIEW_SCALE}
                                  height={m.alto * PREVIEW_SCALE}
                                  fontSize={8}
                                  fill='#60a5fa'
                                  align='center'
                                  verticalAlign='middle'
                                />
                              </Group>
                            )
                          })}
                        </Layer>
                      </Stage>
                    </div>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter className='border-t border-zinc-800'>
                <Button
                  variant='light'
                  onPress={onClose}
                  className='text-zinc-400'
                >
                  Cerrar
                </Button>
                <Button color='primary' className='font-bold'>
                  Exportar Configuración
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
