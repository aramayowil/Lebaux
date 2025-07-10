import React from 'react'
import ReactPDF from '@react-pdf/renderer'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { Button } from '@heroui/button'
import PDF from '../PdfConstructor.jsx'
import { FaRegCheckCircle } from 'react-icons/fa'

function PdfLuncher() {
  return (
    <>
      <PDFDownloadLink document={<PDF />} fileName="presupuesto.pdf">
        {({ loading, url, error, blob }) =>
          loading ? (
            <Button
              variant="bordered"
              color="warning"
              startContent={<FaRegCheckCircle size={18} />}
              className="mt-1 mx-auto w-full"
            >
              Finalizar presupuesto
            </Button>
          ) : (
            <Button
              variant="bordered"
              color="warning"
              startContent={<FaRegCheckCircle size={18} />}
              className="mt-1 mx-auto w-full"
            >
              Finalizar presupuesto
            </Button>
          )
        }
      </PDFDownloadLink>
    </>
  )
}

export default PdfLuncher
