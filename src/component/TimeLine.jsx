import { CheckCircle2, Circle, Clock } from "lucide-react";

export function Timeline({ events = [] }) {
  if (!events.length) {
    return (
      <p className="text-gray-500 text-sm text-center">
        No hay eventos registrados.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={event.id || index} className="flex gap-4">
          {/* Icono y línea vertical */}
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                event.completed
                  ? "bg-linear-to-br from-red-600 to-amber-600"
                  : "bg-gray-200"
              }`}
            >
              {event.completed ? (
                <CheckCircle2 className="w-5 h-5 text-white" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400" />
              )}
            </div>

            {index < events.length - 1 && (
              <div
                className={`w-0.5 h-16 ${
                  event.completed
                    ? "bg-linear-to-b from-red-600 to-amber-600"
                    : "bg-gray-200"
                }`}
              />
            )}
          </div>

          {/* Contenido del evento */}
          <div className="flex-1 pb-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  className={`font-semibold ${
                    event.completed ? "text-black" : "text-gray-400"
                  }`}
                >
                  {event.status}
                </h3>
                {event.description && (
                  <p className="text-sm text-gray-500 mt-1">
                    {event.description}
                  </p>
                )}
                {event.location && (
                  <p className="text-sm text-gray-400 mt-1">
                    {event.location}
                  </p>
                )}
              </div>

              <div className="text-right text-sm text-gray-500 whitespace-nowrap">
                <p>{event.date}</p>
                {event.time && (
                  <p className="flex items-center justify-end gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    {event.time}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
