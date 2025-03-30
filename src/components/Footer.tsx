import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid">
          <div>
            <h3>Categorías</h3>
            <ul>
              <li><Link href="#">Plomería</Link></li>
              <li><Link href="#">Electricidad</Link></li>
              <li><Link href="#">Carpintería</Link></li>
              <li><Link href="#">Pintura</Link></li>
            </ul>
          </div>
          <div>
            <h3>Para clientes</h3>
            <ul>
              <li><Link href="#">Cómo funciona</Link></li>
              <li><Link href="#">Preguntas frecuentes</Link></li>
              <li><Link href="#">Garantía de servicio</Link></li>
              <li><Link href="#">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h3>Empresas</h3>
            <ul>
              <li><Link href="#">Únete como profesional</Link></li>
              <li><Link href="#">Soluciones para empresas</Link></li>
              <li><Link href="#">Asociaciones</Link></li>
              <li><Link href="#">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3>Contáctanos</h3>
            <ul>
              <li className="flex items-center">
                <Mail size={18} className="mr-2" />
                <a href="mailto:info@profix.com">info@profix.com</a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2" />
                <a href="tel:+123456789">+52 998 564 7647</a>
              </li>
              <li className="flex items-center">
                <MapPin size={18} className="mr-2" />
                <span>123 Calle Principal, Ciudad</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-3xl font-bold">ProFix</div>
            <div className="mb-4 md:mb-0 social-networks">
              <Link href="#" className="social-icon">
                <span className="sr-only">Facebook</span>
                <Facebook size={24} />
              </Link>
              <Link href="#" className="social-icon">
                <span className="sr-only">Instagram</span>
                <Instagram size={24} />
              </Link>
              <Link href="#" className="social-icon">
                <span className="sr-only">Twitter</span>
                <Twitter size={24} />
              </Link>
              <Link href="#" className="social-icon">
                <span className="sr-only">LinkedIn</span>
                <Linkedin size={24} />
              </Link>
            </div>
          </div>
          <div className="text-sm mt-4 text-center md:text-left">
            <p>ProFix © 2023. Todos los derechos reservados.</p>
            <p className="mt-2">
              <Link href="#" className="privacy-policy">Política de Privacidad</Link>
              <Link href="#" className="terms-of-service">Términos de Servicio</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
