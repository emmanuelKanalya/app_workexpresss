import { ArrowLeft, Shield, Eye, Lock, Users, AlertCircle, Package, Truck, DollarSign, MapPin, Phone, Mail } from 'lucide-react';

export function PoliticasPrivacidad() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-12 lg:mb-16">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 transition-all duration-300 mb-8 sm:mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium text-sm sm:text-base">Volver al inicio</span>
          </a>
          
          <div className="text-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-100 via-transparent to-red-100 opacity-20 blur-3xl"></div>
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                Políticas y Procesos Generales
              </h1>
              <p className="text-gray-600 text-sm sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4">
                Para la operación de WorkExpress.Online
              </p>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="space-y-6 sm:space-y-8">
          {/* Introducción */}
          <section className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-blue-100/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 lg:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4">
                  <p>
                    En el presente documento estaremos estableciendo de manera formal todos aquellos procesos, políticas, compromisos y garantías de los servicios ofrecidos por la empresa WorkExpress.Online, según el producto.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Antecedentes de la Empresa */}
          <section className="bg-gradient-to-br from-white to-green-50/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-green-100/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                  1. Antecedentes de la Empresa
                </h2>
                <div className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4">
                  <p>
                    WorkExpress.Online es una empresa de logística, paquetería y desarrollo fundada en el año 2021 por un joven emprendedor veragüense. Con trabajo y el respaldo de sus clientes, la empresa creció hasta convertirse en uno de los líderes del mercado, diversificando sus servicios. Actualmente, cuenta con un equipo de operadores, agentes de atención, ejecutivos de mercadeo y desarrolladores tecnológicos.
                  </p>
                  <p>
                    Originalmente establecida en Santiago de Veraguas, ha expandido operaciones a Panamá y Chitré.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Qué Hacemos */}
          <section className="bg-gradient-to-br from-white to-purple-50/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-purple-100/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <Package className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                  2. ¿Qué Hacemos?
                </h2>
                <div className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4">
                  <p>
                    Importamos paquetería desde Estados Unidos, especialmente de comercios en línea como Amazon, SHEIN, AliExpress, Temu y otras tiendas de retail.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Cómo lo Hacemos */}
          <section className="bg-gradient-to-br from-white to-orange-50/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-orange-100/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <Truck className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                  3. ¿Cómo lo Hacemos?
                </h2>
                <div className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4">
                  <p>
                    Recibimos paquetes en una bodega en Miami a través de proveedores logísticos. Los paquetes se organizan, pesan y se asignan a clientes. Luego son importados a Panamá, distribuidos a sucursales y facturados según el plan del cliente. También ofrecemos entrega a domicilio y transporte local adicional sin comisión extra por nuestra parte.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Servicios que Ofrecemos */}
          <section className="bg-gradient-to-br from-white to-red-50/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-red-100/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                  4. Servicios que Ofrecemos
                </h2>
                <div className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed space-y-6">
                  
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-3">A. Servicio de Paquetería Aérea Miami - Panamá</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-2">Sucursal Santiago:</h4>
                        <ul className="text-blue-700 space-y-1 text-sm">
                          <li>• Plan Standard: $2.95/lb (peso real, sin delivery)</li>
                          <li>• Plan Business: $2.70/lb (peso volumétrico, ideal para paquetes pequeños)</li>
                          <li>• Plan Prime: $3.70/lb (peso real, incluye delivery)</li>
                        </ul>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 mb-2">Sucursal Panamá:</h4>
                        <ul className="text-green-700 space-y-1 text-sm">
                          <li>• Plan Standard: $2.25/lb (peso real, sin delivery)</li>
                          <li>• Plan Prime: $3.75/lb (peso real, incluye delivery en Santiago)</li>
                        </ul>
                      </div>
                      
                      <div className="bg-purple-50 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-800 mb-2">Sucursal Chitré:</h4>
                        <ul className="text-purple-700 space-y-1 text-sm">
                          <li>• Plan Standard: $2.70/lb (peso real, sin delivery)</li>
                          <li>• Plan Business: $2.50/lb (peso volumétrico)</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Condiciones:</h4>
                      <ul className="text-yellow-700 space-y-1 text-sm">
                        <li>• Tarifas sujetas a cambios con 5 días de aviso</li>
                        <li>• Redondeo a la siguiente libra</li>
                        <li>• Tránsito de 3 a 5 días hábiles desde Miami</li>
                      </ul>
                    </div>
                    
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Dirección en EE.UU.:</h4>
                      <ul className="text-gray-700 space-y-1 text-sm">
                        <li>• 6930 NW 84TH AVE, Miami, Florida 33166</li>
                        <li>• Tel: +1 786 618 5090</li>
                        <li>• Identificadores: STP (Panamá), ST (Santiago), STC (Chitré)</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-3">B. Servicio de Paquetería Marítima</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-2">Desde EE.UU.:</h4>
                        <ul className="text-blue-700 space-y-1 text-sm">
                          <li>• $1.99/lb (mínimo 25 lb)</li>
                          <li>• Dirección incluye "MAR" en nombre y "M" en referencias</li>
                        </ul>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 mb-2">Desde China:</h4>
                        <ul className="text-green-700 space-y-1 text-sm">
                          <li>• $500 por metro cúbico / $45 mínimo</li>
                          <li>• Casillero: BAIYUN DISTRICT, GUANGZHOU CITY CBX9213</li>
                          <li>• Tel: +86 17620862689</li>
                        </ul>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-4">
                      Condiciones importantes: Incluyen tiempo de tránsito, penalización por almacenaje, políticas de facturación, restricciones de productos y cargos adicionales.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-3">C. Servicio de Paquetería Aérea China - Panamá</h3>
                    
                    <div className="bg-orange-50 rounded-lg p-4">
                      <ul className="text-orange-700 space-y-1 text-sm">
                        <li>• $17.00/lb (peso real o volumétrico)</li>
                        <li>• Dirección: ROOM 412, BUILDING 1, YUNSHAN CREATIVE COMPOUND, GUANGZHOU</li>
                        <li>• Tel: +86 17620862689</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Seguro de Paquetería */}
          <section className="bg-gradient-to-br from-white to-indigo-50/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-indigo-100/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                  5. Seguro de Paquetería
                </h2>
                <div className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4">
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-800 mb-2">Cobertura:</h4>
                    <p className="text-indigo-700 text-sm">
                      Hasta B/. 500.00 por incidentes en compras por internet o daños durante tránsito Miami - Panamá.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Requisitos:</h4>
                    <p className="text-green-700 text-sm">
                      Servicio activo, facturas al día, documentación válida.
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Limitaciones:</h4>
                    <ul className="text-yellow-700 space-y-1 text-sm">
                      <li>• Reclamos dentro de 24 horas desde la recepción</li>
                      <li>• Revisión en sucursal o frente al repartidor</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Cláusulas:</h4>
                    <ul className="text-blue-700 space-y-1 text-sm">
                      <li>• Devoluciones: subsidio de 30%-100% del flete (hasta $70)</li>
                      <li>• Reemplazos no defectuosos: hasta 30% (máx. $50)</li>
                    </ul>
                  </div>
                  
                  <p className="text-sm">
                    <strong>Documentos requeridos:</strong> Factura, fecha de compra, deducción bancaria, identificación, lista de artículos, etc.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Servicios Adicionales */}
          <section className="bg-gradient-to-br from-white to-teal-50/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-teal-100/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <Truck className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                  Servicios Adicionales
                </h2>
                <div className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4">
                  
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-3">6. Servicio de Entrega a Domicilio</h3>
                    <ul className="space-y-2">
                      <li>• Gratis para planes Prime (Santiago y Panamá)</li>
                      <li>• Costo adicional: $0.95/km + $1.50 base (1-5 paquetes); $0.50 por paquete adicional</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-3">7. Servicio de Compras por Internet (Clientes sin Tarjeta)</h3>
                    <ul className="space-y-2">
                      <li>• Compras asistidas con nuestra tarjeta y casillero</li>
                      <li>• Costo: valor del artículo + envío a Miami + impuestos. Miami-Panamá se calcula al llegar.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-3">8. Servicio de Envío y Devoluciones al Extranjero</h3>
                    <ul className="space-y-2">
                      <li>• A través de DHL</li>
                      <li>• Cotización según peso y dimensiones</li>
                      <li>• Algunas devoluciones son subsidiadas si el cliente tiene seguro activo</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sucursales */}
          <section className="bg-gradient-to-br from-white to-yellow-50/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-yellow-100/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                  9. Nuestras Sucursales
                </h2>
                <div className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4">
                  <div className="space-y-3">
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Santiago:</h4>
                      <p className="text-yellow-700 text-sm">Calle 8va, frente a Escuela Normal, Plaza sin nombre, local #2</p>
                    </div>
                    
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Chitré:</h4>
                      <p className="text-yellow-700 text-sm">Local M-34, Merca Chitré</p>
                    </div>
                    
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Panamá:</h4>
                      <p className="text-yellow-700 text-sm">Local 8A, C.C. Los Pueblos, Juan Díaz</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    Disponibles en Google Maps.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Canales Oficiales */}
          <section className="bg-gradient-to-br from-white to-pink-50/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-pink-100/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 lg:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6">
                  10. Canales Oficiales
                </h2>
                <div className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed space-y-3 sm:space-y-4">
                  <div className="space-y-4">
                    <div className="bg-pink-50 rounded-xl p-4 sm:p-5 border border-pink-100/50 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                          <Mail className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="font-semibold text-pink-800 text-sm sm:text-base">Correo</h4>
                      </div>
                      <a 
                        href="mailto:contacto@workexpress.online"
                        className="text-pink-700 text-sm sm:text-base hover:text-pink-800 hover:underline transition-colors block break-all font-medium"
                      >
                        contacto@workexpress.online
                      </a>
                    </div>
                    
                    <div className="bg-pink-50 rounded-xl p-4 sm:p-5 border border-pink-100/50 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                          <Phone className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="font-semibold text-pink-800 text-sm sm:text-base">WhatsApp</h4>
                      </div>
                      <div className="space-y-2">
                        <a href="tel:+50763864733" className="text-pink-700 text-sm sm:text-base hover:text-pink-800 hover:underline transition-colors block font-medium">
                          Santiago: 6386-4733
                        </a>
                        <a href="tel:+50764829251" className="text-pink-700 text-sm sm:text-base hover:text-pink-800 hover:underline transition-colors block font-medium">
                          Chitré: 6482-9251
                        </a>
                        <a href="tel:+50768187751" className="text-pink-700 text-sm sm:text-base hover:text-pink-800 hover:underline transition-colors block font-medium">
                          Panamá: 6818-7751
                        </a>
                      </div>
                    </div>
                    
                    <div className="bg-pink-50 rounded-xl p-4 sm:p-5 border border-pink-100/50 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="font-semibold text-pink-800 text-sm sm:text-base">Redes Sociales</h4>
                      </div>
                      <p className="text-pink-700 text-sm sm:text-base font-medium">Instagram, Facebook, TikTok: @WorkExpress.Online</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tiendas Populares */}
          <section className="bg-gradient-to-br from-white to-gray-50/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-gray-100/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <Package className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                  11. Tiendas Populares entre Nuestros Clientes
                </h2>
                <div className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                  <p>
                    Amazon, eBay, Sephora, Gymshark, SHEIN, Temu, Jomashop, Newegg, Walmart, Best Buy, Target, Macy's, Apple Store, AliExpress, Ulta Beauty, StockX, Nike, Adidas, Nordstrom, Zara, RockAuto, Hollister, American Eagle, Forever 21, B&H Photo Video, Hot Topic, entre muchas otras.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Botón volver arriba */}
          <div className="text-center pt-8 sm:pt-12">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-2xl font-bold shadow-2xl hover:shadow-red-500/25 transform hover:-translate-y-1 hover:scale-105 transition-all duration-500 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 rotate-90" />
              Volver arriba
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}