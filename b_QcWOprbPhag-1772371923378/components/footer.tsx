import { Flower, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer id="contacto" className="border-t border-border bg-muted py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Flower className="h-7 w-7 text-primary" />
              <h2 className="font-serif text-xl font-bold text-primary">Encanto & Color</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Cada accesorio es una obra de arte, disenada para mujeres que valoran la exclusividad y
              la artesania colombiana.
            </p>
          </div>
          <div>
            <h5 className="mb-6 text-xs font-bold uppercase tracking-widest text-foreground">
              Categorias
            </h5>
            <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
              <li>
                <a className="transition-colors hover:text-primary" href="#">
                  Lazos de Saten
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary" href="#">
                  Diademas Florales
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary" href="#">
                  Coleccion Nupcial
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary" href="#">
                  Accesorios Infantiles
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="mb-6 text-xs font-bold uppercase tracking-widest text-foreground">
              Ayuda
            </h5>
            <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
              <li>
                <a className="transition-colors hover:text-primary" href="#">
                  Envios y Entregas
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary" href="#">
                  Cambios y Devoluciones
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary" href="#">
                  Guia de Cuidados
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary" href="#">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="mb-6 text-xs font-bold uppercase tracking-widest text-foreground">
              Contacto
            </h5>
            <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                info@encantoycolor.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                +57 (300) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Medellin, Colombia
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>{"© 2024 Encanto & Color. Todos los derechos reservados. Hecho con amor en Colombia."}</p>
        </div>
      </div>
    </footer>
  )
}
