import React from 'react'

const navigation = {
  company: [
    { name: 'Acerca de', href: '#' },
    { name: 'Equipo', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contacto', href: '#' },
  ],
  support: [
    { name: 'Ayuda', href: '#' },
    { name: 'Privacidad', href: '#' },
    { name: 'Términos', href: '#' },
  ],
  social: [
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: () => (
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12 0C5.37 0 0 5.373 0 12a12 12 0 008.207 11.385c.6.113.793-.26.793-.577v-2.234c-3.338.728-4.033-1.61-4.033-1.61-.546-1.39-1.333-1.76-1.333-1.76-1.09-.746.083-.73.083-.73 1.204.085 1.837 1.236 1.837 1.236 1.07 1.834 2.808 1.304 3.493.997.108-.775.42-1.304.763-1.604-2.665-.306-5.467-1.334-5.467-5.933 0-1.312.467-2.384 1.236-3.223-.124-.305-.535-1.538.118-3.206 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0112 5.8c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.668.244 2.901.12 3.206.77.839 1.235 1.911 1.235 3.223 0 4.61-2.807 5.624-5.48 5.922.431.371.816 1.103.816 2.222v3.293c0 .32.192.694.8.576A12.005 12.005 0 0024 12c0-6.627-5.373-12-12-12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: () => (
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path d="M8.29 20c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.349 8.349 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996A4.107 4.107 0 0015.448 4c-2.266 0-4.103 1.836-4.103 4.102 0 .322.036.635.106.935-3.41-.171-6.436-1.805-8.457-4.29a4.077 4.077 0 00-.555 2.063c0 1.423.725 2.676 1.828 3.41a4.093 4.093 0 01-1.859-.514v.052c0 1.987 1.413 3.644 3.292 4.02a4.1 4.1 0 01-1.853.07c.522 1.63 2.037 2.816 3.833 2.85A8.233 8.233 0 012 18.407 11.616 11.616 0 008.29 20" />
        </svg>
      ),
    },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-40">
      <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-white uppercase">
              Compañía
            </h3>
            <ul className="mt-4 space-y-4">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="hover:text-white">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase">
              Soporte
            </h3>
            <ul className="mt-4 space-y-4">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="hover:text-white">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-white uppercase">
              Síguenos
            </h3>
            <div className="mt-4 flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  {item.icon()}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} TuEmpresa. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  )
}
