import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Smartphone, Users, Shield, Mail, Phone } from 'lucide-react';

export function TerminosUso() {
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-transparent to-blue-100 opacity-20 blur-3xl"></div>
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                Términos y Condiciones de Uso
              </h1>
              <p className="text-gray-600 text-sm sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4">
                De la Aplicación Móvil Workexpress.online App
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
                <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4">
                  <p>
                    Por favor, lea atentamente estos términos y condiciones antes de utilizar la aplicación móvil Workexpress.online App (en adelante, la "Aplicación"), desarrollada y administrada por Héctor Herrera Ellis, titular del servicio courier Workexpress.online.
                  </p>
                  <p>
                    Al descargar, acceder o utilizar esta Aplicación, usted acepta quedar vinculado por los siguientes términos y condiciones. Si no está de acuerdo con estos términos, por favor no utilice la Aplicación.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Descripción del Servicio */}
          <section className="bg-gradient-to-br from-white to-green-50/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-green-100/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <Smartphone className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                  1. Descripción del Servicio
                </h2>
                <div className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4">
                  <p>La Aplicación permite a los usuarios de Workexpress.online realizar las siguientes acciones:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full mt-2 shrink-0"></div>
                      <span>Rastrear el estado de sus paquetes desde Miami hasta Panamá.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full mt-2 shrink-0"></div>
                      <span>Visualizar el historial de paquetes enviados.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full mt-2 shrink-0"></div>
                      <span>Consultar facturas y detalles asociados a cada envío.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full mt-2 shrink-0"></div>
                      <span>Acumular puntos de fidelidad ("Sellos") que podrán ser canjeados por beneficios como libras gratis.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full mt-2 shrink-0"></div>
                      <span>Crear y mantener un perfil de cliente donde podrá consultar sus datos, actividad y recompensas.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Uso de la Aplicación */}
          <section className="bg-gradient-to-br from-white to-purple-50/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-purple-100/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                  2. Uso de la Aplicación
                </h2>
                <div className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4">
                  <p>
                    La Aplicación es gratuita para todos los usuarios registrados del servicio de courier. El uso de la Aplicación está condicionado al cumplimiento de los Términos y Condiciones generales del servicio de Workexpress.online, disponibles en www.workexpress.online y complementados por este documento.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Registro y Perfil del Usuario */}
          <section className="bg-gradient-to-br from-white to-orange-50/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-orange-100/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                  3. Registro y Perfil del Usuario
                </h2>
                <div className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4">
                  <p>
                    Para utilizar las funcionalidades completas de la Aplicación, el usuario deberá registrarse con sus datos reales y mantener su información actualizada. La falsificación de identidad o el uso no autorizado del perfil de otro usuario está estrictamente prohibido.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sellos y Programa de Recompensas */}
          <section className="bg-gradient-to-br from-white to-red-50/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-red-100/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                  4. Sellos y Programa de Recompensas
                </h2>
                <div className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4">
                  <p>Los usuarios podrán acumular Sellos digitales por cada envío realizado. Estos sellos:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full mt-2 shrink-0"></div>
                      <span>No son transferibles ni canjeables por dinero en efectivo.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full mt-2 shrink-0"></div>
                      <span>Podrán ser utilizados para redimir beneficios como libras gratis de envío, de acuerdo con las políticas vigentes del programa de fidelización.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full mt-2 shrink-0"></div>
                      <span>Están sujetos a validación por parte de Workexpress.online antes de ser canjeados.</span>
                    </li>
                  </ul>
                  <p>
                    La empresa se reserva el derecho de suspender, modificar o cancelar el programa en cualquier momento, sin previo aviso, especialmente en caso de uso indebido o fraudulento.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Protección de Datos Personales */}
          <section className="bg-gradient-to-br from-white to-indigo-50/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-indigo-100/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                  5. Protección de Datos Personales
                </h2>
                <div className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4">
                  <p>
                    La información personal proporcionada por el usuario será tratada conforme a la Ley 81 de 2019 sobre Protección de Datos Personales en Panamá. Al usar esta Aplicación, el usuario autoriza el tratamiento de sus datos con fines:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full mt-2 shrink-0"></div>
                      <span>Operativos del servicio</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full mt-2 shrink-0"></div>
                      <span>Atención al cliente</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full mt-2 shrink-0"></div>
                      <span>Gestión de recompensas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full mt-2 shrink-0"></div>
                      <span>Promociones, novedades o mejoras del servicio</span>
                    </li>
                  </ul>
                  <p>
                    El usuario podrá solicitar acceso, corrección o eliminación de sus datos personales mediante solicitud escrita.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Limitación de Responsabilidad */}
          <section className="bg-gradient-to-br from-white to-yellow-50/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-yellow-100/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                  6. Limitación de Responsabilidad
                </h2>
                <div className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4">
                  <p>
                    La Aplicación se proporciona "tal cual" y su funcionamiento puede verse afectado por factores técnicos. Workexpress.online no se hace responsable por:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mt-2 shrink-0"></div>
                      <span>Interrupciones temporales o permanentes del servicio digital.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mt-2 shrink-0"></div>
                      <span>Errores en el cálculo de puntos, seguimiento o visualización de información.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mt-2 shrink-0"></div>
                      <span>Daños directos o indirectos derivados del uso o mal uso de la Aplicación.</span>
                    </li>
                  </ul>
                  <p>
                    Para reclamos relacionados con la entrega física de paquetes, aplican los Términos y Condiciones Generales publicados en el sitio web.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Propiedad Intelectual */}
          <section className="bg-gradient-to-br from-white to-teal-50/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-teal-100/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                  7. Propiedad Intelectual
                </h2>
                <div className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4">
                  <p>
                    Todos los contenidos de la Aplicación (diseño, logotipo, funcionalidades, gráficos, base de datos, etc.) son propiedad exclusiva de Héctor Herrera Ellis. Se prohíbe la reproducción total o parcial sin autorización expresa y por escrito.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Modificaciones */}
          <section className="bg-gradient-to-br from-white to-pink-50/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-pink-100/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                  8. Modificaciones
                </h2>
                <div className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4">
                  <p>
                    Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones serán notificadas dentro de la Aplicación y entrarán en vigencia desde su publicación. El uso continuado de la Aplicación implicará aceptación de los cambios.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Jurisdicción y Legislación Aplicable */}
          <section className="bg-gradient-to-br from-white to-gray-50/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-gray-100/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                  9. Jurisdicción y Legislación Aplicable
                </h2>
                <div className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed space-y-4">
                  <p>
                    Estos términos se rigen por las leyes de la República de Panamá. Cualquier conflicto será resuelto por las autoridades competentes en la provincia de Veraguas, salvo pacto distinto entre las partes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contacto */}
          <section className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-blue-100/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                  10. Contacto
                </h2>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 lg:mb-8">
                  Para más información, consultas o ejercer sus derechos de usuario, puede contactarnos a través de los siguientes canales:
                </p>
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 sm:p-5 hover:shadow-lg transition-all duration-300 border border-green-100/50">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shrink-0">
                        <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-medium text-green-700 mb-1">Teléfono</p>
                        <a 
                          href="tel:+50763864733" 
                          className="text-green-600 hover:text-green-700 font-bold transition-colors text-sm sm:text-base hover:underline block break-all"
                        >
                          +507 6386-4733
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-5 hover:shadow-lg transition-all duration-300 border border-blue-100/50">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shrink-0">
                        <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-medium text-blue-700 mb-1">Email</p>
                        <a 
                          href="mailto:contacto@workexpress.online" 
                          className="text-blue-600 hover:text-blue-700 font-bold transition-colors text-sm sm:text-base hover:underline block break-all"
                        >
                          contacto@workexpress.online
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-4 sm:p-5 hover:shadow-lg transition-all duration-300 border border-purple-100/50">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shrink-0">
                        <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-medium text-purple-700 mb-1">Sitio Web</p>
                        <a 
                          href="https://www.workexpress.online" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-700 font-bold transition-colors text-sm sm:text-base hover:underline block break-all"
                        >
                          www.workexpress.online
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Botón volver arriba */}
          <div className="text-center pt-8 sm:pt-12">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-2xl font-bold shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 hover:scale-105 transition-all duration-500 text-sm sm:text-base"
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