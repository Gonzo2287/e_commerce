"use client";

import Link from "next/link";


export default function Footer() {
  return (
    <footer className="bg-primary-700 text-white py-10 mt-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        
        <div>
          <h3 className="text-lg font-semibold mb-4">E-commerce</h3>
          <p className="text-sm">
          Nos especializamos en ofrecer calzado de calidad que combina estilo, comodidad y durabilidad. 
          Descubre nuestra amplia colección diseñada para todas las ocasiones, desde lo casual hasta lo formal. 
          
          </p>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-4">Contacto</h3>
          <p className="text-sm">Email: ecommerce.pasantia@gmail.com</p>
          <p className="text-sm">Teléfono: +54 11 1234-5678</p>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="https://wa.me/123456789"
              target="_blank"
              rel="noopener noreferrer"
            >
             
              <img
                src="/img/whatsapp.png"
                alt="WhatsApp"
                className="w-8 h-8 hover:opacity-80 transition-opacity"
              />
            </a>
            <Link href="/compras" className="flex justify-center items-center">

            Mis Compras
            </Link>
            <a
              href="https://linkedin.com/in/tuperfil"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/img/linkedin.png"
                alt="LinkedIn"
                className="w-8 h-8 hover:opacity-80 transition-opacity"
              />
            </a>
            <a
              href="https://instagram.com/tuperfil"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/img/instagram.png"
                alt="Instagram"
                className="w-8 h-8 hover:opacity-80 transition-opacity"
              />
            </a>
          </div>
        </div>
      </div>

      
      <div className="mt-8 text-center text-sm text-gray-200 border-t border-gray-600 pt-4">
        <p>&copy; {new Date().getFullYear()} E-commerce. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}