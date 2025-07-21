import React, { act, useCallback, useEffect, useMemo, useState } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
} from '@heroui/react'
import ModalAgregar from './ModalAgregar'
import {
  capitalize,
  DeleteIcon,
  EditIcon,
  SearchIcon,
  ChevronDownIcon,
} from '../utils/tableUtils'
import Options from './UI/Options'

// const aberturas = JSON.parse(localStorage.getItem('aberturas')) || []

export const columns = [
  { name: 'CANTIDAD', uid: 'cantidad', sortable: true },
  { name: 'PRODUCTO', uid: 'producto' },
  { name: 'DESCRIPCIÓN', uid: 'descripcion' },
  { name: 'PRECIO', uid: 'precio', sortable: true },
  { name: 'OPCIONES', uid: 'actions' },
]

export const statusOptions = [
  { name: 'Active', uid: 'active' },
  { name: 'Paused', uid: 'paused' },
  { name: 'Vacation', uid: 'vacation' },
]

// export const users = aberturas

const INITIAL_VISIBLE_COLUMNS = [
  'cantidad',
  'producto',
  'descripcion',
  'precio',
  'actions',
]

export default function TableHeroUI() {
  //const users = JSON.parse(localStorage.getItem('aberturas')) || []
  const users = []

  // const [actualizarTabla, setActualizarTabla] = useState(false)
  // const handleActualizarTabla = () => {
  //   setActualizarTabla(!actualizarTabla)
  // }
  // useEffect(() => {
  //   console.log('Tabla actualizada')
  //   setActualizarTabla()
  // }, [actualizarTabla])

  const [filterValue, setFilterValue] = useState('')
  const [selectedKeys, setSelectedKeys] = useState(new Set([]))
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  )
  const [statusFilter, setStatusFilter] = useState('all')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'age',
    direction: 'ascending',
  })
  const [page, setPage] = useState(1)

  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    )
  }, [visibleColumns])

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users]

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.tipoAbertura.toLowerCase().includes(filterValue.toLowerCase())
      )
    }
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      )
    }

    return filteredUsers
  }, [users, filterValue, statusFilter])

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column]
      const second = b[sortDescriptor.column]
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, items])

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey]

    switch (columnKey) {
      case 'cantidad':
        return (
          <div className="text-center">
            <p className="text-bold text-sm">{user.cantidad}</p>
          </div>
        )
      case 'producto':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {user.linea}
            </p>
            <p className="text-bold text-md capitalize">{user.tipoAbertura}</p>
          </div>
        )
      case 'descripcion':
        return (
          <div className="flex flex-col g-2">
            <Chip
              className="capitalize"
              color="default"
              size="md"
              variant="light"
            >
              {user.descripcion}
            </Chip>
            <div className="flex flex-col sm:flex-row gap-2">
              <Chip color="warning" variant="bordered" size="sm">
                {user.medidas.base} x {user.medidas.altura}
              </Chip>
              <Chip color="primary" variant="bordered" size="sm">
                {user.vidrio}
              </Chip>
              <Chip color="#fff" variant="bordered" size="sm">
                {user.color}
              </Chip>
            </div>
          </div>
        )
      case 'precio':
        return (
          <Chip className="capitalize" color="success" size="md" variant="flat">
            $ {user.precio.toFixed(2)}
          </Chip>
        )
      case 'actions':
        return (
          <div className="relative flex items-center gap-4">
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1)
    }
  }, [page, pages])

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value))
    setPage(1)
  }, [])

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }, [])

  const onClear = useCallback(() => {
    setFilterValue('')
    setPage(1)
  }, [])

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-50 sm:max-w-[44%]"
            placeholder="Buscar Abertura..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="ghost"
                >
                  Columas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {/* <Button color="primary" startContent={<PlusIcon />}>
              Agregar
            </Button> */}
            <ModalAgregar />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} aberturas
          </span>
          <label className="flex items-center text-default-400 text-small">
            Filas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    )
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    users.length,
    onSearchChange,
    hasSearchFilter,
  ])

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === 'all'
            ? 'Todos los items seleccionados'
            : `${selectedKeys.size} de ${filteredItems.length} seleccionados`}
        </span>
        <Pagination
          isCompact="true"
          showControls
          color="warning"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2 mb-2">
          <Button
            isDisabled={pages === 1}
            size="md"
            color="warning"
            variant="light"
            onPress={onPreviousPage}
          >
            Anterior
          </Button>
          <Button
            isDisabled={pages === 1}
            size="md"
            color="warning"
            variant="light"
            onPress={onNextPage}
          >
            Siguiente
          </Button>
        </div>
      </div>
    )
  }, [selectedKeys, items.length, page, pages, hasSearchFilter])

  return (
    <div>
      <h1 className="text-4xl font-bold text-center py-1 mb-2 ">Presupuesto</h1>
      <Options />
      <Table
        isHeaderSticky
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: 'max-h-[400px]',
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align="start"
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={'No hay aberturas cargadas'}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
