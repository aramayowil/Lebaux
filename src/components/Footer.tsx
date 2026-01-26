import { useEffect, useState } from 'react'
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa'

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [contact, setContact] = useState({ email: '', phone: '' })

  useEffect(() => {
    // Ofuscamos ambos datos construyéndolos al montar el componente
    const eUser = 'lebauxaberturas1930'
    const eDom = 'gmail.com'
    const pNum = '543815729129' // Formato internacional para el link

    setContact({
      email: `${eUser}@${eDom}`,
      phone: pNum,
    })
  }, [])

  // El link oficial de Google Maps para tu local
  const googleMapsUrl =
    'https://www.google.com/maps/search/?api=1&query=Lebaux+Aberturas+Tucuman&query_place_id=ChIJxXmwryJbIpQRIP7Y7bMX4aw'

  return (
    <footer className='w-full bg-black border-t border-zinc-900 mt-auto py-16 px-6'>
      <div className='max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12 w-full'>
        <div className='flex flex-col gap-1 shrink-0'>
          <img
            src='./images/LEBAUX-LOGO.png'
            alt='Logo Lebaux'
            className='h-10 md:h-12 w-auto object-contain self-start'
          />
          <p className='text-zinc-600 text-xs uppercase ml-1'>
            aberturas lebaux © {currentYear}
          </p>
        </div>

        <div className='flex flex-col items-start gap-6 text-left '>
          <ul className='flex flex-col gap-4 text-zinc-400 text-xs tracking-wider'>
            {/* Email Protegido */}
            <li className='flex items-center gap-3'>
              <FaEnvelope size={14} className='text-yellow-600 shrink-0' />
              <a
                href={contact.email ? `mailto:${contact.email}` : '#'}
                className='font-medium text-white hover:text-yellow-500 transition-colors'
              >
                {contact.email || 'Cargando...'}
              </a>
            </li>

            {/* WhatsApp Funcional */}
            <li className='flex items-center gap-3'>
              <FaWhatsapp size={16} className='text-yellow-600 shrink-0' />
              <a
                href={contact.phone ? `https://wa.me/${contact.phone}` : '#'}
                target='_blank'
                rel='noopener noreferrer'
                className='font-medium text-white hover:text-yellow-500 transition-colors'
              >
                +54 381 572-9129
              </a>
            </li>

            {/* Dirección con Link a Maps */}
            <li className='flex items-start gap-3'>
              <FaMapMarkerAlt
                size={14}
                className='text-yellow-600 shrink-0 mt-1'
              />
              <a
                href={googleMapsUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='leading-relaxed font-medium text-white hover:text-yellow-500 transition-colors'
              >
                Av. Alem 1930, CP 4000 <br />
                San Miguel de Tucumán
              </a>
            </li>
          </ul>

          <div className='w-full md:w-60 h-px bg-zinc-800' />

          <div className='flex gap-6'>
            {/* ... Iconos de redes sociales ... */}
            {[FaInstagram, FaLinkedin, FaFacebook].map((Icon, i) => (
              <a
                key={i}
                href='#'
                className='text-zinc-500 hover:text-yellow-600 transition-all transform hover:scale-110'
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
