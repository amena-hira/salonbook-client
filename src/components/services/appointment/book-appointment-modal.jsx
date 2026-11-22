"use client";

import { useState } from "react";
import { CalendarDays, ChevronDown, X } from "lucide-react";
import { toast } from "@/components/ui/toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSession } from "@/lib/auth-client";
import { addNewAppointment } from "@/lib/actions/appointments";

const timeSlots = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

const BookAppointmentModal = ({ service, className }) => {
  const { data: session } = useSession();
  const isCustomer = session?.user?.role === 'customer'
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const serviceId = service?._id;
  const serviceName = service?.serviceName;

  const handleDialogChange = (value) => {
    if (value && !isCustomer) {
      toast.add({
        title: "Booking Not Allowed",
        description: "Only customers can book appointments.",
        type: "error",
      });
      return;
    }

    setOpen(value);
  };


  const submitBooking = async(event) => {
    event.preventDefault();

    if (!date || !time) {
      toast.add({
        title: "Choose a date and time",
        description: "Both appointment date and time slot are required.",
        type: "error",
      });
      return;
    }

    const appointment = {
      serviceId,
      customerId: session?.user?.id,
      appointmentDate: date,
      timeSlot: time,
      message,
      servicePrice: service?.price,
      paymentStatus: "Unpaid",
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await addNewAppointment(appointment);
      if (!response.acknowledged) throw new Error("Unable to add appointment.");

      toast.add({
        title: `Appointment request sent for ${serviceName}`,
        description: "Your appointment is pending confirmation and payment is unpaid.",
        type: "success",
      });
      setOpen(false);
      setTime("");
      setMessage("");
    } catch (error) {
      toast.add({
        title: "Unable to book appointment",
        description: error.message || "Please try again.",
        type: "error",
      });
    }
  };

  return (
    <Dialog open={isCustomer ? open : false} onOpenChange={handleDialogChange}>
      <DialogTrigger render={<button className={className} />}>
        <CalendarDays className="size-6" aria-hidden="true" />
        Book Appointment
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-h-[calc(100vh-2rem)] max-w-[calc(100%-2rem)] gap-0 overflow-y-auto rounded-xl p-5 sm:max-w-xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <DialogTitle className="flex items-center gap-2 font-heading text-2xl font-semibold text-charcoal">
              <CalendarDays className="size-6 text-[#684521]" />
              Book Appointment
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm text-ash">
              Book your appointment for {serviceName}.
            </DialogDescription>
          </div>
          <DialogClose
            className="grid size-9 place-items-center rounded-md text-charcoal hover:bg-cream"
            aria-label="Close booking modal"
          >
            <X className="size-6" />
          </DialogClose>
        </div>

        <form onSubmit={submitBooking} className="mt-5 space-y-4">
          <label className="block text-sm font-semibold text-charcoal">
            Appointment Date <span className="text-red-500">*</span>
            <span className="relative mt-1.5 block">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ash" />
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="h-11 w-full rounded-lg border border-border bg-background px-10 text-sm outline-none focus:border-[#684521]"
                required
              />
            </span>
          </label>

          <label className="block text-sm font-semibold text-charcoal">
            Available Time Slot <span className="text-red-500">*</span>
            <span className="relative mt-1.5 block">
              <select
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-border bg-background px-3 text-sm font-normal outline-none focus:border-[#684521]"
                required
              >
                <option value="">Select an available time</option>
                {timeSlots.map((slot) => (
                  <option key={slot}>{slot}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ash" />
            </span>
          </label>

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setTime(slot)}
                className={`rounded-md border px-1 py-2 text-xs font-medium transition-colors ${time === slot ? "border-[#684521] bg-[#684521] text-white" : "border-border bg-background text-charcoal hover:bg-cream"}`}
              >
                {slot}
              </button>
            ))}
          </div>

          <label className="block text-sm font-semibold text-charcoal">
            Additional Message{" "}
            <span className="font-normal text-ash">(Optional)</span>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value.slice(0, 250))}
              maxLength={250}
              placeholder="Any special request or note for your appointment..."
              className="mt-1.5 min-h-20 w-full resize-y rounded-lg border border-border bg-background p-3 text-sm font-normal outline-none focus:border-[#684521]"
            />
            <span className="mt-1 block text-right text-xs font-normal text-ash">
              {message.length} / 250
            </span>
          </label>

          <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
            <DialogClose className="h-10 rounded-lg border border-border px-5 text-sm font-semibold text-charcoal hover:bg-cream">
              Cancel
            </DialogClose>
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#4c3019] px-5 text-sm font-semibold text-white hover:bg-[#684521]"
            >
              <CalendarDays className="size-4" />
              Book Appointment
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointmentModal;
