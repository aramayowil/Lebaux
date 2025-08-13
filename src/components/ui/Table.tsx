import type { Selection } from '@heroui/react'
import React, { useState } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  addToast,
} from '@heroui/react'
import { FiPlusCircle } from 'react-icons/fi'
import Modal from './modals/ModalCreateAbert'
import { VerticalDotsIcon } from '../icons'
import useAberturasStore from '@/stores/useAberturasStore'
import ModalEditAbertura from './modals/ModalEditAbert'
import InputNameCliente from './inputs/inputNameCliente'

export const columns = [
  { name: 'CANTIDAD', uid: 'cantidad' },
  { name: 'PRODUCTO', uid: 'producto' },
  { name: 'DESCRIPCIÓN', uid: 'descripcion' },
  { name: 'PRECIO', uid: 'precio' },
  { name: 'OPCIONES', uid: 'actions' },
]

interface Abertura {
  key: number
  linea: string
  type_aberturaID: string
  name_abertura: string
  descripcion_abertura: string
  codigo: string
  medidas: { base: number; altura: number }
  accesorios: { mosquitero: number; premarco: number }
  color: string
  vidrio: string
  img: string
  cantidad: number
  precio: number
}

export default function App() {
  const aberturas: Abertura[] = useAberturasStore((state) => state.aberturas)
  const eliminarAberturaStore = useAberturasStore(
    (state) => state.eliminarAbertura,
  )
  const [keyAbertura, setKeyAbertura] = useState<number | null>(null)
  const handlekeyAbertura = (key: number) => {
    setKeyAbertura(key)
  }
  // controles modal agregar
  const [isOpenModal, setIsOpenModal] = useState(false)
  const onOpenModal = () => setIsOpenModal(true)
  const onCloseModal = () => setIsOpenModal(false)
  //////////////////////

  //controles modal editar
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const onOpenEditModal = () => setIsOpenEditModal(true)
  const onCloseEditModal = () => {
    setIsOpenEditModal(false)
    setKeyAbertura(null) // Reset keyAbertura when closing the modal
  }
  //////////////////////

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))

  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const [page, setPage] = React.useState(1)

  const headerColumns = columns

  const pages = Math.ceil(aberturas.length / rowsPerPage)

  const renderCell = React.useCallback(
    (abertura: Abertura, columnKey: React.Key) => {
      const cellValue = abertura[columnKey as keyof Abertura]

      switch (columnKey) {
        case 'cantidad':
          return (
            <div className='text-center'>
              <p className='text-bold text-sm'>{abertura.cantidad}</p>
            </div>
          )
        case 'producto':
          return (
            <div className='flex flex-col'>
              <p className='text-bold text-sm capitalize text-default-400'>
                {abertura.linea}
              </p>
              <p className='text-bold text-md capitalize'>
                {abertura.name_abertura}
              </p>
            </div>
          )
        case 'descripcion':
          return (
            <div className='flex flex-col g-2'>
              <Chip
                className='capitalize'
                color='default'
                size='sm'
                variant='light'
              >
                {abertura.descripcion_abertura}
              </Chip>
              <div className='flex flex-col md:flex-row gap-2'>
                <Chip color='warning' variant='bordered' size='sm'>
                  {abertura.medidas.base} x {abertura.medidas.altura}
                </Chip>
                <Chip color='primary' variant='bordered' size='sm'>
                  {abertura.vidrio}
                </Chip>
                <Chip color='danger' variant='bordered' size='sm'>
                  {abertura.color}
                </Chip>
              </div>
            </div>
          )
        case 'precio':
          return (
            <Chip
              className='capitalize'
              color='default'
              variant='light'
              size='md'
            >
              $ {abertura.precio.toFixed(2)}
            </Chip>
          )
        case 'actions':
          return (
            <div className='relative flex justify-end items-center gap-2'>
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size='sm' variant='light'>
                    <VerticalDotsIcon className='text-default-300' />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    key='edit'
                    onPress={() => {
                      handlekeyAbertura(abertura.key)
                      onOpenEditModal()
                    }}
                  >
                    Editar
                  </DropdownItem>
                  <DropdownItem
                    key='delete'
                    onPress={() => {
                      eliminarAberturaStore(abertura.key)
                      addToast({
                        color: 'warning',
                        title: 'Abertura eliminada',
                        description:
                          'La abertura se ha eliminado correctamente.',
                      })
                    }}
                  >
                    Eliminar
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )
        default:
          return typeof cellValue === 'object' && cellValue !== null
            ? JSON.stringify(cellValue)
            : cellValue
      }
    },
    [aberturas.length],
  )

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value))
      setPage(1)
    },
    [],
  )

  const topContent = React.useMemo(() => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between gap-3 items-center'>
          {/* <Input
            isClearable
            className='w-50 sm:max-w-[44%]'
            placeholder='Buscar Abertura...'
            startContent={<CiSearch size={21} />}
          /> */}
          <InputNameCliente />
          <div className='flex gap-3'>
            <Button
              onPress={onOpenModal}
              color='warning'
              startContent={<FiPlusCircle size={18} />}
            >
              Agregar
            </Button>
            {isOpenModal && (
              <Modal isOpen={isOpenModal} onClose={onCloseModal} />
            )}
          </div>
        </div>
      </div>
    )
  }, [onRowsPerPageChange, aberturas, isOpenModal])

  const bottomContent = React.useMemo(() => {
    return (
      <div className=' px-2 flex justify-between items-center'>
        <span className='w-[30%] text-small text-default-700'>
          Total {aberturas.length} aberturas
        </span>
        <Pagination
          showControls
          // classNames={{
          //   cursor: 'bg-foreground text-background',
          // }}
          color='warning'
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className='hidden sm:flex w-[30%] justify-end gap-2'>
          <label className='flex items-center text-default-700 text-small'>
            Filas por página:
            <select
              className='bg-transparent outline-hidden text-default-700 text-small'
              onChange={onRowsPerPageChange}
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
            </select>
          </label>
        </div>

        {/* <div className='flex justify-end flex-1'>
          <span className='text-small text-default-400'>
            {selectedKeys === 'all'
              ? 'Todos los elementos seleccionados'
              : `${selectedKeys.size} de ${aberturas.length} seleccionados`}
          </span>
        </div> */}
      </div>
    )
  }, [selectedKeys, aberturas.length, page, pages])

  return (
    <>
      <Table
        aria-label='Aberturas Table'
        bottomContent={bottomContent}
        bottomContentPlacement='outside'
        classNames={{
          wrapper: 'max-h-[382px]',
          table: 'min-w-max',
        }}
        selectionMode='single'
        topContent={topContent}
        topContentPlacement='outside'
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'No hay aberturas cargadas'} items={aberturas}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isOpenEditModal && (
        <ModalEditAbertura
          key_abertura={keyAbertura}
          isOpen={isOpenEditModal}
          onClose={onCloseEditModal}
        />
      )}
    </>
  )
}
