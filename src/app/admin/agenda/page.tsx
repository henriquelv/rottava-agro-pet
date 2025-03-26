'use client'

import React, { useState } from 'react'
import {
  Calendar,
  Clock,
  User,
  Phone,
  Dog,
  CheckCircle,
  XCircle,
  Timer
} from 'phosphor-react'

interface Appointment {
  id: string
  date: string
  time: string
  customer: {
    name: string
    phone: string
  }
  pet: {
    name: string
    type: string
  }
  service: string
  status: 'scheduled' | 'completed' | 'cancelled'
  notes?: string
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    date: '2024-03-20',
    time: '09:00',
    customer: {
      name: 'João Silva',
      phone: '(49) 99999-9999'
    },
    pet: {
      name: 'Rex',
      type: 'Cachorro'
    },
    service: 'Banho e Tosa',
    status: 'scheduled',
    notes: 'Corte de unhas incluído'
  },
  {
    id: '2',
    date: '2024-03-20',
    time: '10:30',
    customer: {
      name: 'Maria Santos',
      phone: '(49) 98888-8888'
    },
    pet: {
      name: 'Luna',
      type: 'Gato'
    },
    service: 'Consulta Veterinária',
    status: 'scheduled'
  },
  {
    id: '3',
    date: '2024-03-19',
    time: '14:00',
    customer: {
      name: 'Pedro Oliveira',
      phone: '(49) 97777-7777'
    },
    pet: {
      name: 'Thor',
      type: 'Cachorro'
    },
    service: 'Banho e Tosa',
    status: 'completed'
  }
]

export default function AgendaPage() {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  )
  const [appointments] = useState<Appointment[]>(mockAppointments)

  const filteredAppointments = appointments.filter(
    appointment => appointment.date === selectedDate
  )

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
    }
  }

  const getStatusIcon = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return <Timer size={20} />
      case 'completed':
        return <CheckCircle size={20} />
      case 'cancelled':
        return <XCircle size={20} />
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Agenda</h1>
        <p className="text-text/60">
          Gerencie as consultas e serviços agendados
        </p>
      </div>

      {/* Calendário */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium">Agenda do Dia</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20 transition-shadow"
          />
        </div>

        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-primary" size={20} />
                    <span className="font-medium">
                      {new Date(appointment.date).toLocaleDateString('pt-BR')}
                    </span>
                    <Clock className="text-text/40" size={16} />
                    <span className="text-text/60">{appointment.time}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <User className="text-text/40" size={16} />
                    <span className="text-sm">{appointment.customer.name}</span>
                    <Phone className="text-text/40" size={16} />
                    <span className="text-sm">{appointment.customer.phone}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Dog className="text-text/40" size={16} />
                    <span className="text-sm">
                      {appointment.pet.name} ({appointment.pet.type})
                    </span>
                  </div>

                  <p className="text-sm font-medium text-primary">
                    {appointment.service}
                  </p>

                  {appointment.notes && (
                    <p className="text-sm text-text/60">
                      Observações: {appointment.notes}
                    </p>
                  )}
                </div>

                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    appointment.status
                  )}`}
                >
                  {getStatusIcon(appointment.status)}
                  <span>
                    {appointment.status === 'scheduled'
                      ? 'Agendado'
                      : appointment.status === 'completed'
                      ? 'Concluído'
                      : 'Cancelado'}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {filteredAppointments.length === 0 && (
            <div className="text-center py-8 text-text/60">
              Nenhum agendamento para esta data
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 