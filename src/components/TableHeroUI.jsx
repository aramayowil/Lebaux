import React from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Pagination,
  Chip,
  Tooltip,
} from '@heroui/react'

export const DeleteIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M8.60834 13.75H11.3833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.91669 10.4167H12.0834"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  )
}

export const EditIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M2.5 18.3333H17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  )
}

const statusColorMap = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
}

export const columns = [
  { name: 'CANTIDAD', uid: 'cantidad' },
  { name: 'PRODUCTO', uid: 'producto' },
  { name: 'DESCRIPCIÓN', uid: 'descripcion' },
  { name: 'PRECIO', uid: 'precio' },
  { name: 'OPCIONES', uid: 'actions' },
]

const itemsAbertura = [
  {
    id: 1,
    linea: 'modena',
    tipo: 'pf',
    nombre: 'Paño Fijo',
    prefijo: 'PF',
    descripcion: 'Paño fijo',
    img: './img/modena/PañoFijo.jpg',
    medidas: {
      base: 1234,
      altura: 2678,
    },
    color: 'Blanco',
    vidrio: 'Laminado 3+3',
    cantidad: 1,
    precio: 19233.98,
  },
  {
    id: 2,
    linea: 'modena',
    tipo: 'pf',
    nombre: 'Paño Fijo',
    prefijo: 'PF',
    descripcion: 'Paño fijo',
    img: './img/modena/PañoFijo.jpg',
    medidas: {
      base: 1234,
      altura: 2678,
    },
    color: 'Blanco',
    vidrio: 'Laminado 3+3',
    cantidad: 1,
    precio: 19233.98,
  },
  {
    id: 3,
    linea: 'modena',
    tipo: 'pf',
    nombre: 'Paño Fijo',
    prefijo: 'PF',
    descripcion: 'Paño fijo',
    img: './img/modena/PañoFijo.jpg',
    medidas: {
      base: 1234,
      altura: 2678,
    },
    color: 'Blanco',
    vidrio: 'Laminado 3+3',
    cantidad: 1,
    precio: 19233.98,
  },
  {
    id: 4,
    linea: 'modena',
    tipo: 'pf',
    nombre: 'Paño Fijo',
    prefijo: 'PF',
    descripcion: 'Paño fijo',
    img: './img/modena/PañoFijo.jpg',
    medidas: {
      base: 1234,
      altura: 2678,
    },
    color: 'Blanco',
    vidrio: 'Laminado 3+3',
    cantidad: 1,
    precio: 19233.98,
  },
  {
    id: 5,
    linea: 'modena',
    tipo: 'pf',
    nombre: 'Paño Fijo',
    prefijo: 'PF',
    descripcion: 'Paño fijo',
    img: './img/modena/PañoFijo.jpg',
    medidas: {
      base: 1234,
      altura: 2678,
    },
    color: 'Blanco',
    vidrio: 'Laminado 3+3',
    cantidad: 1,
    precio: 19233.98,
  },
  {
    id: 6,
    linea: 'modena',
    tipo: 'pf',
    nombre: 'Paño Fijo',
    prefijo: 'PF',
    descripcion: 'Paño fijo',
    img: './img/modena/PañoFijo.jpg',
    medidas: {
      base: 1234,
      altura: 2678,
    },
    color: 'Blanco',
    vidrio: 'Laminado 3+3',
    cantidad: 1,
    precio: 19233.98,
  },
  {
    id: 7,
    linea: 'modena',
    tipo: 'pf',
    nombre: 'Paño Fijo',
    prefijo: 'PF',
    descripcion: 'Paño fijo',
    img: './img/modena/PañoFijo.jpg',
    medidas: {
      base: 1234,
      altura: 2678,
    },
    color: 'Blanco',
    vidrio: 'Laminado 3+3',
    cantidad: 1,
    precio: 1923111,
  },
]

export default function App() {
  const renderCell = React.useCallback((item, columnKey) => {
    switch (columnKey) {
      case 'cantidad':
        return (
          <div className="text-center">
            <p className="text-bold text-sm">{item.cantidad}</p>
          </div>
        )
      case 'producto':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {item.linea}
            </p>
            <p className="text-bold text-md capitalize">{item.nombre}</p>
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
              {item.descripcion}
            </Chip>
            <div className="flex flex-col sm:flex-row gap-2">
              <Chip color="warning" variant="bordered" size="sm">
                {item.medidas.base} x {item.medidas.altura}
              </Chip>
              <Chip color="primary" variant="bordered" size="sm">
                {item.vidrio}
              </Chip>
              <Chip color="#fff" variant="bordered" size="sm">
                {item.color}
              </Chip>
            </div>
          </div>
        )
      case 'precio':
        return (
          <Chip className="capitalize" color="success" size="md" variant="flat">
            $ {item.precio.toFixed(2)}
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
    }
  }, [])

  const [selectedKeys, setSelectedKeys] = React.useState([])

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 5

  const pages = Math.ceil(itemsAbertura.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return itemsAbertura.slice(start, end)
  }, [page, itemsAbertura])

  return (
    <Table
      aria-label="Example table with custom cells"
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      onSelectionChange={setSelectedKeys}
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: 'max-h-[382px]',
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
